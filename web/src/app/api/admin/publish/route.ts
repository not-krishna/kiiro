import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest } from '@/lib/auth/adminAuth'
import { getContentStore, executePublishToSanity } from '@/lib/cms/contentStore'

export async function GET(req: NextRequest) {
  const admin = getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const store = getContentStore()
  const hasWriteToken = Boolean(process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN)

  return NextResponse.json({
    success: true,
    pendingChanges: store.pendingChanges || [],
    pendingCount: (store.pendingChanges || []).length,
    lastPublishedAt: store.lastPublishedAt || null,
    publishingHistory: (store.publishingHistory || []).slice(0, 10),
    hasWriteToken,
  })
}

// In-memory publishing lock to prevent concurrent overlapping publish runs
let isPublishInProgress = false
let publishLockTimestamp = 0
const LOCK_TIMEOUT_MS = 120000 // 2 minutes auto-recovery

export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = Date.now()
  if (isPublishInProgress && now - publishLockTimestamp < LOCK_TIMEOUT_MS) {
    return NextResponse.json(
      {
        success: false,
        error: 'A publish operation is already in progress. Please wait for it to complete.',
      },
      { status: 409 }
    )
  }

  isPublishInProgress = true
  publishLockTimestamp = now

  try {
    const body = await req.json().catch(() => ({}))
    const forceFullSync = Boolean(body?.forceFullSync)
    const author = admin.name || admin.username || 'Administrator'
    const result = await executePublishToSanity(author, { forceFullSync })

    return NextResponse.json({
      success: result.success,
      syncedCount: result.syncedCount,
      revalidatedRoutes: result.revalidatedRoutes,
      publishedChangesCount: result.publishedChangesCount,
      errors: result.errors,
      timestamp: result.timestamp,
      durationMs: result.durationMs,
      mode: result.mode,
    })
  } catch (error: any) {
    console.error('Publish pipeline execution error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Publishing pipeline failed to complete',
      },
      { status: 500 }
    )
  } finally {
    isPublishInProgress = false
  }
}

export async function DELETE(req: NextRequest) {
  const admin = getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const store = getContentStore()
  store.pendingChanges = []
  return NextResponse.json({ success: true, message: 'Pending changes cleared' })
}
