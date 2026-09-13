'use client'

import { useState } from 'react'
import { Field, inputClass, postEnquiry } from '@/components/ui/form/Field'

interface IndividualBookingFormProps {
  eventTitle?: string
  eventDate?: string
  eventTime?: string
}

export function IndividualBookingForm({ eventTitle, eventDate, eventTime }: IndividualBookingFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    participants: '1',
    experience: eventTitle || '',
    date: eventDate || '',
    time: eventTime || '',
  })

  const validate = () => {
    const next: Record<string, string> = {}
    if (!data.name.trim()) next.name = 'Name is required'
    if (!data.email.trim() || !data.email.includes('@')) next.email = 'A valid email is required'
    if (!data.experience.trim()) next.experience = 'Tell us which session you want'
    if (!data.participants || Number(data.participants) < 1) next.participants = 'At least one participant'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    try {
      await postEnquiry({ intent: 'individual', ...data })
      setStatus('submitted')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'submitted') {
    return (
      <div className="text-center py-10 space-y-3">
        <p className="font-display text-fluid-2xl text-[#2B231F]">Spot requested</p>
        <p className="font-sans text-xs text-[#6E635B] max-w-md mx-auto font-light">
          We will confirm availability for {data.experience || 'this session'} and follow up by email.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 font-sans" noValidate>
      <Field label="Session / experience" required error={errors.experience}>
        <input
          className={inputClass}
          value={data.experience}
          onChange={(e) => setData({ ...data, experience: e.target.value })}
        />
      </Field>
      <div className="grid md:grid-cols-3 gap-6">
        <Field label="Date">
          <input
            type="date"
            className={inputClass}
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />
        </Field>
        <Field label="Time">
          <input
            type="time"
            className={inputClass}
            value={data.time}
            onChange={(e) => setData({ ...data, time: e.target.value })}
          />
        </Field>
        <Field label="Participants" required error={errors.participants}>
          <input
            type="number"
            min={1}
            className={inputClass}
            value={data.participants}
            onChange={(e) => setData({ ...data, participants: e.target.value })}
          />
        </Field>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Your name" required error={errors.name}>
          <input className={inputClass} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input
            type="email"
            className={inputClass}
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Phone">
        <input
          type="tel"
          className={inputClass}
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
      </Field>
      {status === 'error' && <p className="text-sm text-[#C2593F]">The request could not be sent. Please try again.</p>}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-4 bg-[#2B231F] text-[#FBF9F4] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#C2593F] transition-all disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'Request this spot'}
      </button>
    </form>
  )
}
