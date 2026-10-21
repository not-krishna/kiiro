'use client'

import React, { useState, useEffect } from 'react'
import { Save, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react'
import { useToast } from '@/components/admin/Toast'
import { usePublish } from '@/components/admin/PublishContext'
import type { SiteSettingsData } from '@/lib/cms/contentStore'

export default function AdminSettingsPage() {
  const { success, error, toast } = useToast()
  const { refreshPublishStatus, triggerPublish, isPublishing } = usePublish()
  const [loading, setLoading] = useState(true)
  const [savingSettings, setSavingSettings] = useState(false)
  const [settings, setSettings] = useState<SiteSettingsData | null>(null)

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [changingPassword, setChangingPassword] = useState(false)

  // Sanity sync state
  const [syncingSanity, setSyncingSanity] = useState(false)
  const [syncReport, setSyncReport] = useState<any>(null)

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/admin/content?section=siteSettings')
        const json = await res.json()
        if (json.success && json.data) {
          setSettings(json.data)
        } else {
          error('Failed to load settings')
        }
      } catch {
        error('Network error loading settings')
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [error])

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!settings) return

    setSavingSettings(true)
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'siteSettings',
          data: settings,
        }),
      })

      const json = await res.json()
      if (res.ok && json.success) {
        success('Site settings saved to drafts! Press PUSH in top header to deploy live.')
        await refreshPublishStatus()
      } else {
        error(json.error || 'Failed to update settings')
      }
    } catch (err: any) {
      error(err.message || 'Error updating settings')
    } finally {
      setSavingSettings(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentPassword || !newPassword) {
      error('Please fill in current and new password')
      return
    }

    if (newPassword !== confirmPassword) {
      error('New passwords do not match')
      return
    }

    if (newPassword.length < 8) {
      error('New password must be at least 8 characters long')
      return
    }

    setChangingPassword(true)

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const json = await res.json()
      if (res.ok && json.success) {
        success('Administrator password changed successfully!')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        error(json.error || 'Failed to change password')
      }
    } catch (err: any) {
      error(err.message || 'Network error changing password')
    } finally {
      setChangingPassword(false)
    }
  }

  const handleTriggerSync = async () => {
    setSyncingSanity(true)
    setSyncReport(null)
    try {
      const res = await fetch('/api/admin/sync-sanity', { method: 'POST' })
      const json = await res.json()
      setSyncReport(json)
      if (json.success) {
        success(`Sanity cloud synced! ${json.syncedCount} documents updated.`)
      } else if (!json.hasWriteToken) {
        toast('Local store active and persistent. Add SANITY_API_WRITE_TOKEN to sync to cloud.', 'info')
      } else {
        error(json.errors?.[0] || 'Sync completed with warnings')
      }
    } catch (err: any) {
      error(err.message || 'Error triggering sync')
    } finally {
      setSyncingSanity(false)
    }
  }

  if (loading || !settings) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-6 h-6 border-2 border-[#4F5B2A] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-[#6E635B]">Loading settings...</p>
      </div>
    )
  }

  return (
    <div className="space-y-10 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D5] pb-5">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4F5B2A]">
            Global Configuration
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[#2B231F] mt-1">
            Site Settings & Security
          </h1>
          <p className="text-xs text-[#6E635B] font-light mt-0.5">
            Configure contact info, social channels, footer statements, Sanity cloud sync, and administrator credentials.
          </p>
        </div>
      </div>

      {/* Section 1: Sanity Cloud Operations */}
      <div className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
          <div>
            <h2 className="font-display text-base font-semibold text-[#2B231F]">
              Sanity CMS Cloud Sync
            </h2>
            <p className="text-xs text-[#6E635B] font-light">
              Push all 36 offerings, events, advisors, testimonials, and homepage copy to Sanity Content Lake.
            </p>
          </div>
          <button
            type="button"
            onClick={handleTriggerSync}
            disabled={syncingSanity}
            className="px-4 py-2 bg-[#2B231F] hover:bg-[#1A1412] text-white text-xs font-semibold rounded shadow-xs cursor-pointer disabled:opacity-50 flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncingSanity ? 'animate-spin' : ''}`} />
            <span>{syncingSanity ? 'Synchronizing...' : 'Push All Content to Sanity'}</span>
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-xs font-mono bg-[#FBF9F4] p-4 rounded-md border border-[#E8E1D5]">
          <div>
            <span className="text-[#968A80] block text-[10px] uppercase font-sans">Project ID</span>
            <span className="font-semibold text-[#2B231F]">s47moswb</span>
          </div>
          <div>
            <span className="text-[#968A80] block text-[10px] uppercase font-sans">Dataset</span>
            <span className="font-semibold text-[#2B231F]">production</span>
          </div>
          <div>
            <span className="text-[#968A80] block text-[10px] uppercase font-sans">API Version</span>
            <span className="font-semibold text-[#2B231F]">2026-01-01</span>
          </div>
        </div>

        {syncReport && (
          <div
            className={`p-3.5 rounded-md text-xs space-y-1 ${
              syncReport.success
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            <div className="font-semibold flex items-center gap-1.5">
              {syncReport.success ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Sync Succeeded: {syncReport.syncedCount} documents pushed to cloud.</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Notice:</span>
                </>
              )}
            </div>
            {syncReport.errors?.map((err: string, i: number) => (
              <div key={i} className="text-[11px] font-mono">
                {err}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 2: General & SEO Meta */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        <div className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs space-y-4">
          <h2 className="font-display text-base font-semibold text-[#2B231F] border-b border-[#E8E1D5] pb-2">
            SEO Metadata & Contact Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                Site Title (Browser & SEO)
              </label>
              <input
                type="text"
                required
                value={settings.siteTitle}
                onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4]"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                Default Meta Description (Google & Social Sharing)
              </label>
              <textarea
                rows={2}
                required
                value={settings.metaDescription}
                onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                Contact Email
              </label>
              <input
                type="email"
                required
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                Contact Phone
              </label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4]"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                Physical Footprint / Cities
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4]"
              />
            </div>
          </div>
        </div>

        {/* Section: Homepage Features & Sections Visibility */}
        <div className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs space-y-4">
          <h2 className="font-display text-base font-semibold text-[#2B231F] border-b border-[#E8E1D5] pb-2">
            Homepage Section Visibility
          </h2>
          <div className="flex items-start gap-3 p-4 bg-[#FBF9F4] border border-[#E8E1D5] rounded-md">
            <input
              type="checkbox"
              id="showArtisanStoriesSetting"
              checked={Boolean(settings.showArtisanStories)}
              onChange={(e) => setSettings({ ...settings, showArtisanStories: e.target.checked })}
              className="mt-0.5 h-4 w-4 rounded border-[#D8CEBE] text-[#4F5B2A] focus:ring-[#4F5B2A] cursor-pointer"
            />
            <div className="space-y-0.5">
              <label htmlFor="showArtisanStoriesSetting" className="text-xs font-semibold text-[#2B231F] cursor-pointer">
                Show Artisan Stories section
              </label>
              <p className="text-[11px] text-[#6E635B] font-light">
                When enabled, renders &ldquo;The Craft Is the Experience. The Artisan Is the Wisdom&rdquo; carousel on the homepage. Keep unchecked to hide the section on the public website.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-[#FBF9F4] border border-[#E8E1D5] rounded-md">
            <input
              type="checkbox"
              id="showCsrSectionSetting"
              checked={Boolean(settings.showCsrSection)}
              onChange={(e) => setSettings({ ...settings, showCsrSection: e.target.checked })}
              className="mt-0.5 h-4 w-4 rounded border-[#D8CEBE] text-[#4F5B2A] focus:ring-[#4F5B2A] cursor-pointer"
            />
            <div className="space-y-0.5">
              <label htmlFor="showCsrSectionSetting" className="text-xs font-semibold text-[#2B231F] cursor-pointer">
                Show CSR Section
              </label>
              <p className="text-[11px] text-[#6E635B] font-light">
                Toggle whether the CSR section is rendered on the homepage and whether &ldquo;CSR COLLABS&rdquo; appears in the public website navigation. Defaults to hidden (unchecked).
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Social Links */}
        <div className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs space-y-4">
          <h2 className="font-display text-base font-semibold text-[#2B231F] border-b border-[#E8E1D5] pb-2">
            Social Channels
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.instagramUrl}
                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                Facebook URL
              </label>
              <input
                type="url"
                value={settings.facebookUrl}
                onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={settings.linkedinUrl}
                onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                YouTube URL
              </label>
              <input
                type="url"
                value={settings.youtubeUrl}
                onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4]"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Footer */}
        <div className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs space-y-4">
          <h2 className="font-display text-base font-semibold text-[#2B231F] border-b border-[#E8E1D5] pb-2">
            Footer Statements & Disclaimer
          </h2>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                Footer Tagline
              </label>
              <input
                type="text"
                value={settings.footerTagline}
                onChange={(e) => setSettings({ ...settings, footerTagline: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                Footer Description
              </label>
              <textarea
                rows={2}
                value={settings.footerDescription}
                onChange={(e) => setSettings({ ...settings, footerDescription: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                Footer Disclaimer (Above copyright line)
              </label>
              <textarea
                rows={2}
                value={settings.footerDisclaimer}
                onChange={(e) => setSettings({ ...settings, footerDisclaimer: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              disabled={savingSettings}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#4F5B2A] hover:bg-[#3D4721] text-white text-xs font-semibold rounded shadow-xs cursor-pointer disabled:opacity-50 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingSettings ? 'Saving...' : 'Save Site Settings'}</span>
            </button>
          </div>
        </div>
      </form>

      {/* Section 5: Security & Password Management */}
      <div className="bg-white border border-[#D8CEBE] p-6 rounded-lg shadow-xs space-y-4">
        <div>
          <h2 className="font-display text-base font-semibold text-[#2B231F]">
            Administrator Password
          </h2>
          <p className="text-xs text-[#6E635B] font-light">
            Update your administrator password securely. Passwords are salted with cryptographic scrypt hashing.
          </p>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md pt-2">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4] font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              New Password (Min 8 characters)
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4] font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full text-xs px-3 py-2 border rounded bg-[#FBF9F4] font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={changingPassword}
            className="px-5 py-2 bg-[#2B231F] hover:bg-[#1A1412] text-white text-xs font-semibold rounded shadow-xs cursor-pointer disabled:opacity-50"
          >
            {changingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
