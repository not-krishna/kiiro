'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Trash2, X, ExternalLink, Camera, Video, Image as ImageIcon } from 'lucide-react'
import { useToast } from '@/components/admin/Toast'
import { usePublish } from '@/components/admin/PublishContext'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import type { StudioMomentItem } from '@/lib/cms/contentStore'

export default function AdminStudioMomentsPage() {
  const { success, error } = useToast()
  const { refreshPublishStatus } = usePublish()
  const [moments, setMoments] = useState<StudioMomentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingMoment, setEditingMoment] = useState<StudioMomentItem | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<StudioMomentItem | null>(null)
  const [saving, setSaving] = useState(false)

  const loadMoments = async () => {
    try {
      const res = await fetch('/api/admin/content?section=studioMoments')
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        setMoments(json.data)
      } else {
        error('Failed to load studio moments')
      }
    } catch {
      error('Network error loading studio moments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMoments()
  }, [])

  const handleAddNew = () => {
    const newMoment: StudioMomentItem = {
      id: `moment-${Date.now()}`,
      handle: '@your_workshops',
      authorName: 'Kiiro Studio',
      type: 'post',
      typeLabel: 'Post',
      url: 'https://www.instagram.com/your_workshops/?hl=en',
      imageSrc: '/images/studio-moments/moment-1.jpg',
      imageAlt: 'Workshop session moment',
      quote: 'Hands busy, mind quiet.',
      caption: '“An unhurried afternoon of making with master artisans.”',
      overlayTag: 'Studio Session',
      contextLine: 'Pottery Studio · Living Craft',
      badgeBg: 'bg-[#4F5B2A]',
      order: moments.length + 1,
      published: true,
    }
    setEditingMoment(newMoment)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingMoment) return

    setSaving(true)
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'studioMoments',
          action: 'save',
          data: editingMoment,
        }),
      })

      const json = await res.json()
      if (res.ok && json.success) {
        success('Studio moment saved to drafts! Press PUSH in top header to deploy live.')
        await refreshPublishStatus()
        setEditingMoment(null)
        loadMoments()
      } else {
        error(json.error || 'Failed to save moment')
      }
    } catch (err: any) {
      error(err.message || 'Error saving moment')
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
          section: 'studioMoments',
          action: 'delete',
          id: deleteTarget.id,
        }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        success('Studio moment removed')
        setMoments((prev) => prev.filter((m) => m.id !== deleteTarget.id))
      } else {
        error(json.error || 'Failed to remove moment')
      }
    } catch (err: any) {
      error(err.message || 'Error deleting moment')
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
            Social & Community
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[#2B231F] mt-1">
            Moments From The Studio
          </h1>
          <p className="text-xs text-[#6E635B] font-light mt-0.5">
            Manage the social imagery, Instagram posts, and reels showcased in the studio moments carousel.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#4F5B2A] hover:bg-[#3D4721] text-white rounded-md text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Studio Moment</span>
        </button>
      </div>

      {/* Grid of Moments */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-6 h-6 border-2 border-[#4F5B2A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#6E635B]">Loading moments...</p>
        </div>
      ) : moments.length === 0 ? (
        <div className="bg-white border border-[#D8CEBE] rounded-lg p-12 text-center space-y-3">
          <Camera className="w-10 h-10 text-[#9E9085] mx-auto" />
          <h3 className="font-display text-lg text-[#2B231F] font-semibold">No studio moments yet</h3>
          <p className="text-xs text-[#6E635B]">Click above to add the first social moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {moments.map((m) => (
            <div
              key={m.id}
              className="bg-white border border-[#D8CEBE] rounded-lg overflow-hidden shadow-xs hover:border-[#4F5B2A] transition-colors flex flex-col justify-between"
            >
              <div className="relative h-48 bg-[#EAE3D5] overflow-hidden">
                {m.imageSrc ? (
                  <Image
                    src={m.imageSrc}
                    alt={m.imageAlt || m.quote}
                    fill
                    className="object-cover"
                    sizes="360px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-[#968A80]">
                    No Image
                  </div>
                )}
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2 py-0.5 bg-black/70 text-white text-[10px] uppercase font-mono font-bold rounded">
                  {m.type === 'reel' ? (
                    <>
                      <Video className="w-3 h-3" />
                      <span>Reel</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-3 h-3" />
                      <span>Post</span>
                    </>
                  )}
                </span>
                <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-white/90 text-[#2B231F] text-[10px] font-semibold rounded">
                  {m.handle}
                </span>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#2B231F] line-clamp-1">{m.quote}</h4>
                  <p className="text-[11px] text-[#6E635B] mt-1 line-clamp-2">{m.caption}</p>
                  <div className="text-[10px] text-[#4F5B2A] font-medium mt-2">
                    {m.overlayTag} · {m.contextLine}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8E1D5] flex items-center justify-between">
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#4F5B2A] hover:underline"
                  >
                    <span>Instagram Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingMoment(m)}
                      className="px-3 py-1.5 text-xs border border-[#D8CEBE] rounded-lg bg-[#FBF9F4] hover:bg-[#F3EFE6] text-[#2B231F] font-semibold cursor-pointer transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(m)}
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

      {/* Edit Modal / Drawer */}
      {editingMoment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FBF9F4] border border-[#D8CEBE] rounded-lg max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
              <h3 className="font-display text-xl text-[#2B231F] font-semibold">
                {editingMoment.id ? 'Edit Studio Moment' : 'Add Studio Moment'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingMoment(null)}
                className="p-1 text-[#6E635B] hover:text-[#2B231F] rounded-lg hover:bg-[#EAE3D5] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMoment.handle}
                    onChange={(e) => setEditingMoment({ ...editingMoment, handle: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Author Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMoment.authorName}
                    onChange={(e) => setEditingMoment({ ...editingMoment, authorName: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Post Type
                  </label>
                  <select
                    value={editingMoment.type}
                    onChange={(e) =>
                      setEditingMoment({
                        ...editingMoment,
                        type: e.target.value as any,
                        typeLabel: e.target.value === 'reel' ? 'Reel' : 'Post',
                      })
                    }
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  >
                    <option value="post">Post (Photo/Carousel)</option>
                    <option value="reel">Reel (Video)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    required
                    value={editingMoment.url}
                    onChange={(e) => setEditingMoment({ ...editingMoment, url: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                  Short Quote / Headline
                </label>
                <input
                  type="text"
                  required
                  value={editingMoment.quote}
                  onChange={(e) => setEditingMoment({ ...editingMoment, quote: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                  Full Caption
                </label>
                <textarea
                  rows={3}
                  value={editingMoment.caption}
                  onChange={(e) => setEditingMoment({ ...editingMoment, caption: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded bg-white"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Overlay Tag
                  </label>
                  <input
                    type="text"
                    value={editingMoment.overlayTag}
                    onChange={(e) => setEditingMoment({ ...editingMoment, overlayTag: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Context Line
                  </label>
                  <input
                    type="text"
                    value={editingMoment.contextLine}
                    onChange={(e) => setEditingMoment({ ...editingMoment, contextLine: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Moment Photo"
                value={editingMoment.imageSrc}
                onChange={(url) => setEditingMoment({ ...editingMoment, imageSrc: url })}
                onRemove={() => setEditingMoment({ ...editingMoment, imageSrc: '' })}
              />

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#E8E1D5]">
                {moments.some((x) => x.id === editingMoment.id) ? (
                  <button
                    type="button"
                    onClick={() => {
                      const m = editingMoment
                      setEditingMoment(null)
                      setDeleteTarget(m)
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#FDF2F0] text-[#8A3B35] border border-[#8A3B35]/40 hover:bg-[#8A3B35] hover:text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Moment</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingMoment(null)}
                    className="px-4 py-2 border rounded text-xs font-medium bg-white hover:bg-[#F3EFE6] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-[#4F5B2A] hover:bg-[#3D4721] text-white text-xs font-semibold rounded cursor-pointer transition-colors"
                  >
                    {saving ? 'Saving...' : 'Save Moment'}
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
        title="Remove Studio Moment"
        message={`Are you sure you want to remove the moment by ${deleteTarget?.handle}?`}
        confirmText="Remove Moment"
        isDanger
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
