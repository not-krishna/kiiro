import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { getAdminFromRequest } from '@/lib/auth/adminAuth'
import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from '@/sanity/env'

export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate MIME type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Uploaded file must be an image' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Ensure uploads folder exists in public directory
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    // Clean filename
    const ext = path.extname(file.name) || '.jpg'
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase()
    const uniqueName = `${baseName}-${Date.now()}${ext}`
    const targetPath = path.join(uploadsDir, uniqueName)

    fs.writeFileSync(targetPath, buffer)
    const localUrl = `/uploads/${uniqueName}`

    let sanityAsset = null
    const writeToken = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN
    if (writeToken) {
      try {
        const sanity = createClient({
          projectId,
          dataset,
          apiVersion,
          token: writeToken,
          useCdn: false,
        })
        sanityAsset = await sanity.assets.upload('image', buffer, {
          filename: uniqueName,
          contentType: file.type,
        })
      } catch (sanityErr) {
        console.warn('Failed to upload asset to Sanity cloud, local upload succeeded:', sanityErr)
      }
    }

    // Return canonical Sanity URL if uploaded to cloud, fallback to local URL
    const publicUrl = sanityAsset?.url || localUrl

    return NextResponse.json({
      success: true,
      url: publicUrl,
      localUrl,
      filename: uniqueName,
      size: buffer.length,
      sanityAsset,
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: error.message || 'Image upload failed' }, { status: 500 })
  }
}
