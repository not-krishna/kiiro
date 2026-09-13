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
  const primaryImage = mediaSrc(media[0], data?.heroImage)
  const secondImage = mediaSrc(media[1])
  const thirdImage = mediaSrc(media[2])
  const featuredImage = thirdImage || primaryImage || secondImage

  return (
    <section className="relative bg-[#FBF9F4] text-[#2B231F] border-b border-[#E8E1D5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-7 text-left">
            <div className="space-y-3">
              <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C2593F]">
                {eyebrow}
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-[#2B231F] leading-[1.08]">
                <span className="text-[#2B231F]">Root.</span>{' '}
                <span className="text-[#C2593F]">Create.</span>
                <br />
                <span className="text-[#D99B26]">Restore.</span>
              </h1>
              {heading !== 'ROOT. CREATE. RESTORE.' && (
                <p className="sr-only">{heading}</p>
              )}
            </div>

            <p className="font-sans text-sm md:text-base text-[#6E635B] font-light leading-relaxed max-w-lg">
              {subheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={primary.href}
                className="inline-flex min-h-12 items-center justify-center px-7 py-3.5 bg-[#C2593F] text-white font-sans text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#A84A33] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2593F]"
              >
                {primary.label}
              </Link>
              <Link
                href={secondary.href}
                className="inline-flex min-h-12 items-center justify-center px-7 py-3.5 border border-[#2B231F] text-[#2B231F] font-sans text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#2B231F] hover:text-[#FBF9F4] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2593F]"
              >
                {secondary.label}
              </Link>
            </div>

            <div className="pt-5 border-t border-[#E8E1D5] flex flex-col sm:flex-row sm:items-center gap-3 text-[#2B231F]">
              <span className="text-[11px] text-[#968A80] font-sans tracking-[0.18em] uppercase">
                Follow the studio
              </span>
              <div className="flex items-center gap-2" aria-label="Kiiro social channels">
                {HERO_SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center border border-[#D8CEBE] bg-white text-[#2B231F] hover:border-[#C2593F] hover:text-[#C2593F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2593F] transition-colors"
                    aria-label={`Visit Kiiro on ${label}`}
                    title={label}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-12 gap-4 md:gap-5 items-end">
              <div className="hidden sm:block sm:col-span-5 space-y-5">
                <div className="relative group">
                  <div className="relative h-48 md:h-56 w-full overflow-hidden border border-[#E8E1D5] bg-[#EAE3D5] group-hover:border-[#D8CEBE] transition-colors duration-300">
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
                  <div className="relative h-64 md:h-72 w-full overflow-hidden border border-[#E8E1D5] bg-[#EAE3D5] group-hover:border-[#D8CEBE] transition-colors duration-300">
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
                <div className="relative h-64 sm:h-[460px] w-full overflow-hidden border border-[#D8CEBE] bg-[#EAE3D5] group">
                  {featuredImage ? (
                    <Image
                      src={featuredImage}
                      alt={media[2]?.alt || 'Participants at work'}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 35vw"
                    />
                  ) : (
                    <span className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.2em] text-[#968A80]">
                      Participants at work
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
