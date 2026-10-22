'use client'

import React, { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { useToast } from '@/components/admin/Toast'
import { usePublish } from '@/components/admin/PublishContext'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import type { HomepageData } from '@/lib/cms/contentStore'

export default function AdminHomepagePage() {
  const { success, error } = useToast()
  const { refreshPublishStatus, triggerPublish, isPublishing } = usePublish()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<HomepageData | null>(null)
  const [activeTab, setActiveTab] = useState<'hero' | 'stats' | 'manifesto' | 'methodology' | 'cta'>('hero')

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/admin/content?section=homepage')
        const json = await res.json()
        if (json.success && json.data) {
          const loaded = { ...json.data }
          // Guarantee approved hero copy is always prefilled and never legacy rejected copy
          if (
            !loaded.heroSubheading ||
            loaded.heroSubheading.toLowerCase().includes('put the phone down')
          ) {
            loaded.heroSubheading =
              'MELD pairs master artisans with wellness facilitators to guide every session across traditional and contemporary art, alongside restorative practices. Rhythmic making with clay, thread or indigo slows the breath and settles the thoughts, so you leave softer, calmer, and a little more yourself.'
          }
          if (
            !loaded.heroEyebrow ||
            loaded.heroEyebrow.toLowerCase().includes('cultural space') ||
            loaded.heroEyebrow.toLowerCase().includes('offline')
          ) {
            loaded.heroEyebrow = 'A creative wellness space for making, connecting & restoring'
          }
          if (!loaded.heroHeading) {
            loaded.heroHeading = 'Root. Create. Restore.'
          }
          if (!loaded.heroImages || loaded.heroImages.length < 3) {
            loaded.heroImages = [
              '/images/other/pottery-1.png',
              '/images/workshops/block-printing-workshop.jpg',
              '/images/other/kintsugi-1.png',
            ]
          }
          setData(loaded)
        } else {
          error('Failed to load homepage content')
        }
      } catch {
        error('Network error loading homepage content')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [error])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!data) return

    setSaving(true)
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'homepage', data }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        success('Homepage saved to working drafts! Press PUSH to publish live.')
        await refreshPublishStatus()
      } else {
        error(json.error || 'Failed to save changes')
      }
    } catch (err: any) {
      error(err.message || 'Network error saving changes')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !data) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-6 h-6 border-2 border-[#4F5B2A] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-[#6E635B]">Loading homepage configuration...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D5] pb-5">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4F5B2A]">
            Core Presentation
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[#2B231F] mt-1">
            Homepage & Brand Copy
          </h1>
          <p className="text-xs text-[#6E635B] font-light mt-0.5">
            Update hero statements, session stages, stats, and call-to-actions.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 bg-[#4F5B2A] hover:bg-[#3D4721] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Homepage Changes'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#D8CEBE] gap-2 overflow-x-auto pb-px text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'hero'
              ? 'border-[#4F5B2A] text-[#4F5B2A] font-semibold'
              : 'border-transparent text-[#6E635B] hover:text-[#2B231F]'
          }`}
        >
          1. Hero & Media
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'stats'
              ? 'border-[#4F5B2A] text-[#4F5B2A] font-semibold'
              : 'border-transparent text-[#6E635B] hover:text-[#2B231F]'
          }`}
        >
          2. Stats Row
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('manifesto')}
          className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'manifesto'
              ? 'border-[#4F5B2A] text-[#4F5B2A] font-semibold'
              : 'border-transparent text-[#6E635B] hover:text-[#2B231F]'
          }`}
        >
          3. Manifesto
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('methodology')}
          className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'methodology'
              ? 'border-[#4F5B2A] text-[#4F5B2A] font-semibold'
              : 'border-transparent text-[#6E635B] hover:text-[#2B231F]'
          }`}
        >
          4. How a Session Unfolds
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('cta')}
          className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'cta'
              ? 'border-[#4F5B2A] text-[#4F5B2A] font-semibold'
              : 'border-transparent text-[#6E635B] hover:text-[#2B231F]'
          }`}
        >
          5. Final CTA Block
        </button>
      </div>

      {/* Tab 1: Hero */}
      {activeTab === 'hero' && (
        <div className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs space-y-6">
          <h2 className="font-display text-lg font-semibold text-[#2B231F]">
            Hero Section Settings
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]">
                Hero Eyebrow
              </label>
              <input
                type="text"
                value={data.heroEyebrow}
                onChange={(e) => setData({ ...data, heroEyebrow: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-[#D8CEBE] rounded bg-[#FBF9F4] text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]">
                Hero Main Heading
              </label>
              <input
                type="text"
                value={data.heroHeading}
                onChange={(e) => setData({ ...data, heroHeading: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-[#D8CEBE] rounded bg-[#FBF9F4] text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]">
                Hero Primary Paragraph
              </label>
              <textarea
                rows={3}
                value={data.heroSubheading}
                onChange={(e) => setData({ ...data, heroSubheading: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-[#D8CEBE] rounded bg-[#FBF9F4] text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]">
                Hero Supporting Paragraph
              </label>
              <textarea
                rows={3}
                value={data.heroSupportingText || ''}
                onChange={(e) => setData({ ...data, heroSupportingText: e.target.value })}
                placeholder="MELD pairs master artisans with wellness facilitators..."
                className="w-full px-3 py-2 text-sm border border-[#D8CEBE] rounded bg-[#FBF9F4] text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
              />
            </div>

            <div className="md:col-span-2 p-4 bg-[#FBF9F4] border border-[#E8E1D5] rounded-md flex items-start gap-3">
              <input
                type="checkbox"
                id="showArtisanStories"
                checked={Boolean(data.showArtisanStories)}
                onChange={(e) => setData({ ...data, showArtisanStories: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-[#D8CEBE] text-[#4F5B2A] focus:ring-[#4F5B2A] cursor-pointer"
              />
              <div className="space-y-0.5">
                <label htmlFor="showArtisanStories" className="text-xs font-semibold text-[#2B231F] cursor-pointer">
                  Show Artisan Stories section
                </label>
                <p className="text-[11px] text-[#6E635B] font-light">
                  Toggle whether &ldquo;The Craft Is the Experience. The Artisan Is the Wisdom&rdquo; section is rendered on the public homepage. (Default: hidden).
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]">
                Primary CTA Label
              </label>
              <input
                type="text"
                value={data.heroPrimaryCtaLabel}
                onChange={(e) => setData({ ...data, heroPrimaryCtaLabel: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-[#D8CEBE] rounded bg-[#FBF9F4] text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]">
                Primary CTA Link
              </label>
              <input
                type="text"
                value={data.heroPrimaryCtaHref}
                onChange={(e) => setData({ ...data, heroPrimaryCtaHref: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-[#D8CEBE] rounded bg-[#FBF9F4] text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]">
                Secondary CTA Label
              </label>
              <input
                type="text"
                value={data.heroSecondaryCtaLabel}
                onChange={(e) => setData({ ...data, heroSecondaryCtaLabel: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-[#D8CEBE] rounded bg-[#FBF9F4] text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]">
                Secondary CTA Link
              </label>
              <input
                type="text"
                value={data.heroSecondaryCtaHref}
                onChange={(e) => setData({ ...data, heroSecondaryCtaHref: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-[#D8CEBE] rounded bg-[#FBF9F4] text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8E1D5] space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Hero Media & Imagery (Tri-Panel Gallery)
            </h3>
            <p className="text-xs text-[#6E635B] font-light">
              Manage the 3 hero panel images. Select existing assets from the Sanity Media Library or upload directly from your device.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <ImageUploadField
                label="Hero Panel 1 (Left)"
                value={data.heroImages?.[0]}
                onChange={(url) => {
                  const updated = [...(data.heroImages || [])]
                  updated[0] = url
                  setData({ ...data, heroImages: updated })
                }}
                onRemove={() => {
                  const updated = [...(data.heroImages || [])]
                  updated[0] = ''
                  setData({ ...data, heroImages: updated })
                }}
              />
              <ImageUploadField
                label="Hero Panel 2 (Center)"
                value={data.heroImages?.[1]}
                onChange={(url) => {
                  const updated = [...(data.heroImages || [])]
                  updated[1] = url
                  setData({ ...data, heroImages: updated })
                }}
                onRemove={() => {
                  const updated = [...(data.heroImages || [])]
                  updated[1] = ''
                  setData({ ...data, heroImages: updated })
                }}
              />
              <ImageUploadField
                label="Hero Panel 3 (Right / Featured)"
                value={data.heroImages?.[2]}
                onChange={(url) => {
                  const updated = [...(data.heroImages || [])]
                  updated[2] = url
                  setData({ ...data, heroImages: updated })
                }}
                onRemove={() => {
                  const updated = [...(data.heroImages || [])]
                  updated[2] = ''
                  setData({ ...data, heroImages: updated })
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Stats Row */}
      {activeTab === 'stats' && (
        <div className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs space-y-6">
          <div>
            <h2 className="font-display text-lg font-semibold text-[#2B231F]">
              Stats Row Counters, Labels & Descriptions
            </h2>
            <p className="text-xs text-[#6E635B] font-light mt-1">
              Configure the 5 verified metrics displayed on the public website homepage impact bar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Metric 1: Workshops */}
            <div className="p-4 bg-[#FBF9F4] border border-[#E8E1D5] rounded-xl space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A] block">
                1. Workshops Metric
              </span>
              <div className="space-y-1">
                <label className="text-[11px] text-[#6E635B] font-medium">Numeric Value</label>
                <input
                  type="text"
                  value={data.statsWorkshops || ''}
                  onChange={(e) => setData({ ...data, statsWorkshops: e.target.value })}
                  className="w-full px-3 py-1.5 text-sm border rounded bg-white font-serif"
                  placeholder="800+"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-[#6E635B] font-medium">Label</label>
                <input
                  type="text"
                  value={data.statsWorkshopsTitle || 'Workshops'}
                  onChange={(e) => setData({ ...data, statsWorkshopsTitle: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border rounded bg-white font-medium"
                  placeholder="Workshops"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-[#6E635B] font-medium">Supporting Description</label>
                <input
                  type="text"
                  value={data.statsWorkshopsLabel || ''}
                  onChange={(e) => setData({ ...data, statsWorkshopsLabel: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border rounded bg-white text-[#6E635B]"
                  placeholder="Hands-on sessions across India"
                />
              </div>
            </div>

            {/* Metric 2: Participants */}
            <div className="p-4 bg-[#FBF9F4] border border-[#E8E1D5] rounded-xl space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A] block">
                2. Participants Metric
              </span>
              <div className="space-y-1">
                <label className="text-[11px] text-[#6E635B] font-medium">Numeric Value</label>
                <input
                  type="text"
                  value={data.statsParticipants || ''}
                  onChange={(e) => setData({ ...data, statsParticipants: e.target.value })}
                  className="w-full px-3 py-1.5 text-sm border rounded bg-white font-serif"
                  placeholder="10,000+"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-[#6E635B] font-medium">Label</label>
                <input
                  type="text"
                  value={data.statsParticipantsTitle || 'Participants'}
                  onChange={(e) => setData({ ...data, statsParticipantsTitle: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border rounded bg-white font-medium"
                  placeholder="Participants"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-[#6E635B] font-medium">Supporting Description</label>
                <input
                  type="text"
                  value={data.statsParticipantsLabel || ''}
                  onChange={(e) => setData({ ...data, statsParticipantsLabel: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border rounded bg-white text-[#6E635B]"
                  placeholder="People who took a creative break"
                />
              </div>
            </div>

            {/* Metric 3: Active Cities */}
            <div className="p-4 bg-[#FBF9F4] border border-[#E8E1D5] rounded-xl space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A] block">
                3. Active Cities Footprint
              </span>
              <div className="space-y-1">
                <label className="text-[11px] text-[#6E635B] font-medium">Numeric Value</label>
                <input
                  type="text"
                  value={data.statsCities || ''}
                  onChange={(e) => setData({ ...data, statsCities: e.target.value })}
                  className="w-full px-3 py-1.5 text-sm border rounded bg-white font-serif"
                  placeholder="7"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-[#6E635B] font-medium">Label</label>
                <input
                  type="text"
                  value={data.statsCitiesTitle || 'Cities'}
                  onChange={(e) => setData({ ...data, statsCitiesTitle: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border rounded bg-white font-medium"
                  placeholder="Cities"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-[#6E635B] font-medium">Supporting Description</label>
                <input
                  type="text"
                  value={data.statsCitiesLabel || ''}
                  onChange={(e) => setData({ ...data, statsCitiesLabel: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border rounded bg-white text-[#6E635B]"
                  placeholder="Mumbai, Kolkata, Pune, Goa, Bangalore, Jaipur"
                />
              </div>
            </div>

            {/* Metric 4: Corporate Teams */}
            <div className="p-4 bg-[#FBF9F4] border border-[#E8E1D5] rounded-xl space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A] block">
                4. Corporate Teams Metric
              </span>
              <div className="space-y-1">
                <label className="text-[11px] text-[#6E635B] font-medium">Numeric Value</label>
                <input
                  type="text"
                  value={data.statsTeams || ''}
                  onChange={(e) => setData({ ...data, statsTeams: e.target.value })}
                  className="w-full px-3 py-1.5 text-sm border rounded bg-white font-serif"
                  placeholder="15+"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-[#6E635B] font-medium">Label</label>
                <input
                  type="text"
                  value={data.statsTeamsTitle || 'Corporate teams'}
                  onChange={(e) => setData({ ...data, statsTeamsTitle: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border rounded bg-white font-medium"
                  placeholder="Corporate teams"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-[#6E635B] font-medium">Supporting Description</label>
                <input
                  type="text"
                  value={data.statsTeamsLabel || ''}
                  onChange={(e) => setData({ ...data, statsTeamsLabel: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border rounded bg-white text-[#6E635B]"
                  placeholder="Team wellness through making"
                />
              </div>
            </div>

            {/* Metric 5: Resorts */}
            <div className="p-4 bg-[#FBF9F4] border border-[#E8E1D5] rounded-xl space-y-3 md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A] block">
                5. Luxury Resorts & Hospitality
              </span>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] text-[#6E635B] font-medium">Numeric Value</label>
                  <input
                    type="text"
                    value={data.statsResorts || ''}
                    onChange={(e) => setData({ ...data, statsResorts: e.target.value })}
                    className="w-full px-3 py-1.5 text-sm border rounded bg-white font-serif"
                    placeholder="10+"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-[#6E635B] font-medium">Label</label>
                  <input
                    type="text"
                    value={data.statsResortsTitle || 'Resorts'}
                    onChange={(e) => setData({ ...data, statsResortsTitle: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border rounded bg-white font-medium"
                    placeholder="Resorts"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-[#6E635B] font-medium">Supporting Description</label>
                  <input
                    type="text"
                    value={data.statsResortsLabel || ''}
                    onChange={(e) => setData({ ...data, statsResortsLabel: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border rounded bg-white text-[#6E635B]"
                    placeholder="Guest wellness experiences"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Manifesto */}
      {activeTab === 'manifesto' && (
        <div className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs space-y-6">
          <h2 className="font-display text-lg font-semibold text-[#2B231F]">
            Manifesto Section
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]">
                Manifesto Headline
              </label>
              <input
                type="text"
                value={data.manifestoTitle}
                onChange={(e) => setData({ ...data, manifestoTitle: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-[#D8CEBE] rounded bg-[#FBF9F4] text-[#2B231F]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]">
                Manifesto Body
              </label>
              <textarea
                rows={4}
                value={data.manifestoText}
                onChange={(e) => setData({ ...data, manifestoText: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-[#D8CEBE] rounded bg-[#FBF9F4] text-[#2B231F]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]">
                Manifesto Closing Subtext
              </label>
              <textarea
                rows={2}
                value={data.manifestoSubtext}
                onChange={(e) => setData({ ...data, manifestoSubtext: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-[#D8CEBE] rounded bg-[#FBF9F4] text-[#2B231F]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: How a Session Unfolds */}
      {activeTab === 'methodology' && (
        <div className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs space-y-6">
          <h2 className="font-display text-lg font-semibold text-[#2B231F]">
            How a Session Unfolds (Root, Create, Restore)
          </h2>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]">
              Section Intro
            </label>
            <textarea
              rows={2}
              value={data.methodologyIntro}
              onChange={(e) => setData({ ...data, methodologyIntro: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#D8CEBE] rounded bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>

          <div className="space-y-6 pt-4 border-t border-[#E8E1D5]">
            {data.methodologyStages.map((stage, idx) => (
              <div key={stage.id || idx} className="p-4 bg-[#FBF9F4] border border-[#D8CEBE] rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-[#4F5B2A] font-bold">
                    Phase {String(idx + 1).padStart(2, '0')}: {stage.title}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#6E635B] block mb-1">
                      Phase Heading (Subtitle)
                    </label>
                    <input
                      type="text"
                      value={stage.heading || ''}
                      onChange={(e) => {
                        const updated = [...data.methodologyStages]
                        updated[idx].heading = e.target.value
                        setData({ ...data, methodologyStages: updated })
                      }}
                      className="w-full text-xs px-3 py-2 border rounded bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#6E635B] block mb-1">
                      Led By Label
                    </label>
                    <input
                      type="text"
                      value={stage.ledBy || ''}
                      onChange={(e) => {
                        const updated = [...data.methodologyStages]
                        updated[idx].ledBy = e.target.value
                        setData({ ...data, methodologyStages: updated })
                      }}
                      className="w-full text-xs px-3 py-2 border rounded bg-white"
                      placeholder="e.g. Facilitator + Artisan"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[11px] font-semibold text-[#6E635B] block mb-1">
                      Phase Description
                    </label>
                    <textarea
                      rows={3}
                      value={stage.body}
                      onChange={(e) => {
                        const updated = [...data.methodologyStages]
                        updated[idx].body = e.target.value
                        setData({ ...data, methodologyStages: updated })
                      }}
                      className="w-full text-xs px-3 py-2 border rounded bg-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[11px] font-semibold text-[#6E635B] block mb-1">
                      &ldquo;You feel&rdquo; Chip Label
                    </label>
                    <input
                      type="text"
                      value={stage.youFeel || ''}
                      onChange={(e) => {
                        const updated = [...data.methodologyStages]
                        updated[idx].youFeel = e.target.value
                        setData({ ...data, methodologyStages: updated })
                      }}
                      className="w-full text-xs px-3 py-2 border rounded bg-white text-[#4F5B2A] font-medium"
                      placeholder="e.g. Grounded, present"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Final CTA */}
      {activeTab === 'cta' && (
        <div className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs space-y-6">
          <h2 className="font-display text-lg font-semibold text-[#2B231F]">
            Final CTA Block: &ldquo;Designed for Groups &amp; Individuals&rdquo;
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]">
                Headline
              </label>
              <input
                type="text"
                value={data.ctaHeadline}
                onChange={(e) => setData({ ...data, ctaHeadline: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-[#D8CEBE] rounded bg-[#FBF9F4]"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]">
                Intro Paragraph
              </label>
              <textarea
                rows={2}
                value={data.ctaIntro}
                onChange={(e) => setData({ ...data, ctaIntro: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-[#D8CEBE] rounded bg-[#FBF9F4]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]">
                Primary Button Label
              </label>
              <input
                type="text"
                value={data.ctaPrimaryLabel}
                onChange={(e) => setData({ ...data, ctaPrimaryLabel: e.target.value })}
                className="w-full px-3 py-2 text-sm border rounded bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]">
                Primary Button Destination
              </label>
              <input
                type="text"
                value={data.ctaPrimaryHref}
                onChange={(e) => setData({ ...data, ctaPrimaryHref: e.target.value })}
                className="w-full px-3 py-2 text-sm border rounded bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]">
                Secondary Button Label
              </label>
              <input
                type="text"
                value={data.ctaSecondaryLabel}
                onChange={(e) => setData({ ...data, ctaSecondaryLabel: e.target.value })}
                className="w-full px-3 py-2 text-sm border rounded bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]">
                Secondary Button Destination
              </label>
              <input
                type="text"
                value={data.ctaSecondaryHref}
                onChange={(e) => setData({ ...data, ctaSecondaryHref: e.target.value })}
                className="w-full px-3 py-2 text-sm border rounded bg-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Save Bar */}
      <div className="sticky bottom-4 z-20 bg-[#2B231F] text-white p-4 rounded-lg shadow-2xl flex items-center justify-between">
        <div className="text-xs text-[#D8CEBE]">
          Changes will persist to Sanity Content Lake and revalidate the public website.
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-[#4F5B2A] hover:bg-[#3D4721] text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer disabled:opacity-50"
        >
          {saving ? 'Saving changes...' : 'Save & Publish'}
        </button>
      </div>
    </form>
  )
}
