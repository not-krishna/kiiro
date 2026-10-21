import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export interface AdminUser {
  username: string
  role: 'admin'
  name: string
  lastLoginAt?: string
}

interface StoredAuth {
  username: string
  salt: string
  passwordHash: string
  name: string
  updatedAt: string
}

interface SessionPayload {
  username: string
  role: 'admin'
  name: string
  exp: number
  iat: number
}

const COOKIE_NAME = 'kiiro_admin_session'
const SESSION_TTL_SECONDS = 60 * 60 * 24 // 24 hours
const AUTH_SECRET = process.env.KIIRO_AUTH_SECRET || 'kiiro-creative-wellness-secret-key-2026-v1'

// Rate limiting in-memory map
interface RateLimitRecord {
  attempts: number
  lockoutUntil: number
}
const loginRateLimitMap = new Map<string, RateLimitRecord>()

function getAuthStorePath(): string {
  const dir = path.join(process.cwd(), 'src', 'content', 'store')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  return path.join(dir, 'admin-auth.json')
}

export function hashPassword(password: string, existingSalt?: string): { hash: string; salt: string } {
  const salt = existingSalt || crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return { hash, salt }
}

export function verifyPassword(password: string, storedHash: string, salt: string): boolean {
  try {
    const key = crypto.scryptSync(password, salt, 64).toString('hex')
    return crypto.timingSafeEqual(Buffer.from(key, 'hex'), Buffer.from(storedHash, 'hex'))
  } catch {
    return false
  }
}

/**
 * Ensures admin credentials exist. If not initialized, bootstrap with initial salted credentials.
 */
export function getOrCreateAdminCredentials(): StoredAuth {
  const storePath = getAuthStorePath()
  if (fs.existsSync(storePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(storePath, 'utf8')) as StoredAuth
      if (data.username && data.passwordHash && data.salt) {
        return data
      }
    } catch {
      // Fall through to bootstrap
    }
  }

  // Bootstrap initial admin credentials securely
  const defaultUsername = process.env.KIIRO_ADMIN_USERNAME || 'kiiroadmin'
  const defaultPassword = process.env.KIIRO_ADMIN_INITIAL_PASSWORD || 'k1rr0@dmin'
  const { hash, salt } = hashPassword(defaultPassword)

  const initialAuth: StoredAuth = {
    username: defaultUsername,
    salt,
    passwordHash: hash,
    name: 'Kiiro Administrator',
    updatedAt: new Date().toISOString(),
  }

  try {
    fs.writeFileSync(storePath, JSON.stringify(initialAuth, null, 2), 'utf8')
  } catch (err) {
    console.error('Failed to write admin credentials store:', err)
  }

  return initialAuth
}

export function updateAdminPassword(newPassword: string): boolean {
  const current = getOrCreateAdminCredentials()
  const { hash, salt } = hashPassword(newPassword)
  const updated: StoredAuth = {
    ...current,
    salt,
    passwordHash: hash,
    updatedAt: new Date().toISOString(),
  }
  try {
    fs.writeFileSync(getAuthStorePath(), JSON.stringify(updated, null, 2), 'utf8')
    return true
  } catch (err) {
    console.error('Failed to update admin password:', err)
    return false
  }
}

// Session Token Creation & Verification using signed payload
export function createSessionToken(user: AdminUser): string {
  const now = Math.floor(Date.now() / 1000)
  const payload: SessionPayload = {
    username: user.username,
    role: user.role,
    name: user.name,
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  }

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(encodedPayload)
    .digest('base64url')

  return `${encodedPayload}.${signature}`
}

export function verifySessionToken(token?: string): SessionPayload | null {
  if (!token || typeof token !== 'string') return null
  const parts = token.split('.')
  if (parts.length !== 2) return null

  const [encodedPayload, signature] = parts
  const expectedSig = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(encodedPayload)
    .digest('base64url')

  if (signature.length !== expectedSig.length) return null
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
    return null
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as SessionPayload
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp < now) {
      return null
    }
    return payload
  } catch {
    return null
  }
}

export function checkRateLimit(key: string): { allowed: boolean; waitSeconds?: number } {
  const now = Date.now()
  const record = loginRateLimitMap.get(key)
  if (!record) return { allowed: true }

  if (record.lockoutUntil > now) {
    return {
      allowed: false,
      waitSeconds: Math.ceil((record.lockoutUntil - now) / 1000),
    }
  }

  return { allowed: true }
}

export function recordFailedLogin(key: string): void {
  const now = Date.now()
  const record = loginRateLimitMap.get(key) || { attempts: 0, lockoutUntil: 0 }
  record.attempts += 1

  // Lockout for 5 minutes after 5 failed attempts
  if (record.attempts >= 5) {
    record.lockoutUntil = now + 5 * 60 * 1000
    record.attempts = 0
  }

  loginRateLimitMap.set(key, record)
}

export function resetRateLimit(key: string): void {
  loginRateLimitMap.delete(key)
}

/**
 * Server-side session verification for Server Components & API route handlers
 */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value
    const payload = verifySessionToken(token)
    if (!payload) return null
    return {
      username: payload.username,
      role: payload.role,
      name: payload.name,
    }
  } catch {
    return null
  }
}

/**
 * Helper to inspect session from incoming NextRequest in Route Handlers
 */
export function getAdminFromRequest(req: NextRequest): AdminUser | null {
  const authHeader = req.headers.get('authorization')
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined
  const token = req.cookies.get(COOKIE_NAME)?.value || bearerToken
  const payload = verifySessionToken(token)
  if (!payload) return null
  return {
    username: payload.username,
    role: payload.role,
    name: payload.name,
  }
}

export { COOKIE_NAME, SESSION_TTL_SECONDS }
