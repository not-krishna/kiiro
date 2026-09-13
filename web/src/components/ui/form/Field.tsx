import Link from 'next/link'

import type { ReactNode } from 'react'

interface FieldProps {
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}

export function Field({ label, required, error, children }: FieldProps) {
  return (
    <label className="block space-y-2">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#2B231F]">
        {label}
        {required ? ' *' : ''}
      </span>
      {children}
      {error ? <span className="block text-[11px] text-[#C2593F]">{error}</span> : null}
    </label>
  )
}

export const inputClass =
  'w-full min-h-12 px-4 py-3 bg-[#F3EFE6] border border-[#E8E1D5] text-sm text-[#2B231F] focus:outline-none focus:border-[#C2593F]'

export async function postEnquiry(payload: Record<string, unknown>) {
  const response = await fetch('/api/enquire', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error('Unable to send')
}
