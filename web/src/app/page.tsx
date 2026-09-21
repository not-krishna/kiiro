import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { ManifestoImpact } from '@/components/home/ManifestoImpact'
import { ExperiencesSection } from '@/components/home/ExperiencesSection'
import { WeeklyEventsPreview } from '@/components/home/WeeklyEventsPreview'
import { MethodologySection } from '@/components/home/MethodologySection'
import { ArtformsSection } from '@/components/home/ArtformsSection'
import { PartnersRibbon } from '@/components/home/PartnersRibbon'
import { ArtisanImpact } from '@/components/home/ArtisanImpact'
import { PartnershipsSection } from '@/components/home/PartnershipsSection'
import { JournalSection } from '@/components/home/JournalSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { EnquirySection } from '@/components/home/EnquirySection'
import { client } from '@/sanity/lib/client'
import { HOMEPAGE_QUERY, JOURNAL_QUERY, TESTIMONIALS_QUERY, ALL_EVENTS_QUERY } from '@/sanity/lib/queries'
import { mapSanityEvent } from '@/content/events'
import type { Cta, EventItem, MediaAsset } from '@/content/types'

export const revalidate = 30

function mapCta(value: unknown): Cta | undefined {
  if (!value || typeof value !== 'object') return undefined
  const cta = value as { label?: string; href?: string; kind?: Cta['kind'] }
  if (!cta.label || !cta.href) return undefined
  return { label: cta.label, href: cta.href, kind: cta.kind || 'internal' }
}

export default async function HomePage() {
  const [homeData, journalData, testimonialsData, eventsData] = await Promise.all([
    client.fetch(HOMEPAGE_QUERY).catch(() => null),
    client.fetch(JOURNAL_QUERY).catch(() => []),
    client.fetch(TESTIMONIALS_QUERY).catch(() => []),
    client.fetch(ALL_EVENTS_QUERY).catch(() => []),
  ])

  const rawEvents = (homeData?.featuredEvents?.length ? homeData.featuredEvents : eventsData || []) as unknown[]
  const featuredEvents: EventItem[] = rawEvents
    .map((doc) => mapSanityEvent(doc as Parameters<typeof mapSanityEvent>[0]))
    .filter((event): event is EventItem => event !== null)

  const heroMedia: MediaAsset[] = Array.isArray(homeData?.heroMedia) ? homeData.heroMedia : []

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-[#2B231F] font-sans selection:bg-[#E8D9C8]">
      <Header />
      <main className="flex-1">
        <Hero
          data={{
            heroEyebrow: homeData?.heroEyebrow,
            heroHeading: homeData?.heroHeading,
            heroSubheading: homeData?.heroSubheading,
            heroPrimaryCta: mapCta(homeData?.heroPrimaryCta),
            heroSecondaryCta: mapCta(homeData?.heroSecondaryCta),
            heroMedia,
            heroImage: homeData?.heroImage,
          }}
        />
        <MethodologySection intro={homeData?.methodologyIntro} stages={homeData?.methodologyStages} />
        <ManifestoImpact manifestoTitle={homeData?.manifestoTitle} manifestoText={homeData?.manifestoText} />
        <WeeklyEventsPreview events={featuredEvents} />
        <ArtformsSection />
        <PartnersRibbon />
        <ArtisanImpact data={homeData?.artisanFeature} />
        <TestimonialsSection testimonials={testimonialsData} />
        <ExperiencesSection />
        <PartnershipsSection title={homeData?.partnershipsTitle} />
        <JournalSection posts={homeData?.featuredJournalPosts || journalData} />
        <EnquirySection />
      </main>
      <Footer />
    </div>
  )
}
