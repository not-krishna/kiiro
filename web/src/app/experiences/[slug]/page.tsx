import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/lib/client'
import { EXPERIENCE_BY_SLUG_QUERY, ALL_EVENTS_QUERY } from '@/sanity/lib/queries'
import { FALLBACK_EXPERIENCES, FALLBACK_ARTISANS } from '@/lib/data'
import { CONFIRMED_SCHEDULED_EVENTS, formatEventDate, mapSanityEvent } from '@/content/events'
import rawWorkshops from '@/content/workshops.raw.json'
import type { EventItem } from '@/content/types'

const locationMap: Record<string, string[]> = {
  'pottery': ['Bangalore'],
  'block-printing': ['Bangalore'],
  'bagru-block-printing': ['Bangalore'],
  'kolhapuri-chappal-making': ['Mumbai'],
  'kolhapuri-chappal': ['Mumbai'],
  'portuguese-azulejo-tile-painting': ['Goa'],
  'portuguese-azulejo': ['Goa'],
  'kintsugi': ['Goa'],
  'blue-pottery': ['Bangalore'],
}

const EXTENDED_ARTFORMS_DATA: Record<string, any> = rawWorkshops.reduce((acc: Record<string, any>, w: any) => {
  const locs = locationMap[w.slug] || (w.category === 'traditional' ? ['Bangalore'] : w.category === 'wellness' ? ['Goa', 'Bangalore'] : ['Mumbai', 'Bangalore'])
  acc[w.slug] = {
    _id: `art-${w.slug}`,
    title: w.name,
    slug: w.slug,
    experienceType: `${w.category.toUpperCase()} MASTERCLASS`,
    audience: ['Beginners', 'Creative Practitioners', 'Wellness Groups'],
    shortDescription: w.definition || `Immerse in the tactile art of ${w.name}, mastering authentic techniques and traditional materials.`,
    duration: w.durationDays ? `${w.durationDays * 3} Hours` : '3 Hours',
    format: 'Studio Masterclass & Workshop',
    locationAvailability: locs,
    artisans: [{ name: `Master Artisan (${w.origin || 'India'})`, region: w.origin || 'Traditional Craft Cluster' }],
    overview: w.process || w.definition || `Participants explore the complete journey of ${w.name}, from raw material preparation to finished creation under expert guidance.`,
  }
  return acc
}, {})

// Add alias keys for variants
EXTENDED_ARTFORMS_DATA['bagru-block-printing'] = {
  ...EXTENDED_ARTFORMS_DATA['block-printing'],
  title: 'Bagru Block Printing & Natural Dyeing',
  slug: 'bagru-block-printing',
  locationAvailability: ['Bangalore'],
}

EXTENDED_ARTFORMS_DATA['portuguese-azulejo'] = {
  ...EXTENDED_ARTFORMS_DATA['portuguese-azulejo-tile-painting'],
  title: 'Portuguese Azulejo Tile Painting',
  slug: 'portuguese-azulejo',
  locationAvailability: ['Goa'],
}

EXTENDED_ARTFORMS_DATA['kolhapuri-chappal'] = {
  ...EXTENDED_ARTFORMS_DATA['kolhapuri-chappal-making'],
  title: 'Kolhapuri Chappal & Leather Craft',
  slug: 'kolhapuri-chappal',
  locationAvailability: ['Mumbai'],
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const experience = await client.fetch(EXPERIENCE_BY_SLUG_QUERY, { slug }).catch(() => null)
  const fallback = EXTENDED_ARTFORMS_DATA[slug] || FALLBACK_EXPERIENCES.find((e) => e.slug === slug)

  const title = experience?.title || fallback?.title || slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  return {
    title: `${title} | Kiiro Creative Experience`,
    description: experience?.shortDescription || fallback?.shortDescription || `Discover the ${title} workshop experience by Kiiro.`,
  }
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params

  const [cmsExperience, cmsEventsData] = await Promise.all([
    client.fetch(EXPERIENCE_BY_SLUG_QUERY, { slug }).catch(() => null),
    client.fetch(ALL_EVENTS_QUERY).catch(() => []),
  ])

  const fallbackExperience = EXTENDED_ARTFORMS_DATA[slug] || FALLBACK_EXPERIENCES.find((e) => e.slug === slug)
  const exp = cmsExperience || fallbackExperience

  if (!exp) {
    notFound()
  }

  const cmsEvents: EventItem[] = (cmsEventsData || [])
    .map((doc: any) => mapSanityEvent(doc))
    .filter((event): event is EventItem => event !== null)

  const allEvents = cmsEvents.length > 0 ? cmsEvents : CONFIRMED_SCHEDULED_EVENTS

  const relatedEvents = allEvents.filter((evt) => {
    const isMatchingSlug = evt.workshopSlug === slug || evt.experienceSlug === slug || evt.slug?.includes(slug) || slug.includes(evt.workshopSlug || '')
    const isMatchingTitle = evt.title.toLowerCase().includes(exp.title?.toLowerCase() || slug.replace(/-/g, ' '))
    return isMatchingSlug || isMatchingTitle
  })

  const title = exp.title || slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const locationList = exp.locationAvailability || ['Bangalore', 'Mumbai', 'Goa']
  const artisans = exp.artisans && exp.artisans.length > 0 ? exp.artisans : FALLBACK_ARTISANS.slice(0, 1)

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-[#2B231F]">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#2B231F] text-[#FBF9F4] py-20 px-6 md:px-10 border-b border-[#3D332E]">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.25em] text-[#4F5B2A]">
              <Link href="/artforms" className="hover:underline">Offerings</Link>
              <span>/</span>
              <span>{exp.experienceType || 'Creative Workshop'}</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-normal leading-tight text-[#FBF9F4]">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-[#D8CEBE] uppercase tracking-wider pt-2 font-sans">
              <div><span className="text-[#FBF9F4] font-medium">Duration:</span> {exp.duration || '3 Hours'}</div>
              <div><span className="text-[#FBF9F4] font-medium">Format:</span> {exp.format || 'Studio Masterclass'}</div>
              <div>
                <span className="text-[#FBF9F4] font-medium">Available in:</span>{' '}
                <span className="text-[#4F5B2A] font-semibold">{locationList.join(', ')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Details & Overview Section */}
        <section className="py-16 px-6 md:px-10 max-w-5xl mx-auto space-y-12">
          <div className="border-l-2 border-[#4F5B2A] pl-6 py-2">
            <p className="text-xl md:text-2xl font-display text-[#2B231F] leading-relaxed">
              {exp.shortDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="font-display text-2xl text-[#2B231F] mb-4">What Participants Do & Experience</h3>
                <p className="text-base text-[#6E635B] font-light leading-relaxed">
                  {exp.overview ||
                    'Under the direct guidance of master practitioners, participants learn traditional material preparation, tool handling, motif composition, and cultural symbolism. Every participant works with authentic organic materials and leaves with their own completed piece.'}
                </p>
              </div>

              <div>
                <h3 className="font-display text-2xl text-[#2B231F] mb-4">Learning & Mindful Outcomes</h3>
                <ul className="space-y-3 text-sm text-[#6E635B] font-light">
                  <li className="flex items-start space-x-3">
                    <span className="text-[#4F5B2A] font-bold mt-0.5">✓</span>
                    <span>Deep understanding of regional history, lineage, and indigenous artform grammar.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-[#4F5B2A] font-bold mt-0.5">✓</span>
                    <span>Hands-on practice with natural pigments, organic dyes, bamboo tools, or quartz dough.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-[#4F5B2A] font-bold mt-0.5">✓</span>
                    <span>Sensory calibration, tactile focus, and grounding away from digital screens.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="bg-[#F3EFE6] border border-[#D8CEBE] p-6 space-y-6 h-fit shadow-sm">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2B231F] mb-2">
                  Target Audience
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(exp.audience || ['Beginners', 'Designers', 'Makers']).map((aud: string, idx: number) => (
                    <span key={idx} className="text-xs bg-[#FBF9F4] text-[#2B231F] border border-[#D8CEBE] px-2.5 py-1">
                      {aud}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#D8CEBE] pt-4">
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2B231F] mb-2">
                  Facilitated By
                </h4>
                {artisans.map((artisan: any) => (
                  <div key={artisan.name} className="text-xs text-[#6E635B]">
                    <span className="font-medium text-[#2B231F] block">{artisan.name}</span>
                    <span>{artisan.region}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#D8CEBE] pt-4">
                <Link
                  href={`/enquire?intent=individual&subject=${encodeURIComponent(title)}`}
                  className="block w-full text-center bg-[#4F5B2A] hover:bg-[#3D4721] text-white py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
                >
                  Book / Enquire →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Upcoming Events Section */}
        <section className="bg-white border-t border-[#E8E1D5] py-16 px-6 md:px-10">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8E1D5] pb-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#4F5B2A] font-semibold">
                  Scheduled Programming
                </span>
                <h3 className="font-display text-3xl text-[#2B231F] mt-1">
                  Upcoming {title} Workshops
                </h3>
              </div>
              <Link
                href="/weekly-events"
                className="text-xs uppercase tracking-[0.16em] text-[#4F5B2A] font-semibold hover:underline"
              >
                View Full Calendar →
              </Link>
            </div>

            {relatedEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedEvents.map((evt: EventItem) => (
                  <div key={evt.id || evt.slug} className="bg-[#FBF9F4] border border-[#D8CEBE] p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#6E635B] uppercase">
                      <span className="font-medium text-[#2B231F]">{evt.city} · {evt.venue}</span>
                      <span className="text-[#4F5B2A] font-semibold">₹{evt.price}</span>
                    </div>
                    <h4 className="font-display text-xl text-[#2B231F]">{evt.title}</h4>
                    <p className="text-xs text-[#6E635B] font-light">
                      Date: {formatEventDate(evt.date)} at {evt.startTime}
                    </p>
                    <Link
                      href={`/weekly-events/${evt.slug}`}
                      className="inline-block text-xs uppercase tracking-[0.18em] text-[#4F5B2A] font-semibold pt-2 hover:underline"
                    >
                      Reserve Spot →
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#FBF9F4] border border-[#D8CEBE] p-8 text-center space-y-4">
                <p className="text-base text-[#6E635B] font-light">
                  No public sessions are currently scheduled for this art form. Enquire to request a private studio session or team workshop.
                </p>
                <Link
                  href={`/enquire?intent=individual&subject=${encodeURIComponent(title)}`}
                  className="inline-block bg-[#4F5B2A] text-white px-6 py-3 text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#3D4721] transition-colors"
                >
                  Request Private Session →
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
