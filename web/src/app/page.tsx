import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { ManifestoImpact } from '@/components/home/ManifestoImpact'
import { ExperiencesSection } from '@/components/home/ExperiencesSection'
import { WeeklyEventsPreview } from '@/components/home/WeeklyEventsPreview'
import { MethodologySection } from '@/components/home/MethodologySection'
import { ArtformsSection } from '@/components/home/ArtformsSection'
import { PartnersRibbon } from '@/components/home/PartnersRibbon'
import { ArtisanImpact, type ArtisanStoryItem } from '@/components/home/ArtisanImpact'
import { PartnershipsSection } from '@/components/home/PartnershipsSection'
import { AdvisorySection } from '@/components/home/AdvisorySection'
import { SocialSection } from '@/components/home/SocialSection'
import { JournalSection } from '@/components/home/JournalSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { EnquirySection } from '@/components/home/EnquirySection'
import { client } from '@/sanity/lib/client'
import { HOMEPAGE_QUERY, JOURNAL_QUERY, TESTIMONIALS_QUERY, ALL_EVENTS_QUERY, ARTISAN_STORIES_QUERY, IMPACT_STATS_QUERY, ALL_ADVISORS_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { mapSanityEvent, CONFIRMED_SCHEDULED_EVENTS } from '@/content/events'
import { getContentStore } from '@/lib/cms/contentStore'
import type { Cta, EventItem, MediaAsset } from '@/content/types'

export const revalidate = 30

function mapCta(value: unknown): Cta | undefined {
  if (!value || typeof value !== 'object') return undefined
  const cta = value as { label?: string; href?: string; kind?: Cta['kind'] }
  if (!cta.label || !cta.href) return undefined
  return { label: cta.label, href: cta.href, kind: cta.kind || 'internal' }
}

export default async function HomePage() {
  const store = getContentStore()

  const [homeData, journalData, testimonialsData, eventsData, artisanStoriesData, impactStatsData, advisorsData, siteSettingsData] = await Promise.all([
    client.fetch(HOMEPAGE_QUERY).catch(() => null),
    client.fetch(JOURNAL_QUERY).catch(() => []),
    client.fetch(TESTIMONIALS_QUERY).catch(() => []),
    client.fetch(ALL_EVENTS_QUERY).catch(() => []),
    client.fetch(ARTISAN_STORIES_QUERY).catch(() => []),
    client.fetch(IMPACT_STATS_QUERY).catch(() => []),
    client.fetch(ALL_ADVISORS_QUERY).catch(() => []),
    client.fetch(SITE_SETTINGS_QUERY).catch(() => null),
  ])

  // Events: prefer Sanity CMS events if returned, else store.events, else fallback
  const rawEvents = (homeData?.featuredEvents?.length ? homeData.featuredEvents : eventsData || []) as unknown[]
  const cmsEvents: EventItem[] = rawEvents
    .map((doc) => mapSanityEvent(doc as Parameters<typeof mapSanityEvent>[0]))
    .filter((event): event is EventItem => event !== null)
  
  const storeEvents: EventItem[] = (store.events && store.events.length > 0)
    ? (store.events as unknown as EventItem[]).filter(e => e.published !== false)
    : CONFIRMED_SCHEDULED_EVENTS

  const featuredEvents = cmsEvents.length > 0 ? cmsEvents : storeEvents

  // Hero media
  const heroMedia: MediaAsset[] = Array.isArray(homeData?.heroMedia) && homeData.heroMedia.length > 0
    ? homeData.heroMedia
    : (store.homepage?.heroImages?.length
        ? store.homepage.heroImages.map((src, i) => ({ type: 'image' as const, source: src, alt: `Kiiro Hero Image ${i + 1}` }))
        : [])

  const heroPrimaryCta = mapCta(homeData?.heroPrimaryCta) || (store.homepage?.heroPrimaryCtaLabel ? {
    label: store.homepage.heroPrimaryCtaLabel,
    href: store.homepage.heroPrimaryCtaHref || '#weekly-events',
    kind: 'internal' as const,
  } : undefined)

  const heroSecondaryCta = mapCta(homeData?.heroSecondaryCta) || (store.homepage?.heroSecondaryCtaLabel ? {
    label: store.homepage.heroSecondaryCtaLabel,
    href: store.homepage.heroSecondaryCtaHref || '/offerings',
    kind: 'internal' as const,
  } : undefined)

  const defaultImpactStats = [
    {
      value: store.homepage?.statsWorkshops || '800+',
      label: store.homepage?.statsWorkshopsTitle || 'Workshops',
      context: store.homepage?.statsWorkshopsLabel || 'Hands-on sessions across India',
    },
    {
      value: store.homepage?.statsParticipants || '10,000+',
      label: store.homepage?.statsParticipantsTitle || 'Participants',
      context: store.homepage?.statsParticipantsLabel || 'People who took a creative break',
    },
    {
      value: store.homepage?.statsCities || '7',
      label: store.homepage?.statsCitiesTitle || 'Cities',
      context: store.homepage?.statsCitiesLabel || 'Mumbai, Kolkata, Pune, Goa, Bangalore, Jaipur',
    },
    {
      value: store.homepage?.statsTeams || '15+',
      label: store.homepage?.statsTeamsTitle || 'Corporate teams',
      context: store.homepage?.statsTeamsLabel || 'Team wellness through making',
    },
    {
      value: store.homepage?.statsResorts || '10+',
      label: store.homepage?.statsResortsTitle || 'Resorts',
      context: store.homepage?.statsResortsLabel || 'Guest wellness experiences',
    },
  ]

  const stats = (Array.isArray(impactStatsData) && impactStatsData.length > 0)
    ? impactStatsData
    : (Array.isArray(homeData?.stats) && homeData.stats.length > 0)
      ? homeData.stats
      : defaultImpactStats

  // Artisan Stories
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
    : (store.artisans && store.artisans.length > 0)
      ? store.artisans.filter(a => a.published !== false).map(a => ({
          id: a.id,
          name: a.name,
          craft: a.craft,
          region: a.region,
          portraitUrl: a.portraitUrl,
          quote: a.quote,
          description: a.description,
          impactMetric: a.impactMetric,
          impactLabel: a.impactLabel,
          ctaLabel: a.ctaLabel,
          ctaUrl: a.ctaUrl,
        }))
      : []

  // Testimonials
  const testimonials = Array.isArray(testimonialsData) && testimonialsData.length > 0
    ? testimonialsData
    : (store.testimonials && store.testimonials.length > 0)
      ? store.testimonials.filter(t => t.published !== false)
      : undefined

  // Advisors
  const advisors = (Array.isArray(advisorsData) && advisorsData.length > 0)
    ? advisorsData
    : (store.advisors && store.advisors.length > 0)
      ? store.advisors.filter(a => a.published !== false)
      : undefined

  // Artisan Stories visibility (default hidden on public site)
  const showArtisanStories = Boolean(
    homeData?.showArtisanStories ||
    siteSettingsData?.showArtisanStories ||
    store.homepage?.showArtisanStories
  )

  // CSR Section visibility (default hidden on public site)
  const showCsrSection = Boolean(
    homeData?.showCsrSection ||
    siteSettingsData?.showCsrSection ||
    store.siteSettings?.showCsrSection ||
    store.homepage?.showCsrSection
  )

  // Moments from the studio
  const studioMoments = (store.studioMoments && store.studioMoments.length > 0)
    ? store.studioMoments.filter(m => m.published !== false)
    : undefined

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-[#2B231F] font-sans selection:bg-[#E8D9C8]">
      <Header showCsrSection={showCsrSection} />
      <main className="flex-1">
        {/* 1. Hero with Top Script Lineages above */}
        <Hero
          data={{
            heroEyebrow: homeData?.heroEyebrow || store.homepage?.heroEyebrow,
            heroHeading: homeData?.heroHeading || store.homepage?.heroHeading,
            heroSubheading: homeData?.heroSubheading || store.homepage?.heroSubheading,
            heroSupportingText: homeData?.heroSupportingText || store.homepage?.heroSupportingText,
            heroPrimaryCta,
            heroSecondaryCta,
            heroMedia,
            heroImage: homeData?.heroImage,
          }}
        />

        {/* 3 & 4. Stats Row & Manifesto Block */}
        <ManifestoImpact
          manifestoTitle={homeData?.manifestoTitle || store.homepage?.manifestoTitle}
          manifestoText={homeData?.manifestoText || store.homepage?.manifestoText}
          stats={stats}
        />

        {/* 5. How a Session Unfolds */}
        <MethodologySection
          intro={homeData?.methodologyIntro || store.homepage?.methodologyIntro}
          stages={homeData?.methodologyStages || store.homepage?.methodologyStages}
        />

        {/* 7. Upcoming Sessions */}
        <WeeklyEventsPreview events={featuredEvents} />

        {/* 8. Pillars Section: Three Ways to Root, Create, and Restore */}
        <ArtformsSection />

        {/* 9. Organisations We Work With (Logos) */}
        <PartnersRibbon />

        {/* 12. Find Your Way In (Experiences Tailored For) — Reordered before Artisan Section */}
        <ExperiencesSection />

        {/* 10. Artisan Section: The Craft Is the Experience (controlled by admin toggle) */}
        {showArtisanStories && (
          <ArtisanImpact data={homeData?.artisanFeature} stories={artisanStories} />
        )}

        {/* 11. Testimonials: In Their Words */}
        <TestimonialsSection testimonials={testimonials} />

        {/* 14. Our Distinguished Advisory & Partnerships */}
        <AdvisorySection advisors={advisors} />
        {showCsrSection && (
          <PartnershipsSection title={homeData?.partnershipsTitle} />
        )}

        {/* Community & Social Moments */}
        <SocialSection moments={studioMoments} />

        {/* Field Dispatches / Journal */}
        <JournalSection posts={homeData?.featuredJournalPosts || journalData} />

        {/* 15. Final CTA: Designed for Groups & Individuals */}
        <EnquirySection />
      </main>
      <Footer showCsrSection={showCsrSection} />
    </div>
  )
}
