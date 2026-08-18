import Link from 'next/link'

interface PartnershipsSectionProps {
  title?: string
}

export function PartnershipsSection({ title }: PartnershipsSectionProps) {
  const heading = title || 'Institutional Partnerships, CSR & Capacity Building'

  const capabilities = [
    {
      id: '01',
      title: 'Artisan Capacity Building',
      desc: 'Sustained craft cluster development, tooling modernization, and direct market linkages for artisan communities.',
    },
    {
      id: '02',
      title: 'CSR & Social Impact',
      desc: 'Measurable social impact initiatives empowering traditional craft clusters with educational & economic infrastructure.',
    },
    {
      id: '03',
      title: 'Corporate Cultural Gifting',
      desc: 'Bespoke, sustainable, artisan-made corporate merchandise and heirloom craft gifting solutions.',
    },
    {
      id: '04',
      title: 'Custom Curated Experiences',
      desc: 'Co-creating tailored cultural experiences for festivals, luxury hospitality properties, and institutional mandates.',
    },
  ]

  return (
    <section id="partnerships" className="bg-[#F3EFE6] text-[#2B231F] py-20 md:py-32 px-6 md:px-10 border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#E8E1D5] pb-10">
          <div className="space-y-4 max-w-2xl">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C2593F]">
              Institutional Framework • Section 06
            </span>
            <h2 className="font-display text-fluid-3xl font-normal text-[#2B231F] leading-[1.15]">
              {heading}
            </h2>
          </div>
          <Link
            href="#enquiry"
            className="inline-flex items-center px-8 py-4 bg-[#C2593F] text-[#FBF9F4] font-sans text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#A64830] transition-all border border-[#C2593F] self-start lg:self-auto"
          >
            Build a Partnership →
          </Link>
        </div>

        {/* Institutional 4-Column Architectural Grid (No Card Containers) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="space-y-4 border-l border-[#E8E1D5] pl-6 first:border-l-0 md:first:border-l border-t md:border-t-0 pt-6 md:pt-0"
            >
              <span className="font-mono text-xs font-bold text-[#C2593F] tracking-wider block">
                {cap.id}
              </span>
              <h3 className="font-display text-fluid-xl text-[#2B231F] leading-snug">
                {cap.title}
              </h3>
              <p className="font-sans text-xs text-[#6E635B] font-light leading-relaxed">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

