'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Trash2, X } from 'lucide-react'
import { useToast } from '@/components/admin/Toast'
import { usePublish } from '@/components/admin/PublishContext'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import type { ArtisanStoryItem } from '@/lib/cms/contentStore'

export default function AdminArtisansPage() {
  const { success, error } = useToast()
  const { refreshPublishStatus } = usePublish()
  const [artisans, setArtisans] = useState<ArtisanStoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingArtisan, setEditingArtisan] = useState<ArtisanStoryItem | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<ArtisanStoryItem | null>(null)
  const [saving, setSaving] = useState(false)

  const loadArtisans = async () => {
    try {
      const res = await fetch('/api/admin/content?section=artisans')
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        setArtisans(json.data)
      } else {
        error('Failed to load artisan profiles')
      }
    } catch {
      error('Network error loading artisan profiles')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadArtisans()
  }, [])

  const handleAddNew = () => {
    const newArtisan: ArtisanStoryItem = {
      id: `artisan-${Date.now()}`,
      name: '',
      craft: '',
      region: '',
      portraitUrl: '',
      quote: '',
      description: "Behind every session is a master who has spent a lifetime with their material. When you learn from them, you're not just calming your mind. You're helping sustain a living tradition and the person who carries it.",
      impactMetric: '100%',
      impactLabel: 'Every session supports fair wages and dignity of practice for artisan communities.',
      ctaLabel: 'Meet the artisan network',
      ctaUrl: '/artisans',
      order: artisans.length + 1,
      published: true,
    }
    setEditingArtisan(newArtisan)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingArtisan) return

    setSaving(true)
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'artisans',
          action: 'save',
          data: editingArtisan,
        }),
      })

      const json = await res.json()
      if (res.ok && json.success) {
        success('Artisan profile saved to drafts! Press PUSH in top header to deploy live.')
        await refreshPublishStatus()
        setEditingArtisan(null)
        loadArtisans()
      } else {
        error(json.error || 'Failed to save artisan')
      }
    } catch (err: any) {
      error(err.message || 'Error saving artisan')
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
          section: 'artisans',
          action: 'delete',
          id: deleteTarget.id,
        }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        success('Artisan profile removed')
        setArtisans((prev) => prev.filter((a) => a.id !== deleteTarget.id))
      } else {
        error(json.error || 'Failed to delete artisan')
      }
    } catch (err: any) {
      error(err.message || 'Error deleting artisan')
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
            Living Lineage & Masters
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[#2B231F] mt-1">
            Artisan Wisdom & Stories
          </h1>
          <p className="text-xs text-[#6E635B] font-light mt-0.5">
            Manage the master artisan profiles, direct craft quotes, portraits, and community impact indicators.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#4F5B2A] hover:bg-[#3D4721] text-white rounded-md text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Artisan Profile</span>
        </button>
      </div>

      {/* Grid of Artisans */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-6 h-6 border-2 border-[#4F5B2A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#6E635B]">Loading master artisans...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artisans.map((art) => (
            <div
              key={art.id}
              className="bg-white border border-[#D8CEBE] rounded-lg overflow-hidden shadow-xs hover:border-[#4F5B2A] transition-colors flex flex-col justify-between"
            >
              <div className="relative h-56 bg-[#EAE3D5] overflow-hidden">
                {art.portraitUrl ? (
                  <Image
                    src={art.portraitUrl}
                    alt={art.name}
                    fill
                    className="object-cover"
                    sizes="360px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-[#968A80]">
                    No Portrait
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="font-display text-base font-semibold">{art.name}</div>
                  <div className="text-[11px] text-[#E8D9C8]">{art.craft} · {art.region}</div>
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <blockquote className="text-xs italic text-[#2B231F] font-serif leading-relaxed line-clamp-3">
                  {art.quote}
                </blockquote>

                <div className="pt-3 border-t border-[#E8E1D5] flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#968A80]">
                    Order: #{art.order}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingArtisan(art)}
                      className="px-3 py-1.5 text-xs border border-[#D8CEBE] rounded-lg bg-[#FBF9F4] hover:bg-[#F3EFE6] text-[#2B231F] font-semibold cursor-pointer transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(art)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FDF2F0] text-[#8A3B35] border border-[#8A3B35]/40 hover:bg-[#8A3B35] hover:text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingArtisan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FBF9F4] border border-[#D8CEBE] rounded-lg max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
              <h3 className="font-display text-xl text-[#2B231F] font-semibold">
                {editingArtisan.name ? `Edit: ${editingArtisan.name}` : 'Add Master Artisan'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingArtisan(null)}
                className="p-1 text-[#6E635B] hover:text-[#2B231F] rounded-lg hover:bg-[#EAE3D5] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Artisan Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingArtisan.name}
                    onChange={(e) => setEditingArtisan({ ...editingArtisan, name: e.target.value })}
                    placeholder="e.g. Master Craftsman Ramu"
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Craft / Discipline *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingArtisan.craft}
                    onChange={(e) => setEditingArtisan({ ...editingArtisan, craft: e.target.value })}
                    placeholder="e.g. Jaipur Blue Pottery Master"
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Region / Village *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingArtisan.region}
                    onChange={(e) => setEditingArtisan({ ...editingArtisan, region: e.target.value })}
                    placeholder="e.g. Kot Jewar, Rajasthan"
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Artisan Quote *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingArtisan.quote}
                    onChange={(e) => setEditingArtisan({ ...editingArtisan, quote: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded bg-white italic font-serif"
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Supporting Narrative / Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingArtisan.description || ''}
                    onChange={(e) => setEditingArtisan({ ...editingArtisan, description: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Impact Metric
                  </label>
                  <input
                    type="text"
                    value={editingArtisan.impactMetric || '100%'}
                    onChange={(e) => setEditingArtisan({ ...editingArtisan, impactMetric: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded bg-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Impact Label
                  </label>
                  <input
                    type="text"
                    value={editingArtisan.impactLabel || ''}
                    onChange={(e) => setEditingArtisan({ ...editingArtisan, impactLabel: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Master Artisan Portrait"
                value={editingArtisan.portraitUrl}
                onChange={(url) => setEditingArtisan({ ...editingArtisan, portraitUrl: url })}
                onRemove={() => setEditingArtisan({ ...editingArtisan, portraitUrl: '' })}
              />

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#E8E1D5]">
                {artisans.some((x) => x.id === editingArtisan.id) ? (
                  <button
                    type="button"
                    onClick={() => {
                      const art = editingArtisan
                      setEditingArtisan(null)
                      setDeleteTarget(art)
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#FDF2F0] text-[#8A3B35] border border-[#8A3B35]/40 hover:bg-[#8A3B35] hover:text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Artisan</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingArtisan(null)}
                    className="px-4 py-2 border rounded text-xs font-medium bg-white hover:bg-[#F3EFE6] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-[#4F5B2A] hover:bg-[#3D4721] text-white text-xs font-semibold rounded cursor-pointer transition-colors"
                  >
                    {saving ? 'Saving...' : 'Save Profile'}
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
        title="Remove Artisan Profile"
        message={`Are you sure you want to remove the profile for ${deleteTarget?.name}?`}
        confirmText="Remove Artisan"
        isDanger
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
