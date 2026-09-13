'use client'

import { useState } from 'react'
import { CorporatePlanningForm } from '@/components/ui/forms/CorporatePlanningForm'
import { IndividualBookingForm } from '@/components/ui/forms/IndividualBookingForm'

export function EnquirySection() {
  const [activeIntent, setActiveIntent] = useState<'corporate' | 'individual'>('corporate')

  return (
    <section id="enquiry" className="bg-[#F3EFE6] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C2593F]">
            Get in touch
          </span>
          <h2 className="font-display text-fluid-4xl font-normal text-[#2B231F] leading-tight uppercase tracking-tight">
            Make Something Meaningful.
          </h2>
          <p className="font-sans text-fluid-base text-[#6E635B] font-light leading-relaxed">
            Tell us whether you are booking a seat or planning for a group. The form changes with the journey.
          </p>
        </div>

        <div className="flex justify-center border-b border-[#E8E1D5] max-w-md mx-auto">
          <button
            onClick={() => setActiveIntent('corporate')}
            className={`flex-1 py-3 text-xs font-sans font-semibold uppercase tracking-[0.18em] border-b-2 transition-all cursor-pointer ${
              activeIntent === 'corporate'
                ? 'border-[#2B231F] text-[#2B231F]'
                : 'border-transparent text-[#968A80] hover:text-[#2B231F]'
            }`}
          >
            Plan a group
          </button>
          <button
            onClick={() => setActiveIntent('individual')}
            className={`flex-1 py-3 text-xs font-sans font-semibold uppercase tracking-[0.18em] border-b-2 transition-all cursor-pointer ${
              activeIntent === 'individual'
                ? 'border-[#2B231F] text-[#2B231F]'
                : 'border-transparent text-[#968A80] hover:text-[#2B231F]'
            }`}
          >
            Book a seat
          </button>
        </div>

        <div className="border border-[#D8CEBE] p-8 md:p-12 bg-[#FBF9F4]">
          {activeIntent === 'corporate' ? <CorporatePlanningForm /> : <IndividualBookingForm />}
        </div>
      </div>
    </section>
  )
}
