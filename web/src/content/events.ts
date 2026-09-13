import type { EventItem } from './types'

function availabilityFromStatus(status?: string): EventItem['availability'] {
  if (
    status === 'open' ||
    status === 'limited' ||
    status === 'sold-out' ||
    status === 'closed' ||
    status === 'enquiry-only'
  ) {
    return status
  }
  return 'enquiry-only'
}

export function mapSanityEvent(doc: {
  _id?: string
  title?: string
  slug?: string
  date?: string
  startTime?: string
  city?: string
  venue?: string
  price?: number
  capacity?: number
  bookingStatus?: string
  duration?: string
  facilitator?: string
  experienceType?: string
  experienceReference?: { title?: string; slug?: string }
  heroImageUrl?: string
  heroImageAlt?: string
}): EventItem | null {
  if (!doc.title || !doc.slug) return null
  const location = [doc.venue, doc.city].filter(Boolean).join(', ')
  return {
    id: doc._id || doc.slug,
    slug: doc.slug,
    title: doc.title,
    date: doc.date,
    startTime: doc.startTime,
    city: doc.city,
    venue: doc.venue,
    location: location || undefined,
    experienceType: doc.experienceType || doc.experienceReference?.title,
    duration: doc.duration,
    facilitator: doc.facilitator,
    price: doc.price,
    capacity: doc.capacity,
    availability: availabilityFromStatus(doc.bookingStatus),
    bookingHref: `/weekly-events/${doc.slug}`,
    experienceSlug: doc.experienceReference?.slug,
    media: doc.heroImageUrl
      ? [{ type: 'image', source: doc.heroImageUrl, alt: doc.heroImageAlt || doc.title }]
      : [],
  }
}

export function formatEventDate(date?: string): string | undefined {
  if (!date) return undefined
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatPrice(price?: number): string | undefined {
  if (price == null) return undefined
  return `₹${price.toLocaleString('en-IN')}`
}

export function availabilityLabel(status?: EventItem['availability']): string {
  switch (status) {
    case 'open':
      return 'Seats open'
    case 'limited':
      return 'Limited seats'
    case 'sold-out':
      return 'Sold out'
    case 'closed':
      return 'Closed'
    default:
      return 'Enquiry'
  }
}
