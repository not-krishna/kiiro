import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest } from '@/lib/auth/adminAuth'
import { getContentStore, saveContentStore, type CMSContentStore } from '@/lib/cms/contentStore'

export async function GET(req: NextRequest) {
  const admin = getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const section = searchParams.get('section')
  const store = getContentStore()

  if (section && section in store) {
    return NextResponse.json({
      success: true,
      data: store[section as keyof CMSContentStore],
      lastUpdated: store.lastUpdated,
    })
  }

  // If no section requested, return summary and stats for dashboard
  const stats = {
    totalEvents: store.events.length,
    upcomingEvents: store.events.filter((e) => {
      if (!e.date) return false
      return new Date(e.date) >= new Date()
    }).length,
    weeklyEvents: store.events.filter((e) => e.isWeekly).length,
    totalOfferings: store.offerings.length,
    traditionalOfferings: store.offerings.filter((o) => o.category === 'traditional').length,
    contemporaryOfferings: store.offerings.filter((o) => o.category === 'contemporary').length,
    wellnessOfferings: store.offerings.filter((o) => o.category === 'wellness').length,
    totalTestimonials: store.testimonials.length,
    publishedTestimonials: store.testimonials.filter((t) => t.published).length,
    totalAdvisors: store.advisors.length,
    totalMoments: store.studioMoments.length,
    totalArtisans: store.artisans.length,
    totalJournal: (store.journal || []).length,
    pendingChangesCount: (store.pendingChanges || []).length,
  }

  return NextResponse.json({
    success: true,
    stats,
    data: store,
    pendingChanges: store.pendingChanges || [],
    lastPublishedAt: store.lastPublishedAt || null,
    publishingHistory: store.publishingHistory || [],
    lastUpdated: store.lastUpdated,
  })
}

export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const { section, action = 'save', data, id } = body

    if (!section) {
      return NextResponse.json({ error: 'Section parameter is required' }, { status: 400 })
    }

    const store = getContentStore()
    const authorName = admin.name || admin.username

    // 1. Homepage & SiteSettings Singletons
    if (section === 'homepage') {
      store.homepage = { ...store.homepage, ...data }
      await saveContentStore(store, {
        docId: 'homePage',
        section: 'homepage',
        title: 'Homepage & Hero Copy',
        action: 'update',
        author: authorName,
      })
      return NextResponse.json({ success: true, data: store.homepage, pendingChanges: store.pendingChanges })
    }

    if (section === 'siteSettings') {
      store.siteSettings = { ...store.siteSettings, ...data }
      await saveContentStore(store, {
        docId: 'siteSettings',
        section: 'siteSettings',
        title: 'Site Settings & Brand Metadata',
        action: 'update',
        author: authorName,
      })
      return NextResponse.json({ success: true, data: store.siteSettings, pendingChanges: store.pendingChanges })
    }

    // 2. Collection Sections (events, offerings, studioMoments, testimonials, advisors, artisans, journal)
    const validCollections = ['events', 'offerings', 'studioMoments', 'testimonials', 'advisors', 'artisans', 'journal'] as const
    type CollectionKey = typeof validCollections[number]

    if (validCollections.includes(section as CollectionKey)) {
      const colKey = section as CollectionKey
      let items = [...((store[colKey] as any[]) || [])]

      if (action === 'delete') {
        if (!id) {
          return NextResponse.json({ error: 'Item ID or slug is required for deletion' }, { status: 400 })
        }
        const targetItem = items.find((item) => item.id === id || item.slug === id)
        const targetTitle = targetItem?.title || targetItem?.name || targetItem?.personName || id

        items = items.filter((item) => (item.id !== id && item.slug !== id))
        ;(store as any)[colKey] = items
        await saveContentStore(store, {
          docId: id,
          section: colKey,
          title: String(targetTitle),
          action: 'delete',
          author: authorName,
        })
        return NextResponse.json({ success: true, message: 'Item deleted successfully', pendingChanges: store.pendingChanges })
      }

      if (action === 'reorder') {
        if (!Array.isArray(data)) {
          return NextResponse.json({ error: 'Data must be an array of reordered items' }, { status: 400 })
        }
        ;(store as any)[colKey] = data
        await saveContentStore(store, {
          docId: `${colKey}-order`,
          section: colKey,
          title: `Reordered ${colKey}`,
          action: 'update',
          author: authorName,
        })
        return NextResponse.json({ success: true, message: 'Order updated successfully', pendingChanges: store.pendingChanges })
      }

      if (action === 'save') {
        const itemData = data
        const identifier = itemData.id || itemData.slug

        if (!identifier) {
          itemData.id = `${section}-${Date.now()}`
        }

        const effectiveId = itemData.id || itemData.slug
        const existingIndex = items.findIndex((it) => (it.id && it.id === effectiveId) || (it.slug && it.slug === effectiveId))

        if (existingIndex >= 0) {
          items[existingIndex] = { ...items[existingIndex], ...itemData }
        } else {
          items.push(itemData)
        }

        const itemTitle = itemData.title || itemData.name || itemData.personName || itemData.handle || effectiveId

        ;(store as any)[colKey] = items
        const trackingDocId = section === 'journal' && itemData.slug ? itemData.slug : effectiveId
        await saveContentStore(store, {
          docId: trackingDocId,
          section: colKey,
          title: String(itemTitle),
          action: existingIndex >= 0 ? 'update' : 'create',
          author: authorName,
        })
        return NextResponse.json({ success: true, data: itemData, pendingChanges: store.pendingChanges })
      }
    }


    return NextResponse.json({ error: `Unknown section ${section}` }, { status: 400 })
  } catch (error: any) {
    console.error('Content update error:', error)
    return NextResponse.json({ error: error.message || 'Failed to update content' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  return POST(req)
}
