import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'

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
  const subheading =
    data?.heroSubheading ||
    'Connecting living cultural traditions, master artisans, and contemporary experiences through immersive hands-on learning.'
  const primaryCta = data?.heroPrimaryCta || 'Explore Experiences'

  const heroImageUrl = data?.heroImage
    ? urlFor(data.heroImage).url()
    : 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1000&auto=format&fit=crop'

  return (
    <section className="relative bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5] overflow-hidden">
      {/* Editorial Top Ticker Bar */}
      <div className="border-b border-[#E8E1D5] py-3 px-6 md:px-10 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#968A80] flex flex-wrap items-center justify-between gap-4 bg-[#F5F0E6]">
        <div className="flex items-center space-x-3">
          <span className="w-1.5 h-1.5 bg-[#C2593F] rounded-full animate-pulse" />
          <span className="text-[#2B231F]">{eyebrow}</span>
        </div>
        <div className="hidden sm:flex items-center space-x-6 text-[#6E635B]">
          <span>Mumbai • Bengaluru • Jaipur • Delhi • Hyderabad • Pune • Goa</span>
          <span className="text-[#D8CEBE]">|</span>
          <span className="text-[#C2593F] inline-flex items-center gap-1">
            <AnimatedNumber value="100%" /> Artisan-Led
          </span>
        </div>
      </div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Typographic Statement */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F3EFE6] border border-[#D8CEBE] text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#C2593F]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C2593F]" />
                Heritage Craft & Contemporary Learning
              </div>
              <h1 className="font-display text-fluid-display font-normal text-[#2B231F] leading-[1.03] tracking-tight">
                {heading}
              </h1>
            </div>

            <p className="font-sans text-fluid-base text-[#6E635B] font-light leading-relaxed max-w-lg">
              {subheading}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="#experiences"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#2B231F] text-[#FBF9F4] font-sans text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#C2593F] transition-all border border-[#2B231F] hover:border-[#C2593F]"
              >
                {primaryCta} →
              </Link>

            </div>

            {/* Architectural Micro Metrics */}
            <div className="pt-6 border-t border-[#E8E1D5] grid grid-cols-3 gap-4 font-sans text-[11px] uppercase tracking-wider text-[#968A80]">
              <div>
                <span className="block font-display text-fluid-xl text-[#2B231F] font-normal">7+</span>
                <span>Active Cities</span>
              </div>
              <div>
                <span className="block font-display text-fluid-xl text-[#C2593F] font-normal">50+</span>
                <span>Master Guilds</span>
              </div>
              <div>
                <span className="block font-display text-fluid-xl text-[#D99B26] font-normal">100%</span>
                <span>Authentic</span>
              </div>
            </div>
          </div>

          {/* Right Column: Exact Bento Grid Layout (Matching Reference Structure) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-3 sm:gap-4 auto-rows-[115px]">
              
              {/* --- ROW 1 --- */}

              {/* Tile 1 (Top Left): Pill Badge + Textured Dot Grid Tile (span 4 cols, 1 row) */}
              <div className="col-span-12 sm:col-span-4 row-span-1 bg-[#F3EFE6] border border-[#D8CEBE] p-3 flex flex-col justify-between relative overflow-hidden group">
                <div 
                  className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(#C2B8A3 1px, transparent 1px)',
                    backgroundSize: '12px 12px'
                  }}
                />
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#2B231F] text-[#FBF9F4] font-sans text-[10px] font-semibold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C2593F]" />
                    Campaign Ready
                  </span>
                </div>
                <div className="relative z-10 font-sans text-[10px] text-[#6E635B] uppercase tracking-widest font-semibold">
                  Workshop Field
                </div>
              </div>

              {/* Tile 2 (Top Right): Featured Main Imagery Card (span 8 cols, 2 rows) */}
              <div className="col-span-12 sm:col-span-8 row-span-2 relative border border-[#D8CEBE] bg-[#EAE3D5] overflow-hidden group">
                <Image
                  src={heroImageUrl}
                  alt="Living Indian Craft Masterclass"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FBF9F4]/90 backdrop-blur-md border border-[#D8CEBE] text-[#2B231F] font-sans text-[10px] font-semibold uppercase tracking-wider shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D99B26]" />
                    Jaipur Studio • Blue Pottery
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2B231F]/90 via-[#2B231F]/40 to-transparent p-5 text-[#FBF9F4] space-y-1">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D99B26] block">
                    Featured Masterclass
                  </span>
                  <p className="font-sans text-xs text-[#E8E1D5] font-light">
                    Low-fired quartz clay & cobalt pigment craft field study.
                  </p>
                </div>
              </div>

              {/* --- ROW 2 --- */}

              {/* Tile 3 (Mid Left): Textured Dot Grid Box (span 4 cols, 2 rows) */}
              <div className="col-span-12 sm:col-span-4 row-span-2 bg-[#F3EFE6] border border-[#D8CEBE] p-4 flex flex-col justify-between relative overflow-hidden group">
                <div 
                  className="absolute inset-0 opacity-50 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(#C2B8A3 1px, transparent 1px)',
                    backgroundSize: '12px 12px'
                  }}
                />
                <div className="relative z-10 space-y-2">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#C2593F]/15 border border-[#C2593F]/30 text-[#C2593F] font-mono text-xs">
                    ✦
                  </span>
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#2B231F] block">
                    100% Artisan Guilds
                  </span>
                  <p className="font-sans text-[11px] text-[#6E635B] leading-relaxed">
                    Direct transmission from 3rd gen master craftsmen.
                  </p>
                </div>
                <div className="relative z-10 pt-4 border-t border-[#D8CEBE]">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#C2593F] font-semibold">
                    Verified Pedigree
                  </span>
                </div>
              </div>

              {/* Tile 4 (Mid Center): Portrait Visual Detail Card (span 4 cols, 2 rows) */}
              <div className="col-span-12 sm:col-span-4 row-span-2 relative border border-[#D8CEBE] bg-[#EAE3D5] overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1606744888344-493238951221?q=80&w=1000&auto=format&fit=crop"
                  alt="Hand Block Printing Craft"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2B231F]/85 via-transparent to-transparent p-4 text-[#FBF9F4]">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#E8E1D5] block font-medium">
                    Hand Block Printing
                  </span>
                  <span className="font-sans text-[9px] text-[#D8CEBE] font-light">
                    Bagru & Sanganeer Dyes
                  </span>
                </div>
              </div>

              {/* Tile 5 (Mid Right): Pill Badge + Craft Card (span 4 cols, 2 rows) */}
              <div className="col-span-12 sm:col-span-4 row-span-2 relative border border-[#D8CEBE] bg-[#EAE3D5] overflow-hidden group">
                {/* Top Floating Pill Badge matching reference */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#2B231F] text-[#FBF9F4] font-sans text-[9px] font-semibold uppercase tracking-wider shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D99B26]" />
                    Tactile Craft Placed
                  </span>
                </div>
                <Image
                  src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop"
                  alt="Terracotta Clay Craft"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2B231F]/85 via-transparent to-transparent p-4 text-[#FBF9F4]">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#E8E1D5]">
                    Raw Clay & Pigment
                  </span>
                </div>
              </div>

              {/* --- ROW 3 --- */}

              {/* Tile 6 (Bottom Wide): Landscape Wide Image (span 8 cols, 1 row) */}
              <div className="col-span-12 sm:col-span-8 row-span-1 relative border border-[#D8CEBE] bg-[#EAE3D5] overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
                  alt="Traditional Textile Shuttle"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2B231F]/90 via-[#2B231F]/40 to-transparent flex items-center p-5">
                  <span className="font-display text-sm text-[#FBF9F4] italic max-w-sm">
                    "Preserving living heritage through hands-on masterclasses."
                  </span>
                </div>
              </div>

              {/* Tile 7 (Bottom Right): Textured Dot Grid Box (span 4 cols, 1 row) */}
              <div className="col-span-12 sm:col-span-4 row-span-1 bg-[#F3EFE6] border border-[#D8CEBE] p-3 flex flex-col justify-between relative overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(#C2B8A3 1px, transparent 1px)',
                    backgroundSize: '12px 12px'
                  }}
                />
                <div className="relative z-10 font-sans text-[10px] uppercase tracking-widest text-[#C2593F] font-semibold">
                  Kot Jewar Cluster
                </div>
                <div className="relative z-10 font-sans text-[10px] text-[#6E635B] uppercase tracking-wider font-mono">
                  Ref: KIIRO-2026-HERITAGE
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
