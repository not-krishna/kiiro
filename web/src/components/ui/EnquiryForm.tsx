'use client'

import { useState } from 'react'

export type EnquiryIntent = 'individual' | 'group'

interface EnquiryFormProps {
  intent?: EnquiryIntent
  defaultCategory?: string
  defaultSubject?: string
  workshopSlug?: string
  submitLabel?: string
}

const GROUP_CATEGORIES = ['Corporate & Team', 'Hospitality & Luxury', 'Schools & Colleges', 'CSR & Partnerships']
const INDIVIDUAL_CATEGORIES = ['Individual Workshop']
const BATCH_OPTIONS = ['15–25', '26–45', '46–99', '100+']

export function EnquiryForm({
  intent = 'group',
  defaultCategory,
  defaultSubject = '',
  workshopSlug,
  submitLabel,
}: EnquiryFormProps) {
  const categories = intent === 'individual' ? INDIVIDUAL_CATEGORIES : GROUP_CATEGORIES
  const [category, setCategory] = useState(defaultCategory || categories[0])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    city: '',
    participantsCount: '15–25',
    message: defaultSubject ? `Enquiry regarding: ${defaultSubject}` : '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const response = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent,
          category,
          workshopSlug,
          ...formData,
        }),
      })
      if (!response.ok) throw new Error('Failed')
      setStatus('submitted')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'submitted') {
    return (
      <div className="bg-[#F3EFE6] border border-[#E8E1D5] p-8 md:p-12 text-center space-y-4">
        <h3 className="font-serif text-2xl text-[#2B231F]">Request received</h3>
        <p className="text-sm text-[#6E635B] max-w-md mx-auto leading-relaxed">
          Thank you, {formData.name}. The Kiiro team will reply to this {intent === 'individual' ? 'booking' : 'group'} request.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#E8E1D5] p-6 md:p-10 space-y-6 font-sans">
      {intent === 'group' && (
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6E635B] font-semibold">Organisation type</p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`py-2 px-3 text-xs tracking-wider border text-center ${
                  category === cat
                    ? 'bg-[#2B231F] text-white border-[#2B231F]'
                    : 'bg-[#FBF9F4] text-[#6E635B] border-[#E8E1D5] hover:border-[#C2593F]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="block">
          <span className="block text-xs uppercase tracking-[0.18em] text-[#6E635B] mb-1.5">Full name *</span>
          <input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-[#FBF9F4] border border-[#E8E1D5] px-4 py-3 text-sm text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
          />
        </label>
        <label className="block">
          <span className="block text-xs uppercase tracking-[0.18em] text-[#6E635B] mb-1.5">Email *</span>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-[#FBF9F4] border border-[#E8E1D5] px-4 py-3 text-sm text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="block">
          <span className="block text-xs uppercase tracking-[0.18em] text-[#6E635B] mb-1.5">Phone</span>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-[#FBF9F4] border border-[#E8E1D5] px-4 py-3 text-sm text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
          />
        </label>
        {intent === 'group' && (
          <label className="block">
            <span className="block text-xs uppercase tracking-[0.18em] text-[#6E635B] mb-1.5">Organisation</span>
            <input
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="w-full bg-[#FBF9F4] border border-[#E8E1D5] px-4 py-3 text-sm text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
            />
          </label>
        )}
        {intent === 'individual' && (
          <label className="block">
            <span className="block text-xs uppercase tracking-[0.18em] text-[#6E635B] mb-1.5">City</span>
            <input
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-[#FBF9F4] border border-[#E8E1D5] px-4 py-3 text-sm text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
            />
          </label>
        )}
      </div>

      {intent === 'group' && (
        <label className="block">
          <span className="block text-xs uppercase tracking-[0.18em] text-[#6E635B] mb-1.5">Expected group size</span>
          <select
            value={formData.participantsCount}
            onChange={(e) => setFormData({ ...formData, participantsCount: e.target.value })}
            className="w-full bg-[#FBF9F4] border border-[#E8E1D5] px-4 py-3 text-sm text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
          >
            {BATCH_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="block">
        <span className="block text-xs uppercase tracking-[0.18em] text-[#6E635B] mb-1.5">Message *</span>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-[#FBF9F4] border border-[#E8E1D5] px-4 py-3 text-sm text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
        />
      </label>

      {status === 'error' && (
        <p className="text-sm text-[#C2593F]">The request could not be sent. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-[#C2593F] hover:bg-[#A84A33] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : submitLabel || (intent === 'individual' ? 'Book Your Spot' : 'Send group enquiry')}
      </button>
    </form>
  )
}
