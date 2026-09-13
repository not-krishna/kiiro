import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { cleanVisibleCopy } from '@/lib/copy'

interface ManifestoImpactProps {
  manifestoTitle?: string
  manifestoText?: string
}

export function ManifestoImpact({ manifestoTitle, manifestoText }: ManifestoImpactProps) {
  const title = cleanVisibleCopy(
    manifestoTitle ||
      'We believe culture is not something to preserve behind glass. It is something to learn, make, share and carry forward.'
  )
  const text = cleanVisibleCopy(
    manifestoText ||
      'Kiiro connects heritage craft traditions directly to participants, ensuring cultural knowledge lives on through hands-on learning and sustained artisan livelihoods.'
  )

  const stats = [
    { value: '800+', label: 'Workshops', context: 'Across major Indian hubs' },
    { value: '10,000+', label: 'Participants', context: 'Hands-on learners' },
    { value: '7', label: 'Cities', context: 'Active programming footprint' },
    { value: '15+', label: 'Corporate teams', context: 'Wellness and retreat formats' },
    { value: '10+', label: 'Resorts', context: 'Guest programming formats' },
  ]

  const partnerLogos = [
    {
      name: 'Taj Hotels & Resorts',
      sector: 'Luxury Hospitality',
      code: 'TAJ',
      detail: 'Pan-India Guest Residencies',
    },
    {
      name: 'Tata Consultancy Services',
      sector: 'Global Enterprise',
      code: 'TCS',
      detail: 'Leadership & Retreat Formats',
    },
    {
      name: 'Infosys Cultural Foundation',
      sector: 'Philanthropy',
      code: 'ICF',
      detail: 'Heritage Conservation',
    },
    {
      name: 'National Institute of Design',
      sector: 'Academic & Design',
      code: 'NID',
      detail: 'Craft Research & Masterclasses',
    },
    {
      name: 'Oberoi Hotels & Resorts',
      sector: 'Luxury Hospitality',
      code: 'OBR',
      detail: 'Curated Artisan Experiences',
    },
    {
      name: 'Godrej Industries',
      sector: 'Corporate Wellness',
      code: 'GDJ',
      detail: 'Screen-Free Team Sessions',
    },
    {
      name: 'Azim Premji Foundation',
      sector: 'Social Impact',
      code: 'APF',
      detail: 'Livelihood & Capacity Building',
    },
    {
      name: 'RAAS Heritage Hotels',
      sector: 'Bespoke Retreats',
      code: 'RAAS',
      detail: 'Rajasthan Craft Residencies',
    },
  ]

  return (
    <section id="about" className="bg-[#F3EFE6] text-[#2B231F] border-b border-[#E8E1D5]">
      <div className="relative py-20 md:py-28 px-6 md:px-10 border-b border-[#E8E1D5] overflow-hidden bg-[#F3EFE6]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="hidden md:block w-full h-full object-cover opacity-35 saturate-[0.95] contrast-[1.05]"
          >
            <source src="/assets/bg-vdo-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#F3EFE6]/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-3 text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#C2593F]">
            <span className="w-1.5 h-1.5 bg-[#C2593F]" />
            <span>Kiiro Cultural Manifesto</span>
          </div>
          <h2 className="font-display text-fluid-3xl font-normal leading-[1.14] text-[#2B231F]">
            {title}
          </h2>
          <p className="font-sans text-fluid-base text-[#6E635B] font-light leading-relaxed max-w-2xl mx-auto">
            {text}
          </p>
        </div>
      </div>

      <div className="py-16 md:py-20 px-6 md:px-10 border-b border-[#E8E1D5] bg-[#FBF9F4]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 border-b border-[#E8E1D5] pb-4">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6E635B]">
              System impact & reach
            </span>
            <span className="font-mono text-[10px] uppercase text-[#968A80]">
              Documented programme reach
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

      <div className="py-14 md:py-20 bg-[#F3EFE6] border-t border-[#E8E1D5] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E1D5] pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#C2593F]">
                <span className="w-1.5 h-1.5 bg-[#C2593F]" />
                <span>Institutional Trust</span>
              </div>
              <h3 className="font-display text-fluid-2xl font-normal text-[#2B231F]">
                Collaborating across hospitality, education & enterprise
              </h3>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#968A80] self-start sm:self-auto">
              8+ Active institutional frameworks
            </span>
          </div>

          {/* Sharp Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E1D5] border border-[#E8E1D5]">
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                className="bg-[#FBF9F4] hover:bg-[#FFFFFF] p-6 md:p-7 flex flex-col justify-between space-y-6 transition-all duration-300 group relative border-t-2 border-transparent hover:border-[#C2593F]"
              >
                <div className="flex items-center justify-between border-b border-[#E8E1D5]/60 pb-4">
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#C2593F] bg-[#F3EFE6] px-2.5 py-1 border border-[#E8E1D5]">
                    {partner.code}
                  </span>
                  <span className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-[#968A80]">
                    {partner.sector}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-display text-base md:text-lg font-medium text-[#2B231F] leading-snug group-hover:text-[#C2593F] transition-colors">
                    {partner.name}
                  </h4>
                  <p className="font-sans text-xs text-[#6E635B] font-light leading-relaxed">
                    {partner.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

