'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Home,
  Calendar,
  Layers,
  Camera,
  GraduationCap,
  HeartHandshake,
  MessageSquareQuote,
  Image as ImageIcon,
  Settings,
  Sparkles,
  ExternalLink,
  UploadCloud,
  Globe,
  LogOut,
  Send,
} from 'lucide-react'
import { useToast } from './Toast'
import { usePublish } from './PublishContext'

interface AdminHeaderProps {
  user?: {
    username: string
    name: string
  }
  onToggleSidebar?: () => void
  sidebarCollapsed?: boolean
}

const SECTION_TITLES: Record<
  string,
  { title: string; category: string; icon: React.ComponentType<{ className?: string }> }
> = {
  '/admin': { title: 'Dashboard & Overview', category: 'General', icon: LayoutDashboard },
  '/admin/homepage': { title: 'Homepage & Hero Copy', category: 'Website', icon: Home },
  '/admin/events': { title: 'Sessions & Masterclasses', category: 'Events', icon: Calendar },
  '/admin/offerings': { title: 'Craft Offerings (36)', category: 'Curriculum', icon: Layers },
  '/admin/studio-moments': { title: 'Moments from Studio', category: 'Social Proof', icon: Camera },
  '/admin/advisory': { title: 'Distinguished Advisory', category: 'People', icon: GraduationCap },
  '/admin/artisans': { title: 'Artisan Wisdom & Network', category: 'People', icon: HeartHandshake },
  '/admin/testimonials': { title: 'Testimonials & Reviews', category: 'Social Proof', icon: MessageSquareQuote },
  '/admin/media': { title: 'Media & Asset Library', category: 'Assets', icon: ImageIcon },
  '/admin/settings': { title: 'Settings & Cloud Sync', category: 'System', icon: Settings },
}

export function AdminHeader({ user, onToggleSidebar, sidebarCollapsed }: AdminHeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const {
    pendingCount,
    isPublishing,
    lastPublishedAt,
    hasUnsavedFormChanges,
    setPublishModalOpen,
    triggerPublish,
  } = usePublish()

  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  // Derive section context from current path
  const currentKey = Object.keys(SECTION_TITLES).find(
    (k) => k === pathname || (k !== '/admin' && pathname.startsWith(k))
  )
  const context = currentKey ? SECTION_TITLES[currentKey] : { title: 'Admin Studio', category: 'CMS', icon: Sparkles }
  const HeaderIcon = context.icon

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      toast('Logged out successfully', 'info')
      router.push('/admin/login')
      router.refresh()
    } catch {
      router.push('/admin/login')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-[#E8E1D5] px-4 md:px-6 flex items-center justify-between shrink-0 transition-all">
      {/* Left: Breadcrumbs & Context */}
      <div className="flex items-center gap-3 min-w-0">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle navigation menu"
            className="p-2 -ml-1 rounded-lg text-[#6E635B] hover:text-[#1C1613] hover:bg-[#F3EFE6] transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}

        <div className="flex items-center gap-2 text-xs text-[#8C7E72] min-w-0">
          <span className="hidden sm:inline font-mono uppercase text-[10px] tracking-wider text-[#9E9085]">
            {context.category}
          </span>
          <span className="hidden sm:inline text-[#D8CEBE]">/</span>
          <div className="flex items-center gap-1.5 font-semibold text-[#1C1613] truncate">
            <HeaderIcon className="w-4 h-4 text-[#4F5B2A] shrink-0" />
            <span className="truncate">{context.title}</span>
          </div>
        </div>

        {/* Unsaved form changes warning badge */}
        {hasUnsavedFormChanges && (
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FDF3E5] text-[#B87B1E] border border-[#F3DFC1] animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B87B1E]" />
            Unsaved Changes in Form
          </span>
        )}
      </div>

      {/* Right Actions: Preview Link, PUSH Button, Profile */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Preview Link */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#4F5B2A] border border-[#D8CEBE] rounded-lg hover:bg-[#F3EFE6] transition-colors"
          title="Open live website in a new tab"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* ============================================================= */}
        {/* PERSISTENT PUSH BUTTON (Top-Right Required Feature) */}
        {/* ============================================================= */}
        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <button
              onClick={() => setPublishModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium text-[#B87B1E] hover:bg-[#FDF3E5] transition-colors"
              title="Review pending changes before pushing"
            >
              <span>{pendingCount} pending</span>
            </button>
          )}

          <button
            onClick={() => triggerPublish()}
            disabled={isPublishing}
            className={`relative group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 min-h-[40px] rounded-lg text-xs font-bold tracking-wider uppercase transition-all shadow-xs cursor-pointer ${
              isPublishing
                ? 'bg-[#6E635B] text-white cursor-wait opacity-80'
                : pendingCount > 0
                ? 'bg-[#4F5B2A] hover:bg-[#3E4820] text-white shadow-[#4F5B2A]/25 ring-2 ring-[#4F5B2A]/30 animate-pulse'
                : 'bg-[#1C1613] hover:bg-[#2F2722] text-[#EAE3D5]'
            }`}
            title={
              pendingCount > 0
                ? `Push ${pendingCount} pending changes live to Sanity Cloud`
                : 'Sanity Cloud is up-to-date. Click to force full re-sync.'
            }
          >
            {isPublishing ? (
              <>
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>PUSHING...</span>
              </>
            ) : pendingCount > 0 ? (
              <>
                <span className="w-2 h-2 rounded-full bg-[#E5B54F] animate-ping" />
                <span>PUSH ({pendingCount})</span>
                <Send className="w-3.5 h-3.5 ml-0.5" />
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F5B2A]" />
                <span>PUSH</span>
                <span className="text-[10px] opacity-70">LIVE</span>
              </>
            )}
          </button>
        </div>

        <div className="h-5 w-px bg-[#E8E1D5]" />

        {/* User Account Controls */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 text-right p-1 rounded-lg hover:bg-[#F3EFE6] transition-colors min-w-[40px] min-h-[40px] cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#EAE3D5] text-[#4F5B2A] border border-[#D8CEBE] flex items-center justify-center text-xs font-bold font-mono">
              {user?.name ? user.name[0] : 'K'}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-[#1C1613] leading-tight">
                {user?.name || 'Administrator'}
              </div>
              <div className="text-[10px] text-[#7A6E65] font-mono leading-tight">
                @{user?.username || 'kiiroadmin'}
              </div>
            </div>
          </button>

          {profileDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E8E1D5] py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
              onClick={() => setProfileDropdownOpen(false)}
            >
              <div className="px-4 py-2 border-b border-[#F3EFE6]">
                <div className="text-xs font-semibold text-[#1C1613]">{user?.name || 'Administrator'}</div>
                <div className="text-[11px] text-[#7A6E65] font-mono">Role: Full Publisher</div>
                {lastPublishedAt && (
                  <div className="text-[10px] text-[#9E9085] mt-1">
                    Last pushed: {new Date(lastPublishedAt).toLocaleTimeString()}
                  </div>
                )}
              </div>

              <Link
                href="/admin/settings"
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#2B231F] hover:bg-[#F8F5EE] transition-colors"
              >
                <Settings className="w-4 h-4 text-[#7A6E65]" />
                <span>System & Sanity Config</span>
              </Link>

              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#2B231F] hover:bg-[#F8F5EE] transition-colors"
              >
                <Globe className="w-4 h-4 text-[#7A6E65]" />
                <span>View Public Website</span>
              </Link>

              <div className="border-t border-[#F3EFE6] my-1" />

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-[#8A3B35] hover:bg-[#FBEAE8] transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-[#8A3B35]" />
                <span>{isLoggingOut ? 'Signing out...' : 'Sign Out'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
