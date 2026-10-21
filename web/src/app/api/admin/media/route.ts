import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { getAdminFromRequest } from '@/lib/auth/adminAuth'

import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from '@/sanity/env'

export interface MediaAssetItem {
  id: string
  filename: string
  url: string
  sizeBytes: number
  category: 'uploads' | 'hero' | 'artisans' | 'testimonials' | 'moments' | 'other'
  lastModified: string
}

export async function GET(req: NextRequest) {
  const admin = getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const assets: MediaAssetItem[] = []
  const publicDir = path.join(process.cwd(), 'public')

  // Helper to scan directory
  const scanDir = (folder: string, category: MediaAssetItem['category']) => {
    const fullPath = path.join(publicDir, folder)
    if (!fs.existsSync(fullPath)) return

    try {
      const files = fs.readdirSync(fullPath)
      for (const f of files) {
        const itemPath = path.join(fullPath, f)
        const stat = fs.statSync(itemPath)
        if (stat.isFile() && /\.(png|jpe?g|webp|gif|svg|avif)$/i.test(f)) {
          assets.push({
            id: `${category}-${f}`,
            filename: f,
            url: `/${folder}/${f}`,
            sizeBytes: stat.size,
            category,
            lastModified: stat.mtime.toISOString(),
          })
        }
      }
    } catch (e) {
      console.warn(`Error scanning media folder ${folder}:`, e)
    }
  }

  scanDir('uploads', 'uploads')
  scanDir('images/hero', 'hero')
  scanDir('images/artisans', 'artisans')
  scanDir('images/testimonials', 'testimonials')
  scanDir('images/studio-moments', 'moments')
  scanDir('images/other', 'other')

  // Fetch image assets from Sanity Cloud
  try {
    const sanity = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN,
    })
    const sanityAssets = await sanity.fetch(`*[_type == "sanity.imageAsset"] | order(_createdAt desc) [0...100] {
      _id,
      url,
      originalFilename,
      size,
      _createdAt
    }`)
    if (Array.isArray(sanityAssets)) {
      for (const a of sanityAssets) {
        if (!a.url) continue

        // Check if an entry for this exact filename or URL already exists
        const matchIndex = assets.findIndex(
          (x) =>
            x.url === a.url ||
            (a.originalFilename && x.filename === a.originalFilename)
        )

        if (matchIndex >= 0) {
          // Upgrade the existing local entry with the canonical Sanity cloud metadata
          assets[matchIndex] = {
            ...assets[matchIndex],
            id: a._id,
            url: a.url, // Canonical Sanity CDN URL
            sizeBytes: a.size || assets[matchIndex].sizeBytes,
            lastModified: a._createdAt || assets[matchIndex].lastModified,
          }
        } else {
          assets.push({
            id: a._id,
            filename: a.originalFilename || a._id,
            url: a.url,
            sizeBytes: a.size || 0,
            category: 'uploads',
            lastModified: a._createdAt || new Date().toISOString(),
          })
        }
      }
    }
  } catch (sanityErr) {
    console.warn('Failed to fetch Sanity cloud assets:', sanityErr)
  }

  // Final deduplication safety net: ensure each unique filename and URL appears at most once
  const seenUrls = new Set<string>()
  const seenFilenames = new Set<string>()
  const dedupedAssets: MediaAssetItem[] = []

  for (const item of assets) {
    if (seenUrls.has(item.url)) continue
    // Allow multiple files with same generic name only if they are from different categories
    const nameKey = `${item.category}-${item.filename}`
    if (seenFilenames.has(nameKey)) continue

    seenUrls.add(item.url)
    seenFilenames.add(nameKey)
    dedupedAssets.push(item)
  }

  // Sort newest first
  dedupedAssets.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())

  return NextResponse.json({
    success: true,
    total: dedupedAssets.length,
    assets: dedupedAssets,
  })
}

export async function DELETE(req: NextRequest) {
  const admin = getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { url, id } = await req.json()
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Asset url is required' }, { status: 400 })
    }

    // Protect bundled system images in /images/
    if (url.startsWith('/images/')) {
      return NextResponse.json(
        { error: 'Bundled system template images in /images cannot be deleted' },
        { status: 400 }
      )
    }

    let deletedFromSanity = false
    const writeToken = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN

    // 1. If it's a Sanity cloud URL or has an ID, delete from Sanity
    if (writeToken && (url.includes('cdn.sanity.io') || (id && id.startsWith('image-')))) {
      try {
        const sanity = createClient({
          projectId,
          dataset,
          apiVersion,
          token: writeToken,
          useCdn: false,
        })

        // Fetch asset document
        const assetQuery = id
          ? `*[_type == "sanity.imageAsset" && _id == $id][0]`
          : `*[_type == "sanity.imageAsset" && url == $url][0]`
        const asset = await sanity.fetch(assetQuery, { id, url })

        if (asset?._id) {
          await sanity.delete(asset._id)
          deletedFromSanity = true

          // Also remove corresponding local file if one was cached in uploads
          if (asset.originalFilename) {
            const localCachedPath = path.join(process.cwd(), 'public', 'uploads', asset.originalFilename)
            if (fs.existsSync(localCachedPath)) {
              fs.unlinkSync(localCachedPath)
            }
          }
        }
      } catch (sanityErr: any) {
        console.warn('Sanity cloud asset deletion notice:', sanityErr?.message)
      }
    }

    // 2. If it's a local upload in /uploads/, delete the disk file
    if (url.startsWith('/uploads/')) {
      const filename = path.basename(url)
      const filePath = path.join(process.cwd(), 'public', 'uploads', filename)

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }

      // Also clean up from Sanity if matching by originalFilename
      if (writeToken && !deletedFromSanity) {
        try {
          const sanity = createClient({
            projectId,
            dataset,
            apiVersion,
            token: writeToken,
            useCdn: false,
          })
          const asset = await sanity.fetch(`*[_type == "sanity.imageAsset" && originalFilename == $filename][0]`, { filename })
          if (asset?._id) {
            await sanity.delete(asset._id)
          }
        } catch (e: any) {
          console.warn('Sanity cleanup by filename notice:', e?.message)
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Asset removed successfully' })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to remove asset' }, { status: 500 })
  }
}
