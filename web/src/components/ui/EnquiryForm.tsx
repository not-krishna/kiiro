'use client'

import { useState } from 'react'

interface EnquiryFormProps {
  defaultCategory?: string
  defaultSubject?: string
}

export function EnquiryForm({ defaultCategory = 'Individual Workshop', defaultSubject = '' }: EnquiryFormProps) {
  const [category, setCategory] = useState(defaultCategory)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    city: '',
    participantsCount: '15-30',
    message: defaultSubject ? `Enquiry regarding: ${defaultSubject}` : '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setTimeout(() => {
      setStatus('submitted')
    }, 1200)
  }

  if (status === 'submitted') {
    return (
      <div className="bg-[#F3EDE2] border border-[#E8E1D5] p-8 md:p-12 text-center rounded-sm space-y-4">
        <div className="w-12 h-12 bg-[#C2593F] text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
          ✓
        </div>
        <h3 className="font-serif text-2xl text-[#2B231F]">Enquiry Received</h3>
        <p className="text-sm text-[#6E635B] max-w-md mx-auto leading-relaxed">
          Thank you for reaching out, <span className="font-semibold text-[#2B231F]">{formData.name}</span>. Our team will review your enquiry for <span className="font-semibold text-[#C2593F]">{category}</span> and connect with you within 24 hours.
        </p>
        <button
          onClick={() => {
            setStatus('idle')
            setFormData({
              name: '',
              email: '',
              phone: '',
              organization: '',
              city: '',
              participantsCount: '15-30',
              message: '',
            })
          }}
          className="mt-4 text-xs font-sans uppercase tracking-[0.2em] text-[#C2593F] underline hover:text-[#2B231F]"
        >
          Submit Another Enquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#E8E1D5] p-6 md:p-10 space-y-6 shadow-xs font-sans">
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-[0.2em] text-[#6E635B] font-semibold">
          Enquiry Category
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            'Individual Workshop',
            'Corporate & Team',
            'Schools & Colleges',
            'CSR & Partnerships',
          ].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`py-2 px-3 text-xs tracking-wider border text-center transition-all ${
                category === cat
                  ? 'bg-[#2B231F] text-white border-[#2B231F] font-medium'
                  : 'bg-[#FBF9F4] text-[#6E635B] border-[#E8E1D5] hover:border-[#C2593F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-[0.18em] text-[#6E635B] font-medium mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Priyamvada Sharma"
            className="w-full bg-[#FBF9F4] border border-[#E8E1D5] px-4 py-3 text-sm text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.18em] text-[#6E635B] font-medium mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@organization.com"
            className="w-full bg-[#FBF9F4] border border-[#E8E1D5] px-4 py-3 text-sm text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-[0.18em] text-[#6E635B] font-medium mb-1.5">
            Phone / WhatsApp
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98765 43210"
            className="w-full bg-[#FBF9F4] border border-[#E8E1D5] px-4 py-3 text-sm text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.18em] text-[#6E635B] font-medium mb-1.5">
            Organization / School
          </label>
          <input
            type="text"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            placeholder="Company or Institution"
            className="w-full bg-[#FBF9F4] border border-[#E8E1D5] px-4 py-3 text-sm text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.18em] text-[#6E635B] font-medium mb-1.5">
            Preferred City / Location
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="e.g. Mumbai, Jaipur, Online"
            className="w-full bg-[#FBF9F4] border border-[#E8E1D5] px-4 py-3 text-sm text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.18em] text-[#6E635B] font-medium mb-1.5">
          Program Details & Message
        </label>
        <textarea
          rows={4}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Share your timeline, target audience, specific artform interest, or custom requirements..."
          className="w-full bg-[#FBF9F4] border border-[#E8E1D5] px-4 py-3 text-sm text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
        />
      </div>

      <div className="pt-2 flex items-center justify-between">
        <span className="text-[11px] text-[#968A80] font-light">
          No obligation. We respect your privacy and cultural alignment.
        </span>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-[#C2593F] hover:bg-[#A84A33] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors focus:outline-none disabled:opacity-50"
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit Enquiry →'}
        </button>
      </div>
    </form>
  )
}
