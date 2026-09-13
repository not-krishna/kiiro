export type MediaType = 'image' | 'video'

export interface MediaAsset {
  type: MediaType
  source: string
  alt: string
  poster?: string
}

export type CtaKind = 'internal' | 'external' | 'booking' | 'enquiry'

export interface Cta {
  label: string
  href: string
  kind: CtaKind
}

export type WorkshopCategory = 'traditional' | 'contemporary' | 'wellness'

export interface PricingTier {
  min: number
  max: number | null
  pricePerPerson: number | null
  note?: string
}

export interface Workshop {
  id: string
  slug: string
  name: string
  category: WorkshopCategory
  definition?: string
  origin?: string
  process?: string
  outcome?: string
  durationDays?: number
  pricing: PricingTier[]
  corporateAvailable: boolean
  hospitalityAvailable: boolean
  individualAvailable: boolean
  media: MediaAsset[]
  featured?: boolean
  tags?: string[]
}

export interface Artform {
  id: string
  slug: string
  name: string
  category: WorkshopCategory
  description?: string
  origin?: string
  process?: string
  relatedWorkshopSlugs?: string[]
  media: MediaAsset[]
}

export interface Experience {
  id: string
  slug: string
  name: string
  description: string
  audience: string[]
  href: string
  relatedArtformSlugs?: string[]
  relatedWorkshopSlugs?: string[]
  media: MediaAsset[]
}

export type EventBookingStatus = 'open' | 'limited' | 'sold-out' | 'closed' | 'enquiry-only'

export interface EventItem {
  id: string
  slug: string
  title: string
  date?: string
  startTime?: string
  location?: string
  city?: string
  venue?: string
  experienceType?: string
  duration?: string
  facilitator?: string
  price?: number
  capacity?: number
  availability?: EventBookingStatus
  bookingHref: string
  experienceSlug?: string
  workshopSlug?: string
  media: MediaAsset[]
}

export interface MethodologyStage {
  id: 'root' | 'create' | 'restore'
  title: string
  heading: string
  body: string
  media?: MediaAsset
}

export interface AudiencePathway {
  id: string
  title: string
  promise: string
  who: string
  href: string
  cta: Cta
}

export interface NavChild {
  label: string
  href: string
  description?: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavChild[]
  cta?: boolean
}

export interface HomepageContent {
  heroEyebrow: string
  heroHeading: string
  heroSubheading: string
  heroPrimaryCta: Cta
  heroSecondaryCta: Cta
  heroMedia: MediaAsset[]
  methodologyIntro: string
  methodologyStages: MethodologyStage[]
  manifestoTitle: string
  manifestoText: string
  impactStats: { value: string; label: string }[]
  ethicalHeading: string
  ethicalBody: string
  partnershipsTitle: string
}
