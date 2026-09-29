'use client'

import Image from 'next/image'

interface PartnerOrganisation {
  name: string
  logo: string
}

const PARTNER_ORGANISATIONS: PartnerOrganisation[] = [
  { name: 'Taj Hotels', logo: '/images/organisations/taj-hotel.png' },
  { name: 'Edubridge International School', logo: '/images/organisations/edubridge-school.png' },
  { name: 'Tata Capital', logo: '/images/organisations/tata-capital.png' },
  { name: 'Axis Bank', logo: '/images/organisations/axis-bank.png' },
  { name: 'Mahindra Finance', logo: '/images/organisations/mahindra.png' },
  { name: 'Infosys', logo: '/images/organisations/infosys.png' },
  { name: 'Urban Company', logo: '/images/organisations/urban-company.png' },
  { name: 'Craft Council of India', logo: '/images/organisations/craft-council.png' },
  { name: 'SBI Life', logo: '/images/organisations/sbi-life.png' },
]

export function PartnersRibbon() {
  const track = [...PARTNER_ORGANISATIONS, ...PARTNER_ORGANISATIONS, ...PARTNER_ORGANISATIONS]

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
              {track.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="logo-item flex shrink-0 items-center justify-center mx-3 md:mx-5 transition-all duration-300 group cursor-default"
                >
                  <div className="flex items-center gap-3.5 px-5 md:px-6 py-2.5 md:py-3 border border-[#3D332E] bg-[#332A25]/60 hover:bg-[#3D332E] hover:border-[#4F5B2A]/60 transition-all duration-300 shadow-xs">
                    <div className="h-7 md:h-8 flex items-center justify-center">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={180}
                        height={60}
                        className="h-6 md:h-7.5 w-auto max-w-[120px] md:max-w-[150px] object-contain opacity-75 group-hover:opacity-100 transition-all duration-300 brightness-110"
                        priority={index < 9}
                      />
                    </div>
                    <span className="w-1.5 h-1.5 bg-[#4F5B2A] opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all shrink-0" />
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

