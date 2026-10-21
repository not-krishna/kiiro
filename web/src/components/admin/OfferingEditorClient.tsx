'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Save,
  Trash2,
  Copy,
  ExternalLink,
  Plus,
  X,
  ArrowLeft,
  Sparkles,
} from 'lucide-react'
import { useToast } from './Toast'
import { usePublish } from './PublishContext'
import { ImageUploadField } from './ImageUploadField'
import { ConfirmModal } from './ConfirmModal'
import type { OfferingItem } from '@/content/offeringsData'

interface OfferingEditorClientProps {
  initialOffering: OfferingItem
  isNew?: boolean
}

export function OfferingEditorClient({
  initialOffering,
  isNew = false,
}: OfferingEditorClientProps) {
  const router = useRouter()
  const { success, error } = useToast()
  const { refreshPublishStatus } = usePublish()
  const [saving, setSaving] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [data, setData] = useState<OfferingItem>(initialOffering)

  const handleTitleChange = (val: string) => {
    const updates: Partial<OfferingItem> = { title: val }
    if (isNew && (!data.slug || data.slug === '')) {
      updates.slug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    }
    setData((prev) => ({ ...prev, ...updates }))
  }

  const handleStepChange = (index: number, value: string) => {
    const updated = [...(data.keyProcess || [])]
    updated[index] = value
    setData({ ...data, keyProcess: updated })
  }

  const handleAddStep = () => {
    setData({
      ...data,
      keyProcess: [...(data.keyProcess || []), 'New craft process step...'],
    })
  }

  const handleRemoveStep = (index: number) => {
    if ((data.keyProcess?.length || 0) <= 1) return
    const updated = data.keyProcess.filter((_, i) => i !== index)
    setData({ ...data, keyProcess: updated })
  }

  const handleDuplicate = () => {
    const copySlug = `${data.slug}-copy-${Date.now().toString().slice(-4)}`
    setData({
      ...data,
      slug: copySlug,
      title: `${data.title} (Copy)`,
    })
    success(`Duplicated as "${data.title} (Copy)". Edit details and click Save to create.`)
  }

  const handleDelete = async () => {
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'offerings',
          action: 'delete',
          id: data.slug,
        }),
      })

      const json = await res.json()
      if (res.ok && json.success) {
        success(`Offering "${data.title}" deleted from drafts. Push to live to update.`)
        await refreshPublishStatus()
        setDeleteModalOpen(false)
        router.push('/admin/offerings')
        router.refresh()
      } else {
        error(json.error || 'Failed to delete offering')
      }
    } catch (err: any) {
      error(err.message || 'Error deleting offering')
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!data.title?.trim()) {
      error('Please enter an offering title')
      return
    }

    if (!data.slug?.trim()) {
      error('Please enter a valid URL slug')
      return
    }

    setSaving(true)

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'offerings',
          action: 'save',
          data,
        }),
      })

      const json = await res.json()
      if (res.ok && json.success) {
        success(`Offering "${data.title}" saved to drafts! Press PUSH in top header to deploy live.`)
        await refreshPublishStatus()
        if (isNew) {
          router.push(`/admin/offerings/${data.slug}`)
        }
        router.refresh()
      } else {
        error(json.error || 'Failed to save offering')
      }
    } catch (err: any) {
      error(err.message || 'Error saving offering')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D5] pb-4">
        <div>
          <Link
            href="/admin/offerings"
            className="inline-flex items-center gap-1.5 text-xs text-[#6E635B] hover:text-[#4F5B2A] font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Offerings</span>
          </Link>
          <div className="flex items-center gap-3 mt-1.5">
            <h1 className="font-display text-2xl font-semibold text-[#2B231F]">
              {isNew ? (data.title ? `New: ${data.title}` : 'Add New Offering') : data.title}
            </h1>
            {data.slug && (
              <span className="text-xs font-mono bg-[#EAE3D5] text-[#4F5B2A] font-bold px-2 py-0.5 rounded">
                /{data.slug}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {!isNew && (
            <>
              <Link
                href={`/artforms/${data.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#D8CEBE] bg-white text-xs font-medium text-[#2B231F] rounded-md hover:bg-[#F3EFE6] transition-colors"
                title="View on Live Site"
              >
                <span>Live View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={handleDuplicate}
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#D8CEBE] bg-white text-xs font-medium text-[#2B231F] rounded-md hover:bg-[#F3EFE6] transition-colors cursor-pointer"
                title="Duplicate this offering into a new draft"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Duplicate</span>
              </button>

              <button
                type="button"
                onClick={() => setDeleteModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#8A3B35]/40 bg-[#FDF2F0] text-xs font-semibold text-[#8A3B35] rounded-md hover:bg-[#8A3B35] hover:text-white transition-all cursor-pointer"
                title="Delete this offering"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </>
          )}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 bg-[#4F5B2A] hover:bg-[#3D4721] text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : isNew ? 'Create Offering Draft' : 'Save Offering Draft'}</span>
          </button>
        </div>
      </div>

      {/* 1. Identity & Classification */}
      <div className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs space-y-4">
        <h2 className="font-display text-base font-semibold text-[#2B231F] border-b border-[#E8E1D5] pb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#4F5B2A]" />
          <span>Classification & Identity</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Offering Title *
            </label>
            <input
              type="text"
              required
              value={data.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Traditional Blue Pottery & Glazing"
              className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Slug (URL Identifier) *
            </label>
            <input
              type="text"
              required
              value={data.slug}
              onChange={(e) => setData({ ...data, slug: e.target.value })}
              placeholder="blue-pottery-glazing"
              className="w-full text-xs font-mono px-3 py-2 border rounded bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Category
            </label>
            <select
              value={data.category}
              onChange={(e) => setData({ ...data, category: e.target.value as any })}
              className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4] text-[#2B231F]"
            >
              <option value="traditional">Traditional Art</option>
              <option value="contemporary">Contemporary Art</option>
              <option value="wellness">Wellness Practice</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Pillar Arc
            </label>
            <select
              value={data.pillar}
              onChange={(e) => setData({ ...data, pillar: e.target.value as any })}
              className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4] text-[#2B231F]"
            >
              <option value="Root">Root</option>
              <option value="Create">Create</option>
              <option value="Restore">Restore</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Geographic Origin
            </label>
            <input
              type="text"
              value={data.origin || ''}
              onChange={(e) => setData({ ...data, origin: e.target.value })}
              placeholder="e.g. Jaipur, Rajasthan"
              className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>
        </div>
      </div>

      {/* 2. Editorial Specifications */}
      <div className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs space-y-6">
        <h2 className="font-display text-base font-semibold text-[#2B231F] border-b border-[#E8E1D5] pb-2">
          Editorial Specifications & Narrative
        </h2>

        {/* 1. Definition */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
            1. Definition & Overview
          </label>
          <textarea
            rows={3}
            required
            value={data.definition}
            onChange={(e) => setData({ ...data, definition: e.target.value })}
            placeholder="A centuries-old craft of ceramic artistry..."
            className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4] leading-relaxed text-[#2B231F]"
          />
        </div>

        {/* 2. Age / Lineage */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
            2. Lineage / Heritage Age
          </label>
          <input
            type="text"
            required
            value={data.age}
            onChange={(e) => setData({ ...data, age: e.target.value })}
            placeholder="e.g. 14th century Turko-Persian lineage"
            className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4] text-[#2B231F]"
          />
        </div>

        {/* 3. Cultural & Contemporary Impact */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
            3. Cultural & Contemporary Impact
          </label>
          <textarea
            rows={3}
            required
            value={data.impact}
            onChange={(e) => setData({ ...data, impact: e.target.value })}
            placeholder="Supports generational artisan families while providing screen-free tactile restoration..."
            className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4] leading-relaxed text-[#2B231F]"
          />
        </div>

        {/* 4. Why Should It Be Learnt */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
            4. Why Should It Be Learnt
          </label>
          <textarea
            rows={3}
            required
            value={data.whyLearn}
            onChange={(e) => setData({ ...data, whyLearn: e.target.value })}
            placeholder="Working with raw earth and quartz slows heart rates and calms racing thoughts..."
            className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4] leading-relaxed text-[#2B231F]"
          />
        </div>

        {/* 5. Key Process Steps */}
        <div className="space-y-3 pt-2 border-t border-[#E8E1D5]">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              5. Key Process Steps ({data.keyProcess?.length || 0} steps)
            </label>
            <button
              type="button"
              onClick={handleAddStep}
              className="inline-flex items-center gap-1 text-xs text-[#4F5B2A] hover:underline font-semibold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Step</span>
            </button>
          </div>

          <div className="space-y-2">
            {(data.keyProcess || []).map((step, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-[#EAE3D5] text-[#4F5B2A] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-1">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  required
                  value={step}
                  onChange={(e) => handleStepChange(idx, e.target.value)}
                  className="flex-1 text-xs px-3 py-2 border rounded bg-[#FBF9F4] text-[#2B231F]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveStep(idx)}
                  className="p-2 text-xs text-[#8A3B35] hover:bg-[#FDF2F0] rounded cursor-pointer"
                  title="Remove step"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Take Away / Outcomes */}
        <div className="space-y-1.5 pt-2 border-t border-[#E8E1D5]">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
            6. Workshop Keepsake / Outcomes
          </label>
          <textarea
            rows={2}
            value={data.outcomes || ''}
            onChange={(e) => setData({ ...data, outcomes: e.target.value })}
            placeholder="A handmade glazed keepsake to carry home and treasure..."
            className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4] text-[#2B231F]"
          />
        </div>

        {/* 7 & 8. Durations */}
        <div className="grid md:grid-cols-2 gap-4 pt-2 border-t border-[#E8E1D5]">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              7. How Long It Takes to Learn
            </label>
            <input
              type="text"
              required
              value={data.learningDuration}
              onChange={(e) => setData({ ...data, learningDuration: e.target.value })}
              placeholder="A lifetime of discipline..."
              className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              8. Workshop Session Duration
            </label>
            <input
              type="text"
              required
              value={data.workshopDuration}
              onChange={(e) => setData({ ...data, workshopDuration: e.target.value })}
              placeholder="3 hours hands-on masterclass"
              className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>
        </div>
      </div>

      {/* 3. Pricing Tiers & Media */}
      <div className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs space-y-6">
        <h2 className="font-display text-base font-semibold text-[#2B231F] border-b border-[#E8E1D5] pb-2">
          Pricing Tiers & Cover Media
        </h2>

        {data.pricing && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#6E635B]">Tier 1 (≤15 pax)</label>
              <input
                type="number"
                value={data.pricing.t15}
                onChange={(e) =>
                  setData({
                    ...data,
                    pricing: { ...data.pricing!, t15: Number(e.target.value) },
                  })
                }
                className="w-full text-xs px-3 py-1.5 border rounded text-[#2B231F]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#6E635B]">Tier 2 (16–35 pax)</label>
              <input
                type="number"
                value={data.pricing.t26}
                onChange={(e) =>
                  setData({
                    ...data,
                    pricing: { ...data.pricing!, t26: Number(e.target.value) },
                  })
                }
                className="w-full text-xs px-3 py-1.5 border rounded text-[#2B231F]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#6E635B]">Tier 3 (36–75 pax)</label>
              <input
                type="number"
                value={data.pricing.t46}
                onChange={(e) =>
                  setData({
                    ...data,
                    pricing: { ...data.pricing!, t46: Number(e.target.value) },
                  })
                }
                className="w-full text-xs px-3 py-1.5 border rounded text-[#2B231F]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#6E635B]">Tier 4 (76+ pax)</label>
              <input
                type="number"
                value={data.pricing.t100}
                onChange={(e) =>
                  setData({
                    ...data,
                    pricing: { ...data.pricing!, t100: Number(e.target.value) },
                  })
                }
                className="w-full text-xs px-3 py-1.5 border rounded text-[#2B231F]"
              />
            </div>
          </div>
        )}

        <div className="pt-2">
          <ImageUploadField
            label="Offering Cover Image"
            value={data.imageUrl}
            onChange={(url) => setData({ ...data, imageUrl: url })}
            onRemove={() => setData({ ...data, imageUrl: '' })}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D8CEBE]">
        <Link
          href="/admin/offerings"
          className="px-4 py-2 border border-[#D8CEBE] bg-white text-[#2B231F] text-xs font-medium rounded-md hover:bg-[#F3EFE6] transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#4F5B2A] hover:bg-[#3D4721] text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : isNew ? 'Create Offering Draft' : 'Save Offering Draft'}</span>
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {!isNew && (
        <ConfirmModal
          isOpen={deleteModalOpen}
          title="Delete Offering"
          message={`Are you sure you want to delete "${data.title}"? This change will be staged in your pending changes until published.`}
          confirmText="Delete Offering"
          isDanger={true}
          onConfirm={handleDelete}
          onCancel={() => setDeleteModalOpen(false)}
        />
      )}
    </form>
  )
}
