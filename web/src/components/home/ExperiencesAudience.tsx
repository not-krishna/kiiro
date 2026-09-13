'use client'

import { useState } from 'react'
import { CtaLink } from '@/components/ui/CtaLink'
import { AUDIENCE_PATHWAYS } from '@/content/homepage'

export function ExperiencesAudience() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = AUDIENCE_PATHWAYS[activeIdx]

  return (
    <section id="audiences" className="bg-[#F3EFE6] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="max-w-3xl space-y-3 border-b border-[#E8E1D5] pb-8">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C2593F]">Who it is for</p>
          <h2 className="font-serif text-3xl md:text-5xl font-normal">Four journeys</h2>
          <p className="text-sm text-[#6E635B] font-light leading-relaxed">
            The promise shifts by audience. Choose the path that matches how you arrive.
          </p>
        </div>

        <div className="divide-y divide-[#E8E1D5] border-y border-[#E8E1D5]">
          {AUDIENCE_PATHWAYS.map((pathway, idx) => {
            const isActive = activeIdx === idx
            return (
              <button
                key={pathway.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`w-full text-left py-8 md:py-10 transition-colors ${
                  isActive ? 'bg-[#FBF9F4] px-6 md:px-8' : 'hover:bg-[#FBF9F4]/50 px-2'
                }`}
                aria-expanded={isActive}
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#968A80] w-10">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl flex-1">{pathway.title}</h3>
                </div>
                {isActive && (
                  <div className="mt-6 md:pl-[4.5rem] space-y-4 max-w-2xl">
                    <p className="text-sm text-[#6E635B] font-light leading-relaxed">{pathway.promise}</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-[#968A80]">{pathway.who}</p>
                    <CtaLink cta={pathway.cta} variant={pathway.id === 'individuals' ? 'primary' : 'secondary'} />
                  </div>
                )}
              </button>
            )
          })}
        </div>
        <p className="sr-only">{active.title}</p>
      </div>
    </section>
  )
}
