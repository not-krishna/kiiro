'use client'

import React, { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextUrl = searchParams.get('next') || '/admin'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!username.trim() || !password) {
      setErrorMessage('Please enter both username and password.')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMessage(data.error || 'Invalid credentials. Please try again.')
        setIsLoading(false)
        return
      }

      // Success: redirect to intended admin path
      router.push(nextUrl)
      router.refresh()
    } catch {
      setErrorMessage('A network error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#2B231F] flex flex-col justify-center items-center p-6 selection:bg-[#E8D9C8]">
      {/* Brand Header */}
      <div className="mb-8 text-center space-y-2">
        <Link href="/" className="inline-block">
          <span className="font-display text-2xl font-semibold tracking-wider text-[#2B231F]">
            MELD EXPERIENCES
          </span>
        </Link>
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#4F5B2A] font-semibold">
          Content Operating System & Admin
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white border border-[#D8CEBE] shadow-xl p-8 rounded-lg space-y-6">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-semibold text-[#2B231F]">
            Administrator Sign In
          </h1>
          <p className="text-xs text-[#6E635B] font-light leading-relaxed">
            Authorized access only. Manage live experiences, weekly events, advisory profiles, and media.
          </p>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="p-3.5 bg-[#FDF2F0] border border-[#F2C0B8] text-[#8A3B35] rounded-md text-xs font-medium flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-[#8A3B35] mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="username"
              className="block text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. kiiroadmin"
              className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F4] border border-[#D8CEBE] rounded-md text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-xs uppercase tracking-wider font-semibold text-[#4F5B2A]"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-[#6E635B] hover:text-[#2B231F] font-medium"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F4] border border-[#D8CEBE] rounded-md text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden transition-colors font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 bg-[#4F5B2A] hover:bg-[#3D4721] text-white text-sm font-medium tracking-wide rounded-md transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <span>Sign In to Dashboard &rarr;</span>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-[#E8E1D5] text-center">
          <Link
            href="/"
            className="text-xs text-[#6E635B] hover:text-[#4F5B2A] transition-colors"
          >
            &larr; Return to public site
          </Link>
        </div>
      </div>

      {/* Security notice */}
      <p className="mt-8 text-[11px] text-[#968A80] text-center max-w-xs">
        Encrypted sessions with rate limiting protection. All administrative actions are recorded.
      </p>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBF9F4]" />}>
      <LoginForm />
    </Suspense>
  )
}
