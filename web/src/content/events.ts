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
  endTime?: string
  city?: string
  venue?: string
  price?: number
  capacity?: number
  bookingStatus?: string
  duration?: string
  facilitator?: string
  experienceType?: string
  isWeekly?: boolean
  audience?: EventItem['audience']
  workshopSlug?: string
  experienceReference?: { title?: string; slug?: string }
  workshop?: { title?: string; slug?: string; name?: string }
  heroImageUrl?: string
  heroImageAlt?: string
}): EventItem | null {
  if (!doc.title || !doc.slug) return null
  const venue = doc.venue || 'Venue to be confirmed'
  const location = [venue, doc.city].filter(Boolean).join(', ')
  const workshopSlug = doc.workshopSlug || doc.workshop?.slug
  const isWeekly = Boolean(doc.isWeekly)
  return {
    id: doc._id || doc.slug,
    slug: doc.slug,
    title: doc.title,
    date: doc.date,
    startTime: doc.startTime,
    endTime: doc.endTime,
    city: doc.city,
    venue,
    location: location || undefined,
    experienceType: doc.experienceType || doc.experienceReference?.title || doc.workshop?.name,
    duration: doc.duration,
    facilitator: doc.facilitator,
    price: doc.price,
    capacity: doc.capacity,
    availability: availabilityFromStatus(doc.bookingStatus),
    bookingHref: `/enquire?intent=individual&subject=${encodeURIComponent(doc.title)}&event=${encodeURIComponent(doc.slug)}${isWeekly ? '&weekly=1' : ''}`,
    experienceSlug: doc.experienceReference?.slug,
    workshopSlug,
    isWeekly,
    audience: doc.audience || 'b2c',
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

export const CONFIRMED_SCHEDULED_EVENTS: EventItem[] = [
  {
    id: 'event-pottery-kolkata-oct4',
    slug: 'pottery-masterclass-kolkata-oct4',
    title: 'Pottery Studio Experience',
    date: '2026-10-04',
    startTime: '4:00 PM',
    endTime: '7:00 PM',
    city: 'Kolkata',
    venue: 'Venue to be confirmed',
    location: 'Venue to be confirmed, Kolkata',
    price: 1500,
    capacity: 15,
    availability: 'open',
    workshopSlug: 'pottery',
    isWeekly: false,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=800&auto=format&fit=crop',
        alt: 'Pottery Studio Experience',
      },
    ],
  },
  {
    id: 'event-kintsugi-pune-oct14',
    slug: 'kintsugi-workshop-pune-oct14',
    title: 'Kintsugi Studio Workshop',
    date: '2026-10-14',
    startTime: '4:00 PM',
    endTime: '7:00 PM',
    city: 'Pune',
    venue: 'Venue to be confirmed',
    location: 'Venue to be confirmed, Pune',
    price: 1850,
    capacity: 15,
    availability: 'open',
    workshopSlug: 'kintsugi',
    isWeekly: false,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop',
        alt: 'Kintsugi Studio Workshop',
      },
    ],
  },
  {
    id: 'event-blockprinting-bangalore-oct4',
    slug: 'block-printing-bangalore-oct4',
    title: 'Block Printing Textile Workshop',
    date: '2026-10-04',
    startTime: '4:00 PM',
    endTime: '7:00 PM',
    city: 'Bangalore',
    venue: 'Venue to be confirmed',
    location: 'Venue to be confirmed, Bangalore',
    price: 1500,
    capacity: 15,
    availability: 'open',
    workshopSlug: 'block-printing',
    isWeekly: false,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1606744888344-493238951221?q=80&w=800&auto=format&fit=crop',
        alt: 'Block Printing Textile Workshop',
      },
    ],
  },
  {
    id: 'event-cyanotype-goa-oct14',
    slug: 'cyanotype-printing-goa-oct14',
    title: 'Cyanotype Botanical Printing',
    date: '2026-10-14',
    startTime: '4:00 PM',
    endTime: '7:00 PM',
    city: 'Goa',
    venue: 'Venue to be confirmed',
    location: 'Venue to be confirmed, Goa',
    price: 2000,
    capacity: 12,
    availability: 'open',
    workshopSlug: 'cyanotype-printing',
    isWeekly: false,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop',
        alt: 'Cyanotype Botanical Printing',
      },
    ],
  },
]

