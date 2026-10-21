'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Trash2, LayoutGrid, List, ExternalLink, Plus } from 'lucide-react'
import { useToast } from '@/components/admin/Toast'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import type { EventItem } from '@/content/types'

export default function AdminEventsPage() {
  const { success, error } = useToast()
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'weekly'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [deleteTarget, setDeleteTarget] = useState<EventItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const loadEvents = async () => {
    try {
      const res = await fetch('/api/admin/content?section=events')
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        setEvents(json.data)
      } else {
        error('Failed to load events')
      }
    } catch {
      error('Network error loading events')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'events',
          action: 'delete',
          id: deleteTarget.id || deleteTarget.slug,
        }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        success(`Event "${deleteTarget.title}" deleted from draft store`)
        setEvents((prev) => prev.filter((e) => e.id !== deleteTarget.id && e.slug !== deleteTarget.slug))
      } else {
        error(json.error || 'Failed to delete event')
      }
    } catch (err: any) {
      error(err.message || 'Error deleting event')
    } finally {
      setIsDeleting(false)
      setDeleteTarget(null)
    }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch =
        search === '' ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.city?.toLowerCase().includes(search.toLowerCase()) ||
        e.venue?.toLowerCase().includes(search.toLowerCase())

      if (!matchesSearch) return false

      const eventDate = e.date ? new Date(e.date) : null
      if (filter === 'upcoming') {
        return eventDate ? eventDate >= today : true
      }
      if (filter === 'past') {
        return eventDate ? eventDate < today : false
      }
      if (filter === 'weekly') {
        return Boolean(e.isWeekly)
      }
      return true
    })
  }, [events, search, filter])

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D5] pb-5">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4F5B2A]">
            Schedule & Workshops
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[#1C1613] mt-1">
            Events & Weekly Sessions
          </h1>
          <p className="text-xs text-[#7A6E65] mt-1">
            Total {events.length} sessions recorded · Scheduled across Mumbai, Bangalore, Goa, and Jaipur.
          </p>
        </div>

        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#4F5B2A] hover:bg-[#3D4721] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Session</span>
        </Link>
      </div>

      {/* Controls Bar: Filters, Search & Grid/List View Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#E8E1D5] p-3 rounded-xl shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'all', label: `All (${events.length})` },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'past', label: 'Past' },
            { id: 'weekly', label: 'Weekly' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filter === tab.id
                  ? 'bg-[#4F5B2A] text-white font-semibold'
                  : 'text-[#7A6E65] hover:bg-[#F3EFE6] hover:text-[#1C1613]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
          <div className="w-full sm:w-56">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, city..."
              className="w-full px-3 py-1.5 text-xs border border-[#D8CEBE] rounded-lg bg-[#FBF9F4] text-[#1C1613] focus:border-[#4F5B2A] focus:outline-hidden"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center border border-[#D8CEBE] rounded-lg overflow-hidden shrink-0 bg-[#FBF9F4] self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#4F5B2A] text-white font-bold' : 'text-[#7A6E65] hover:text-[#1C1613]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'table' ? 'bg-[#4F5B2A] text-white font-bold' : 'text-[#7A6E65] hover:text-[#1C1613]'
              }`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Events Presentation */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-6 h-6 border-2 border-[#4F5B2A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#7A6E65]">Loading sessions...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white border border-[#E8E1D5] rounded-xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#EBF3E5] text-[#4F5B2A] flex items-center justify-center mx-auto mb-2">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-display text-lg text-[#1C1613] font-bold">No sessions found</h3>
          <p className="text-xs text-[#7A6E65] max-w-sm mx-auto">
            {search
              ? `No sessions match "${search}". Try clearing your search filter.`
              : 'There are no sessions in this category yet. Click below to add one.'}
          </p>
          <Link
            href="/admin/events/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#4F5B2A] hover:bg-[#3D4721] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Session</span>
          </Link>
        </div>
      ) : viewMode === 'grid' ? (
        /* Visual Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map((evt) => {
            const isPast = evt.date ? new Date(evt.date) < today : false
            const imageSrc = (evt as any).heroImageUrl || evt.media?.[0]?.source || '/images/hero/hero-1.png'

            return (
              <div
                key={evt.id || evt.slug}
                className="bg-white border border-[#E8E1D5] hover:border-[#4F5B2A] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative aspect-16/9 bg-[#F3EFE6] overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={evt.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {evt.isWeekly && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF3E5] text-[#4F5B2A] shadow-xs">
                        Weekly
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
                        isPast ? 'bg-black/60 text-white' : 'bg-white/90 text-[#1C1613]'
                      }`}
                    >
                      {evt.city || 'Bangalore'}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
                    <span className="font-medium inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-white/90" />
                      <span>{evt.date || 'Weekly recurring'}</span>
                    </span>
                    <span className="font-bold">₹{evt.price?.toLocaleString('en-IN') || '2,500'}</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-display text-base font-bold text-[#1C1613] line-clamp-1 group-hover:text-[#4F5B2A] transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-[#7A6E65] line-clamp-2 mt-1">
                      {evt.shortDescription || evt.experienceType || 'Living craft masterclass session.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F3EFE6] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#8C7E72] truncate max-w-[140px] inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#4F5B2A] shrink-0" />
                      <span>{evt.venue || 'Studio Space'}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/weekly-events/${evt.slug}`}
                        target="_blank"
                        className="p-1.5 text-[#7A6E65] hover:text-[#1C1613] rounded hover:bg-[#F3EFE6] transition-colors"
                        title="View Live Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/events/${evt.slug}`}
                        className="px-3 py-1 bg-[#FBF9F4] hover:bg-[#4F5B2A] hover:text-white border border-[#D8CEBE] rounded-md font-semibold text-xs transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(evt)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md border border-[#8A3B35]/40 bg-[#FDF2F0] text-[#8A3B35] hover:bg-[#8A3B35] hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8A3B35]/40 shadow-2xs"
                        title="Delete session"
                      >
                        <Trash2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white border border-[#E8E1D5] rounded-xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs min-w-[640px]">
              <thead>
                <tr className="border-b border-[#E8E1D5] bg-[#FBF9F4] text-[11px] uppercase tracking-wider text-[#7A6E65] font-semibold">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Title & Session</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E1D5]">
                {filteredEvents.map((evt) => {
                  const isPast = evt.date ? new Date(evt.date) < today : false
                  return (
                    <tr key={evt.id || evt.slug} className="hover:bg-[#FBF9F4] transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap font-mono text-xs font-semibold text-[#1C1613]">
                        {evt.date || 'Weekly'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#1C1613]">{evt.title}</div>
                        <div className="text-[11px] text-[#7A6E65] truncate max-w-xs">{evt.venue}</div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">{evt.city || 'Bangalore'}</td>
                      <td className="py-3 px-4 whitespace-nowrap font-semibold">
                        ₹{evt.price?.toLocaleString('en-IN') || '2,500'}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            isPast ? 'bg-[#F3EFE6] text-[#7A6E65]' : 'bg-[#EBF3E5] text-[#4F5B2A]'
                          }`}
                        >
                          {isPast ? 'Past' : 'Upcoming'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/weekly-events/${evt.slug}`}
                            target="_blank"
                            className="p-1.5 text-[#7A6E65] hover:text-[#1C1613] rounded hover:bg-[#F3EFE6] transition-colors"
                            title="Preview Live"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/admin/events/${evt.slug}`}
                            className="px-2.5 py-1 bg-white border border-[#D8CEBE] rounded hover:bg-[#F3EFE6] font-medium transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(evt)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded border border-[#8A3B35]/40 bg-[#FDF2F0] text-[#8A3B35] hover:bg-[#8A3B35] hover:text-white transition-colors cursor-pointer"
                            title="Delete session"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Session"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This change will be staged in your pending changes until pushed.`}
        confirmText={isDeleting ? 'Deleting...' : 'Delete Session'}
        isDanger={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
