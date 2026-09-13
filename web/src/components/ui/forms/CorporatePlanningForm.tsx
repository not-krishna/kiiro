'use client'

import { useState } from 'react'
import { Field, inputClass, postEnquiry } from '@/components/ui/form/Field'
import { CORPORATE_WORKSHOPS } from '@/content/workshops'

interface CorporatePlanningFormProps {
  workshopSlug?: string
  workshopName?: string
}

export function CorporatePlanningForm({ workshopSlug, workshopName }: CorporatePlanningFormProps) {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [data, setData] = useState({
    organization: '',
    name: '',
    email: '',
    phone: '',
    workshop: workshopName || workshopSlug || '',
    participantsCount: '15–25',
    date: '',
    duration: '',
    location: '',
    requirements: '',
  })

  const validateStep = (current: number) => {
    const next: Record<string, string> = {}
    if (current === 1) {
      if (!data.organization.trim()) next.organization = 'Organisation is required'
      if (!data.name.trim()) next.name = 'Contact name is required'
      if (!data.email.trim() || !data.email.includes('@')) next.email = 'A valid email is required'
    }
    if (current === 2) {
      if (!data.workshop.trim()) next.workshop = 'Choose a workshop'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(3)) return
    if (!data.requirements.trim()) {
      setErrors({ requirements: 'A short note on what you need helps us plan' })
      return
    }
    setStatus('submitting')
    try {
      await postEnquiry({ intent: 'group', workshopSlug, ...data })
      setStatus('submitted')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'submitted') {
    return (
      <div className="text-center py-10 space-y-3">
        <p className="font-display text-fluid-2xl text-[#2B231F]">Group enquiry received</p>
        <p className="font-sans text-xs text-[#6E635B] max-w-md mx-auto font-light">
          We will reply with availability, batch pricing, and a proposed format for {data.organization}.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 font-sans" noValidate>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#968A80]">Step {step} of 3</p>

      {step === 1 && (
        <div className="space-y-6">
          <h3 className="font-display text-xl text-[#2B231F]">Who is planning this</h3>
          <Field label="Organisation" required error={errors.organization}>
            <input className={inputClass} value={data.organization} onChange={(e) => setData({ ...data, organization: e.target.value })} />
          </Field>
          <Field label="Contact person" required error={errors.name}>
            <input className={inputClass} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
          </Field>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Email" required error={errors.email}>
              <input type="email" className={inputClass} value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            </Field>
            <Field label="Phone">
              <input type="tel" className={inputClass} value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
            </Field>
          </div>
          <button
            type="button"
            onClick={() => validateStep(1) && setStep(2)}
            className="w-full py-4 bg-[#2B231F] text-[#FBF9F4] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#C2593F]"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h3 className="font-display text-xl text-[#2B231F]">The experience</h3>
          <Field label="Preferred workshop" required error={errors.workshop}>
            <select
              className={inputClass}
              value={data.workshop}
              onChange={(e) => setData({ ...data, workshop: e.target.value })}
            >
              <option value="">Select from the catalogue</option>
              {CORPORATE_WORKSHOPS.map((workshop) => (
                <option key={workshop.slug} value={workshop.name}>
                  {workshop.name}
                  {workshop.durationDays === 2 ? ' (2-day)' : ''}
                </option>
              ))}
            </select>
          </Field>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Number of participants">
              <select
                className={inputClass}
                value={data.participantsCount}
                onChange={(e) => setData({ ...data, participantsCount: e.target.value })}
              >
                <option>15–25</option>
                <option>26–45</option>
                <option>46–99</option>
                <option>100+</option>
              </select>
            </Field>
            <Field label="Preferred date">
              <input type="date" className={inputClass} value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} />
            </Field>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Duration">
              <input className={inputClass} placeholder="Half day, full day, 2 days" value={data.duration} onChange={(e) => setData({ ...data, duration: e.target.value })} />
            </Field>
            <Field label="Location">
              <input className={inputClass} value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })} />
            </Field>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 border border-[#2B231F] text-xs font-semibold uppercase tracking-[0.2em]">
              Back
            </button>
            <button
              type="button"
              onClick={() => validateStep(2) && setStep(3)}
              className="flex-1 py-4 bg-[#2B231F] text-[#FBF9F4] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#C2593F]"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h3 className="font-display text-xl text-[#2B231F]">Requirements</h3>
          <Field label="What should this group leave with" required error={errors.requirements}>
            <textarea
              rows={5}
              className={inputClass}
              value={data.requirements}
              onChange={(e) => setData({ ...data, requirements: e.target.value })}
            />
          </Field>
          {status === 'error' && <p className="text-sm text-[#C2593F]">The enquiry could not be sent. Please try again.</p>}
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 border border-[#2B231F] text-xs font-semibold uppercase tracking-[0.2em]">
              Back
            </button>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="flex-1 py-4 bg-[#2B231F] text-[#FBF9F4] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#C2593F] disabled:opacity-50"
            >
              {status === 'submitting' ? 'Sending…' : 'Send group enquiry'}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
