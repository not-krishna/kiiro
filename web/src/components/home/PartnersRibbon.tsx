'use client'

import { ORGANISATION_NAMES } from '@/content/presence'

// Additional featured partner brands/institutions for a rich marquee ribbon
const PARTNER_LOGOS = [
  ...ORGANISATION_NAMES,
  'Skill India',
  'Mahindra Finance',
  'Axis Bank',
  'SBI Life',
  'Infosys',
  'Craft Council of India',
  'Tata Capital',
  'Urban Company',
]

export function PartnersRibbon() {
  const names = [...PARTNER_LOGOS]
  const track = [...names, ...names, ...names]

  return (
    <section
      aria-label="Organisations we work with"
      className="border-b border-[#E8E1D5] bg-[#2B231F] text-[#FBF9F4] py-10 md:py-14 overflow-hidden relative"
    >
      <div className="z-10 relative flex flex-col items-center gap-5 md:gap-8 w-full shrink-0">
        <p className="font-sans font-medium text-[#D8CEBE] text-xs uppercase tracking-[2px]">
          Organisations We Work With
        </p>

        <div
          className="logo-carousel-container w-full mx-auto relative will-change-transform"
          role="region"
          aria-label="Partner logos carousel"
          data-motion-reveal
          data-motion-distance="18"
        >
          <div
            className="logo-carousel-track relative w-full overflow-hidden py-2"
            style={{
              mask: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              WebkitMask: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}
          >
            <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused]">
              {track.map((name, index) => (
                <div
                  key={`${name}-${index}`}
                  className="logo-item flex shrink-0 items-center justify-center mx-3 md:mx-6 transition-all duration-300 group cursor-default"
                >
                  <div className="flex items-center gap-3 px-5 py-2.5 border border-[#3D332E] bg-[#332A25]/60 hover:bg-[#3D332E] hover:border-[#C2593F]/60 transition-all duration-300 shadow-xs">
                    <span className="font-display text-base md:text-lg font-normal tracking-wide text-[#FBF9F4] opacity-70 group-hover:opacity-100 group-hover:text-[#FBF9F4] transition-all duration-300 whitespace-nowrap">
                      {name}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C2593F] opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
