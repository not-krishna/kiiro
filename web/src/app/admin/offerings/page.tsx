'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Plus,
  Trash2,
  ExternalLink,
  LayoutGrid,
  List,
  MapPin,
  Sparkles,
  Layers,
} from 'lucide-react'
import { useToast } from '@/components/admin/Toast'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import type { OfferingItem } from '@/content/offeringsData'

export default function AdminOfferingsPage() {
  const { success, error } = useToast()
  const [offerings, setOfferings] = useState<OfferingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'traditional' | 'contemporary' | 'wellness'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [deleteTarget, setDeleteTarget] = useState<OfferingItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const loadOfferings = async () => {
    try {
      const res = await fetch('/api/admin/content?section=offerings')
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        setOfferings(json.data)
      } else {
        error('Failed to load offerings')
      }
    } catch {
      error('Network error loading offerings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOfferings()
  }, [])

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'offerings',
          action: 'delete',
          id: deleteTarget.slug,
        }),
      })

      const json = await res.json()
      if (res.ok && json.success) {
        success(`Offering "${deleteTarget.title}" deleted from drafts. Push to live to update.`)
        setOfferings((prev) => prev.filter((o) => o.slug !== deleteTarget.slug))
        setDeleteTarget(null)
      } else {
        error(json.error || 'Failed to delete offering')
      }
    } catch (err: any) {
      error(err.message || 'Error deleting offering')
    } finally {
      setIsDeleting(false)
    }
  }

  const filtered = useMemo(() => {
    return offerings.filter((o) => {
      const matchesCategory = categoryFilter === 'all' || o.category === categoryFilter
      const matchesSearch =
        search === '' ||
        o.title.toLowerCase().includes(search.toLowerCase()) ||
        o.slug.toLowerCase().includes(search.toLowerCase()) ||
        (o.origin || '').toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [offerings, categoryFilter, search])

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D5] pb-5">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4F5B2A]">
            Curated Repertoire
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[#1C1613] mt-1">
            Art Forms & Offerings ({offerings.length} Practices)
          </h1>
          <p className="text-xs text-[#7A6E65] mt-1">
            Full editorial specifications across Traditional Art, Contemporary Art, and Restorative Practice.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/experiences"
            target="_blank"
            className="px-3.5 py-2 border border-[#D8CEBE] rounded-xl text-xs font-semibold text-[#1C1613] bg-white hover:bg-[#F3EFE6] transition-colors inline-flex items-center gap-1.5"
          >
            <span>Preview Catalog</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/admin/offerings/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#4F5B2A] hover:bg-[#3D4721] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Offering</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#E8E1D5] p-3 rounded-xl shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'all', label: `All (${offerings.length})` },
            { id: 'traditional', label: 'Traditional' },
            { id: 'contemporary', label: 'Contemporary' },
            { id: 'wellness', label: 'Restorative' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoryFilter(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                categoryFilter === cat.id
                  ? 'bg-[#4F5B2A] text-white font-semibold'
                  : 'text-[#7A6E65] hover:bg-[#F3EFE6] hover:text-[#1C1613]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
          <div className="w-full sm:w-56">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, origin..."
              className="w-full px-3 py-1.5 text-xs border border-[#D8CEBE] rounded-lg bg-[#FBF9F4] text-[#1C1613] focus:border-[#4F5B2A] focus:outline-hidden"
            />
          </div>

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

      {/* Offerings Presentation */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-6 h-6 border-2 border-[#4F5B2A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#7A6E65]">Loading offerings catalogue...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-[#E8E1D5] rounded-xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#EBF3E5] text-[#4F5B2A] flex items-center justify-center mx-auto mb-2">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="font-display text-base font-bold text-[#1C1613]">No offerings match your search</h3>
          <p className="text-xs text-[#7A6E65] mt-1 max-w-sm mx-auto">
            Try another keyword or click below to create a new offering practice.
          </p>
          <Link
            href="/admin/offerings/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#4F5B2A] hover:bg-[#3D4721] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors mt-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Offering</span>
          </Link>
        </div>
      ) : viewMode === 'grid' ? (
        /* Visual Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, idx) => {
            const imageSrc = item.imageUrl || '/images/hero/hero-1.png'
            return (
              <div
                key={item.slug}
                className="bg-white border border-[#E8E1D5] hover:border-[#4F5B2A] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative aspect-16/10 bg-[#F3EFE6] overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF3E5] text-[#4F5B2A] shadow-xs">
                      {item.pillar}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-[#1C1613] shadow-xs capitalize">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs font-mono">
                    <span>#{idx + 1}</span>
                    <span>{item.workshopDuration || '3 Hours'}</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-display text-base font-bold text-[#1C1613] line-clamp-1 group-hover:text-[#4F5B2A] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#7A6E65] line-clamp-2 mt-1">
                      {item.definition}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#F3EFE6] text-xs">
                    <div className="flex items-center justify-between text-[11px] text-[#7A6E65]">
                      <span className="truncate max-w-[180px] inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#4F5B2A] shrink-0" />
                        <span>{item.origin || 'India'}</span>
                      </span>
                      <span className="font-mono text-[#4F5B2A] font-semibold">{item.keyProcess?.length || 4} steps</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-[#8C7E72] font-mono">/{item.slug}</span>
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/experiences/${item.slug}`}
                          target="_blank"
                          className="p-1.5 text-[#7A6E65] hover:text-[#1C1613] rounded hover:bg-[#F3EFE6] transition-colors"
                          title="Preview live"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/admin/offerings/${item.slug}`}
                          className="px-2.5 py-1 bg-[#FBF9F4] hover:bg-[#4F5B2A] hover:text-white border border-[#D8CEBE] rounded-md font-semibold text-xs transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md border border-[#8A3B35]/40 bg-[#FDF2F0] text-[#8A3B35] hover:bg-[#8A3B35] hover:text-white transition-all cursor-pointer shadow-2xs"
                          title="Delete offering"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
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
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Offering Title</th>
                  <th className="py-3 px-4">Category & Pillar</th>
                  <th className="py-3 px-4">Origin</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E1D5]">
                {filtered.map((item, idx) => (
                  <tr key={item.slug} className="hover:bg-[#FBF9F4] transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-[#8C7E72]">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#1C1613]">{item.title}</div>
                      <div className="font-mono text-[11px] text-[#4F5B2A]">/{item.slug}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-[#F3EFE6] text-[#4F5B2A]">
                        {item.pillar} · {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 truncate max-w-xs">{item.origin}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{item.workshopDuration || '3 Hours'}</td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/experiences/${item.slug}`}
                          target="_blank"
                          className="p-1.5 text-[#7A6E65] hover:text-[#1C1613] rounded hover:bg-[#F3EFE6] transition-colors"
                          title="Preview Live"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/admin/offerings/${item.slug}`}
                          className="px-2.5 py-1 bg-white border border-[#D8CEBE] rounded hover:bg-[#F3EFE6] font-medium transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded border border-[#8A3B35]/40 bg-[#FDF2F0] text-[#8A3B35] hover:bg-[#8A3B35] hover:text-white transition-colors cursor-pointer"
                          title="Delete offering"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Offering"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This change will be staged in your pending changes until published.`}
        confirmText={isDeleting ? 'Deleting...' : 'Delete Offering'}
        isDanger={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
