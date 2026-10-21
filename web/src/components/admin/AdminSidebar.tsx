'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Home,
  Layers,
  BookOpen,
  Calendar,
  GraduationCap,
  HeartHandshake,
  MessageSquareQuote,
  Camera,
  Image as ImageIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
} from 'lucide-react'
import { usePublish } from './PublishContext'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number | string
}

interface NavGroup {
  groupName: string
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    groupName: 'Core',
    items: [
      { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    ],
  },
  {
    groupName: 'Website & Editorial',
    items: [
      { label: 'Homepage & Hero', href: '/admin/homepage', icon: Home },
      { label: 'Offerings & Craft', href: '/admin/offerings', icon: Layers, badge: '36' },
      { label: 'Journal & Stories', href: '/admin/journal', icon: BookOpen },
    ],
  },
  {
    groupName: 'Events & Calendar',
    items: [
      { label: 'Sessions & Events', href: '/admin/events', icon: Calendar, badge: '13' },
    ],
  },
  {
    groupName: 'People & Voices',
    items: [
      { label: 'Distinguished Advisory', href: '/admin/advisory', icon: GraduationCap, badge: '6' },
      { label: 'Artisan Wisdom', href: '/admin/artisans', icon: HeartHandshake, badge: '3' },
      { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote, badge: '9' },
      { label: 'Studio Moments', href: '/admin/studio-moments', icon: Camera, badge: '3' },
    ],
  },
  {
    groupName: 'Assets & Config',
    items: [
      { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
      { label: 'Settings & Sanity', href: '/admin/settings', icon: Settings },
    ],
  },
]

interface AdminSidebarProps {
  collapsed?: boolean
  onToggleCollapse?: () => void
  onCloseMobile?: () => void
}

export function AdminSidebar({ collapsed = false, onToggleCollapse, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname()
  const { pendingCount } = usePublish()

  return (
    <aside
      className={`bg-[#1A1512] text-[#EAE3D5] flex flex-col shrink-0 border-r border-[#2C231E] select-none transition-all duration-300 ease-in-out ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 border-b border-[#2C231E] flex items-center justify-between">
        {!collapsed ? (
          <Link href="/admin" className="flex items-center gap-2.5" onClick={onCloseMobile}>
            <div className="w-8 h-8 rounded-lg bg-[#4F5B2A] flex items-center justify-center font-serif text-white font-bold text-sm shadow-inner">
              K
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-wider text-[#FBF9F4] block leading-none">
                KIIRO
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#D99B26] font-mono block mt-1">
                Studio CMS
              </span>
            </div>
          </Link>
        ) : (
          <Link href="/admin" className="mx-auto block" onClick={onCloseMobile}>
            <div className="w-9 h-9 rounded-lg bg-[#4F5B2A] flex items-center justify-center font-serif text-white font-bold text-base shadow-inner">
              K
            </div>
          </Link>
        )}

        {onCloseMobile ? (
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-[#7A6E65] hover:text-[#EAE3D5] hover:bg-[#2C231E] transition-colors md:hidden flex items-center justify-center min-w-[36px] min-h-[36px] cursor-pointer"
            title="Close navigation drawer"
            aria-label="Close navigation drawer"
          >
            <X className="w-5 h-5" />
          </button>
        ) : onToggleCollapse && !collapsed ? (
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded text-[#7A6E65] hover:text-[#EAE3D5] hover:bg-[#2C231E] transition-colors cursor-pointer"
            title="Collapse sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        ) : null}
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
        {NAV_GROUPS.map((group) => (
          <div key={group.groupName} className="space-y-1">
            {!collapsed && (
              <div className="px-3 pb-1 text-[9px] uppercase tracking-[0.2em] font-semibold text-[#6E635B]">
                {group.groupName}
              </div>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#4F5B2A] text-white font-semibold shadow-xs'
                      : 'text-[#C5BBAF] hover:bg-[#29201A] hover:text-[#FBF9F4]'
                  } ${collapsed ? 'justify-center px-0' : ''}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span className="truncate flex-1">{item.label}</span>}
                  {!collapsed && item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#2E241E] text-[#9E9085]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Bottom Status / Collapse Toggle */}
      <div className="p-3 border-t border-[#2C231E] bg-[#14100E] text-xs text-[#7A6E65]">
        {!collapsed ? (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4F5B2A] animate-pulse" />
                <span className="font-mono text-[#A89C8F]">s47moswb</span>
              </span>
              <span className="text-[10px] bg-[#2C231E] text-[#D99B26] px-1.5 py-0.5 rounded font-mono">
                production
              </span>
            </div>

            {pendingCount > 0 ? (
              <div className="text-[10px] text-[#D99B26] flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D99B26]" />
                <span>{pendingCount} unpublished changes</span>
              </div>
            ) : (
              <div className="text-[10px] text-[#4F5B2A] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>All documents live</span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <button
              onClick={onToggleCollapse}
              className="p-1 rounded text-[#7A6E65] hover:text-[#EAE3D5] hover:bg-[#2C231E] transition-colors"
              title="Expand sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
