import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface HeroProps {
  data?: {
    heroEyebrow?: string
    heroHeading?: string
    heroSubheading?: string
    heroPrimaryCta?: string
    heroSecondaryCta?: string
    heroImage?: any
  }
}

export function Hero({ data }: HeroProps) {
  const eyebrow = data?.heroEyebrow || 'Living Cultural Platform'
  const heading = data?.heroHeading || 'Hands On. Rooted. Real.'
  const subheading = data?.heroSubheading || 'Connecting living cultural traditions, master artisans, and contemporary experiences through immersive hands-on learning.'
  const primaryCta = data?.heroPrimaryCta || 'Explore Experiences'
  const secondaryCta = data?.heroSecondaryCta || 'View Weekly Events'

  const heroImageUrl = data?.heroImage ? urlFor(data.heroImage).url() : null

  return (
    <section className="relative bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5] overflow-hidden">
      {/* Editorial Top Metadata Line */}
      <div className="border-b border-[#E8E1D5] py-3 px-6 md:px-10 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#968A80] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <span className="w-1.5 h-1.5 bg-[#C2593F]" />
          <span>{eyebrow}</span>
        </div>
        <div className="hidden sm:flex items-center space-x-6 text-[#6E635B]">
          <span>Jaipur • Mumbai • Delhi • Bengaluru • Hyderabad • Pune • Goa</span>
          <span className="text-[#D8CEBE]">|</span>
          <span className="text-[#C2593F]">100% Artisan-Led</span>
        </div>
      </div>

      {/* Main Editorial Hero Canvas */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Typographic Statement Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C2593F]">
                Heritage Craft & Contemporary Learning
              </span>
              <h1 className="font-display text-fluid-display font-normal text-[#2B231F] leading-[1.04] tracking-tight">
                {heading}
              </h1>
            </div>

            <p className="font-sans text-fluid-base text-[#6E635B] font-light max-w-xl leading-relaxed">
              {subheading}
            </p>

            {/* Restrained Editorial CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <Link
                href="#experiences"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#2B231F] text-[#FBF9F4] font-sans text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#C2593F] transition-all border border-[#2B231F] hover:border-[#C2593F]"
              >
                {primaryCta} →
              </Link>
              <Link
                href="#artforms"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-[#2B231F] font-sans text-xs font-semibold tracking-[0.2em] uppercase hover:text-[#C2593F] transition-all border-b-2 border-[#2B231F] hover:border-[#C2593F]"
              >
                {secondaryCta}
              </Link>
            </div>
          </div>

          {/* Framed Architectural Media Canvas */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-[#D8CEBE] p-3 md:p-4 bg-[#F3EFE6]">
              {/* Media Field */}
              <div className="relative aspect-[4/5] bg-[#EAE3D5] overflow-hidden border border-[#D8CEBE]">
                {heroImageUrl ? (
                  <Image
                    src={heroImageUrl}
                    alt="Living Indian Craft Workshop"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#EAE3D5] flex flex-col justify-between p-8 text-[#2B231F]">
                    <div className="space-y-2">
                      <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#C2593F] font-semibold block">
                        Tactile Craft Field • Jaipur Tile Painting
                      </span>
                      <h3 className="font-display text-fluid-2xl font-normal text-[#2B231F]">
                        Cobalt Blue Pigments & Low-Fired Quartz Clay
                      </h3>
                    </div>
                    <div className="pt-6 border-t border-[#D8CEBE] flex items-center justify-between text-xs font-sans text-[#6E635B]">
                      <span>Kot Jewar Cluster</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#A65B3B]">Ref: JAIPUR-POTTERY-01</span>
                    </div>
                  </div>
                )}
                {/* Editorial Overlay Caption */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#2B231F]/90 via-[#2B231F]/40 to-transparent p-6 text-[#FBF9F4] space-y-1">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D99B26]">
                    Featured Practice • Jaipur Blue Pottery
                  </span>
                  <p className="font-sans text-xs text-[#E8E1D5] font-light">
                    Preserving 3rd generation living traditions through hands-on masterclasses.
                  </p>
                </div>
              </div>

              {/* Architectural Metadata Bar */}
              <div className="mt-3 flex justify-between items-center px-1 py-1 font-sans text-[10px] uppercase tracking-[0.18em] text-[#968A80]">
                <span>Master Artisan Field Study</span>
                <span>Vol. 2026 • Edition 01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

