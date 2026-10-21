import { notFound } from 'next/navigation'
import { getOfferingBySlug, ALL_OFFERINGS, OFFERING_ALIASES } from '@/content/offeringsData'
import { CONFIRMED_SCHEDULED_EVENTS } from '@/content/events'
import { OfferingDetailView } from '@/components/offerings/OfferingDetailView'
import { getContentStore } from '@/lib/cms/contentStore'
import type { EventItem } from '@/content/types'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  const directSlugs = ALL_OFFERINGS.map((o) => ({ slug: o.slug }))
  const aliasSlugs = Object.keys(OFFERING_ALIASES).map((slug) => ({ slug }))
  return [...directSlugs, ...aliasSlugs]
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const store = getContentStore()
  const canonical = OFFERING_ALIASES[slug] || slug
  const offering = store.offerings.find((o) => o.slug === canonical) || getOfferingBySlug(slug)
  if (!offering) {
    return {
      title: 'Offering | Kiiro Living Craft',
      description: 'Discover living traditional craft practices and cultural context.',
    }
  }

  return {
    title: `${offering.title} | Our Offerings | Kiiro`,
    description: `${offering.definition} Experience hands-on masterclasses and workshops with master artisans.`,
  }
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const store = getContentStore()
  const canonical = OFFERING_ALIASES[slug] || slug
  const offering = store.offerings.find((o) => o.slug === canonical) || getOfferingBySlug(slug)

  if (!offering) {
    notFound()
  }

  const allEvents: EventItem[] = (store.events && store.events.length > 0)
    ? (store.events as unknown as EventItem[]).filter(e => e.published !== false)
    : CONFIRMED_SCHEDULED_EVENTS

  // Find related events associated with this offering
  const relatedEvents: EventItem[] = allEvents.filter((evt) => {
    if (evt.workshopSlug === offering.slug) return true
    if (offering.slug === 'block-printing' && (evt.workshopSlug === 'bagru-block-printing' || evt.workshopSlug === 'block-printing')) return true
    if (offering.slug === 'jaipur-tile-painting' && (evt.workshopSlug === 'blue-pottery' || evt.workshopSlug === 'jaipur-tile-painting')) return true
    if (offering.slug === 'kolhapuri-chappal-making' && (evt.workshopSlug === 'kolhapuri-chappal' || evt.workshopSlug === 'kolhapuri-chappal-making')) return true
    if (offering.slug === 'portuguese-azulejo-tile-painting' && (evt.workshopSlug === 'portuguese-azulejo' || evt.workshopSlug === 'portuguese-azulejo-tile-painting')) return true
    return false
  })

  return <OfferingDetailView offering={offering} relatedEvents={relatedEvents} />
}
