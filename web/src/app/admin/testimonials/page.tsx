'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Trash2, X } from 'lucide-react'
import { useToast } from '@/components/admin/Toast'
import { usePublish } from '@/components/admin/PublishContext'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import type { TestimonialItem } from '@/lib/cms/contentStore'

export default function AdminTestimonialsPage() {
  const { success, error } = useToast()
  const { refreshPublishStatus } = usePublish()
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<TestimonialItem | null>(null)
  const [saving, setSaving] = useState(false)

  const loadTestimonials = async () => {
    try {
      const res = await fetch('/api/admin/content?section=testimonials')
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        setTestimonials(json.data)
      } else {
        error('Failed to load testimonials')
      }
    } catch {
      error('Network error loading testimonials')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTestimonials()
  }, [])

  const handleAddNew = () => {
    const newItem: TestimonialItem = {
      id: `test-${Date.now()}`,
      personName: '',
      role: '',
      organisation: '',
      pullQuote: '',
      quote: '',
      portrait: '',
      rating: 5,
      order: testimonials.length + 1,
      featured: false,
      published: true,
    }
    setEditingItem(newItem)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingItem) return

    setSaving(true)
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'testimonials',
          action: 'save',
          data: editingItem,
        }),
      })

      const json = await res.json()
      if (res.ok && json.success) {
        success('Testimonial saved to drafts! Press PUSH in top header to deploy live.')
        await refreshPublishStatus()
        setEditingItem(null)
        loadTestimonials()
      } else {
        error(json.error || 'Failed to save testimonial')
      }
    } catch (err: any) {
      error(err.message || 'Error saving testimonial')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'testimonials',
          action: 'delete',
          id: deleteTarget.id,
        }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        success('Testimonial removed')
        setTestimonials((prev) => prev.filter((t) => t.id !== deleteTarget.id))
      } else {
        error(json.error || 'Failed to delete testimonial')
      }
    } catch (err: any) {
      error(err.message || 'Error deleting testimonial')
    } finally {
      setDeleteTarget(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D5] pb-5">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4F5B2A]">
            Social Proof & Words
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[#2B231F] mt-1">
            Testimonials & Partner Reviews
          </h1>
          <p className="text-xs text-[#6E635B] font-light mt-0.5">
            Manage feedback from institutional clients, corporate leaders, resort managers, and workshop participants.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#4F5B2A] hover:bg-[#3D4721] text-white rounded-md text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials List */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-6 h-6 border-2 border-[#4F5B2A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#6E635B]">Loading testimonials...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs hover:border-[#4F5B2A] transition-colors flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-none border border-[#D8CEBE] bg-[#EAE3D5] overflow-hidden shrink-0">
                    {t.portrait ? (
                      <Image
                        src={t.portrait}
                        alt={t.personName}
                        fill
                        className="object-cover"
                        sizes="44px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-display text-xs text-[#4F5B2A]">
                        {t.personName ? t.personName[0] : 'K'}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-sm font-semibold text-[#2B231F] truncate">
                      {t.personName}
                    </h3>
                    <p className="text-[11px] text-[#4F5B2A] font-medium truncate">
                      {t.role}
                      {t.organisation && ` · ${t.organisation}`}
                    </p>
                  </div>
                </div>

                {t.pullQuote && (
                  <div className="text-xs font-semibold text-[#2B231F] border-l-2 border-[#D99B26] pl-2.5 py-0.5">
                    “{t.pullQuote}”
                  </div>
                )}

                <p className="text-xs text-[#6E635B] font-light leading-relaxed line-clamp-4">
                  {t.quote}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E1D5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${t.published ? 'bg-[#4F5B2A]' : 'bg-[#D8CEBE]'}`}
                    title={t.published ? 'Published' : 'Draft'}
                  />
                  <span className="text-[10px] uppercase font-mono text-[#968A80]">
                    {t.published ? 'Published' : 'Draft'}
                  </span>
                  {t.featured && (
                    <span className="text-[9px] uppercase font-bold text-[#D99B26] bg-[#FFF6E5] px-1.5 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingItem(t)}
                    className="px-3 py-1.5 text-xs border border-[#D8CEBE] rounded-lg bg-[#FBF9F4] hover:bg-[#F3EFE6] text-[#2B231F] font-semibold cursor-pointer transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(t)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FDF2F0] text-[#8A3B35] border border-[#8A3B35]/40 hover:bg-[#8A3B35] hover:text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FBF9F4] border border-[#D8CEBE] rounded-lg max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
              <h3 className="font-display text-xl text-[#2B231F] font-semibold">
                {editingItem.personName ? `Edit: ${editingItem.personName}` : 'Add Testimonial'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1 text-[#6E635B] hover:text-[#2B231F] rounded-lg hover:bg-[#EAE3D5] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.personName}
                    onChange={(e) => setEditingItem({ ...editingItem, personName: e.target.value })}
                    placeholder="e.g. Dr. Soumitra Das"
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={editingItem.role || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    placeholder="e.g. Dean Student Welfare"
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Organisation / Company
                  </label>
                  <input
                    type="text"
                    value={editingItem.organisation || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, organisation: e.target.value })}
                    placeholder="e.g. NIT Goa, SoHo House"
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Short Bold Pull-Quote (Headline)
                  </label>
                  <input
                    type="text"
                    value={editingItem.pullQuote || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, pullQuote: e.target.value })}
                    placeholder="Tactile grounding and an inclusive, memorable icebreaker."
                    className="w-full text-xs px-3 py-2 border rounded bg-white font-semibold"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Full Testimonial Quote *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={editingItem.quote}
                    onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#2B231F]">
                  <input
                    type="checkbox"
                    checked={editingItem.published}
                    onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                    className="rounded text-[#4F5B2A]"
                  />
                  <span>Published on Website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#2B231F]">
                  <input
                    type="checkbox"
                    checked={editingItem.featured}
                    onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                    className="rounded text-[#4F5B2A]"
                  />
                  <span>Featured Testimonial</span>
                </label>
              </div>

              <ImageUploadField
                label="Profile Avatar / Portrait"
                value={editingItem.portrait}
                onChange={(url) => setEditingItem({ ...editingItem, portrait: url })}
                onRemove={() => setEditingItem({ ...editingItem, portrait: '' })}
              />

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#E8E1D5]">
                {testimonials.some((x) => x.id === editingItem.id) ? (
                  <button
                    type="button"
                    onClick={() => {
                      const item = editingItem
                      setEditingItem(null)
                      setDeleteTarget(item)
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#FDF2F0] text-[#8A3B35] border border-[#8A3B35]/40 hover:bg-[#8A3B35] hover:text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Testimonial</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 border rounded text-xs font-medium bg-white hover:bg-[#F3EFE6] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-[#4F5B2A] hover:bg-[#3D4721] text-white text-xs font-semibold rounded cursor-pointer transition-colors"
                  >
                    {saving ? 'Saving...' : 'Save Testimonial'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Remove Testimonial"
        message={`Are you sure you want to remove the testimonial from ${deleteTarget?.personName}?`}
        confirmText="Remove Testimonial"
        isDanger
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
