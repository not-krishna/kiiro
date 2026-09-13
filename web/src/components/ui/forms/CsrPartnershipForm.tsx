'use client'

import { useState } from 'react'
import { Field, inputClass, postEnquiry } from '@/components/ui/form/Field'

const PARTNERSHIP_TYPES = ['Capacity building', 'Craft gifting', 'Needs ideation', 'Long-term CSR']
const INTERESTS = ['Artisan livelihoods', 'Education', 'Hospitality programmes', 'Community making']
const SCALE = ['Single programme', 'Annual partnership', 'Multi-year']

export function CsrPartnershipForm() {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [data, setData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    partnershipType: '',
    interest: '',
    scale: '',
    message: '',
  })

  const validate = (current: number) => {
    const next: Record<string, string> = {}
    if (current === 1) {
      if (!data.name.trim()) next.name = 'Name is required'
      if (!data.organization.trim()) next.organization = 'Organisation is required'
      if (!data.email.trim() || !data.email.includes('@')) next.email = 'A valid email is required'
    }
    if (current === 2) {
      if (!data.partnershipType) next.partnershipType = 'Choose a partnership type'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!data.message.trim()) {
      setErrors({ message: 'A short note is required' })
      return
    }
    setStatus('submitting')
    try {
      await postEnquiry({ intent: 'csr', category: 'CSR & Partnerships', ...data })
      setStatus('submitted')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'submitted') {
    return (
      <div className="text-center py-10 space-y-3">
        <p className="font-display text-fluid-2xl text-[#2B231F]">Partnership note received</p>
        <p className="font-sans text-xs text-[#6E635B] max-w-md mx-auto font-light">
          The partnerships team will reply to {data.email} with next steps.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 font-sans" noValidate>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#968A80]">Step {step} of 3</p>

      {step === 1 && (
        <div className="space-y-6">
          <h3 className="font-display text-xl">About you</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Name" required error={errors.name}>
              <input className={inputClass} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
            </Field>
            <Field label="Organisation" required error={errors.organization}>
              <input className={inputClass} value={data.organization} onChange={(e) => setData({ ...data, organization: e.target.value })} />
            </Field>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Email" required error={errors.email}>
              <input type="email" className={inputClass} value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            </Field>
            <Field label="Phone">
              <input type="tel" className={inputClass} value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
            </Field>
          </div>
          <button type="button" onClick={() => validate(1) && setStep(2)} className="w-full py-4 bg-[#2B231F] text-[#FBF9F4] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#C2593F]">
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h3 className="font-display text-xl">Partnership</h3>
          <Field label="Partnership type" required error={errors.partnershipType}>
            <div className="grid sm:grid-cols-2 gap-2">
              {PARTNERSHIP_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setData({ ...data, partnershipType: type })}
                  className={`min-h-12 px-3 text-xs uppercase tracking-[0.12em] border text-left ${
                    data.partnershipType === type ? 'bg-[#2B231F] text-white border-[#2B231F]' : 'border-[#E8E1D5] bg-[#F3EFE6]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Area of interest">
            <select className={inputClass} value={data.interest} onChange={(e) => setData({ ...data, interest: e.target.value })}>
              <option value="">Optional</option>
              {INTERESTS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Expected scale">
            <select className={inputClass} value={data.scale} onChange={(e) => setData({ ...data, scale: e.target.value })}>
              <option value="">Optional</option>
              {SCALE.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 border border-[#2B231F] text-xs font-semibold uppercase tracking-[0.2em]">
              Back
            </button>
            <button type="button" onClick={() => validate(2) && setStep(3)} className="flex-1 py-4 bg-[#2B231F] text-[#FBF9F4] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#C2593F]">
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h3 className="font-display text-xl">Next step</h3>
          <Field label="Message / requirements" required error={errors.message}>
            <textarea rows={5} className={inputClass} value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} />
          </Field>
          {status === 'error' && <p className="text-sm text-[#C2593F]">The note could not be sent. Please try again.</p>}
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 border border-[#2B231F] text-xs font-semibold uppercase tracking-[0.2em]">
              Back
            </button>
            <button type="submit" disabled={status === 'submitting'} className="flex-1 py-4 bg-[#2B231F] text-[#FBF9F4] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#C2593F] disabled:opacity-50">
              {status === 'submitting' ? 'Sending…' : 'Partner with Kiiro'}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
