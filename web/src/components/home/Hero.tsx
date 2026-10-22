import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { DEFAULT_HOMEPAGE } from '@/content/homepage'
import { cleanVisibleCopy } from '@/lib/copy'
import type { Cta, MediaAsset } from '@/content/types'

interface HeroProps {
  data?: {
    heroEyebrow?: string
    heroHeading?: string
    heroSubheading?: string
    heroSupportingText?: string
    heroPrimaryCta?: Cta | string
    heroSecondaryCta?: Cta | string
    heroMedia?: MediaAsset[]
    heroImage?: unknown
  }
}

function asCta(value: Cta | string | undefined, fallback: Cta): Cta {
  if (!value) return fallback
  if (typeof value === 'string') return { ...fallback, label: value }
  return { ...fallback, ...value }
}

function cleanCta(cta: Cta): Cta {
  return { ...cta, label: cleanVisibleCopy(cta.label) }
}

function mediaSrc(media?: MediaAsset, sanityImage?: unknown): string | null {
  if (media?.source) return media.source
  if (sanityImage) {
    try {
      return urlFor(sanityImage as never).url()
    } catch {
      return null
    }
  }
  return null
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.7 1.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.94 8.98H3.56V20h3.38V8.98ZM5.25 4a1.95 1.95 0 1 0 0 3.9 1.95 1.95 0 0 0 0-3.9Zm15.18 9.65c0-3.33-1.78-4.88-4.16-4.88a3.58 3.58 0 0 0-3.24 1.78h-.05V8.98H9.74V20h3.38v-5.45c0-1.44.27-2.83 2.05-2.83 1.75 0 1.78 1.64 1.78 2.92V20h3.38v-6.35h.1Z" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21.58 7.2a2.72 2.72 0 0 0-1.92-1.92C17.96 4.82 12 4.82 12 4.82s-5.96 0-7.66.46A2.72 2.72 0 0 0 2.42 7.2 28.3 28.3 0 0 0 2 12a28.3 28.3 0 0 0 .42 4.8 2.72 2.72 0 0 0 1.92 1.92c1.7.46 7.66.46 7.66.46s5.96 0 7.66-.46a2.72 2.72 0 0 0 1.92-1.92A28.3 28.3 0 0 0 22 12a28.3 28.3 0 0 0-.42-4.8ZM10 15.27V8.73L15.66 12 10 15.27Z" />
    </svg>
  )
}

const HERO_SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/your_workshops/?hl=en', Icon: InstagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/kiiroexperiences/', Icon: FacebookIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/kiiro-experiences/', Icon: LinkedinIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/@kiiroexperiences', Icon: YoutubeIcon },
]

export function Hero({ data }: HeroProps) {
  const content = DEFAULT_HOMEPAGE
  let eyebrow = cleanVisibleCopy(data?.heroEyebrow || content.heroEyebrow)
  if (
    eyebrow.toLowerCase().includes('cultural platform') ||
    eyebrow.toLowerCase().includes('cultural space') ||
    eyebrow.toLowerCase().includes('offline') ||
    !eyebrow
  ) {
    eyebrow = content.heroEyebrow
  }

  const heading = cleanVisibleCopy(data?.heroHeading || content.heroHeading)

  let subheading = cleanVisibleCopy(data?.heroSubheading || content.heroSubheading)
  if (
    subheading.toLowerCase().includes('put the phone down') ||
    subheading.includes('together, offline') ||
    subheading.includes('cultural experiences') ||
    !subheading
  ) {
    subheading = content.heroSubheading
  }

  const supportingText = cleanVisibleCopy(data?.heroSupportingText || content.heroSupportingText || '')

  const rawPrimary = cleanCta(asCta(data?.heroPrimaryCta, content.heroPrimaryCta))
  const primary = {
    ...rawPrimary,
    label: rawPrimary.label === 'Explore Weekly Events' || !rawPrimary.label ? 'Book a Session' : rawPrimary.label,
  }

  const rawSecondary = cleanCta(asCta(data?.heroSecondaryCta, content.heroSecondaryCta))
  const secondary = {
    ...rawSecondary,
    label: rawSecondary.label === 'Discover Experiences' || !rawSecondary.label ? 'Explore Experiences' : rawSecondary.label,
  }

  const media = data?.heroMedia?.length ? data.heroMedia : content.heroMedia
  const img1 = mediaSrc(media[0], data?.heroImage) || '/images/other/pottery-1.png'
  const img2 = mediaSrc(media[1]) || '/images/workshops/block-printing-workshop.jpg'
  const img3 = mediaSrc(media[2]) || '/images/other/kintsugi-1.png'

  const heroImages = [
    {
      src: img1,
      alt: media[0]?.alt || 'Close-up of hands shaping wet clay on a pottery wheel',
      artform: 'Pottery & Ceramics',
      caption: 'Clay, water & rhythm',
      index: '01',
    },
    {
      src: img2,
      alt: media[1]?.alt || 'Hands pressing carved wooden block onto textile with natural indigo',
      artform: 'Hand Block Printing',
      caption: 'Hand-carved wood & natural indigo',
      index: '02',
    },
    {
      src: img3,
      alt: media[2]?.alt || 'Hands carefully mending ceramic fractures with gold lacquer',
      artform: 'Traditional Kintsugi',
      caption: 'Gold lacquer & patient mending',
      index: '03',
    },
  ]

  return (
    <section
      className="relative bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5] overflow-hidden"
      data-motion-hero
      data-parallax-container
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16 lg:py-20 relative z-10">
        {/* Top Section: Eyebrow, Heading, Description, and CTAs */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-7 space-y-5 text-left">
            <span className="inline-block font-sans text-xs md:text-sm font-medium tracking-wider text-[#4F5B2A] uppercase" data-hero-eyebrow>
              {eyebrow}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#2B231F] leading-[1.06]">
              <span className="kiiro-word-wrap"><span className="kiiro-word text-[#2B231F]" data-hero-word>Root.</span></span>{' '}
              <span className="kiiro-word-wrap"><span className="kiiro-word text-[#4F5B2A]" data-hero-word>Create.</span></span>{' '}
              <span className="kiiro-word-wrap"><span className="kiiro-word text-[#D99B26]" data-hero-word>Restore.</span></span>
            </h1>
            {heading !== 'ROOT. CREATE. RESTORE.' && (
              <p className="sr-only">{heading}</p>
            )}
            <div className="space-y-3 font-sans text-base md:text-lg text-[#6E635B] font-light leading-relaxed max-w-2xl" data-hero-copy>
              <p>{subheading}</p>
              {supportingText && (
                <p className="text-xs md:text-sm text-[#7A6E65] leading-relaxed pt-2 border-t border-[#E8E1D5]/70">
                  {supportingText}
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end space-y-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={primary.href}
                className="kiiro-cta inline-flex min-h-12 items-center justify-center px-7 py-3.5 bg-[#4F5B2A] text-white font-sans text-[14px] font-medium tracking-wide hover:bg-[#3D4721] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F5B2A]"
                data-hero-cta
              >
                <span>{primary.label}</span>
                <span aria-hidden="true" data-cta-arrow className="ml-2">&rarr;</span>
              </Link>
              <Link
                href={secondary.href}
                className="kiiro-cta inline-flex min-h-12 items-center justify-center px-7 py-3.5 border border-[#2B231F] text-[#2B231F] font-sans text-[14px] font-medium tracking-wide hover:bg-[#2B231F] hover:text-[#FBF9F4] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F5B2A]"
                data-hero-cta
              >
                <span>{secondary.label}</span>
                <span aria-hidden="true" data-cta-arrow className="ml-2">&rarr;</span>
              </Link>
            </div>

            <div className="pt-4 border-t border-[#E8E1D5] flex flex-col sm:flex-row sm:items-center gap-3 text-[#2B231F]" data-hero-meta>
              <span className="text-xs uppercase tracking-[0.08em] font-medium text-[#6E635B]">
                Follow the studio
              </span>
              <div className="flex items-center gap-2" aria-label="MELD social channels">
                {HERO_SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center border border-[#D8CEBE] bg-white text-[#2B231F] hover:border-[#4F5B2A] hover:text-[#4F5B2A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F5B2A] transition-colors"
                    aria-label={`Visit MELD on ${label}`}
                    title={label}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Visual Artwork Section: Substantial 3-Image Horizontal Row focusing on hands and materials */}
        <div className="pt-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D5] mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#4F5B2A]" />
              <span className="text-xs font-sans uppercase tracking-[0.18em] text-[#6E635B] font-medium">
                Hands In Practice &middot; Living Craft Traditions
              </span>
            </div>
            <span className="font-serif italic text-sm md:text-base text-[#4F5B2A] tracking-wide">
              Craft your calm
            </span>
          </div>

          {/* Desktop 3-column horizontal row; Mobile horizontally scrollable with snap */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-6 px-6 sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
            {heroImages.map((item, idx) => (
              <div
                key={item.artform}
                className="w-[82vw] sm:w-[48vw] md:w-auto flex-shrink-0 snap-center relative group"
                data-hero-image
                data-parallax={idx === 1 ? '-6' : '-10'}
              >
                <div className="relative h-[340px] sm:h-[400px] lg:h-[440px] w-full overflow-hidden border border-[#D8CEBE] bg-[#EAE3D5] group-hover:border-[#4F5B2A] transition-colors duration-300">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                    priority={idx === 0}
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 33vw, 400px"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B231F]/75 via-transparent to-black/10 pointer-events-none" />

                  {/* Top pill / badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-[#2B231F]/80 backdrop-blur-sm text-[#FBF9F4] text-[10px] font-sans tracking-[0.2em] uppercase font-medium">
                      {item.index} &middot; Hands-on
                    </span>
                    {idx === 1 && (
                      <span className="px-2.5 py-1 bg-[#4F5B2A]/90 backdrop-blur-sm text-[#FBF9F4] text-[10px] font-sans tracking-[0.16em] uppercase font-medium">
                        Craft your calm
                      </span>
                    )}
                  </div>

                  {/* Bottom caption overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-[#FBF9F4]">
                    <h3 className="font-display text-lg lg:text-xl font-normal leading-tight text-white drop-shadow-sm">
                      {item.artform}
                    </h3>
                    <p className="text-[11px] font-sans uppercase tracking-[0.16em] text-white/80 mt-1">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

