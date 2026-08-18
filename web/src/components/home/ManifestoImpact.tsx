'use client'

import { useRef, useEffect } from 'react'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'

interface ManifestoImpactProps {
  manifestoTitle?: string
  manifestoText?: string
}

export function ManifestoImpact({ manifestoTitle, manifestoText }: ManifestoImpactProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
    }
  }, [])

  const title = manifestoTitle || 'We believe culture is not something to preserve behind glass. It is something to learn, make, share and carry forward.'
  const text = manifestoText || 'Kiiro connects heritage craft traditions directly to participants, ensuring cultural knowledge lives on through hands-on learning and sustained artisan livelihoods.'

  const stats = [
    { value: '800+', label: 'Workshops Conducted', context: 'Across 7 major Indian hubs' },
    { value: '10,000+', label: 'Active Learners', context: 'Hands-on participants' },
    { value: '7', label: 'Presence Cities', context: 'Pan-India craft centers' },
    { value: '15+', label: 'Corporate Partners', context: 'Wellness & CSR retreats' },
    { value: '10+', label: 'Resort Partners', context: 'Bespoke cultural residencies' },
  ]

  const partnerLogos = [
    'TAJ HOTELS & RESORTS',
    'TATA CONSULTANCY SERVICES',
    'INFOSYS CULTURAL FOUNDATION',
    'NATIONAL INSTITUTE OF DESIGN',
    'OBEROI HOTELS',
    'GODREJ INDUSTRIES',
    'AZIM PREMJI FOUNDATION',
    'RAAS HERITAGE HOTELS',
  ]

  return (
    <section id="about" className="bg-[#F3EFE6] text-[#2B231F] border-b border-[#E8E1D5]">
      {/* 01 Editorial Manifesto Paper Band with Subtle Background Video */}
      <div className="relative py-20 md:py-28 px-6 md:px-10 border-b border-[#E8E1D5] overflow-hidden bg-[#F3EFE6]">
        {/* Background Video Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-25 filter saturate-[0.85] contrast-[1.05]"
          >
            <source src="/assets/bg-vdo-1.mp4" type="video/mp4" />
          </video>
          {/* Subtle Warm Overlay Tint for Text Legibility */}
          <div className="absolute inset-0 bg-[#F3EFE6]/75 backdrop-blur-[1px]" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-3 text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#C2593F]">
            <span className="w-1.5 h-1.5 bg-[#C2593F]" />
            <span>Kiiro Cultural Manifesto</span>
          </div>
          <h2 className="font-display text-fluid-3xl font-normal leading-[1.14] text-[#2B231F]">
            "{title}"
          </h2>
          <p className="font-sans text-fluid-base text-[#6E635B] font-light leading-relaxed max-w-2xl mx-auto">
            {text}
          </p>
        </div>
      </div>

      {/* 02 Independent Editorial Impact Grid (No Cards) */}
      <div className="py-16 md:py-20 px-6 md:px-10 border-b border-[#E8E1D5] bg-[#FBF9F4]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-end border-b border-[#E8E1D5] pb-4">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6E635B]">
              System Impact & Reach
            </span>
            <span className="font-mono text-[10px] uppercase text-[#968A80]">
              Audited Livelihood Metrics
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="space-y-2 border-l border-[#E8E1D5] pl-6 first:border-l-0 md:first:border-l border-t md:border-t-0 pt-6 md:pt-0"
              >
                <AnimatedNumber
                  value={stat.value}
                  className="block font-display text-fluid-4xl font-normal text-[#2B231F] leading-none"
                />
                <div>
                  <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#2B231F]">
                    {stat.label}
                  </h3>
                  <p className="font-sans text-[11px] text-[#968A80] font-light mt-0.5">
                    {stat.context}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 03 Institutional Partner System / Trust Ticker */}
      <div className="py-10 bg-[#F3EFE6] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 mb-6 flex justify-between items-center text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#968A80]">
          <span>Institutional Trust & Program Partners</span>
          <span className="hidden sm:inline">Collaborating across education, corporate & hospitality</span>
        </div>

        <div className="relative w-full overflow-hidden py-2 border-y border-[#E8E1D5]">
          <div className="animate-marquee space-x-12 items-center">
            {partnerLogos.concat(partnerLogos).map((logo, idx) => (
              <span
                key={idx}
                className="font-sans text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-[#6E635B] opacity-75 hover:opacity-100 transition-opacity whitespace-nowrap"
              >
                {logo} <span className="inline-block ml-12 text-[#C2593F]">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

