'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Trash2, Copy, Check, Search, Image as ImageIcon, Upload } from 'lucide-react'
import { useToast } from '@/components/admin/Toast'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import type { MediaAssetItem } from '@/app/api/admin/media/route'

export default function AdminMediaPage() {
  const { success, error, toast } = useToast()
  const [assets, setAssets] = useState<MediaAssetItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<MediaAssetItem | null>(null)

  const loadAssets = async () => {
    try {
      const res = await fetch('/api/admin/media')
      const json = await res.json()
      if (json.success && Array.isArray(json.assets)) {
        setAssets(json.assets)
      } else {
        error('Failed to load media assets')
      }
    } catch {
      error('Network error loading media')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAssets()
  }, [])

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      error('Only image files can be uploaded')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const json = await res.json()
      if (res.ok && json.success) {
        success(`Uploaded ${file.name} to Sanity & local media!`)
        loadAssets()
      } else {
        error(json.error || 'Upload failed')
      }
    } catch (err: any) {
      error(err.message || 'Error during file upload')
    } finally {
      setUploading(false)
    }
  }

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    toast('Image URL copied to clipboard', 'info')
    setTimeout(() => setCopiedUrl(null), 2500)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return

    try {
      const res = await fetch('/api/admin/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: deleteTarget.url, id: deleteTarget.id }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        success('Asset removed successfully')
        setAssets((prev) => prev.filter((a) => a.url !== deleteTarget.url))
        setDeleteTarget(null)
      } else {
        error(json.error || 'Failed to remove asset')
      }
    } catch (err: any) {
      error(err.message || 'Error removing asset')
    }
  }

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.filename.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E1D5] pb-5">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4F5B2A]">
            Asset Pipeline & Gallery
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[#1C1613] mt-1">
            Media & Asset Library
          </h1>
          <p className="text-xs text-[#7A6E65] mt-1">
            Upload, browse, and copy URLs for high-resolution photography and craft documentation.
          </p>
        </div>

        {/* Upload Trigger */}
        <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#4F5B2A] hover:bg-[#3D4721] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-colors">
          <Plus className="w-4 h-4" />
          <span>{uploading ? 'Uploading...' : 'Upload Asset'}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFileUpload(file)
            }}
          />
        </label>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const file = e.dataTransfer.files?.[0]
          if (file) handleFileUpload(file)
        }}
        className="p-8 border-2 border-dashed border-[#D8CEBE] hover:border-[#4F5B2A] rounded-2xl bg-white text-center hover:bg-[#FBF9F4] transition-all cursor-pointer group"
      >
        <Upload className="w-8 h-8 text-[#4F5B2A] mx-auto mb-2 group-hover:scale-110 transition-transform" />
        <div className="text-xs font-bold text-[#1C1613]">
          Drag and drop images here, or browse files
        </div>
        <div className="text-[11px] text-[#8C7E72] mt-1">
          Supports PNG, JPG, WebP up to 10MB · Automatically synced to Sanity Cloud Asset CDN
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#E8E1D5]">
        <div className="flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search filename..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-[#FBF9F4] border border-[#D8CEBE] rounded-lg text-[#1C1613] placeholder-[#9E9085] focus:outline-hidden focus:border-[#4F5B2A]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {['all', 'uploads', 'hero', 'artisans', 'testimonials', 'moments', 'other'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg capitalize font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#4F5B2A] text-white font-semibold'
                  : 'bg-[#F8F5EE] text-[#7A6E65] hover:bg-[#EAE3D5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs text-[#8C7E72]">
          Loading media library...
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-xl border border-[#E8E1D5] p-8">
          <Search className="w-8 h-8 text-[#9E9085] mx-auto mb-2" />
          <h3 className="font-display text-base font-semibold text-[#1C1613]">No assets found</h3>
          <p className="text-xs text-[#8C7E72] mt-1">Try another search query or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white border border-[#E8E1D5] hover:border-[#4F5B2A] rounded-xl overflow-hidden group shadow-xs transition-all flex flex-col"
            >
              <div className="relative aspect-4/3 bg-[#F3EFE6] overflow-hidden">
                <Image
                  src={asset.url}
                  alt={asset.filename}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                />
                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] uppercase font-mono font-semibold bg-black/60 text-white backdrop-blur-xs">
                  {asset.category}
                </span>
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#1C1613] truncate" title={asset.filename}>
                    {asset.filename}
                  </p>
                  <p className="text-[10px] text-[#8C7E72] font-mono mt-0.5">
                    {(asset.sizeBytes / 1024).toFixed(1)} KB
                  </p>
                </div>

                <div className="flex items-center gap-1.5 pt-2 border-t border-[#F3EFE6]">
                  <button
                    onClick={() => handleCopy(asset.url)}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 text-[11px] font-medium bg-[#FBF9F4] hover:bg-[#4F5B2A] hover:text-white border border-[#D8CEBE] rounded transition-colors text-center cursor-pointer"
                  >
                    {copiedUrl === asset.url ? (
                      <>
                        <Check className="w-3 h-3 text-[#4F5B2A]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#7A6E65]" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  {asset.category === 'uploads' && (
                    <button
                      onClick={() => setDeleteTarget(asset)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#8A3B35] bg-[#FDF2F0] border border-[#8A3B35]/40 hover:bg-[#8A3B35] hover:text-white rounded transition-colors cursor-pointer"
                      title="Delete uploaded image"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Remove Uploaded Asset"
        message={`Are you sure you want to delete ${deleteTarget?.filename}? This cannot be undone.`}
        confirmText="Delete Asset"
        isDanger
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
