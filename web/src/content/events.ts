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

export function isEventPast(dateStr?: string): boolean {
  if (!dateStr) return false
  const eventDate = new Date(dateStr)
  if (Number.isNaN(eventDate.getTime())) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return eventDate < today
}

export function sortEventsChronologically(events: EventItem[]): {
  upcoming: EventItem[]
  past: EventItem[]
  sortedAll: EventItem[]
} {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcoming: EventItem[] = []
  const past: EventItem[] = []

  for (const event of events) {
    if (!event.date) {
      upcoming.push(event)
      continue
    }
    const d = new Date(event.date)
    if (Number.isNaN(d.getTime()) || d >= today) {
      upcoming.push(event)
    } else {
      past.push(event)
    }
  }

  upcoming.sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  past.sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return {
    upcoming,
    past,
    sortedAll: [...upcoming, ...past],
  }
}

export const CONFIRMED_SCHEDULED_EVENTS: EventItem[] = [
  {
    id: 'event-2026-06-07-pottery',
    slug: 'pottery-studio-experience-june-7',
    title: 'Clay, Calm & Centering (Pottery Studio Experience)',
    date: '2026-06-07',
    startTime: '10:30 AM',
    endTime: '1:30 PM',
    city: 'Bangalore',
    venue: 'Indiranagar Craft Sanctuary',
    location: 'Indiranagar Craft Sanctuary, Bangalore',
    price: 1500,
    capacity: 15,
    availability: 'open',
    workshopSlug: 'pottery',
    experienceType: 'Traditional Artforms',
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
    id: 'event-2026-06-14-perfume',
    slug: 'perfume-making-masterclass-june-14',
    title: 'Perfume Making Masterclass',
    date: '2026-06-14',
    startTime: '2:00 PM',
    endTime: '5:00 PM',
    city: 'Mumbai',
    venue: 'Bandra Olfactory Lab',
    location: 'Bandra Olfactory Lab, Mumbai',
    price: 1800,
    capacity: 12,
    availability: 'open',
    workshopSlug: 'perfume-making',
    experienceType: 'Contemporary Art',
    duration: '3 hours',
    facilitator: 'Senior Perfumer',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=800&auto=format&fit=crop',
        alt: 'Perfume Making Masterclass',
      },
    ],
  },
  {
    id: 'event-2026-06-21-sound-healing',
    slug: 'sound-healing-vibrational-bath-june-21',
    title: 'Sound Healing & Vibrational Bath',
    date: '2026-06-21',
    startTime: '5:00 PM',
    endTime: '7:00 PM',
    city: 'Delhi NCR',
    venue: 'Gurugram Wellness Pavilion',
    location: 'Gurugram Wellness Pavilion, Delhi NCR',
    price: 1500,
    capacity: 20,
    availability: 'open',
    workshopSlug: 'sound-healing',
    experienceType: 'Wellness Practice',
    duration: '2 hours',
    facilitator: 'Sound Practitioner',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop',
        alt: 'Sound Healing & Vibrational Bath',
      },
    ],
  },
  {
    id: 'event-2026-06-28-kintsugi',
    slug: 'kintsugi-studio-workshop-june-28',
    title: 'Kintsugi Studio Workshop',
    date: '2026-06-28',
    startTime: '11:00 AM',
    endTime: '2:00 PM',
    city: 'Pune',
    venue: 'Koregaon Park Studio',
    location: 'Koregaon Park Studio, Pune',
    price: 1800,
    capacity: 15,
    availability: 'open',
    workshopSlug: 'kintsugi',
    experienceType: 'Traditional Artforms',
    duration: '3 hours',
    facilitator: 'Kintsugi Artisan',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: '/images/other/kintsugi-1.png',
        alt: 'Kintsugi Studio Workshop',
      },
    ],
  },
  {
    id: 'event-2026-07-05-block-printing',
    slug: 'block-printing-textile-july-5',
    title: 'Block Printing Textile Workshop',
    date: '2026-07-05',
    startTime: '10:30 AM',
    endTime: '1:30 PM',
    city: 'Jaipur',
    venue: 'Heritage Craft Studio',
    location: 'Heritage Craft Studio, Jaipur',
    price: 1500,
    capacity: 18,
    availability: 'open',
    workshopSlug: 'block-printing',
    experienceType: 'Traditional Artforms',
    duration: '3 hours',
    facilitator: 'Master Block Printer',
    isWeekly: true,
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
    id: 'event-2026-07-12-candle-making',
    slug: 'candle-making-studio-july-12',
    title: 'Candle Making Studio',
    date: '2026-07-12',
    startTime: '3:00 PM',
    endTime: '5:30 PM',
    city: 'Bangalore',
    venue: 'Koramangala Creative Hub',
    location: 'Koramangala Creative Hub, Bangalore',
    price: 1500,
    capacity: 15,
    availability: 'open',
    workshopSlug: 'candle-making',
    experienceType: 'Contemporary Art',
    duration: '2.5 hours',
    facilitator: 'Artisan Chandler',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop',
        alt: 'Candle Making Studio',
      },
    ],
  },
  {
    id: 'event-2026-07-19-art-journaling',
    slug: 'art-journaling-reflective-sketching-july-19',
    title: 'Art Journaling & Reflective Sketching',
    date: '2026-07-19',
    startTime: '10:00 AM',
    endTime: '1:00 PM',
    city: 'Goa',
    venue: 'Fontainhas Studio Loft',
    location: 'Fontainhas Studio Loft, Goa',
    price: 1500,
    capacity: 12,
    availability: 'open',
    workshopSlug: 'art-journaling',
    experienceType: 'Wellness Practice',
    duration: '3 hours',
    facilitator: 'Expressive Art Facilitator',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop',
        alt: 'Art Journaling & Reflective Sketching',
      },
    ],
  },
  {
    id: 'event-2026-07-26-kolhapuri',
    slug: 'kolhapuri-chappal-making-july-26',
    title: 'Kolhapuri Chappal Crafting Workshop',
    date: '2026-07-26',
    startTime: '10:30 AM',
    endTime: '2:30 PM',
    city: 'Mumbai',
    venue: 'Juhu Artisan Studio',
    location: 'Juhu Artisan Studio, Mumbai',
    price: 2600,
    capacity: 12,
    availability: 'open',
    workshopSlug: 'kolhapuri-chappal-making',
    experienceType: 'Traditional Artforms',
    duration: '4 hours',
    facilitator: 'Master Leather Craftsman',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
        alt: 'Kolhapuri Chappal Crafting Workshop',
      },
    ],
  },
  {
    id: 'event-2026-08-02-cyanotype',
    slug: 'cyanotype-botanical-printing-aug-2',
    title: 'Cyanotype Botanical Printing',
    date: '2026-08-02',
    startTime: '11:00 AM',
    endTime: '2:00 PM',
    city: 'Kolkata',
    venue: 'Ballygunge Art Space',
    location: 'Ballygunge Art Space, Kolkata',
    price: 2000,
    capacity: 12,
    availability: 'open',
    workshopSlug: 'cyanotype-printing',
    experienceType: 'Traditional Artforms',
    duration: '3 hours',
    facilitator: 'Alternative Process Artist',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop',
        alt: 'Cyanotype Botanical Printing',
      },
    ],
  },
  {
    id: 'event-2026-08-09-resin-art',
    slug: 'resin-art-coaster-workshop-aug-9',
    title: 'Resin Art & Coaster Workshop',
    date: '2026-08-09',
    startTime: '3:00 PM',
    endTime: '6:00 PM',
    city: 'Hyderabad',
    venue: 'Jubilee Hills Design Studio',
    location: 'Jubilee Hills Design Studio, Hyderabad',
    price: 1800,
    capacity: 15,
    availability: 'open',
    workshopSlug: 'resin-art',
    experienceType: 'Contemporary Art',
    duration: '3 hours',
    facilitator: 'Fluid Art Specialist',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=800&auto=format&fit=crop',
        alt: 'Resin Art & Coaster Workshop',
      },
    ],
  },
  {
    id: 'event-2026-08-16-breathwork',
    slug: 'breathwork-pranayama-sanctuary-aug-16',
    title: 'Breathwork & Pranayama Sanctuary',
    date: '2026-08-16',
    startTime: '9:30 AM',
    endTime: '11:30 AM',
    city: 'Bangalore',
    venue: 'Whitefield Mindful Space',
    location: 'Whitefield Mindful Space, Bangalore',
    price: 1500,
    capacity: 20,
    availability: 'open',
    workshopSlug: 'breathwork',
    experienceType: 'Wellness Practice',
    duration: '2 hours',
    facilitator: 'Breathwork Facilitator',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
        alt: 'Breathwork & Pranayama Sanctuary',
      },
    ],
  },
  {
    id: 'event-2026-08-23-pottery',
    slug: 'pottery-studio-experience-aug-23',
    title: 'Clay, Calm & Centering (Pottery Studio Experience)',
    date: '2026-08-23',
    startTime: '10:30 AM',
    endTime: '1:30 PM',
    city: 'Pune',
    venue: 'Deccan Clay Studio',
    location: 'Deccan Clay Studio, Pune',
    price: 1500,
    capacity: 15,
    availability: 'open',
    workshopSlug: 'pottery',
    experienceType: 'Traditional Artforms',
    duration: '3 hours',
    facilitator: 'Master Ceramicist',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: '/images/other/pottery-3.png',
        alt: 'Clay Pottery Studio Experience',
      },
    ],
  },
  {
    id: 'event-2026-08-30-bandhni',
    slug: 'bandhni-tie-dye-textile-art-aug-30',
    title: 'Bandhni & Tie Dye Textile Art',
    date: '2026-08-30',
    startTime: '2:00 PM',
    endTime: '5:00 PM',
    city: 'Delhi NCR',
    venue: 'Hauz Khas Textile Atelier',
    location: 'Hauz Khas Textile Atelier, Delhi NCR',
    price: 1500,
    capacity: 15,
    availability: 'open',
    workshopSlug: 'bandhni-tie-dye',
    experienceType: 'Traditional Artforms',
    duration: '3 hours',
    facilitator: 'Heritage Dyeing Master',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
        alt: 'Bandhni & Tie Dye Textile Art',
      },
    ],
  },
  {
    id: 'event-2026-09-06-drum-circle',
    slug: 'drum-circle-facilitated-session-sep-6',
    title: 'Drum Circle Facilitated Session',
    date: '2026-09-06',
    startTime: '4:30 PM',
    endTime: '6:30 PM',
    city: 'Bangalore',
    venue: 'Cubbon Open Air Amphitheatre',
    location: 'Cubbon Open Air Amphitheatre, Bangalore',
    price: 1500,
    capacity: 25,
    availability: 'open',
    workshopSlug: 'drum-circle',
    experienceType: 'Contemporary Art',
    duration: '2 hours',
    facilitator: 'Master Rhythm Facilitator',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=800&auto=format&fit=crop',
        alt: 'Drum Circle Facilitated Session',
      },
    ],
  },
  {
    id: 'event-2026-09-13-dance-therapy',
    slug: 'dance-movement-therapy-sep-13',
    title: 'Dance Movement Therapy Session',
    date: '2026-09-13',
    startTime: '10:00 AM',
    endTime: '12:30 PM',
    city: 'Mumbai',
    venue: 'Andheri Expressive Arts Movement',
    location: 'Andheri Expressive Arts Movement, Mumbai',
    price: 1500,
    capacity: 15,
    availability: 'open',
    workshopSlug: 'dance-movement-therapy',
    experienceType: 'Wellness Practice',
    duration: '2.5 hours',
    facilitator: 'Certified DMT Specialist',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop',
        alt: 'Dance Movement Therapy Session',
      },
    ],
  },
  {
    id: 'event-2026-09-20-block-printing',
    slug: 'block-printing-textile-sep-20',
    title: 'Block Printing Textile Workshop',
    date: '2026-09-20',
    startTime: '10:30 AM',
    endTime: '1:30 PM',
    city: 'Delhi NCR',
    venue: 'Shahpur Jat Craft Studio',
    location: 'Shahpur Jat Craft Studio, Delhi NCR',
    price: 1500,
    capacity: 18,
    availability: 'open',
    workshopSlug: 'block-printing',
    experienceType: 'Traditional Artforms',
    duration: '3 hours',
    facilitator: 'Master Block Printer',
    isWeekly: true,
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
    id: 'event-2026-09-27-azulejo',
    slug: 'portuguese-azulejo-tile-painting-sep-27',
    title: 'Portuguese Azulejo Tile Painting',
    date: '2026-09-27',
    startTime: '11:00 AM',
    endTime: '2:00 PM',
    city: 'Goa',
    venue: 'Panjim Heritage Villa',
    location: 'Panjim Heritage Villa, Goa',
    price: 1800,
    capacity: 15,
    availability: 'open',
    workshopSlug: 'portuguese-azulejo-tile-painting',
    experienceType: 'Traditional Artforms',
    duration: '3 hours',
    facilitator: 'Azulejo Tile Artist',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop',
        alt: 'Portuguese Azulejo Tile Painting',
      },
    ],
  },
  {
    id: 'event-2026-10-04-pet-therapy',
    slug: 'pet-therapy-animal-bond-oct-4',
    title: 'Pet Therapy & Animal Bond Experience',
    date: '2026-10-04',
    startTime: '4:00 PM',
    endTime: '6:00 PM',
    city: 'Kolkata',
    venue: 'Salt Lake Open Garden Sanctuary',
    location: 'Salt Lake Open Garden Sanctuary, Kolkata',
    price: 2000,
    capacity: 12,
    availability: 'open',
    workshopSlug: 'pet-therapy',
    experienceType: 'Wellness Practice',
    duration: '2 hours',
    facilitator: 'Animal Therapy Specialist',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop',
        alt: 'Pet Therapy & Animal Bond Experience',
      },
    ],
  },
  {
    id: 'event-2026-10-11-kolhapuri',
    slug: 'kolhapuri-chappal-making-oct-11',
    title: 'Kolhapuri Chappal Crafting Workshop',
    date: '2026-10-11',
    startTime: '10:30 AM',
    endTime: '2:30 PM',
    city: 'Bangalore',
    venue: 'Indiranagar Artisan Studio',
    location: 'Indiranagar Artisan Studio, Bangalore',
    price: 2600,
    capacity: 12,
    availability: 'open',
    workshopSlug: 'kolhapuri-chappal-making',
    experienceType: 'Traditional Artforms',
    duration: '4 hours',
    facilitator: 'Master Leather Craftsman',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
        alt: 'Kolhapuri Chappal Crafting Workshop',
      },
    ],
  },
  {
    id: 'event-2026-10-18-madhubani',
    slug: 'madhubani-painting-masterclass-oct-18',
    title: 'Madhubani Painting Masterclass',
    date: '2026-10-18',
    startTime: '11:00 AM',
    endTime: '2:00 PM',
    city: 'Delhi NCR',
    venue: 'Connaught Place Art Gallery',
    location: 'Connaught Place Art Gallery, Delhi NCR',
    price: 1500,
    capacity: 15,
    availability: 'open',
    workshopSlug: 'madhubani-painting',
    experienceType: 'Traditional Artforms',
    duration: '3 hours',
    facilitator: 'Mithila Folk Artist',
    isWeekly: true,
    audience: 'b2c',
    media: [
      {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop',
        alt: 'Madhubani Painting Masterclass',
      },
    ],
  },
]

