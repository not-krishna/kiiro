'use client'

import React from 'react'
import Link from 'next/link'
import { CheckCircle2, Send, X, ExternalLink } from 'lucide-react'
import { usePublish } from './PublishContext'

export function PublishModal() {
  const {
    publishModalOpen,
    setPublishModalOpen,
    lastPublishResult,
    pendingChanges,
    pendingCount,
    isPublishing,
    triggerPublish,
  } = usePublish()

  if (!publishModalOpen) return null

  const isSuccessSummary = Boolean(lastPublishResult && pendingCount === 0)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-[#E8E1D5] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#EAE3D5] flex items-center justify-between bg-[#FBF9F4]">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-base ${
                isSuccessSummary ? 'bg-[#EBF3E5] text-[#4F5B2A]' : 'bg-[#FDF3E5] text-[#B87B1E]'
              }`}
            >
              {isSuccessSummary ? <CheckCircle2 className="w-5 h-5 text-[#4F5B2A]" /> : <Send className="w-4 h-4 text-[#B87B1E]" />}
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#1C1613]">
                {isSuccessSummary ? 'Publication Completed' : 'Pending Changes Review'}
              </h3>
              <p className="text-xs text-[#7A6E65]">
                {isSuccessSummary
                  ? 'Sanity Cloud dataset updated & live website caches revalidated.'
                  : `${pendingCount} document${pendingCount === 1 ? '' : 's'} staged for live publication.`}
              </p>
            </div>
          </div>
          <button
            onClick={() => setPublishModalOpen(false)}
            className="text-[#9E9085] hover:text-[#231C18] p-1.5 rounded-lg hover:bg-[#EAE3D5] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {isSuccessSummary && lastPublishResult && (
            <div className="space-y-5">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-lg bg-[#F8F5EE] border border-[#EAE3D5] text-center">
                  <div className="text-2xl font-bold font-display text-[#4F5B2A]">
                    {lastPublishResult.syncedCount}
                  </div>
                  <div className="text-[11px] font-medium text-[#7A6E65] mt-0.5">
                    Synced Documents
                  </div>
                </div>
                <div className="p-3.5 rounded-lg bg-[#F8F5EE] border border-[#EAE3D5] text-center">
                  <div className="text-2xl font-bold font-display text-[#1C1613]">
                    {lastPublishResult.revalidatedRoutes.length}
                  </div>
                  <div className="text-[11px] font-medium text-[#7A6E65] mt-0.5">
                    Routes Cleared
                  </div>
                </div>
                <div className="p-3.5 rounded-lg bg-[#F8F5EE] border border-[#EAE3D5] text-center">
                  <div className="text-2xl font-bold font-display text-[#B87B1E]">
                    {typeof lastPublishResult.durationMs === 'number'
                      ? `${(lastPublishResult.durationMs / 1000).toFixed(1)}s`
                      : '< 1s'}
                  </div>
                  <div className="text-[11px] font-medium text-[#7A6E65] mt-0.5">
                    Push Duration
                  </div>
                </div>
                <div className="p-3.5 rounded-lg bg-[#F8F5EE] border border-[#EAE3D5] text-center">
                  <div className="text-xs font-bold font-display text-[#4F5B2A] uppercase pt-2">
                    {lastPublishResult.mode === 'targeted' ? 'Targeted' : 'Full Sync'}
                  </div>
                  <div className="text-[11px] font-medium text-[#7A6E65] mt-1">
                    Pipeline Mode
                  </div>
                </div>
              </div>

              {/* Revalidated Pages */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6E65] mb-2.5">
                  Refreshed Live Pages ({lastPublishResult.revalidatedRoutes.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {lastPublishResult.revalidatedRoutes.map((routePath) => {
                    const labelMap: Record<string, string> = {
                      '/': 'Homepage',
                      '/weekly-events': 'Weekly Events',
                      '/offerings': 'Offerings & Craft',
                      '/experiences': 'Experiences',
                      '/artforms': 'Art Forms',
                      '/about': 'About & Lineage',
                      '/artisans': 'Artisans Network',
                      '/products': 'Shop & Artifacts',
                      '/impact': 'Impact & Metrics',
                    }
                    const label = labelMap[routePath] || routePath
                    return (
                      <Link
                        key={routePath}
                        href={routePath}
                        target="_blank"
                        className="flex items-center justify-between p-2.5 rounded-lg border border-[#E8E1D5] hover:border-[#4F5B2A] hover:bg-[#F3EFE6] text-xs font-medium text-[#2B231F] transition-colors"
                      >
                        <span className="truncate">{label}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#4F5B2A] shrink-0" />
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div className="text-[11px] text-[#9E9085] flex items-center justify-between pt-2 border-t border-[#EAE3D5]">
                <span>Published at: {new Date(lastPublishResult.timestamp).toLocaleTimeString()}</span>
                <span className="font-mono">Dataset: production</span>
              </div>
            </div>
          )}

          {!isSuccessSummary && (
            <div className="space-y-4">
              <div className="text-xs text-[#5A4F46] leading-relaxed bg-[#FBF9F4] p-3.5 rounded-lg border border-[#EAE3D5]">
                These changes have been saved into your working drafts. Pressing <strong>PUSH</strong> will validate content, synchronize to Sanity Cloud with high-throughput bounded concurrency, and immediately revalidate the affected website cache.
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6E65]">
                  Staged Changes ({pendingChanges.length})
                </h4>
                <div className="space-y-1.5 divide-y divide-[#F3EFE6]">
                  {pendingChanges.map((change) => (
                    <div
                      key={change.id}
                      className="pt-2 first:pt-0 flex items-center justify-between text-xs"
                    >
                      <div className="min-w-0 pr-3">
                        <div className="font-medium text-[#2B231F] truncate">{change.title}</div>
                        <div className="text-[11px] text-[#8C7E72]">
                          Section: <span className="capitalize">{change.section}</span> · by {change.author || 'Admin'}
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            change.action === 'create'
                              ? 'bg-[#EBF3E5] text-[#4F5B2A]'
                              : change.action === 'delete'
                              ? 'bg-[#FBEAE8] text-[#8A3B35]'
                              : 'bg-[#FDF3E5] text-[#B87B1E]'
                          }`}
                        >
                          {change.action}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#FBF9F4] border-t border-[#EAE3D5] flex items-center justify-between gap-3">
          <div>
            {!isSuccessSummary && (
              <button
                type="button"
                onClick={() => triggerPublish({ forceFullSync: true })}
                disabled={isPublishing}
                className="text-[11px] text-[#7A6E65] hover:text-[#1C1613] underline transition-colors cursor-pointer"
                title="Synchronize all 78 documents across the entire catalog"
              >
                Force full catalog sync
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPublishModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-[#6E635B] hover:text-[#1C1613] hover:bg-[#EAE3D5] rounded-lg transition-colors cursor-pointer"
            >
              {isSuccessSummary ? 'Done' : 'Cancel'}
            </button>

            {!isSuccessSummary && (
              <button
                onClick={() => triggerPublish()}
                disabled={isPublishing}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#4F5B2A] hover:bg-[#3D4721] disabled:opacity-50 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                {isPublishing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Pushing Live...</span>
                  </>
                ) : (
                  <>
                    <span>Push {pendingCount} Pending Changes Live</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
