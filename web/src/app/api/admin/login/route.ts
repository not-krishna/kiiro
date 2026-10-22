import { NextRequest, NextResponse } from 'next/server'
import {
  getOrCreateAdminCredentials,
  verifyPassword,
  createSessionToken,
  checkRateLimit,
  recordFailedLogin,
  resetRateLimit,
  COOKIE_NAME,
  SESSION_TTL_SECONDS,
} from '@/lib/auth/adminAuth'

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'local'
    const rateCheck = checkRateLimit(ip)
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed attempts. Please wait ${rateCheck.waitSeconds} seconds before trying again.`,
        },
        { status: 429 }
      )
    }

    const body = await req.json().catch(() => ({}))
    const { username, password } = body

    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
    }

    const admin = getOrCreateAdminCredentials()

    // Compare username case-insensitively (supports both meldadmin and kiiroadmin)
    const normalizedInputUser = username.trim().toLowerCase()
    const storedUser = admin.username.toLowerCase()
    const isUserMatch =
      storedUser === normalizedInputUser ||
      (normalizedInputUser === 'meldadmin' && (storedUser === 'kiiroadmin' || storedUser === 'meldadmin')) ||
      (normalizedInputUser === 'kiiroadmin' && (storedUser === 'kiiroadmin' || storedUser === 'meldadmin'))

    const isPassMatch = isUserMatch ? verifyPassword(password, admin.passwordHash, admin.salt) : false

    if (!isUserMatch || !isPassMatch) {
      recordFailedLogin(ip)
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
    }

    // Success: reset rate limiting
    resetRateLimit(ip)

    const user = {
      username: admin.username,
      role: 'admin' as const,
      name: admin.name,
    }

    const token = createSessionToken(user)

    const response = NextResponse.json({
      success: true,
      user,
      token,
      message: 'Authentication successful',
    })

    // Set secure HttpOnly session cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: req.nextUrl.protocol === 'https:',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_TTL_SECONDS,
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal authentication error' }, { status: 500 })
  }
}
