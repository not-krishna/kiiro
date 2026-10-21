'use client'

import React, { useState } from 'react'
import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'
import { PublishProvider } from './PublishContext'
import { PublishModal } from './PublishModal'

interface AdminLayoutClientProps {
  user: {
    username: string
    name: string
  }
  children: React.ReactNode
}

export function AdminLayoutClient({ user, children }: AdminLayoutClientProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <PublishProvider>
      <div className="min-h-screen bg-[#FBF9F4] text-[#2B231F] flex antialiased selection:bg-[#4F5B2A]/20">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex">
          <AdminSidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
          />
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative z-10 w-64 h-full">
              <AdminSidebar onCloseMobile={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        {/* Right Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <AdminHeader
            user={user}
            onToggleSidebar={() => {
              if (window.innerWidth < 768) {
                setMobileOpen(true)
              } else {
                setCollapsed(!collapsed)
              }
            }}
            sidebarCollapsed={collapsed}
          />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>

        {/* Global Publish Modal */}
        <PublishModal />
      </div>
    </PublishProvider>
  )
}
