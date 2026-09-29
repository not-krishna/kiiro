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
  shortDescription?: string
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
  keyProcess?: string | string[]
  takeAway?: string
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
    shortDescription: doc.shortDescription,
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
    keyProcess: doc.keyProcess,
    takeAway: doc.takeAway,
    media: doc.heroImageUrl
      ? [{ type: 'image', source: doc.heroImageUrl, alt: doc.heroImageAlt || doc.title }]
      : [],
  }
}

export interface EventDateBadge {
  weekday: string
  day: string
  month: string
  year: string
}

export function parseEventDateBadge(date?: string): EventDateBadge | null {
  if (!date) return null
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return null

  return {
    weekday: parsed.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
    day: parsed.toLocaleDateString('en-US', { day: '2-digit' }),
    month: parsed.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    year: String(parsed.getFullYear()),
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
  const upcoming = [...events]
    .filter((evt) => !isEventPast(evt.date))
    .sort((a, b) => {
      const timeA = a.date ? new Date(a.date).getTime() : 0
      const timeB = b.date ? new Date(b.date).getTime() : 0
      return timeA - timeB
    })

  const past = [...events]
    .filter((evt) => isEventPast(evt.date))
    .sort((a, b) => {
      const timeA = a.date ? new Date(a.date).getTime() : 0
      const timeB = b.date ? new Date(b.date).getTime() : 0
      return timeB - timeA // Most recently completed first
    })

  return {
    sortedAll: [...upcoming, ...past],
    upcoming,
    past,
  }
}

export function getUpcomingWeeklyEvents(events: EventItem[], limit = 3): EventItem[] {
  const { upcoming } = sortEventsChronologically(events)
  return upcoming.slice(0, limit)
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
  // --- UPCOMING SESSIONS (OCTOBER 2026) ---
  {
    id: 'event-pottery-1',
    slug: 'pottery-studio-experience-bangalore',
    title: 'Clay, Calm & Centering (Pottery Studio)',
    shortDescription: 'Tactile wheel-throwing and centering session guided by master ceramicists.',
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
    keyProcess: 'Clay wedging and centering on wheel, throwing cylinder form, neck shaping, and wire cutting',
    takeAway: '1–2 handcrafted ceramic pieces (bisque-fired and studio glazed for pickup)',
    bookingHref: '/enquire?intent=individual&subject=Clay%2C%20Calm%20%26%20Centering&event=pottery-studio-experience-bangalore&weekly=1',
    media: [
      {
        type: 'image',
        source: '/images/other/pottery-1.png',
        alt: 'Clay Pottery Studio Experience',
      },
    ],
  },
  {
    id: 'event-block-printing-1',
    slug: 'bagru-block-printing-bangalore',
    title: 'Bagru Block Printing & Natural Dye Studio',
    shortDescription: 'Carve teakwood impressions using centuries-old madder and harda mineral dyes.',
    date: '2026-10-04',
    startTime: '10:30 AM',
    endTime: '01:30 PM',
    city: 'Bangalore',
    venue: 'Indiranagar Craft Sanctuary',
    location: 'Indiranagar Craft Sanctuary, Bangalore',
    price: 2200,
    capacity: 15,
    availability: 'open',
    workshopSlug: 'block-printing',
    experienceType: 'Traditional Textile Craft',
    duration: '3 hours',
    facilitator: 'Master Block Printer from Rajasthan',
    isWeekly: true,
    audience: 'b2c',
    keyProcess: 'Fabric pre-mordanting with harda, layout alignment, hand-stamping with syahi and begar natural dyes, and cold-wash fixing',
    takeAway: 'Bespoke hand-printed pure cotton stole or tote bag patterned with ancestral Bagru motifs',
    bookingHref: '/enquire?intent=individual&subject=Bagru%20Block%20Printing&event=bagru-block-printing-bangalore&weekly=1',
    media: [
      {
        type: 'image',
        source: '/images/workshops/madhubani-painting-process.jpg',
        alt: 'Bagru Block Printing Studio Experience',
      },
    ],
  },
  {
    id: 'event-kolhapuri-1',
    slug: 'kolhapuri-chappal-making-mumbai',
    title: 'Kolhapuri Chappal & Hand-Stitched Leather Craft',
    shortDescription: 'Hand-braiding, punching, and vegetable-tanned leather heritage footwear crafting.',
    date: '2026-10-10',
    startTime: '11:00 AM',
    endTime: '03:00 PM',
    city: 'Mumbai',
    venue: 'Kiiro Studio, Bandra West',
    location: 'Kiiro Studio, Bandra West, Mumbai',
    price: 3200,
    capacity: 10,
    availability: 'limited',
    workshopSlug: 'kolhapuri-chappal-making',
    experienceType: 'Generational Leather Craft',
    duration: '4 hours',
    facilitator: 'Generational Artisan from Kolhapur',
    isWeekly: true,
    audience: 'b2c',
    keyProcess: 'Sole template tracing, awl hole punching, traditional braided cord weaving, and brass stud riveting',
    takeAway: 'Wearable pair of genuine vegetable-tanned Kolhapuri leather sandals custom-fitted to your feet',
    bookingHref: '/enquire?intent=individual&subject=Kolhapuri%20Chappal%20Craft&event=kolhapuri-chappal-making-mumbai&weekly=1',
    media: [
      {
        type: 'image',
        source: '/images/other/pottery-2.png',
        alt: 'Kolhapuri Chappal Craft Session',
      },
    ],
  },
  {
    id: 'event-block-printing-2',
    slug: 'natural-dye-block-printing-bangalore',
    title: 'Indigo & Woodblock Relief Printing',
    shortDescription: 'Deep vat indigo fermentation and relief block printing on handwoven cotton.',
    date: '2026-10-11',
    startTime: '02:00 PM',
    endTime: '05:00 PM',
    city: 'Bangalore',
    venue: 'Koramangala Studio Hub',
    location: 'Koramangala Studio Hub, Bangalore',
    price: 2400,
    capacity: 12,
    availability: 'open',
    workshopSlug: 'block-printing',
    experienceType: 'Textile Art',
    duration: '3 hours',
    facilitator: 'Master Block Printer',
    isWeekly: true,
    audience: 'b2c',
    keyProcess: 'Indigo vat reduction, botanical motif block stamping with mud-resist dabu paste, vat dipping and oxidation',
    takeAway: 'Handcrafted deep-indigo printed cotton table runner or wall tapestry',
    bookingHref: '/enquire?intent=individual&subject=Indigo%20%26%20Woodblock%20Printing&event=natural-dye-block-printing-bangalore&weekly=1',
    media: [
      {
        type: 'image',
        source: '/images/workshops/kalamkari-art-process.jpg',
        alt: 'Indigo Block Printing Masterclass',
      },
    ],
  },
  {
    id: 'event-pottery-2',
    slug: 'blue-pottery-glaze-bangalore',
    title: 'Jaipur Blue Pottery Underglaze Workshop',
    shortDescription: 'Non-clay Egyptian paste molding and cobalt oxide Persian botanical underglazing.',
    date: '2026-10-17',
    startTime: '02:30 PM',
    endTime: '05:30 PM',
    city: 'Bangalore',
    venue: 'Koramangala Studio Hub',
    location: 'Koramangala Studio Hub, Bangalore',
    price: 2800,
    capacity: 12,
    availability: 'limited',
    workshopSlug: 'jaipur-tile-painting',
    experienceType: 'Heritage Ceramics',
    duration: '3 hours',
    facilitator: 'Master Blue Pottery Artisan',
    isWeekly: true,
    audience: 'b2c',
    keyProcess: 'Quartz-glass-gum dough molding, smoothing, motif stencil pouncing, cobalt and copper oxide brushwork',
    takeAway: 'Pair of handcrafted, hand-painted Jaipur Blue Pottery decorative ceramic tiles',
    bookingHref: '/enquire?intent=individual&subject=Jaipur%20Blue%20Pottery&event=blue-pottery-glaze-bangalore&weekly=1',
    media: [
      {
        type: 'image',
        source: '/images/other/pottery-3.png',
        alt: 'Blue Pottery Tiles & Underglaze Masterclass',
      },
    ],
  },
  {
    id: 'event-block-printing-3',
    slug: 'contemporary-textile-block-printing-bangalore',
    title: 'Botanical & Geometric Block Printing',
    shortDescription: 'Contemporary layout compositions and eco-friendly pigment stamping on linen.',
    date: '2026-10-18',
    startTime: '11:00 AM',
    endTime: '02:00 PM',
    city: 'Bangalore',
    venue: 'Whitefield Creative Space',
    location: 'Whitefield Creative Space, Bangalore',
    price: 2100,
    capacity: 15,
    availability: 'open',
    workshopSlug: 'block-printing',
    experienceType: 'Contemporary Craft',
    duration: '3 hours',
    facilitator: 'Textile Artisan Facilitator',
    isWeekly: true,
    audience: 'b2c',
    keyProcess: 'Modular geometric layout mapping, multi-tier pigment mixing, layered stamping and heat setting',
    takeAway: 'Custom printed linen dining set (runner + 2 placemats)',
    bookingHref: '/enquire?intent=individual&subject=Botanical%20Block%20Printing&event=contemporary-textile-block-printing-bangalore&weekly=1',
    media: [
      {
        type: 'image',
        source: '/images/workshops/madhubani-painting-process.jpg',
        alt: 'Botanical Block Printing Workshop',
      },
    ],
  },
  {
    id: 'event-portuguese-1',
    slug: 'portuguese-azulejo-tile-painting-goa',
    title: 'Portuguese Azulejo Tile Painting Workshop',
    shortDescription: 'Majolica tin-glaze technique and cobalt tile motifs in Panjim heritage quarter.',
    date: '2026-10-24',
    startTime: '03:00 PM',
    endTime: '06:00 PM',
    city: 'Goa',
    venue: 'Fontainhas Heritage House, Panjim',
    location: 'Fontainhas Heritage House, Panjim, Goa',
    price: 2600,
    capacity: 12,
    availability: 'open',
    workshopSlug: 'portuguese-azulejo-tile-painting',
    experienceType: 'Heritage Tile Art',
    duration: '3 hours',
    facilitator: 'Master Azulejo Painter',
    isWeekly: true,
    audience: 'b2c',
    keyProcess: 'Opaque tin-glaze base application, charcoal pounce design transfer, cobalt oxide brushwork with fine squirrel-hair brushes',
    takeAway: 'Set of 2 glazed and fired authentic Azulejo ceramic tiles ready for mounting',
    bookingHref: '/enquire?intent=individual&subject=Azulejo%20Tile%20Painting&event=portuguese-azulejo-tile-painting-goa&weekly=1',
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
    shortDescription: 'Philosophy of wabi-sabi through urushi lacquer repair and real 24k gold dusting.',
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
    keyProcess: 'Careful ceramic fracture analysis, bio-resin/lacquer bonding, water-stone smoothing, and 24k gold mica burnishing',
    takeAway: 'Your restored ceramic heirloom bowl or cup illuminated with luminous golden fracture veins',
    bookingHref: '/enquire?intent=individual&subject=Kintsugi%20Golden%20Joinery&event=kintsugi-golden-repair-goa&weekly=1',
    media: [
      {
        type: 'image',
        source: '/images/other/pottery-1.png',
        alt: 'Kintsugi Golden Joinery Workshop',
      },
    ],
  },

  // --- PAST SESSIONS (SEPTEMBER & AUGUST 2026) ---
  {
    id: 'event-cyanotype-past',
    slug: 'botanical-cyanotype-sun-printing-bangalore',
    title: 'Botanical Cyanotype & Sun Printing Circle',
    shortDescription: 'Prussian blue solar chemistry on handmade cotton rag paper with pressed botanicals.',
    date: '2026-09-20',
    startTime: '10:30 AM',
    endTime: '01:30 PM',
    city: 'Bangalore',
    venue: 'Indiranagar Craft Sanctuary',
    location: 'Indiranagar Craft Sanctuary, Bangalore',
    price: 2100,
    capacity: 14,
    availability: 'closed',
    workshopSlug: 'cyanotype-printing',
    experienceType: 'Sun Printing & Chemistry',
    duration: '3 hours',
    facilitator: 'Alternative Process Photographer',
    isWeekly: true,
    audience: 'b2c',
    keyProcess: 'Light-sensitive ferric ammonium citrate emulsion blending, negative & botanical contact arrangement, UV sunlight exposure, and water oxidation wash',
    takeAway: 'Set of 3 archival Prussian blue sun-prints on 300gsm deckle-edge cotton rag',
    bookingHref: '/enquire?intent=individual&subject=Cyanotype%20Sun%20Printing&event=botanical-cyanotype-sun-printing-bangalore&weekly=1',
    media: [
      {
        type: 'image',
        source: '/images/workshops/cyanotype-printing.jpg',
        alt: 'Botanical Cyanotype Sun Printing Circle',
      },
    ],
  },
  {
    id: 'event-terracotta-past',
    slug: 'terracotta-sculpting-mumbai',
    title: 'Terracotta Hand-Building & Primitive Firing',
    shortDescription: 'Coiling, pinching, and natural burnishing of raw river clay figurines.',
    date: '2026-09-13',
    startTime: '02:00 PM',
    endTime: '05:30 PM',
    city: 'Mumbai',
    venue: 'Kiiro Studio, Bandra West',
    location: 'Kiiro Studio, Bandra West, Mumbai',
    price: 2600,
    capacity: 12,
    availability: 'closed',
    workshopSlug: 'pottery',
    experienceType: 'Sculptural Clay',
    duration: '3.5 hours',
    facilitator: 'Sculptor & Ceramic Artist',
    isWeekly: true,
    audience: 'b2c',
    keyProcess: 'Clay kneading with grog, slab building, structural hollow coiling, boxwood surface tool sculpting, and smooth pebble burnishing',
    takeAway: 'Sculpted terracotta figurine or hollow planter',
    bookingHref: '/enquire?intent=individual&subject=Terracotta%20Sculpting&event=terracotta-sculpting-mumbai&weekly=1',
    media: [
      {
        type: 'image',
        source: '/images/other/pottery-2.png',
        alt: 'Terracotta Hand-Building Workshop',
      },
    ],
  },
  {
    id: 'event-madhubani-past',
    slug: 'madhubani-mithila-painting-bangalore',
    title: 'Madhubani Lineage Art & Natural Pigments',
    shortDescription: 'Nib and twig drawing on cow-dung treated handmade paper with natural soot and indigo.',
    date: '2026-09-06',
    startTime: '11:00 AM',
    endTime: '02:00 PM',
    city: 'Bangalore',
    venue: 'Koramangala Studio Hub',
    location: 'Koramangala Studio Hub, Bangalore',
    price: 2000,
    capacity: 15,
    availability: 'closed',
    workshopSlug: 'madhubani-painting',
    experienceType: 'Folk Art Lineage',
    duration: '3 hours',
    facilitator: 'Mithila National Awardee Artisan',
    isWeekly: true,
    audience: 'b2c',
    keyProcess: 'Traditional cow-dung paper preparation, double-line bamboo nib drawing (Kachni), and plant pigment color filling (Bharni)',
    takeAway: 'Original handmade Madhubani folk painting with certificate of artisan lineage',
    bookingHref: '/enquire?intent=individual&subject=Madhubani%20Mithila%20Art&event=madhubani-mithila-painting-bangalore&weekly=1',
    media: [
      {
        type: 'image',
        source: '/images/workshops/madhubani-painting-process.jpg',
        alt: 'Madhubani Lineage Art Masterclass',
      },
    ],
  },
  {
    id: 'event-kaavi-past',
    slug: 'kaavi-architectural-fresco-goa',
    title: 'Kaavi Architectural Murals & Lime Plaster',
    shortDescription: 'Ancient Konkan etching into wet red laterite lime plaster using steel styluses.',
    date: '2026-08-30',
    startTime: '03:00 PM',
    endTime: '06:00 PM',
    city: 'Goa',
    venue: 'Fontainhas Heritage House, Panjim',
    location: 'Fontainhas Heritage House, Panjim, Goa',
    price: 2900,
    capacity: 10,
    availability: 'closed',
    workshopSlug: 'kaavi-art',
    experienceType: 'Heritage Wall Fresco',
    duration: '3 hours',
    facilitator: 'Kaavi Revival Researcher',
    isWeekly: true,
    audience: 'b2c',
    keyProcess: 'Sea-shell lime plaster preparation, application of red uran clay slip, sgraffito etching with steel stylus, and smooth agate burnishing',
    takeAway: 'Architectural Kaavi fresco relief plaque ready for wall hanging',
    bookingHref: '/enquire?intent=individual&subject=Kaavi%20Architectural%20Fresco&event=kaavi-architectural-fresco-goa&weekly=1',
    media: [
      {
        type: 'image',
        source: '/images/workshops/warli-art-workshop.jpg',
        alt: 'Kaavi Architectural Mural Workshop',
      },
    ],
  },
]
