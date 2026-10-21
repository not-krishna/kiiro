'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MapPin, ExternalLink, Save, ArrowLeft } from 'lucide-react'
import { useToast } from './Toast'
import { usePublish } from './PublishContext'
import { ImageUploadField } from './ImageUploadField'
import type { EventItem } from '@/content/types'

interface EventFormProps {
  initialData?: Partial<EventItem>
  isNew?: boolean
}

export function EventForm({ initialData = {}, isNew = false }: EventFormProps) {
  const router = useRouter()
  const { toast, success, error } = useToast()
  const { refreshPublishStatus } = usePublish()
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState<Partial<EventItem>>({
    id: initialData.id || `event-${Date.now()}`,
    title: initialData.title || '',
    slug: initialData.slug || '',
    shortDescription: initialData.shortDescription || '',
    date: initialData.date || new Date().toISOString().split('T')[0],
    startTime: initialData.startTime || '10:30 AM',
    endTime: initialData.endTime || '01:30 PM',
    duration: initialData.duration || '3 hours',
    city: initialData.city || 'Bangalore',
    venue: initialData.venue || 'Indiranagar Craft Sanctuary',
    address: initialData.address || '',
    googleMapsUrl: initialData.googleMapsUrl || '',
    price: initialData.price !== undefined ? initialData.price : 2500,
    capacity: initialData.capacity || 15,
    availability: initialData.availability || 'open',
    format: initialData.format || 'in-person',
    feelsLike: initialData.feelsLike || '',
    facilitator: initialData.facilitator || 'Master Artisan',
    experienceType: initialData.experienceType || 'Studio Craft',
    workshopSlug: initialData.workshopSlug || 'pottery',
    isWeekly: initialData.isWeekly !== undefined ? initialData.isWeekly : true,
    audience: initialData.audience || 'b2c',
    keyProcess: initialData.keyProcess || '',
    takeAway: initialData.takeAway || '',
    media: initialData.media || [],
  })

  // Auto-generate slug from title if new
  const handleTitleChange = (val: string) => {
    const updates: Partial<EventItem> = { title: val }
    if (isNew && (!formData.slug || formData.slug === '')) {
      updates.slug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    }
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title?.trim()) {
      error('Please enter an event title')
      return
    }

    if (!formData.slug?.trim()) {
      error('Please enter a URL slug')
      return
    }

    if (formData.googleMapsUrl?.trim()) {
      const url = formData.googleMapsUrl.trim()
      const isMapsUrl =
        url.startsWith('https://maps.app.goo.gl/') ||
        url.startsWith('https://goo.gl/maps/') ||
        url.startsWith('http://maps.app.goo.gl/') ||
        url.startsWith('http://goo.gl/maps/') ||
        url.includes('google.com/maps') ||
        url.includes('maps.google.')
      if (!isMapsUrl) {
        error('Please enter a valid Google Maps URL (e.g. https://maps.app.goo.gl/... or https://maps.google.com/...)')
        return
      }
    }

    setSaving(true)

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'events',
          action: 'save',
          data: formData,
        }),
      })

      const json = await res.json()
      if (res.ok && json.success) {
        success(`Event "${formData.title}" saved to drafts! Press PUSH in top header to deploy live.`)
        await refreshPublishStatus()
        router.push('/admin/events')
        router.refresh()
      } else {
        error(json.error || 'Failed to save event')
      }
    } catch (err: any) {
      error(err.message || 'Network error saving event')
    } finally {
      setSaving(false)
    }
  }

  const heroImageUrl = formData.media?.[0]?.source || ''

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-4">
        <div>
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-1.5 text-xs text-[#6E635B] hover:text-[#4F5B2A] font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sessions</span>
          </Link>
          <h1 className="font-display text-2xl font-semibold text-[#2B231F] mt-1">
            {isNew ? 'Create New Session Event' : `Edit Session: ${formData.title}`}
          </h1>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 bg-[#4F5B2A] hover:bg-[#3D4721] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Session Draft'}</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs space-y-6">
        <h2 className="font-display text-base font-semibold text-[#2B231F] border-b border-[#E8E1D5] pb-2">
          Basic Details & Identity
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Session Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Clay, Calm & Centering (Pottery Studio)"
              className="w-full text-sm px-3.5 py-2 border border-[#D8CEBE] rounded-md bg-[#FBF9F4] text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Slug (URL Identifier) *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="pottery-studio-experience-bangalore"
              className="w-full text-xs font-mono px-3 py-2 border border-[#D8CEBE] rounded-md bg-[#FBF9F4] text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Craft / Experience Type
            </label>
            <input
              type="text"
              value={formData.experienceType}
              onChange={(e) => setFormData({ ...formData, experienceType: e.target.value })}
              placeholder="Studio Craft / Traditional Textile Craft"
              className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Short Description / Teaser (Max 180 chars)
            </label>
            <textarea
              rows={2}
              maxLength={220}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Tactile wheel-throwing and centering session guided by master ceramicists..."
              className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>
        </div>
      </div>

      {/* Date, Time & Logistics */}
      <div className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs space-y-6">
        <h2 className="font-display text-base font-semibold text-[#2B231F] border-b border-[#E8E1D5] pb-2">
          Date, Location & Schedule
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Date *
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Start Time
            </label>
            <input
              type="text"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              placeholder="10:30 AM"
              className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              End Time / Duration
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="3 hours"
              className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              City
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Bangalore / Mumbai / Goa"
              className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>

          <div className="md:col-span-1 space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Venue Name
            </label>
            <input
              type="text"
              value={formData.venue || ''}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              placeholder="e.g. Bunaphile Roasters, ITC Fortune"
              className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Full Address
            </label>
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="e.g. 101, Southern Ave, Lake Terrace, Ballygunge..."
              className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>

          <div className="md:col-span-3 space-y-1.5 p-3.5 bg-[#FBF9F4] border border-[#E8E1D5] rounded-md">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#4F5B2A]" />
                <span>Google Maps Location Link</span>
                <span className="text-[10px] font-normal text-[#7A6E65] lowercase">(optional)</span>
              </label>
              {formData.googleMapsUrl && (
                <div className="flex items-center gap-2">
                  <a
                    href={formData.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#4F5B2A] hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Test Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, googleMapsUrl: '' }))}
                    className="text-[11px] text-[#8A3B35] hover:underline font-medium cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <input
              type="url"
              value={formData.googleMapsUrl || ''}
              onChange={(e) => {
                const val = e.target.value.trim()
                setFormData((prev) => ({ ...prev, googleMapsUrl: val }))
              }}
              placeholder="https://maps.app.goo.gl/... or https://google.com/maps/..."
              className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-white text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
            />
            <p className="text-[11px] text-[#7A6E65]">
              Paste a Google Maps share link or URL. Clicking the venue name on public event cards will open this location directly in Google Maps.
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Session Format
            </label>
            <select
              value={formData.format}
              onChange={(e) => setFormData({ ...formData, format: e.target.value as any })}
              className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-[#FBF9F4] text-[#2B231F]"
            >
              <option value="in-person">In Person</option>
              <option value="online">Online Live</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Price (INR)
            </label>
            <input
              type="number"
              value={formData.price !== undefined ? formData.price : ''}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              placeholder="2500"
              className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Capacity
            </label>
            <input
              type="number"
              value={formData.capacity || ''}
              onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
              placeholder="15"
              className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Booking Availability
            </label>
            <select
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value as any })}
              className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-[#FBF9F4] text-[#2B231F]"
            >
              <option value="open">Seats Available (Open)</option>
              <option value="limited">Limited Seats</option>
              <option value="sold-out">Sold Out</option>
              <option value="closed">Booking Closed</option>
              <option value="enquiry-only">Enquiry Only</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Facilitator / Artisan
            </label>
            <input
              type="text"
              value={formData.facilitator}
              onChange={(e) => setFormData({ ...formData, facilitator: e.target.value })}
              placeholder="Master Ceramicist"
              className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Feels Like Tagline
            </label>
            <input
              type="text"
              value={formData.feelsLike}
              onChange={(e) => setFormData({ ...formData, feelsLike: e.target.value })}
              placeholder="earthy, centering, rhythmic"
              className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 pt-3 border-t border-[#E8E1D5]">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#2B231F]">
            <input
              type="checkbox"
              checked={Boolean(formData.isWeekly)}
              onChange={(e) => setFormData({ ...formData, isWeekly: e.target.checked })}
              className="rounded text-[#4F5B2A] focus:ring-[#4F5B2A]"
            />
            <span>Recurring Weekly Event</span>
          </label>
        </div>
      </div>

      {/* Craft Process & Take Away */}
      <div className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs space-y-6">
        <h2 className="font-display text-base font-semibold text-[#2B231F] border-b border-[#E8E1D5] pb-2">
          Experience Narrative & Imagery
        </h2>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Key Process (Stages of making)
            </label>
            <textarea
              rows={3}
              value={Array.isArray(formData.keyProcess) ? formData.keyProcess.join('\n') : (formData.keyProcess || '')}
              onChange={(e) => setFormData({ ...formData, keyProcess: e.target.value })}
              placeholder="Clay wedging and centering on wheel, throwing cylinder form, neck shaping, and wire cutting"
              className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Take Away / Keepsake
            </label>
            <input
              type="text"
              value={formData.takeAway}
              onChange={(e) => setFormData({ ...formData, takeAway: e.target.value })}
              placeholder="1–2 handcrafted ceramic pieces (bisque-fired and glazed for pickup)"
              className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-[#FBF9F4] text-[#2B231F]"
            />
          </div>

          <div className="pt-2">
            <ImageUploadField
              label="Cover Image"
              value={heroImageUrl}
              onChange={(url) => {
                setFormData({
                  ...formData,
                  media: [{ type: 'image', source: url, alt: formData.title || 'Event image' }],
                })
              }}
              onRemove={() => setFormData({ ...formData, media: [] })}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D8CEBE]">
        <Link
          href="/admin/events"
          className="px-4 py-2 border border-[#D8CEBE] bg-white text-[#2B231F] text-xs font-medium rounded-md hover:bg-[#F3EFE6]"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-[#4F5B2A] hover:bg-[#3D4721] text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Session Draft'}</span>
        </button>
      </div>
    </form>
  )
}
