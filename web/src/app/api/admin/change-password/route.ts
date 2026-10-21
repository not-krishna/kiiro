import { NextRequest, NextResponse } from 'next/server'
import {
  getAdminFromRequest,
  getOrCreateAdminCredentials,
  verifyPassword,
  updateAdminPassword,
} from '@/lib/auth/adminAuth'

export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      )
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'New password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    const currentCreds = getOrCreateAdminCredentials()
    const isValid = verifyPassword(currentPassword, currentCreds.passwordHash, currentCreds.salt)
    if (!isValid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })
    }

    const success = updateAdminPassword(newPassword)
    if (!success) {
      return NextResponse.json({ error: 'Failed to update password' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully',
    })
  } catch (error) {
    console.error('Password change error:', error)
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 })
  }
}
