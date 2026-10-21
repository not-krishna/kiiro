'use client'

import React from 'react'
import Link from 'next/link'
import {
  Calendar,
  Layers,
  MessageSquareQuote,
  GraduationCap,
  HeartHandshake,
  Plus,
  Home,
  Image as ImageIcon,
  Globe,
  ExternalLink,
  MapPin,
  User,
  Send,
  Sparkles,
} from 'lucide-react'
import { usePublish } from './PublishContext'
import type { EventItem } from '@/content/types'
import type { TestimonialItem, AdvisorItem, PendingChangeItem, PublishLogItem } from '@/lib/cms/contentStore'

interface DashboardStats {
  totalEvents: number
  upcomingEventsCount: number
  pastEventsCount: number
  weeklyEventsCount: number
  totalOfferings: number
  traditionalCount: number
  contemporaryCount: number
  wellnessCount: number
  totalTestimonials: number
  publishedTestimonials: number
  totalAdvisors: number
  totalMoments: number
  totalArtisans: number
  lastUpdated: string
}

interface AdminDashboardClientProps {
  stats: DashboardStats
  events: EventItem[]
  testimonials: TestimonialItem[]
  advisors: AdvisorItem[]
  pendingChanges?: PendingChangeItem[]
  publishingHistory?: PublishLogItem[]
  hasWriteToken: boolean
}

export function AdminDashboardClient({
  stats,
  events,
  testimonials,
  advisors,
  hasWriteToken,
}: AdminDashboardClientProps) {
  const {
    pendingChanges,
    pendingCount,
    isPublishing,
    lastPublishedAt,
    setPublishModalOpen,
    triggerPublish,
  } = usePublish()

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Editorial Publishing Pipeline Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#231C18] via-[#2A221D] to-[#1C1613] text-[#FBF9F4] rounded-2xl p-6 sm:p-7 border border-[#3A3029] shadow-md">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-[#4F5B2A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F5B2A] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D99B26]">
                Sanity Content Lake · Production
              </span>
              <span className="text-xs text-[#8C7E72]">|</span>
              <span className="text-xs font-mono text-[#C5BBAF]">Project: s47moswb</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF7F2]">
              {pendingCount > 0
                ? `${pendingCount} Working Changes Awaiting Publication`
                : 'All Website Content Is Live & Synchronized'}
            </h2>

            <p className="text-xs sm:text-sm text-[#A89C8F] leading-relaxed">
              {pendingCount > 0
                ? 'Content edits have been saved to your local draft store. Press PUSH to immediately sync to Sanity Cloud and revalidate the public website.'
                : `Last live publication completed ${
                    lastPublishedAt ? `at ${new Date(lastPublishedAt).toLocaleTimeString()}` : 'successfully'
                  }. Everything on the live website is up to date.`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {pendingCount > 0 && (
              <button
                onClick={() => setPublishModalOpen(true)}
                className="px-4 py-2.5 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/15 text-[#EAE3D5] border border-white/15 transition-colors text-center"
              >
                Review Changes ({pendingCount})
              </button>
            )}

            <button
              onClick={() => triggerPublish()}
              disabled={isPublishing}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2.5 ${
                isPublishing
                  ? 'bg-[#6E635B] text-white opacity-80 cursor-wait'
                  : pendingCount > 0
                  ? 'bg-[#4F5B2A] hover:bg-[#3D4721] text-white ring-2 ring-[#4F5B2A]/40 animate-pulse'
                  : 'bg-[#C17F59] hover:bg-[#A86A46] text-white'
              }`}
            >
              {isPublishing ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Pushing to Sanity...</span>
                </>
              ) : (
                <>
                  <span>{pendingCount > 0 ? `PUSH ALL LIVE (${pendingCount})` : 'FORCE RE-SYNC LIVE'}</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Pending Change Preview Pills */}
        {pendingCount > 0 && (
          <div className="mt-5 pt-4 border-t border-[#3A3029] flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#8C7E72] mr-1">
              Staged:
            </span>
            {pendingChanges.slice(0, 4).map((c) => (
              <span
                key={c.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] bg-white/5 border border-white/10 text-[#EAE3D5]"
              >
                <span className="text-[9px] uppercase font-semibold text-[#D99B26]">
                  {c.section}:
                </span>
                <span className="truncate max-w-[140px]">{c.title}</span>
              </span>
            ))}
            {pendingCount > 4 && (
              <span className="text-[11px] text-[#8C7E72] font-mono">
                +{pendingCount - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* 4 Rich Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Metric 1: Sessions */}
        <Link
          href="/admin/events"
          className="bg-white border border-[#E8E1D5] hover:border-[#4F5B2A] p-5 rounded-xl shadow-xs transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-[#7A6E65] font-medium">
              <span className="group-hover:text-[#4F5B2A] transition-colors">Sessions & Calendar</span>
              <Calendar className="w-4 h-4 text-[#4F5B2A]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-[#1C1613]">
                {stats.upcomingEventsCount}
              </span>
              <span className="text-xs text-[#4F5B2A] font-semibold">upcoming</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F3EFE6] text-xs text-[#8C7E72] flex items-center justify-between">
            <span>{stats.totalEvents} Total Sessions</span>
            <span className="font-mono text-[11px] text-[#4F5B2A]">Weekly: {stats.weeklyEventsCount}</span>
          </div>
        </Link>

        {/* Metric 2: Offerings */}
        <Link
          href="/admin/offerings"
          className="bg-white border border-[#E8E1D5] hover:border-[#4F5B2A] p-5 rounded-xl shadow-xs transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-[#7A6E65] font-medium">
              <span className="group-hover:text-[#4F5B2A] transition-colors">Curated Offerings</span>
              <Layers className="w-4 h-4 text-[#B87B1E]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-[#1C1613]">
                {stats.totalOfferings}
              </span>
              <span className="text-xs text-[#B87B1E] font-semibold">artforms</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F3EFE6] text-xs text-[#8C7E72] flex items-center justify-between">
            <span>Root · Create · Restore</span>
            <span className="text-[11px] text-[#1C1613] font-medium">100% Verified</span>
          </div>
        </Link>

        {/* Metric 3: Testimonials */}
        <Link
          href="/admin/testimonials"
          className="bg-white border border-[#E8E1D5] hover:border-[#4F5B2A] p-5 rounded-xl shadow-xs transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-[#7A6E65] font-medium">
              <span className="group-hover:text-[#4F5B2A] transition-colors">Impact & Stories</span>
              <MessageSquareQuote className="w-4 h-4 text-[#4F5B2A]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-[#1C1613]">
                {stats.publishedTestimonials}
              </span>
              <span className="text-xs text-[#4F5B2A] font-semibold">published</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F3EFE6] text-xs text-[#8C7E72] flex items-center justify-between">
            <span>{stats.totalTestimonials} Corporate & Studio</span>
            <span className="text-[11px] text-[#B87B1E] font-medium">5.0 Verified Rating</span>
          </div>
        </Link>

        {/* Metric 4: Governance */}
        <Link
          href="/admin/advisory"
          className="bg-white border border-[#E8E1D5] hover:border-[#4F5B2A] p-5 rounded-xl shadow-xs transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-[#7A6E65] font-medium">
              <span className="group-hover:text-[#4F5B2A] transition-colors">People & Lineage</span>
              <GraduationCap className="w-4 h-4 text-[#4F5B2A]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-[#1C1613]">
                {stats.totalAdvisors}
              </span>
              <span className="text-xs text-[#4F5B2A] font-semibold">advisors</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F3EFE6] text-xs text-[#8C7E72] flex items-center justify-between">
            <span>{stats.totalArtisans} Master Artisans</span>
            <span>{stats.totalMoments} Moments</span>
          </div>
        </Link>
      </div>

      {/* Quick Content Action Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4F5B2A]">
            Quick Content Operations
          </h3>
          <span className="text-[11px] text-[#8C7E72]">Instant access to creative modules</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/admin/events/new"
            className="p-3.5 bg-white border border-[#E8E1D5] rounded-xl text-center hover:border-[#4F5B2A] hover:bg-[#F8F5EE] transition-all group shadow-xs flex flex-col items-center justify-center"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F8F5EE] text-[#4F5B2A] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <Plus className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-[#1C1613]">New Session</div>
            <div className="text-[10px] text-[#8C7E72]">Add live workshop</div>
          </Link>

          <Link
            href="/admin/homepage"
            className="p-3.5 bg-white border border-[#E8E1D5] rounded-xl text-center hover:border-[#4F5B2A] hover:bg-[#F8F5EE] transition-all group shadow-xs flex flex-col items-center justify-center"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F8F5EE] text-[#4F5B2A] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <Home className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-[#1C1613]">Homepage Hero</div>
            <div className="text-[10px] text-[#8C7E72]">Copy & media</div>
          </Link>

          <Link
            href="/admin/offerings"
            className="p-3.5 bg-white border border-[#E8E1D5] rounded-xl text-center hover:border-[#4F5B2A] hover:bg-[#F8F5EE] transition-all group shadow-xs flex flex-col items-center justify-center"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F8F5EE] text-[#B87B1E] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-[#1C1613]">36 Offerings</div>
            <div className="text-[10px] text-[#8C7E72]">Browse curriculum</div>
          </Link>

          <Link
            href="/admin/media"
            className="p-3.5 bg-white border border-[#E8E1D5] rounded-xl text-center hover:border-[#4F5B2A] hover:bg-[#F8F5EE] transition-all group shadow-xs flex flex-col items-center justify-center"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F8F5EE] text-[#4F5B2A] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-[#1C1613]">Media Assets</div>
            <div className="text-[10px] text-[#8C7E72]">Upload & browse</div>
          </Link>

          <Link
            href="/admin/testimonials"
            className="p-3.5 bg-white border border-[#E8E1D5] rounded-xl text-center hover:border-[#4F5B2A] hover:bg-[#F8F5EE] transition-all group shadow-xs flex flex-col items-center justify-center"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F8F5EE] text-[#4F5B2A] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-[#1C1613]">Testimonials</div>
            <div className="text-[10px] text-[#8C7E72]">Client reviews</div>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="p-3.5 bg-white border border-[#E8E1D5] rounded-xl text-center hover:border-[#4F5B2A] hover:bg-[#F8F5EE] transition-all group shadow-xs flex flex-col items-center justify-center"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F8F5EE] text-[#4F5B2A] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <Globe className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-[#1C1613]">Live Site</div>
            <div className="text-[10px] text-[#8C7E72] flex items-center gap-1">
              <span>Preview</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </div>
          </Link>
        </div>
      </div>

      {/* Two Column Layout: Upcoming Sessions Stream & Advisory */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left: Upcoming Sessions Visual Stream */}
        <div className="lg:col-span-7 bg-white border border-[#E8E1D5] rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3.5">
            <div>
              <h3 className="font-display text-lg text-[#1C1613] font-bold">
                Upcoming Masterclasses & Sessions
              </h3>
              <p className="text-xs text-[#7A6E65]">
                Active weekly sessions open for booking on the live website.
              </p>
            </div>
            <Link
              href="/admin/events"
              className="text-xs font-semibold text-[#4F5B2A] hover:underline"
            >
              All Events ({stats.totalEvents}) &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {events.map((evt) => (
              <div
                key={evt.id || evt.slug}
                className="p-3.5 bg-[#FBF9F4] border border-[#E8E1D5] rounded-xl flex items-center justify-between gap-4 hover:border-[#4F5B2A] hover:bg-[#F8F5EE] transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1C1613] truncate">
                      {evt.title}
                    </span>
                    {evt.isWeekly && (
                      <span className="text-[10px] bg-[#EBF3E5] text-[#4F5B2A] font-semibold px-2 py-0.5 rounded-full">
                        Weekly
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#7A6E65] mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#9E9085]" />
                      {evt.date || 'Weekly'}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#9E9085]" />
                      {evt.city || evt.venue}
                    </span>
                    <span>₹{evt.price?.toLocaleString('en-IN') || '2,500'}</span>
                    <span className="inline-flex items-center gap-1">
                      <User className="w-3 h-3 text-[#9E9085]" />
                      {evt.facilitator || 'Master Artisan'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/weekly-events/${evt.slug}`}
                    target="_blank"
                    className="p-1.5 text-xs text-[#7A6E65] hover:text-[#1C1613] rounded hover:bg-[#EAE3D5]"
                    title="View live page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/admin/events/${evt.slug}`}
                    className="px-3 py-1.5 bg-white border border-[#D8CEBE] text-xs font-semibold text-[#1C1613] rounded-lg hover:bg-[#F3EFE6] transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Distinguished Advisory & Artisans */}
        <div className="lg:col-span-5 bg-white border border-[#E8E1D5] rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3.5">
            <div>
              <h3 className="font-display text-lg text-[#1C1613] font-bold">
                Distinguished Advisory
              </h3>
              <p className="text-xs text-[#7A6E65]">
                Academic wellness & master craft governance leads.
              </p>
            </div>
            <Link
              href="/admin/advisory"
              className="text-xs font-semibold text-[#4F5B2A] hover:underline"
            >
              Manage ({advisors.length}) &rarr;
            </Link>
          </div>

          <div className="space-y-2.5">
            {advisors.slice(0, 6).map((adv) => (
              <div
                key={adv.id}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#FBF9F4] transition-colors border border-transparent hover:border-[#E8E1D5]"
              >
                <div className="w-9 h-9 rounded-lg bg-[#EAE3D5] text-[#4F5B2A] border border-[#D8CEBE] flex items-center justify-center font-display text-xs font-bold shrink-0">
                  {adv.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-[#1C1613] truncate">{adv.name}</div>
                  <div className="text-[11px] text-[#7A6E65] truncate">{adv.title}</div>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#4F5B2A]" title="Published & Live" />
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#F3EFE6]">
            <Link
              href="/admin/artisans"
              className="flex items-center justify-between p-3 rounded-xl bg-[#FBF9F4] border border-[#E8E1D5] hover:border-[#4F5B2A] transition-colors text-xs font-medium text-[#1C1613]"
            >
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#4F5B2A]" />
                <span>Manage 3 Master Artisan Stories</span>
              </div>
              <span className="text-[#4F5B2A]">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
