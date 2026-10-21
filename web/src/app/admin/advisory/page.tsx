'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Trash2, X } from 'lucide-react'
import { useToast } from '@/components/admin/Toast'
import { usePublish } from '@/components/admin/PublishContext'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import type { AdvisorItem } from '@/lib/cms/contentStore'

export default function AdminAdvisoryPage() {
  const { success, error } = useToast()
  const { refreshPublishStatus } = usePublish()
  const [advisors, setAdvisors] = useState<AdvisorItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingAdvisor, setEditingAdvisor] = useState<AdvisorItem | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<AdvisorItem | null>(null)
  const [saving, setSaving] = useState(false)

  const loadAdvisors = async () => {
    try {
      const res = await fetch('/api/admin/content?section=advisors')
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        setAdvisors(json.data)
      } else {
        error('Failed to load advisors')
      }
    } catch {
      error('Network error loading advisors')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAdvisors()
  }, [])

  const handleAddNew = () => {
    const newAdvisor: AdvisorItem = {
      id: `advisor-${Date.now()}`,
      name: '',
      initials: 'AD',
      title: '',
      affiliation: '',
      specialty: '',
      bio: '',
      portraitUrl: '',
      order: advisors.length + 1,
      published: true,
    }
    setEditingAdvisor(newAdvisor)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingAdvisor) return

    setSaving(true)
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'advisors',
          action: 'save',
          data: editingAdvisor,
        }),
      })

      const json = await res.json()
      if (res.ok && json.success) {
        success('Advisor profile saved to drafts! Press PUSH in top header to deploy live.')
        await refreshPublishStatus()
        setEditingAdvisor(null)
        loadAdvisors()
      } else {
        error(json.error || 'Failed to save advisor')
      }
    } catch (err: any) {
      error(err.message || 'Error saving advisor')
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
          section: 'advisors',
          action: 'delete',
          id: deleteTarget.id,
        }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        success('Advisor profile removed')
        setAdvisors((prev) => prev.filter((a) => a.id !== deleteTarget.id))
      } else {
        error(json.error || 'Failed to delete advisor')
      }
    } catch (err: any) {
      error(err.message || 'Error deleting advisor')
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
            Governance & Mentorship
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[#2B231F] mt-1">
            Distinguished Advisory Board
          </h1>
          <p className="text-xs text-[#6E635B] font-light mt-0.5">
            Guiding Kiiro’s creative wellness methodology across expressive art therapies, psychology, clinical care, and living crafts.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#4F5B2A] hover:bg-[#3D4721] text-white rounded-md text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Advisor</span>
        </button>
      </div>

      {/* Grid of Advisors */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-6 h-6 border-2 border-[#4F5B2A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#6E635B]">Loading advisory profiles...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advisors.map((adv) => (
            <div
              key={adv.id}
              className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs hover:border-[#4F5B2A] transition-colors flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-none bg-[#EAE3D5] text-[#4F5B2A] border border-[#D8CEBE] flex items-center justify-center font-display text-base font-semibold shrink-0 relative overflow-hidden">
                    {adv.portraitUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={adv.portraitUrl} alt={adv.name} className="w-full h-full object-cover" />
                    ) : (
                      adv.initials
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold text-[#2B231F] truncate">
                      {adv.name}
                    </h3>
                    <p className="text-[11px] font-medium text-[#4F5B2A] uppercase tracking-wider truncate">
                      {adv.title}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E8E1D5] space-y-1 text-xs">
                  <div className="font-medium text-[#2B231F]">{adv.affiliation}</div>
                  {adv.specialty && (
                    <div className="text-[11px] text-[#6E635B] font-light">{adv.specialty}</div>
                  )}
                  {adv.bio && (
                    <p className="text-[11px] text-[#8C7E72] line-clamp-2 mt-1">{adv.bio}</p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8E1D5] flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#968A80]">
                  Order: #{adv.order}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingAdvisor(adv)}
                    className="px-3 py-1.5 text-xs border border-[#D8CEBE] rounded-lg bg-[#FBF9F4] hover:bg-[#F3EFE6] text-[#2B231F] font-semibold cursor-pointer transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(adv)}
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
      {editingAdvisor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FBF9F4] border border-[#D8CEBE] rounded-lg max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
              <h3 className="font-display text-xl text-[#2B231F] font-semibold">
                {editingAdvisor.name ? `Edit: ${editingAdvisor.name}` : 'Add Distinguished Advisor'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingAdvisor(null)}
                className="p-1 text-[#6E635B] hover:text-[#2B231F] rounded-lg hover:bg-[#EAE3D5] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid md:grid-cols-3 gap-3">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Full Name & Honorific *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAdvisor.name}
                    onChange={(e) => setEditingAdvisor({ ...editingAdvisor, name: e.target.value })}
                    placeholder="e.g. Dr. Tapanendu Kundu"
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Initials (2 letters)
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={editingAdvisor.initials}
                    onChange={(e) =>
                      setEditingAdvisor({ ...editingAdvisor, initials: e.target.value.toUpperCase() })
                    }
                    placeholder="TK"
                    className="w-full text-xs px-3 py-2 border rounded bg-white font-mono"
                  />
                </div>

                <div className="md:col-span-3 space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Professional Title / Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAdvisor.title}
                    onChange={(e) => setEditingAdvisor({ ...editingAdvisor, title: e.target.value })}
                    placeholder="e.g. Chief Adviser Students Care, BITS Pilani Goa Campus"
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>

                <div className="md:col-span-3 space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Affiliation & Institutions *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAdvisor.affiliation}
                    onChange={(e) =>
                      setEditingAdvisor({ ...editingAdvisor, affiliation: e.target.value })
                    }
                    placeholder="e.g. Ex. Dean of Students Affairs, IIT Bombay"
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>

                <div className="md:col-span-3 space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Clinical / Expressive Specialty
                  </label>
                  <input
                    type="text"
                    value={editingAdvisor.specialty || ''}
                    onChange={(e) =>
                      setEditingAdvisor({ ...editingAdvisor, specialty: e.target.value })
                    }
                    placeholder="e.g. Expressive Art Specialist"
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>

                <div className="md:col-span-3 space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Biography / Background
                  </label>
                  <textarea
                    rows={3}
                    value={editingAdvisor.bio || ''}
                    onChange={(e) => setEditingAdvisor({ ...editingAdvisor, bio: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingAdvisor.order}
                    onChange={(e) =>
                      setEditingAdvisor({ ...editingAdvisor, order: Number(e.target.value) })
                    }
                    className="w-full text-xs px-3 py-2 border rounded bg-white"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Portrait (Optional)"
                value={editingAdvisor.portraitUrl}
                onChange={(url) => setEditingAdvisor({ ...editingAdvisor, portraitUrl: url })}
                onRemove={() => setEditingAdvisor({ ...editingAdvisor, portraitUrl: '' })}
              />

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#E8E1D5]">
                {advisors.some((x) => x.id === editingAdvisor.id) ? (
                  <button
                    type="button"
                    onClick={() => {
                      const adv = editingAdvisor
                      setEditingAdvisor(null)
                      setDeleteTarget(adv)
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#FDF2F0] text-[#8A3B35] border border-[#8A3B35]/40 hover:bg-[#8A3B35] hover:text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Advisor</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingAdvisor(null)}
                    className="px-4 py-2 border rounded text-xs font-medium bg-white hover:bg-[#F3EFE6] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-[#4F5B2A] hover:bg-[#3D4721] text-white text-xs font-semibold rounded cursor-pointer transition-colors"
                  >
                    {saving ? 'Saving...' : 'Save Advisor Profile'}
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
        title="Remove Advisor Profile"
        message={`Are you sure you want to remove ${deleteTarget?.name} from the Distinguished Advisory board?`}
        confirmText="Remove Advisor"
        isDanger
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
