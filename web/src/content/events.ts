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

export function formatPrice(price?: number): string {
  if (price === undefined || price === null) return 'Price on enquiry'
  if (price === 0) return 'Free Entry'
  return `₹${price.toLocaleString('en-IN')}`
}

export function isEventPast(date?: string): boolean {
  if (!date) return false
  const eventDate = new Date(date)
  if (Number.isNaN(eventDate.getTime())) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return eventDate < today
}

export function sortEventsChronologically(events: EventItem[]): {
  sortedAll: EventItem[]
  upcoming: EventItem[]
  past: EventItem[]
} {
  const sortedAll = [...events].sort((a, b) => {
    const timeA = a.date ? new Date(a.date).getTime() : 0
    const timeB = b.date ? new Date(b.date).getTime() : 0
    return timeA - timeB
  })

  const upcoming = sortedAll.filter((evt) => !isEventPast(evt.date))
  const past = sortedAll.filter((evt) => isEventPast(evt.date))

  return { sortedAll, upcoming, past }
}

export function formatAvailabilityLabel(availability?: EventItem['availability']): string {
  switch (availability) {
    case 'open':
      return 'Seats Available'
    case 'limited':
      return 'Limited Seats'
    case 'sold-out':
      return 'Sold Out'
    case 'closed':
      return 'Booking Closed'
    case 'enquiry-only':
    default:
      return 'Enquiry Only'
  }
}

export const availabilityLabel = formatAvailabilityLabel

export const CONFIRMED_SCHEDULED_EVENTS: EventItem[] = [
  {
    id: 'event-block-printing-1',
    slug: 'bagru-block-printing-bangalore',
    title: 'Bagru Block Printing & Natural Dye Studio',
    date: '2026-10-04',
    startTime: '10:30 AM',
    endTime: '01:30 PM',
    city: 'Bangalore',
    venue: 'Indiranagar Craft Sanctuary',
    location: 'Indiranagar Craft Sanctuary, Bangalore',
    price: 2200,
    capacity: 15,
    availability: 'open',
    workshopSlug: 'bagru-block-printing',
    experienceType: 'Traditional Textile Craft',
    duration: '3 hours',
    facilitator: 'Master Block Printer from Rajasthan',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: '/images/workshops/madhubani-painting-process.jpg',
        alt: 'Bagru Block Printing Studio Experience',
      },
    ],
  },
  {
    id: 'event-block-printing-2',
    slug: 'natural-dye-block-printing-bangalore',
    title: 'Indigo & Woodblock Relief Printing',
    date: '2026-10-11',
    startTime: '02:00 PM',
    endTime: '05:00 PM',
    city: 'Bangalore',
    venue: 'Koramangala Studio Hub',
    location: 'Koramangala Studio Hub, Bangalore',
    price: 2400,
    capacity: 12,
    availability: 'open',
    workshopSlug: 'bagru-block-printing',
    experienceType: 'Textile Art',
    duration: '3 hours',
    facilitator: 'Master Block Printer',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: '/images/workshops/kalamkari-art-process.jpg',
        alt: 'Indigo Block Printing Masterclass',
      },
    ],
  },
  {
    id: 'event-block-printing-3',
    slug: 'contemporary-textile-block-printing-bangalore',
    title: 'Botanical & Geometric Block Printing',
    date: '2026-10-18',
    startTime: '11:00 AM',
    endTime: '02:00 PM',
    city: 'Bangalore',
    venue: 'Whitefield Creative Space',
    location: 'Whitefield Creative Space, Bangalore',
    price: 2100,
    capacity: 15,
    availability: 'open',
    workshopSlug: 'bagru-block-printing',
    experienceType: 'Contemporary Craft',
    duration: '3 hours',
    facilitator: 'Textile Artisan Facilitator',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: '/images/workshops/madhubani-painting-process.jpg',
        alt: 'Botanical Block Printing Workshop',
      },
    ],
  },
  {
    id: 'event-pottery-1',
    slug: 'pottery-studio-experience-bangalore',
    title: 'Clay, Calm & Centering (Pottery Studio)',
    date: '2026-10-03',
    startTime: '10:30 AM',
    endTime: '01:30 PM',
    city: 'Bangalore',
    venue: 'Indiranagar Craft Sanctuary',
    location: 'Indiranagar Craft Sanctuary, Bangalore',
    price: 2500,
    capacity: 15,
    availability: 'open',
    workshopSlug: 'pottery',
    experienceType: 'Studio Craft',
    duration: '3 hours',
    facilitator: 'Master Ceramicist',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: '/images/other/pottery-1.png',
        alt: 'Clay Pottery Studio Experience',
      },
    ],
  },
  {
    id: 'event-pottery-2',
    slug: 'blue-pottery-glaze-bangalore',
    title: 'Jaipur Blue Pottery Underglaze Workshop',
    date: '2026-10-17',
    startTime: '02:30 PM',
    endTime: '05:30 PM',
    city: 'Bangalore',
    venue: 'Koramangala Studio Hub',
    location: 'Koramangala Studio Hub, Bangalore',
    price: 2800,
    capacity: 12,
    availability: 'limited',
    workshopSlug: 'pottery',
    experienceType: 'Heritage Ceramics',
    duration: '3 hours',
    facilitator: 'Master Blue Pottery Artisan',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: '/images/other/pottery-3.png',
        alt: 'Blue Pottery Tiles & Underglaze Masterclass',
      },
    ],
  },
  {
    id: 'event-kolhapuri-1',
    slug: 'kolhapuri-chappal-making-mumbai',
    title: 'Kolhapuri Chappal & Hand-Stitched Leather Craft',
    date: '2026-10-10',
    startTime: '11:00 AM',
    endTime: '03:00 PM',
    city: 'Mumbai',
    venue: 'Kiiro Studio, Bandra West',
    location: 'Kiiro Studio, Bandra West, Mumbai',
    price: 3200,
    capacity: 10,
    availability: 'limited',
    workshopSlug: 'kolhapuri-chappal',
    experienceType: 'Generational Leather Craft',
    duration: '4 hours',
    facilitator: 'Generational Artisan from Kolhapur',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: '/images/other/pottery-2.png',
        alt: 'Kolhapuri Chappal Craft Session',
      },
    ],
  },
  {
    id: 'event-portuguese-1',
    slug: 'portuguese-azulejo-tile-painting-goa',
    title: 'Portuguese Azulejo Tile Painting Workshop',
    date: '2026-10-24',
    startTime: '03:00 PM',
    endTime: '06:00 PM',
    city: 'Goa',
    venue: 'Fontainhas Heritage House, Panjim',
    location: 'Fontainhas Heritage House, Panjim, Goa',
    price: 2600,
    capacity: 12,
    availability: 'open',
    workshopSlug: 'portuguese-azulejo',
    experienceType: 'Heritage Tile Art',
    duration: '3 hours',
    facilitator: 'Master Azulejo Painter',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: '/images/other/pottery-3.png',
        alt: 'Portuguese Azulejo Tile Painting Workshop',
      },
    ],
  },
  {
    id: 'event-kintsugi-1',
    slug: 'kintsugi-golden-repair-goa',
    title: 'Kintsugi: The Mindful Art of Golden Joinery',
    date: '2026-10-25',
    startTime: '10:30 AM',
    endTime: '01:30 PM',
    city: 'Goa',
    venue: 'Assagao Craft Studio',
    location: 'Assagao Craft Studio, Goa',
    price: 3500,
    capacity: 10,
    availability: 'limited',
    workshopSlug: 'kintsugi',
    experienceType: 'Mindful Ceramic Repair',
    duration: '3 hours',
    facilitator: 'Kintsugi Practitioner',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: '/images/other/pottery-1.png',
        alt: 'Kintsugi Golden Joinery Workshop',
      },
    ],
  },
]
