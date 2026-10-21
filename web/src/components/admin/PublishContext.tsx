'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useToast } from './Toast'
import type { PendingChangeItem } from '@/lib/cms/contentStore'

export interface PublishResult {
  success: boolean
  syncedCount: number
  revalidatedRoutes: string[]
  publishedChangesCount: number
  errors: string[]
  timestamp: string
  durationMs?: number
  mode?: 'targeted' | 'full'
}

interface PublishContextType {
  pendingChanges: PendingChangeItem[]
  pendingCount: number
  lastPublishedAt: string | null
  isPublishing: boolean
  hasWriteToken: boolean
  hasUnsavedFormChanges: boolean
  setHasUnsavedFormChanges: (hasUnsaved: boolean) => void
  publishModalOpen: boolean
  setPublishModalOpen: (open: boolean) => void
  lastPublishResult: PublishResult | null
  refreshPublishStatus: () => Promise<void>
  triggerPublish: (options?: { forceFullSync?: boolean }) => Promise<boolean>
}

const PublishContext = createContext<PublishContextType | undefined>(undefined)

export function PublishProvider({ children }: { children: React.ReactNode }) {
  const { success, error } = useToast()
  const [pendingChanges, setPendingChanges] = useState<PendingChangeItem[]>([])
  const [lastPublishedAt, setLastPublishedAt] = useState<string | null>(null)
  const [isPublishing, setIsPublishing] = useState(false)
  const [hasWriteToken, setHasWriteToken] = useState(true)
  const [hasUnsavedFormChanges, setHasUnsavedFormChanges] = useState(false)
  const [publishModalOpen, setPublishModalOpen] = useState(false)
  const [lastPublishResult, setLastPublishResult] = useState<PublishResult | null>(null)

  const refreshPublishStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/publish')
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setPendingChanges(data.pendingChanges || [])
          setLastPublishedAt(data.lastPublishedAt || null)
          setHasWriteToken(Boolean(data.hasWriteToken))
        }
      }
    } catch {
      // Offline / error silent fallback
    }
  }, [])

  useEffect(() => {
    refreshPublishStatus()
    // Poll every 15 seconds
    const interval = setInterval(refreshPublishStatus, 15000)
    return () => clearInterval(interval)
  }, [refreshPublishStatus])

  const triggerPublish = async (options?: { forceFullSync?: boolean }): Promise<boolean> => {
    if (isPublishing) return false
    setIsPublishing(true)

    try {
      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          forceFullSync: Boolean(options?.forceFullSync),
        }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setLastPublishResult(data)
        setPublishModalOpen(true)
        setPendingChanges([])
        setLastPublishedAt(data.timestamp)
        const timeText = typeof data.durationMs === 'number' ? ` in ${(data.durationMs / 1000).toFixed(1)}s` : ''
        success(`Published ${data.syncedCount} items to live site${timeText}!`)
        // Dispatch custom event for modules to refresh if needed
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('kiiro-content-published'))
        }
        return true
      } else {
        const errorMsg = data.errors?.length ? data.errors.join('; ') : data.error || 'Publishing failed'
        error(errorMsg)
        return false
      }
    } catch (err: any) {
      error(err.message || 'Network error triggering publish')
      return false
    } finally {
      setIsPublishing(false)
      refreshPublishStatus()
    }
  }

  return (
    <PublishContext.Provider
      value={{
        pendingChanges,
        pendingCount: pendingChanges.length,
        lastPublishedAt,
        isPublishing,
        hasWriteToken,
        hasUnsavedFormChanges,
        setHasUnsavedFormChanges,
        publishModalOpen,
        setPublishModalOpen,
        lastPublishResult,
        refreshPublishStatus,
        triggerPublish,
      }}
    >
      {children}
    </PublishContext.Provider>
  )
}

const defaultPublishContext: PublishContextType = {
  pendingChanges: [],
  pendingCount: 0,
  lastPublishedAt: null,
  isPublishing: false,
  hasWriteToken: true,
  hasUnsavedFormChanges: false,
  setHasUnsavedFormChanges: () => {},
  publishModalOpen: false,
  setPublishModalOpen: () => {},
  lastPublishResult: null,
  refreshPublishStatus: async () => {},
  triggerPublish: async () => false,
}

export function usePublish() {
  const context = useContext(PublishContext)
  return context || defaultPublishContext
}
