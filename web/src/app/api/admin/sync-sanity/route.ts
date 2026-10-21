import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest } from '@/lib/auth/adminAuth'
import { getContentStore, syncStoreToSanity } from '@/lib/cms/contentStore'

export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const store = getContentStore()
    const result = await syncStoreToSanity(store)

    return NextResponse.json({
      success: result.success,
      syncedCount: result.syncedCount,
      errors: result.errors,
      hasWriteToken: Boolean(process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN),
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Sanity manual sync error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to sync to Sanity',
      },
      { status: 500 }
    )
  }
}
