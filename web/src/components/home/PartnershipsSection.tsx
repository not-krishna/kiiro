import Link from 'next/link'

interface PartnershipsSectionProps {
  title?: string
}

export function PartnershipsSection({ title }: PartnershipsSectionProps) {
  const heading = title || 'Institutional Partnerships, CSR & Capacity Building'

  const capabilities = [
    {
      title: 'Artisan capacity building',
      desc: 'Sustained craft cluster development, tooling modernization, and direct market linkages for artisan communities.',
    },
    {
      title: 'CSR & social impact',
      desc: 'Measurable social impact initiatives empowering traditional craft clusters with educational & economic infrastructure.',
    },
    {
      title: 'Corporate cultural gifting',
      desc: 'Bespoke, sustainable, artisan-made corporate merchandise and heirloom craft gifting solutions.',
    },
    {
      title: 'Custom curated experiences',
      desc: 'Co-creating tailored cultural experiences for festivals, luxury hospitality properties, and institutional mandates.',
    },
  ]

  return (
    <section id="partnerships" className="bg-[#F3EFE6] text-[#2B231F] py-20 md:py-32 px-6 md:px-10 border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#E8E1D5] pb-10">
          <div className="space-y-4 max-w-2xl">
            <h2 className="font-display text-fluid-3xl font-normal text-[#2B231F] leading-[1.15]" data-motion-text>
              {heading}
            </h2>
          </div>
          <Link
            href="/partnerships-csr"
            className="kiiro-cta inline-flex items-center px-8 py-4 bg-[#4F5B2A] text-[#FBF9F4] font-sans text-[15px] font-medium hover:bg-[#3D4721] transition-all self-start lg:self-auto"
            data-motion-reveal
            data-motion-distance="18"
          >
            <span>Partner with Kiiro</span>
            <span aria-hidden="true" data-cta-arrow>&rarr;</span>
          </Link>
        </div>

        {/* Institutional 4-Column Architectural Grid (No Card Containers) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8" data-motion-stagger>
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="space-y-4"
              data-motion-item
            >
              <h3 className="font-display text-fluid-xl text-[#2B231F] leading-snug">
                {cap.title}
              </h3>
              <p className="font-sans text-sm text-[#6E635B] font-light leading-relaxed">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

