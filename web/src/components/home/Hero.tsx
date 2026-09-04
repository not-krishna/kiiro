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
    heroImage?: unknown
  }
}

export function Hero({ data }: HeroProps) {
  const eyebrow = data?.heroEyebrow || 'Living Cultural Platform'
  const subheading =
    data?.heroSubheading ||
    'Connecting living cultural traditions, master artisans, and contemporary experiences through immersive hands-on learning.'
  const primaryCta = data?.heroPrimaryCta || 'Explore Experiences'

  const heroImageUrl = data?.heroImage
    ? urlFor(data.heroImage as any).url()
    : 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1000&auto=format&fit=crop'

  return (
    <section className="relative bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5] overflow-hidden">
      {/* Decorative Organic Ambient Shapes in Background */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-[#C2593F]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#D99B26]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-20 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Statement & CTAs */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C2593F]">
                {eyebrow}
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-[#2B231F] leading-[1.08] tracking-tight">
                <span className="text-[#2B231F]">Hands On :</span> <br />
                <span className="text-[#C2593F]">Rooted, </span>
                <span className="text-[#D99B26]">Real, </span> <br />
                <span className="text-[#2B231F]">Empowered.</span>
              </h1>
            </div>

            <p className="font-sans text-sm md:text-base text-[#6E635B] font-light leading-relaxed max-w-md">
              {subheading}
            </p>

            {/* Action Sharp CTA Button */}
            <div>
              <Link
                href="/experiences"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#C2593F] text-white font-sans text-xs font-semibold tracking-[0.18em] uppercase rounded-none shadow-md hover:bg-[#A84A33] hover:shadow-lg transition-all"
              >
                {primaryCta} →
              </Link>
            </div>

            {/* Social Icons Strip */}
            <div className="pt-6 border-t border-[#E8E1D5] flex items-center space-x-4 text-[#2B231F]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white border border-[#E8E1D5] rounded-none hover:border-[#C2593F] hover:text-[#C2593F] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white border border-[#E8E1D5] rounded-none hover:border-[#C2593F] hover:text-[#C2593F] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.7 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white border border-[#E8E1D5] rounded-none hover:border-[#C2593F] hover:text-[#C2593F] transition-colors"
                aria-label="X / Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <span className="text-[11px] text-[#968A80] font-sans tracking-wider uppercase pl-2">
                Connect With Kiiro
              </span>
            </div>
          </div>

          {/* Right Column: Sharp Collage Layout */}
          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-12 gap-5 items-center">
              
              {/* Left Column of Collage (Top landscape card + Bottom portrait card) */}
              <div className="col-span-12 sm:col-span-6 space-y-5">
                
                {/* Top Left Card (Landscape, Floating Badge) */}
                <div className="relative group">
                  <div className="absolute -top-3 right-6 z-20 bg-[#D99B26] text-white text-[10px] font-semibold uppercase tracking-wider px-4 py-1.5 rounded-none shadow-md">
                    Jaipur Studio
                  </div>
                  
                  <div className="relative h-52 sm:h-56 w-full rounded-none overflow-hidden border border-[#E8E1D5] bg-[#EAE3D5] shadow-sm group-hover:shadow-md transition-all duration-300">
                    <Image
                      src={heroImageUrl}
                      alt="Artisan Hands Working with Blue Pottery"
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                      priority
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B231F]/60 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-5 text-xs text-white font-sans font-medium tracking-wide">
                      Blue Pottery Glazing
                    </span>
                  </div>
                </div>

                {/* Bottom Left Card (Portrait, Floating Accent Badge) */}
                <div className="relative group">
                  <div className="absolute -top-2 -left-2 z-20 w-7 h-7 bg-[#C2593F] rounded-none border-2 border-[#FBF9F4] shadow-sm flex items-center justify-center text-white text-[9px] font-bold">
                    ✦
                  </div>

                  <div className="relative h-64 sm:h-72 w-full rounded-none overflow-hidden border border-[#E8E1D5] bg-[#EAE3D5] shadow-sm group-hover:shadow-md transition-all duration-300">
                    <Image
                      src="https://images.unsplash.com/photo-1606744888344-493238951221?q=80&w=800&auto=format&fit=crop"
                      alt="Warli Master Artisan"
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B231F]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-5 text-white space-y-0.5">
                      <span className="text-xs font-serif font-medium block">Ramesh Hengadi</span>
                      <span className="text-[10px] text-[#D8CEBE] uppercase tracking-wider block">Warli Lineage Lead</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column of Collage (Tall Portrait Card) */}
              <div className="col-span-12 sm:col-span-6 relative">
                <div className="relative h-[420px] sm:h-[460px] w-full rounded-none overflow-hidden border border-[#E8E1D5] bg-[#EAE3D5] shadow-lg group">
                  <Image
                    src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop"
                    alt="Hands-on Group Workshop"
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 35vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B231F]/80 via-[#2B231F]/20 to-transparent" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 bg-[#FBF9F4]/90 backdrop-blur-md rounded-none text-[#2B231F] font-sans text-[10px] font-semibold uppercase tracking-wider shadow-sm">
                      Weekly Public Gathering
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1 z-10">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D99B26] block">
                      COMMUNITY CIRCLE
                    </span>
                    <h4 className="font-serif text-lg text-white font-normal leading-snug">
                      Tactile Clay & Organic Pigment Immersion
                    </h4>
                    <p className="text-xs text-[#D8CEBE] font-light">
                      Mumbai • Jaipur • Bengaluru
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
