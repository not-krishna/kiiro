import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface ArtisanFeatureData {
  heading?: string
  name?: string
  craft?: string
  region?: string
  quote?: string
  portrait?: any
}

interface ArtisanImpactProps {
  data?: ArtisanFeatureData
}

export function ArtisanImpact({ data }: ArtisanImpactProps) {
  const heading = data?.heading || 'The Craft is the Experience. The Artisan is the Knowledge.'
  const name = data?.name || 'Master Craftsman Ramu'
  const craft = data?.craft || 'Jaipur Blue Pottery Master'
  const region = data?.region || 'Kot Jewar, Rajasthan'
  const quote = data?.quote || '"When participants hold the clay and feel the natural pigment, they are not just taking a workshop — they are taking home a living piece of our ancestral memory."'

  const portraitUrl = data?.portrait ? urlFor(data.portrait).url() : null

  return (
    <section id="artisans" className="bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5] py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 border-b border-[#E8E1D5] pb-8">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C2593F]">
            Human Livelihoods & Mastery • Section 05
          </span>
          <h2 className="font-display text-fluid-3xl font-normal text-[#2B231F] leading-[1.15]">
            {heading}
          </h2>
        </div>

        {/* 60/40 Editorial Feature Essay Layout (No Rounded Profile Card) */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch border border-[#D8CEBE] p-4 bg-[#F3EFE6]">
          {/* Portrait Media Field */}
          <div className="lg:col-span-7 relative bg-[#EAE3D5] min-h-[420px] lg:min-h-[540px] border border-[#D8CEBE] overflow-hidden flex flex-col justify-end p-8 md:p-12">
            {portraitUrl ? (
              <Image
                src={portraitUrl}
                alt={name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[#EAE3D5] flex flex-col justify-between p-8 text-[#2B231F]">
                <div className="flex justify-between items-start font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#968A80]">
                  <span>Craft Heritage Essay</span>
                  <span>{region}</span>
                </div>
                <div className="space-y-1">
                  <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#A65B3B] block">
                    {craft}
                  </span>
                  <h3 className="font-display text-fluid-3xl font-normal text-[#2B231F]">
                    {name}
                  </h3>
                  <p className="font-sans text-xs text-[#6E635B] font-light">
                    3rd Generation Heritage Craft Keeper
                  </p>
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#2B231F]/90 via-[#2B231F]/30 to-transparent z-10" />

            <div className="relative z-20 space-y-2 text-[#FBF9F4]">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D99B26]">
                Featured Master Artisan • {region}
              </span>
              <h3 className="font-display text-fluid-3xl font-normal text-[#FBF9F4]">
                {name}
              </h3>
              <p className="font-sans text-xs text-[#E8E1D5] font-light">
                {craft} — 3rd Generation Lineage Keeper
              </p>
            </div>
          </div>

          {/* Narrative & High Editorial Quote Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 py-4 px-2">
            <div className="space-y-6">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#968A80] block border-b border-[#E8E1D5] pb-3">
                Artisan Voice & Field Quotation
              </span>

              <blockquote className="font-display text-fluid-xl text-[#2B231F] leading-relaxed italic border-l-2 border-[#C2593F] pl-6 py-2">
                {quote}
              </blockquote>

              <p className="font-sans text-xs text-[#6E635B] font-light leading-relaxed">
                By facilitating direct hands-on learning, Kiiro ensures master artisans receive fair remuneration, dignity of practice, and an active platform to pass their heritage down to new generations.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E8E1D5] space-y-4">
              <div className="font-sans text-xs text-[#6E635B]">
                <span className="font-semibold text-[#2B231F] uppercase tracking-wider block mb-1">Direct Livelihood Impact</span>
                100% Fair Wages & Transparent Craft Cluster Support
              </div>

              <Link
                href="#enquiry"
                className="inline-flex items-center text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#2B231F] hover:text-[#C2593F] border-b-2 border-[#2B231F] hover:border-[#C2593F] transition-all pb-1"
              >
                Meet Artisan Network →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

