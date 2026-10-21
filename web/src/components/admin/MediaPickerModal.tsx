'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  X,
  Search,
  Upload,
  Check,
  ImageIcon,
  RefreshCw,
  FolderOpen,
  Filter,
} from 'lucide-react'
import type { MediaAssetItem } from '@/app/api/admin/media/route'

interface MediaPickerModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (url: string, filename?: string) => void
  currentValue?: string
  title?: string
}

export function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  currentValue,
  title = 'Select Media Asset',
}: MediaPickerModalProps) {
  const [assets, setAssets] = useState<MediaAssetItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('all')
  const [selectedAsset, setSelectedAsset] = useState<MediaAssetItem | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadAssets = async () => {
    setLoading(true)
    setErrorMsg(null)
    try {
      const res = await fetch('/api/admin/media')
      const json = await res.json()
      if (json.success && Array.isArray(json.assets)) {
        setAssets(json.assets)
        if (currentValue) {
          const match = json.assets.find((a: MediaAssetItem) => a.url === currentValue)
          if (match) setSelectedAsset(match)
        }
      } else {
        setErrorMsg('Failed to load media assets from library')
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error connecting to media library')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      loadAssets()
    }
  }, [isOpen])

  // Keyboard close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setErrorMsg(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const json = await res.json()
      if (res.ok && json.success) {
        const newAsset: MediaAssetItem = {
          id: json.sanityAsset?._id || json.filename,
          filename: json.filename,
          url: json.url,
          sizeBytes: json.size || 0,
          category: 'uploads',
          lastModified: new Date().toISOString(),
        }
        setAssets((prev) => {
          const filtered = prev.filter(
            (a) => a.url !== newAsset.url && a.filename !== newAsset.filename
          )
          return [newAsset, ...filtered]
        })
        setSelectedAsset(newAsset)
      } else {
        setErrorMsg(json.error || 'Upload failed')
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'File upload error')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  if (!isOpen) return null

  const filteredAssets = assets.filter((a) => {
    const matchesSearch = a.filename.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || a.category === category
    return matchesSearch && matchesCategory
  })

  const formatSize = (bytes: number) => {
    if (!bytes) return ''
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FBF9F4] w-full max-w-5xl rounded-2xl border border-[#D8CEBE] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[#E8E1D5] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg bg-[#F3EFE6] text-[#4F5B2A] flex items-center justify-center shrink-0">
                <ImageIcon className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <h2 className="font-display text-base sm:text-lg font-semibold text-[#2B231F] leading-tight">{title}</h2>
                <p className="text-[11px] sm:text-xs text-[#6E635B] font-light hidden sm:block">
                  Choose from existing Sanity & local media, or upload directly from device
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:hidden text-[#968A80] hover:text-[#2B231F] rounded-lg hover:bg-[#F3EFE6] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex-1 sm:flex-none px-3.5 py-2 bg-[#4F5B2A] hover:bg-[#3D4720] text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer flex items-center justify-center gap-2 transition-colors disabled:opacity-50 min-h-[38px]"
            >
              {uploading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              <span>{uploading ? 'Uploading...' : 'Upload from Device'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="hidden sm:inline-flex p-2 text-[#968A80] hover:text-[#2B231F] rounded-lg hover:bg-[#F3EFE6] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-3 border-b border-[#E8E1D5] bg-[#F7F4EC] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#968A80]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assets by filename..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#D8CEBE] rounded-lg text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
            {[
              { id: 'all', label: 'All Media' },
              { id: 'uploads', label: 'Uploads' },
              { id: 'hero', label: 'Hero' },
              { id: 'artisans', label: 'Artisans' },
              { id: 'testimonials', label: 'Testimonials' },
              { id: 'moments', label: 'Moments' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
                  category === cat.id
                    ? 'bg-[#2B231F] text-white shadow-xs'
                    : 'bg-white text-[#6E635B] border border-[#D8CEBE] hover:bg-[#F3EFE6]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E8E1D5]">
          {/* Asset Grid (2 cols) */}
          <div className="md:col-span-2 overflow-y-auto p-4 sm:p-6 max-h-[45vh] md:max-h-[55vh]">
            {loading ? (
              <div className="py-16 text-center space-y-3">
                <RefreshCw className="w-6 h-6 text-[#4F5B2A] animate-spin mx-auto" />
                <p className="text-xs text-[#6E635B]">Loading media library assets...</p>
              </div>
            ) : errorMsg ? (
              <div className="py-8 text-center text-xs text-[#8A3B35] font-medium bg-[#FDF2F0] p-4 rounded-lg border border-[#8A3B35]/30">
                {errorMsg}
              </div>
            ) : filteredAssets.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <FolderOpen className="w-8 h-8 text-[#C4B8A8] mx-auto" />
                <p className="text-xs font-medium text-[#2B231F]">No assets found</p>
                <p className="text-[11px] text-[#968A80]">
                  Try adjusting search or upload a new image above.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {filteredAssets.map((asset) => {
                  const isSelected = selectedAsset?.url === asset.url
                  return (
                    <div
                      key={asset.id}
                      onClick={() => setSelectedAsset(asset)}
                      className={`group relative rounded-xl border overflow-hidden cursor-pointer transition-all aspect-square bg-[#EAE3D5] ${
                        isSelected
                          ? 'border-[#4F5B2A] ring-3 ring-[#4F5B2A]/30 shadow-md'
                          : 'border-[#D8CEBE] hover:border-[#4F5B2A]/60 hover:shadow-xs'
                      }`}
                    >
                      <Image
                        src={asset.url}
                        alt={asset.filename}
                        fill
                        className="object-cover transition-transform group-hover:scale-105 duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        unoptimized={asset.url.startsWith('/uploads/')}
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-[#4F5B2A] text-white flex items-center justify-center shadow-md">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1.5 sm:p-2 text-white">
                        <p className="text-[10px] sm:text-[11px] truncate font-medium">{asset.filename}</p>
                        {asset.sizeBytes > 0 && (
                          <p className="text-[9px] text-[#D8CEBE] hidden sm:block">{formatSize(asset.sizeBytes)}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Asset Preview Column (1 col) */}
          <div className="p-4 sm:p-6 bg-white overflow-y-auto max-h-[30vh] md:max-h-[55vh]">
            {selectedAsset ? (
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#4F5B2A] block">
                  Selected Asset Preview
                </span>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#D8CEBE] bg-[#F3EFE6] shadow-xs">
                  <Image
                    src={selectedAsset.url}
                    alt={selectedAsset.filename}
                    fill
                    className="object-cover"
                    sizes="300px"
                    unoptimized={selectedAsset.url.startsWith('/uploads/')}
                  />
                </div>
                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="text-[#968A80] block text-[10px] uppercase font-medium">Filename</span>
                    <span className="font-semibold text-[#2B231F] break-all text-[11px]">{selectedAsset.filename}</span>
                  </div>
                  {selectedAsset.sizeBytes > 0 && (
                    <div>
                      <span className="text-[#968A80] block text-[10px] uppercase font-medium">File Size</span>
                      <span className="font-medium text-[#2B231F] text-[11px]">{formatSize(selectedAsset.sizeBytes)}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-[#968A80] block text-[10px] uppercase font-medium">Location</span>
                    <span className="font-mono text-[10px] text-[#6E635B] break-all">{selectedAsset.url}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#F3EFE6] text-[#968A80] flex items-center justify-center">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <p className="text-xs text-[#968A80]">Tap any image to select</p>
              </div>
            )}
          </div>
        </div>

        {/* Docked Action Footer (Always Visible on Mobile & Desktop) */}
        <div className="p-3 sm:p-4 bg-[#FBF9F4] border-t border-[#E8E1D5] flex items-center justify-end gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#6E635B] bg-[#F3EFE6] hover:bg-[#EAE3D5] rounded-lg transition-colors cursor-pointer min-h-[40px]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!selectedAsset}
            onClick={() => {
              if (selectedAsset) {
                onSelect(selectedAsset.url, selectedAsset.filename)
                onClose()
              }
            }}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#4F5B2A] hover:bg-[#3D4720] rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs min-h-[40px] flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Select Image</span>
          </button>
        </div>
      </div>
    </div>
  )
}
