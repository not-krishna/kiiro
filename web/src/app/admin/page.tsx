import React from 'react'
import Link from 'next/link'
import { getContentStore } from '@/lib/cms/contentStore'
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient'

export const dynamic = 'force-dynamic'

export default function AdminDashboardPage() {
  const store = getContentStore()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcomingEvents = store.events.filter((e) => {
    if (!e.date) return false
    return new Date(e.date) >= today
  })

  const pastEvents = store.events.filter((e) => {
    if (!e.date) return false
    return new Date(e.date) < today
  })

  const stats = {
    totalEvents: store.events.length,
    upcomingEventsCount: upcomingEvents.length,
    pastEventsCount: pastEvents.length,
    weeklyEventsCount: store.events.filter((e) => e.isWeekly).length,
    totalOfferings: store.offerings.length,
    traditionalCount: store.offerings.filter((o) => o.category === 'traditional').length,
    contemporaryCount: store.offerings.filter((o) => o.category === 'contemporary').length,
    wellnessCount: store.offerings.filter((o) => o.category === 'wellness').length,
    totalTestimonials: store.testimonials.length,
    publishedTestimonials: store.testimonials.filter((t) => t.published).length,
    totalAdvisors: store.advisors.length,
    totalMoments: store.studioMoments.length,
    totalArtisans: store.artisans.length,
    lastUpdated: store.lastUpdated,
  }

  const hasWriteToken = Boolean(process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN)

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E1D5] pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4F5B2A]">
            Central Content Control
          </span>
          <h1 className="font-display text-3xl font-semibold text-[#2B231F] mt-1">
            MELD EXPERIENCES Dashboard
          </h1>
          <p className="text-xs text-[#6E635B] mt-1 font-light">
            Manage live masterclasses, studio moments, 36 offerings, and advisory governance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/events/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#4F5B2A] hover:bg-[#3D4721] text-white rounded-md text-xs font-medium shadow-xs transition-colors"
          >
            <span>+ Create New Session</span>
          </Link>
          <Link
            href="/admin/homepage"
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#D8CEBE] bg-white hover:bg-[#F3EFE6] text-[#2B231F] rounded-md text-xs font-medium transition-colors"
          >
            <span>Edit Homepage</span>
          </Link>
        </div>
      </div>

      {/* Interactive Client Dashboard for Sync and Live Stats */}
      <AdminDashboardClient
        stats={stats}
        events={store.events.slice(0, 5)}
        testimonials={store.testimonials.slice(0, 5)}
        advisors={store.advisors}
        hasWriteToken={hasWriteToken}
      />
    </div>
  )
}
