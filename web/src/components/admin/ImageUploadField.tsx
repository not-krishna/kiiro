'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, Trash2, RefreshCw, ImageIcon, Layers } from 'lucide-react'
import { MediaPickerModal } from './MediaPickerModal'

interface ImageUploadFieldProps {
  label: string
  value?: string
  alt?: string
  onChange: (url: string, alt?: string) => void
  onRemove?: () => void
  description?: string
  aspectRatio?: 'square' | 'video' | 'portrait' | 'any'
}

export function ImageUploadField({
  label,
  value,
  alt = '',
  onChange,
  onRemove,
  description,
  aspectRatio = 'any',
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [altText, setAltText] = useState(alt)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      onChange(data.url, altText || file.name)
    } catch (err: any) {
      setError(err.message || 'Failed to upload image')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAlt = e.target.value
    setAltText(newAlt)
    if (value) {
      onChange(value, newAlt)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
          {label}
        </label>
        {value && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs text-[#8A3B35] hover:underline font-medium cursor-pointer"
          >
            Remove Image
          </button>
        )}
      </div>

      {description && <p className="text-xs text-[#6E635B] font-light">{description}</p>}

      {value ? (
        <div className="space-y-3">
          <div className="relative border border-[#D8CEBE] bg-[#EAE3D5] rounded-xl overflow-hidden group max-w-md h-52 shadow-xs">
            <Image
              src={value}
              alt={altText || 'Selected asset'}
              fill
              className="object-cover"
              sizes="420px"
              unoptimized={value.startsWith('/uploads/')}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
              <button
                type="button"
                onClick={() => setIsPickerOpen(true)}
                className="px-3 py-1.5 bg-[#4F5B2A] text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-[#3D4720] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Media Library</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-white text-[#2B231F] text-xs font-semibold rounded-lg shadow-sm hover:bg-[#F3EFE6] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New</span>
              </button>
              {onRemove && (
                <button
                  type="button"
                  onClick={onRemove}
                  className="px-3 py-1.5 bg-[#8A3B35] text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-[#6D2E29] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 max-w-md">
            <input
              type="text"
              value={altText}
              onChange={handleAltChange}
              placeholder="Accessibility alt text..."
              className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-lg bg-white text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
            />
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-[#D8CEBE] hover:border-[#4F5B2A] bg-white rounded-xl p-5 text-center transition-colors max-w-md space-y-3">
          <div className="space-y-1">
            <div className="mx-auto w-10 h-10 rounded-full bg-[#F3EFE6] text-[#4F5B2A] flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#2B231F] font-semibold">
              Select or Upload an Image
            </div>
            <p className="text-[11px] text-[#968A80]">Choose from your Sanity media library or upload a file</p>
          </div>

          <div className="flex items-center justify-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => setIsPickerOpen(true)}
              className="px-3.5 py-2 bg-[#4F5B2A] hover:bg-[#3D4720] text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5 transition-colors"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Choose from Media Library</span>
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-3.5 py-2 bg-white hover:bg-[#F3EFE6] text-[#2B231F] border border-[#D8CEBE] text-xs font-semibold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              {isUploading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#4F5B2A]" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
              <span>{isUploading ? 'Uploading...' : 'Upload from Device'}</span>
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-[#8A3B35] font-medium">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <MediaPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={(url, filename) => {
          onChange(url, altText || filename)
        }}
        currentValue={value}
        title={`Select ${label}`}
      />
    </div>
  )
}
