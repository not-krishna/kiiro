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

function mediaSrc(media?: MediaAsset, sanityImage?: unknown) {
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
  { label: 'Instagram', href: 'https://www.instagram.com/kiiroexperiences/', Icon: InstagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/kiiroexperiences/', Icon: FacebookIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/kiiro-experiences/', Icon: LinkedinIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/@kiiroexperiences', Icon: YoutubeIcon },
]

export function Hero({ data }: HeroProps) {
  const content = DEFAULT_HOMEPAGE
  const eyebrow = cleanVisibleCopy(data?.heroEyebrow || content.heroEyebrow)
  const heading = cleanVisibleCopy(data?.heroHeading || content.heroHeading)
  const subheading = cleanVisibleCopy(data?.heroSubheading || content.heroSubheading)
  const primary = cleanCta(asCta(data?.heroPrimaryCta, content.heroPrimaryCta))
  const secondary = cleanCta(asCta(data?.heroSecondaryCta, content.heroSecondaryCta))
  const media = data?.heroMedia?.length ? data.heroMedia : content.heroMedia
  const primaryImage = mediaSrc(media[0], data?.heroImage) || '/images/hero/hero-1.png'
  const secondImage = mediaSrc(media[1]) || '/images/hero/hero-2.png'
  const thirdImage = mediaSrc(media[2]) || '/images/hero/hero-3.png'
  const featuredImage = thirdImage || primaryImage || secondImage

  return (
    <section
      className="relative bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5] overflow-hidden"
      data-motion-hero
      data-parallax-container
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-7 text-left">
            <div className="space-y-3">
              <span className="inline-block font-sans text-sm text-[#C2593F]" data-hero-eyebrow>
                {eyebrow}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-[#2B231F] leading-[1.08]">
                <span className="kiiro-word-wrap"><span className="kiiro-word text-[#2B231F]" data-hero-word>Root.</span></span>{' '}
                <span className="kiiro-word-wrap"><span className="kiiro-word text-[#C2593F]" data-hero-word>Create.</span></span>
                <br />
                <span className="kiiro-word-wrap"><span className="kiiro-word text-[#D99B26]" data-hero-word>Restore.</span></span>
              </h1>
              {heading !== 'ROOT. CREATE. RESTORE.' && (
                <p className="sr-only">{heading}</p>
              )}
            </div>

            <p className="font-sans text-sm md:text-base text-[#6E635B] font-light leading-relaxed max-w-lg" data-hero-copy>
              {subheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={primary.href}
                className="kiiro-cta inline-flex min-h-11 items-center justify-center px-6 py-3 bg-[#C2593F] text-white font-sans text-[14px] font-medium tracking-wide hover:bg-[#A84A33] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2593F]"
                data-hero-cta
              >
                <span>{primary.label}</span>
                <span aria-hidden="true" data-cta-arrow>&rarr;</span>
              </Link>
              <Link
                href={secondary.href}
                className="kiiro-cta inline-flex min-h-11 items-center justify-center px-6 py-3 border border-[#2B231F] text-[#2B231F] font-sans text-[14px] font-medium tracking-wide hover:bg-[#2B231F] hover:text-[#FBF9F4] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2593F]"
                data-hero-cta
              >
                <span>{secondary.label}</span>
                <span aria-hidden="true" data-cta-arrow>&rarr;</span>
              </Link>
            </div>

            <div className="pt-4 border-t border-[#E8E1D5] flex flex-col sm:flex-row sm:items-center gap-2.5 text-[#2B231F]" data-hero-meta>
              <span className="text-xs uppercase tracking-[0.08em] font-medium text-[#6E635B]">
                Follow the studio
              </span>
              <div className="flex items-center gap-1.5" aria-label="Kiiro social channels">
                {HERO_SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center border border-[#D8CEBE] bg-white text-[#2B231F] hover:border-[#C2593F] hover:text-[#C2593F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2593F] transition-colors"
                    aria-label={`Visit Kiiro on ${label}`}
                    title={label}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3 pt-2 text-[11px] uppercase tracking-[0.18em] text-[#968A80]" data-hero-meta>
              <span>Scroll</span>
              <span className="h-10 w-px origin-top bg-[#D8CEBE]" data-hero-scroll-line />
              <span>Discover</span>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-12 gap-4 md:gap-5 items-end">
              <div className="hidden sm:block sm:col-span-5 space-y-5">
                <div className="relative group">
                  <div className="relative h-48 md:h-56 w-full overflow-hidden border border-[#E8E1D5] bg-[#EAE3D5] group-hover:border-[#D8CEBE] transition-colors duration-300" data-hero-image data-parallax="-5">
                    {primaryImage ? (
                      <Image
                        src={primaryImage}
                        alt={media[0]?.alt || 'Making process'}
                        fill
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                        priority
                        sizes="(max-width: 768px) 100vw, 30vw"
                      />
                    ) : (
                      <span className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.2em] text-[#968A80]">
                        Making process
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative group">
                  <div className="relative h-64 md:h-72 w-full overflow-hidden border border-[#E8E1D5] bg-[#EAE3D5] group-hover:border-[#D8CEBE] transition-colors duration-300" data-hero-image data-parallax="-8">
                    {secondImage ? (
                      <Image
                        src={secondImage}
                        alt={media[1]?.alt || 'Artisan-led practice'}
                        fill
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 30vw"
                      />
                    ) : (
                      <span className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.2em] text-[#968A80]">
                        Artisan-led practice
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-7 relative">
                <div className="relative h-64 sm:h-[460px] w-full overflow-hidden border border-[#D8CEBE] bg-[#EAE3D5] group" data-hero-image data-parallax="-10">
                  {featuredImage ? (
                    <Image
                      src={featuredImage}
                      alt={media[2]?.alt || 'Participants at work'}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                      priority
                      sizes="(max-width: 768px) 100vw, 35vw"
                    />
                  ) : (
                    <span className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.2em] text-[#968A80]">
                      Participants at work
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#2B231F]/60 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-[#FBF9F4]" data-hero-meta>
                    <span className="max-w-[11rem] text-[10px] uppercase tracking-[0.18em] leading-relaxed">
                      Hands-on cultural experiences
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.18em]">
                      Make / Connect / Restore
                    </span>
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
