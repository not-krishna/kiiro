'use client'

import { useState } from 'react'

export function EnquirySection() {
  const [activeIntent, setActiveIntent] = useState<'corporate' | 'individual'>('corporate')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="enquiry" className="bg-[#F3EFE6] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Editorial Closing Statement */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C2593F]">
            Co-Create With Kiiro • Section 08
          </span>
          <h2 className="font-display text-fluid-4xl font-normal text-[#2B231F] leading-tight uppercase tracking-tight">
            Make Something Meaningful.
          </h2>
          <p className="font-sans text-fluid-base text-[#6E635B] font-light leading-relaxed">
            Bring Kiiro into your school, organisation, property or community.
          </p>
        </div>

        {/* Intent Selector Tabs (Restrained Rectangular Controls) */}
        <div className="flex justify-center border-b border-[#E8E1D5] max-w-md mx-auto">
          <button
            onClick={() => { setActiveIntent('corporate'); setSubmitted(false) }}
            className={`flex-1 py-3 text-xs font-sans font-semibold uppercase tracking-[0.18em] border-b-2 transition-all cursor-pointer ${
              activeIntent === 'corporate'
                ? 'border-[#2B231F] text-[#2B231F]'
                : 'border-transparent text-[#968A80] hover:text-[#2B231F]'
            }`}
          >
            Corporate / Institution
          </button>
          <button
            onClick={() => { setActiveIntent('individual'); setSubmitted(false) }}
            className={`flex-1 py-3 text-xs font-sans font-semibold uppercase tracking-[0.18em] border-b-2 transition-all cursor-pointer ${
              activeIntent === 'individual'
                ? 'border-[#2B231F] text-[#2B231F]'
                : 'border-transparent text-[#968A80] hover:text-[#2B231F]'
            }`}
          >
            Individual / Workshop
          </button>
        </div>

        {/* Architectural Form Container (No Rounded Container Box) */}
        <div className="border border-[#D8CEBE] p-8 md:p-12 bg-[#FBF9F4]">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-10 h-10 border border-[#8A9A86] text-[#8A9A86] flex items-center justify-center mx-auto text-lg font-bold">
                ✓
              </div>
              <h3 className="font-display text-fluid-2xl text-[#2B231F]">
                Thank You for Your Enquiry
              </h3>
              <p className="font-sans text-xs text-[#6E635B] max-w-md mx-auto font-light">
                Our cultural curation team will review your requirements and reach out within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-sans">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#2B231F]">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 bg-[#F3EFE6] border border-[#E8E1D5] text-xs text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#2B231F]">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="name@organization.com"
                    className="w-full px-4 py-3 bg-[#F3EFE6] border border-[#E8E1D5] text-xs text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#2B231F]">
                    {activeIntent === 'corporate' ? 'Organization / Institution' : 'Preferred City Hub'}
                  </label>
                  <input
                    type="text"
                    placeholder={activeIntent === 'corporate' ? 'Company or Institution Name' : 'e.g. Jaipur, Mumbai, Delhi'}
                    className="w-full px-4 py-3 bg-[#F3EFE6] border border-[#E8E1D5] text-xs text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#2B231F]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 bg-[#F3EFE6] border border-[#E8E1D5] text-xs text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#2B231F]">
                  Vision & Requirements
                </label>
                <textarea
                  rows={4}
                  placeholder={
                    activeIntent === 'corporate'
                      ? 'Describe your team size, target dates, and program goals...'
                      : 'Tell us which craft artforms or workshop formats interest you...'
                  }
                  className="w-full px-4 py-3 bg-[#F3EFE6] border border-[#E8E1D5] text-xs text-[#2B231F] focus:outline-none focus:border-[#C2593F]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#2B231F] text-[#FBF9F4] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#C2593F] transition-all border border-[#2B231F] hover:border-[#C2593F]"
              >
                {activeIntent === 'corporate' ? 'Plan a Program →' : 'Find an Experience →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

