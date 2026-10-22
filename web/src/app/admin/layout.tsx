import React from 'react'
import { getCurrentAdmin } from '@/lib/auth/adminAuth'
import { ToastProvider } from '@/components/admin/Toast'
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'MELD EXPERIENCES CMS Studio & Admin',
  description: 'Manage website content, events, offerings, advisory, and media for MELD EXPERIENCES.',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await getCurrentAdmin()

  // If unauthenticated (e.g. login page), render without the sidebar chrome
  if (!admin) {
    return <ToastProvider>{children}</ToastProvider>
  }

  return (
    <ToastProvider>
      <AdminLayoutClient user={{ username: admin.username, name: admin.name }}>
        {children}
      </AdminLayoutClient>
    </ToastProvider>
  )
}
