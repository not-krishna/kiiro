'use client'

import { useState } from 'react'
import { Field, inputClass, postEnquiry } from '@/components/ui/form/Field'
import { CORPORATE_WORKSHOPS } from '@/content/workshops'

interface CorporatePlanningFormProps {
  workshopSlug?: string
  workshopName?: string
}

export function CorporatePlanningForm({ workshopSlug, workshopName }: CorporatePlanningFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    designation: '',
    department: '',
    workshop: workshopName || workshopSlug || '',
    mind: '',
  })

  const validate = () => {
    const next: Record<string, string> = {}
    if (!data.name.trim()) next.name = 'Full name is required'
    if (!data.email.trim() || !data.email.includes('@')) next.email = 'A valid email is required'
    if (!data.phone.trim()) next.phone = 'Phone number is required'
    if (!data.organization.trim()) next.organization = 'Organisation is required'
    if (!data.designation.trim()) next.designation = 'Designation is required'
    if (!data.department.trim()) next.department = 'Department is required'
    if (!data.workshop.trim()) next.workshop = 'Tell us the experience of interest'
    if (!data.mind.trim()) next.mind = 'Share what you have in mind'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    try {
      await postEnquiry({
        intent: 'group',
        workshopSlug,
        ...data,
        message: data.mind,
      })
      setStatus('submitted')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'submitted') {
    return (
      <div className="text-center py-10 space-y-3">
        <p className="font-display text-fluid-2xl text-[#2B231F]">Enquiry received</p>
        <p className="font-sans text-sm text-[#6E635B] max-w-md mx-auto font-light">
          This is not a confirmed booking. We will reply to {data.organization} about what is possible.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 font-sans" noValidate>
      <p className="text-sm text-[#6E635B] font-light">
        You can describe an idea beyond the workshops listed. Listing a name does not guarantee it can be hosted.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Full name" required error={errors.name}>
          <input className={inputClass} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} autoComplete="name" />
        </Field>
        <Field label="Email address" required error={errors.email}>
          <input type="email" className={inputClass} value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} autoComplete="email" />
        </Field>
      </div>
      <Field label="Phone number" required error={errors.phone}>
        <input type="tel" className={inputClass} value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} autoComplete="tel" />
      </Field>
      <Field label="Organisation" required error={errors.organization}>
        <input className={inputClass} value={data.organization} onChange={(e) => setData({ ...data, organization: e.target.value })} autoComplete="organization" />
      </Field>
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Designation" required error={errors.designation}>
          <input className={inputClass} value={data.designation} onChange={(e) => setData({ ...data, designation: e.target.value })} />
        </Field>
        <Field label="Department" required error={errors.department}>
          <input className={inputClass} value={data.department} onChange={(e) => setData({ ...data, department: e.target.value })} />
        </Field>
      </div>
      <Field label="Experience or workshop of interest" required error={errors.workshop}>
        <input
          list="workshop-ideas"
          className={inputClass}
          value={data.workshop}
          onChange={(e) => setData({ ...data, workshop: e.target.value })}
          placeholder="Pottery, block printing, or another idea"
        />
        <datalist id="workshop-ideas">
          {CORPORATE_WORKSHOPS.map((workshop) => (
            <option key={workshop.slug} value={workshop.name} />
          ))}
        </datalist>
      </Field>
      <Field label="What's on your mind?" required error={errors.mind}>
        <textarea
          rows={5}
          className={inputClass}
          value={data.mind}
          onChange={(e) => setData({ ...data, mind: e.target.value })}
          placeholder="Tell us what kind of experience you have in mind..."
        />
      </Field>
      {status === 'error' && <p className="text-sm text-[#C2593F]">The enquiry could not be sent. Please try again.</p>}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full min-h-12 py-4 bg-[#2B231F] text-[#FBF9F4] text-[15px] font-medium hover:bg-[#C2593F] disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'Plan a Corporate Experience'}
      </button>
    </form>
  )
}
