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

    // Clean filename
    const ext = path.extname(file.name) || '.jpg'
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase()
    const uniqueName = `${baseName}-${Date.now()}${ext}`

    // 1. Upload to Sanity Cloud Asset Storage (PRIMARY)
    let sanityAsset = null
    let sanityError: string | null = null
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
      } catch (sanityErr: any) {
        console.error('Failed to upload asset to Sanity cloud:', sanityErr)
        sanityError = sanityErr?.message || 'Sanity upload failed'
      }
    }

    // 2. Attempt local disk save ONLY in non-serverless local development
    let localUrl: string | null = null
    const isServerless = Boolean(
      process.env.VERCEL ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.LAMBDA_TASK_ROOT ||
      process.env.NODE_ENV === 'production'
    )

    if (!isServerless) {
      try {
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true })
        }
        const targetPath = path.join(uploadsDir, uniqueName)
        fs.writeFileSync(targetPath, buffer)
        localUrl = `/uploads/${uniqueName}`
      } catch (fsErr: any) {
        console.warn('Local filesystem write skipped:', fsErr?.message)
      }
    }

    // 3. Resolve the public URL
    // Canonical Sanity CDN URL (https://cdn.sanity.io/images/...) is primary.
    // If not in cloud, fallback to localUrl (e.g. offline dev).
    const publicUrl = sanityAsset?.url || localUrl

    if (!publicUrl) {
      if (!writeToken) {
        return NextResponse.json(
          {
            error:
              'Missing SANITY_API_WRITE_TOKEN in Vercel environment variables. In production, image uploads are sent to Sanity Cloud Asset Storage. Please add SANITY_API_WRITE_TOKEN to your Vercel Project Settings -> Environment Variables and redeploy.',
            apiBuild: '2026-10-21-cloud-v3',
          },
          { status: 500 }
        )
      }

      return NextResponse.json(
        {
          error: `Upload failed: Could not upload to Sanity cloud (${sanityError || 'unknown error'}). Check your Sanity token permissions in Vercel Project Settings.`,
          apiBuild: '2026-10-21-cloud-v3',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      localUrl: localUrl || publicUrl,
      filename: uniqueName,
      size: buffer.length,
      sanityAsset,
      apiBuild: '2026-10-21-cloud-v3',
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: error.message || 'Image upload failed' }, { status: 500 })
  }
}
