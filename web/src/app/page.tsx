import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { ManifestoImpact } from '@/components/home/ManifestoImpact'
import { ExperiencesSection } from '@/components/home/ExperiencesSection'
import { WeeklyEventsPreview } from '@/components/home/WeeklyEventsPreview'
import { MethodologySection } from '@/components/home/MethodologySection'
import { WhyMakingRestoresSection } from '@/components/home/WhyMakingRestoresSection'
import { ArtformsSection } from '@/components/home/ArtformsSection'
import { PartnersRibbon } from '@/components/home/PartnersRibbon'
import { ArtisanImpact, type ArtisanStoryItem } from '@/components/home/ArtisanImpact'
import { PartnershipsSection } from '@/components/home/PartnershipsSection'
import { AdvisorySection } from '@/components/home/AdvisorySection'
import { OnlineSessionsCallout } from '@/components/home/OnlineSessionsCallout'
import { SocialSection } from '@/components/home/SocialSection'
import { JournalSection } from '@/components/home/JournalSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { EnquirySection } from '@/components/home/EnquirySection'
import { client } from '@/sanity/lib/client'
import { HOMEPAGE_QUERY, JOURNAL_QUERY, TESTIMONIALS_QUERY, ALL_EVENTS_QUERY, ARTISAN_STORIES_QUERY } from '@/sanity/lib/queries'
import { mapSanityEvent, CONFIRMED_SCHEDULED_EVENTS } from '@/content/events'
import type { Cta, EventItem, MediaAsset } from '@/content/types'

export const revalidate = 30

function mapCta(value: unknown): Cta | undefined {
  if (!value || typeof value !== 'object') return undefined
  const cta = value as { label?: string; href?: string; kind?: Cta['kind'] }
  if (!cta.label || !cta.href) return undefined
  return { label: cta.label, href: cta.href, kind: cta.kind || 'internal' }
}

export default async function HomePage() {
  const [homeData, journalData, testimonialsData, eventsData, artisanStoriesData] = await Promise.all([
    client.fetch(HOMEPAGE_QUERY).catch(() => null),
    client.fetch(JOURNAL_QUERY).catch(() => []),
    client.fetch(TESTIMONIALS_QUERY).catch(() => []),
    client.fetch(ALL_EVENTS_QUERY).catch(() => []),
    client.fetch(ARTISAN_STORIES_QUERY).catch(() => []),
  ])

  const rawEvents = (homeData?.featuredEvents?.length ? homeData.featuredEvents : eventsData || []) as unknown[]
  const cmsEvents: EventItem[] = rawEvents
    .map((doc) => mapSanityEvent(doc as Parameters<typeof mapSanityEvent>[0]))
    .filter((event): event is EventItem => event !== null)
  const featuredEvents = cmsEvents.length > 0 ? cmsEvents : CONFIRMED_SCHEDULED_EVENTS

  const heroMedia: MediaAsset[] = Array.isArray(homeData?.heroMedia) ? homeData.heroMedia : []

  const artisanStories: ArtisanStoryItem[] = Array.isArray(artisanStoriesData) && artisanStoriesData.length > 0
    ? artisanStoriesData.map((doc: any) => ({
        id: doc._id || doc.name,
        name: doc.name,
        craft: doc.craft,
        region: doc.region,
        portraitUrl: doc.imageUrl,
        portrait: doc.portrait,
        quote: doc.quote,
        description: doc.description,
        impactMetric: doc.impactMetric,
        impactLabel: doc.impactLabel,
        impactDescription: doc.impactDescription,
        ctaLabel: doc.ctaLabel,
        ctaUrl: doc.ctaUrl,
      }))
    : []

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-[#2B231F] font-sans selection:bg-[#E8D9C8]">
      <Header />
      <main className="flex-1">
        {/* 1. Hero with Top Script Lineages above */}
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

        {/* 3 & 4. Stats Row & Manifesto Block */}
        <ManifestoImpact manifestoTitle={homeData?.manifestoTitle} manifestoText={homeData?.manifestoText} />

        {/* 5. How a Session Unfolds */}
        <MethodologySection intro={homeData?.methodologyIntro} stages={homeData?.methodologyStages} />

        {/* 6. Why Making Restores */}
        <WhyMakingRestoresSection />

        {/* 7. Upcoming Sessions */}
        <WeeklyEventsPreview events={featuredEvents} />

        {/* 8. Pillars Section: Three Ways to Root, Create, and Restore */}
        <ArtformsSection />

        {/* 9. Organisations We Work With (Logos) */}
        <PartnersRibbon />

        {/* 12. Find Your Way In (Experiences Tailored For) — Reordered before Artisan Section */}
        <ExperiencesSection />

        {/* 13. Can't Be There In Person? (Online Callout) — Directly below Find Your Way In */}
        <OnlineSessionsCallout />

        {/* 10. Artisan Section: The Craft Is the Experience */}
        <ArtisanImpact data={homeData?.artisanFeature} stories={artisanStories} />

        {/* 11. Testimonials: In Their Words */}
        <TestimonialsSection testimonials={testimonialsData} />

        {/* 14. Our Distinguished Advisory & Partnerships */}
        <AdvisorySection />
        <PartnershipsSection title={homeData?.partnershipsTitle} />

        {/* Community & Social Moments */}
        <SocialSection />

        {/* Field Dispatches / Journal */}
        <JournalSection posts={homeData?.featuredJournalPosts || journalData} />

        {/* 15. Final CTA: Designed for Groups & Individuals */}
        <EnquirySection />
      </main>
      <Footer />
    </div>
  )
}
