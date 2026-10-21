import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'kiiro_admin_session'
const AUTH_SECRET = process.env.KIIRO_AUTH_SECRET || 'kiiro-creative-wellness-secret-key-2026-v1'

/**
 * Edge-compatible session validation using Web Crypto API
 */
async function isValidSession(token?: string): Promise<boolean> {
  if (!token || typeof token !== 'string') return false
  const parts = token.split('.')
  if (parts.length !== 2) return false

  const [encodedPayload, signature] = parts
  try {
    // Check expiration first
    const binary = atob(encodedPayload.replace(/-/g, '+').replace(/_/g, '/'))
    const payload = JSON.parse(binary)
    const now = Math.floor(Date.now() / 1000)
    if (!payload.exp || payload.exp < now || payload.role !== 'admin') {
      return false
    }

    // Verify HMAC-SHA256 signature using Web Crypto
    const encoder = new TextEncoder()
    const keyData = encoder.encode(AUTH_SECRET)
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )

    // Convert base64url signature back to Uint8Array
    const sigBinary = atob(signature.replace(/-/g, '+').replace(/_/g, '/'))
    const sigBytes = new Uint8Array(sigBinary.length)
    for (let i = 0; i < sigBinary.length; i++) {
      sigBytes[i] = sigBinary.charCodeAt(i)
    }

    return await crypto.subtle.verify(
      'HMAC',
      cryptoKey,
      sigBytes,
      encoder.encode(encodedPayload)
    )
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authHeader = request.headers.get('authorization')
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined
  const sessionCookie = request.cookies.get(COOKIE_NAME)?.value || bearerToken
  const hasValidSession = await isValidSession(sessionCookie)

  // 1. If accessing /admin/login while already authenticated -> redirect to /admin
  if (pathname === '/admin/login' && hasValidSession) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  // 2. Allow public access to login page and public login API
  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return NextResponse.next()
  }

  // 3. Protect all other /admin routes
  if (pathname.startsWith('/admin')) {
    if (!hasValidSession) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = '/admin/login'
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // 4. Protect all /api/admin mutation and data endpoints
  if (pathname.startsWith('/api/admin')) {
    if (!hasValidSession) {
      return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
