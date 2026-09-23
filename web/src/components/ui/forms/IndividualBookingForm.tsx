'use client'

import { useState } from 'react'
import { Field, inputClass, postEnquiry } from '@/components/ui/form/Field'
import { formatEventDate, formatPrice } from '@/content/events'

interface IndividualBookingFormProps {
  eventTitle?: string
  eventDate?: string
  eventTime?: string
  eventEndTime?: string
  eventCity?: string
  eventVenue?: string
  eventPrice?: number
  isWeekly?: boolean
}

export function IndividualBookingForm({
  eventTitle,
  eventDate,
  eventTime,
  eventEndTime,
  eventCity,
  eventVenue,
  eventPrice,
  isWeekly,
}: IndividualBookingFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: eventTitle || '',
  })

  const validate = () => {
    const next: Record<string, string> = {}
    if (!data.name.trim()) next.name = 'Full name is required'
    if (!data.email.trim() || !data.email.includes('@')) next.email = 'A valid email is required'
    if (!data.phone.trim()) next.phone = 'Phone number is required'
    if (!data.experience.trim()) next.experience = 'Tell us which session you want'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    try {
      await postEnquiry({
        intent: 'individual',
        ...data,
        date: eventDate,
        time: eventTime,
        city: eventCity,
        venue: eventVenue,
        message: `B2C booking request for ${data.experience}`,
      })
      setStatus('submitted')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'submitted') {
    return (
      <div className="text-center py-10 space-y-3">
        <p className="font-display text-fluid-2xl text-[#2B231F]">Request received</p>
        <p className="font-sans text-sm text-[#6E635B] max-w-md mx-auto font-light">
          This is not a confirmed reservation. We will reply about availability for {data.experience || 'this session'}.
        </p>
      </div>
    )
  }

  const timeLabel = eventTime ? (eventEndTime ? `${eventTime} – ${eventEndTime}` : eventTime) : undefined
  const priceLabel = formatPrice(eventPrice)

  return (
    <form onSubmit={onSubmit} className="space-y-6 font-sans" noValidate>
      <div className="border border-[#E8E1D5] bg-[#F3EFE6] p-5 space-y-2 text-sm text-[#2B231F]">
        <p className="font-display text-xl">{data.experience || 'Experience to be confirmed'}</p>
        {eventDate && <p>{formatEventDate(eventDate)}</p>}
        {timeLabel && <p>{timeLabel}</p>}
        {(eventVenue || eventCity) && <p>{[eventVenue || 'Venue to be confirmed', eventCity].filter(Boolean).join(', ')}</p>}
        <p className="font-semibold text-[#4F5B2A] text-base pt-1">
          {priceLabel
            ? isWeekly
              ? `Listed session price: ${priceLabel}`
              : `Event Price: ${priceLabel} / person`
            : 'Price to be confirmed'}
        </p>
      </div>
      <Field label="Full name" required error={errors.name}>
        <input className={inputClass} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} autoComplete="name" />
      </Field>
      <Field label="Email address" required error={errors.email}>
        <input type="email" className={inputClass} value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} autoComplete="email" />
      </Field>
      <Field label="Phone number" required error={errors.phone}>
        <input type="tel" className={inputClass} value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} autoComplete="tel" />
      </Field>
      {status === 'error' && <p className="text-sm text-[#4F5B2A]">The request could not be sent. Please try again.</p>}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full min-h-12 py-4 bg-[#2B231F] text-[#FBF9F4] text-[15px] font-medium hover:bg-[#4F5B2A] transition-colors disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'Send booking request'}
      </button>
    </form>
  )
}
