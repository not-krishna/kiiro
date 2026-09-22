import { CORPORATE_WORKSHOPS, WORKSHOP_CATEGORIES, parseProcessSteps } from './workshops'
import { CONFIRMED_SCHEDULED_EVENTS } from './events'
import type { EventItem, Workshop, WorkshopCategoryItem } from './types'

export interface ExperienceCardModel {
  id: string
  slug: string
  name: string
  categoryId: string
  categoryLabel: string
  definition?: string
  processSteps: string[]
  outcome?: string
  skillLevel?: string
  materials?: string
  duration?: string
  origin?: string
  media: Workshop['media']
  event?: EventItem
  isWeekly: boolean
}

const WORKSHOP_IMAGES: Record<string, string> = {
  pottery: '/images/other/pottery-1.png',
  kintsugi: '/images/other/kintsugi-1.png',
  'bandhni-tie-dye': 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
  'batik-print-wax-resist-dyeing': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
  'cyanotype-printing': 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop',
  'kolhapuri-chappal-making': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
  'channapatna-toy-making': 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=800&auto=format&fit=crop',
  'madhubani-painting': 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop',
  'warli-painting': 'https://images.unsplash.com/photo-1606744888344-493238951221?q=80&w=800&auto=format&fit=crop',
  'gond-art': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
  'jaipur-tile-painting': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=800&auto=format&fit=crop',
  'portuguese-azulejo-tile-painting': 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop',
  'kaavi-art': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
  'block-printing': 'https://images.unsplash.com/photo-1606744888344-493238951221?q=80&w=800&auto=format&fit=crop',
  kalamkari: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
  'paper-mache': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop',
  'earth-dialogues-naturalist-sculptor': 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop',
  'resin-art': 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=800&auto=format&fit=crop',
  'candle-making': 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop',
  'perfume-making': 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=800&auto=format&fit=crop',
  'bollywood-dance-workshop': 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
  'drum-circle': 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=800&auto=format&fit=crop',
  'choir-workshop': 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop',
  'music-jam-session': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
  'vocal-expression-workshop': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
  'art-journaling': 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop',
  'sound-healing': 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop',
  breathwork: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
  'somatic-movement': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
  'dance-movement-therapy': 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop',
  'pet-therapy': 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop',
  'expressive-art-therapy': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
}

function fallbackCategories(): WorkshopCategoryItem[] {
  return WORKSHOP_CATEGORIES.filter((item) => item.id !== 'all').map((item) => ({
    id: item.id,
    label: item.label,
  }))
}

export function mapCmsWorkshop(doc: {
  _id?: string
  name?: string
  slug?: string
  category?: string
  categorySlug?: string
  categoryTitle?: string
  definition?: string
  origin?: string
  process?: string
  processSteps?: string[]
  outcome?: string
  skillLevel?: string
  materials?: string
  durationDays?: number
  media?: Workshop['media']
}): Workshop | null {
  if (!doc.name || !doc.slug) return null
  const category = doc.categorySlug || doc.category || 'traditional'
  return {
    id: doc._id || doc.slug,
    slug: doc.slug,
    name: doc.name,
    category,
    definition: doc.definition,
    origin: doc.origin,
    process: doc.process,
    processSteps: parseProcessSteps(doc.processSteps, doc.process),
    outcome: doc.outcome,
    skillLevel: doc.skillLevel,
    materials: doc.materials,
    durationDays: doc.durationDays,
    pricing: [],
    corporateAvailable: true,
    hospitalityAvailable: true,
    individualAvailable: true,
    media: doc.media?.filter((item) => item?.source) || [],
  }
}

export function resolveCategories(
  workshops: Workshop[],
  cms: Array<{ slug?: string; title?: string }> = []
): WorkshopCategoryItem[] {
  const used = new Set(workshops.map((workshop) => workshop.category).filter(Boolean))
  const fromCms = cms
    .filter((item) => item.slug && used.has(item.slug))
    .map((item) => ({ id: item.slug as string, label: item.title || item.slug || '' }))
  if (fromCms.length) return fromCms
  return fallbackCategories().filter((item) => used.has(item.id))
}

export function buildExperienceCards(
  workshops: Workshop[],
  events: EventItem[],
  categories: WorkshopCategoryItem[]
): ExperienceCardModel[] {
  const labels = new Map(categories.map((item) => [item.id, item.label]))
  const availableEvents = events.length ? events : CONFIRMED_SCHEDULED_EVENTS

  return workshops.map((workshop) => {
    const event =
      availableEvents.find((item) => item.workshopSlug === workshop.slug) ||
      availableEvents.find((item) => item.title.toLowerCase() === workshop.name.toLowerCase())

    const imageSource = WORKSHOP_IMAGES[workshop.slug]
    const media: Workshop['media'] = workshop.media.length
      ? workshop.media
      : imageSource
        ? [{ type: 'image', source: imageSource, alt: workshop.name }]
        : []

    return {
      id: workshop.id,
      slug: workshop.slug,
      name: workshop.name,
      categoryId: workshop.category,
      categoryLabel: labels.get(workshop.category) || (workshop.category === 'traditional' ? 'Traditional' : workshop.category === 'contemporary' ? 'Contemporary Art' : workshop.category === 'wellness' ? 'Wellness Practice' : workshop.category),
      definition: workshop.definition,
      processSteps: workshop.processSteps || parseProcessSteps(undefined, workshop.process),
      outcome: workshop.outcome,
      skillLevel: workshop.skillLevel,
      materials: workshop.materials,
      duration: workshop.durationDays === 2 ? '2 days' : undefined,
      origin: workshop.origin,
      media,
      event,
      isWeekly: Boolean(event?.isWeekly),
    }
  })
}

export function eventToCard(event: EventItem, workshop?: Workshop): ExperienceCardModel {
  const imageSource = workshop?.slug ? WORKSHOP_IMAGES[workshop.slug] : undefined
  const media = event.media.length
    ? event.media
    : workshop?.media.length
      ? workshop.media
      : imageSource
        ? [{ type: 'image', source: imageSource, alt: event.title }]
        : []

  return {
    id: event.id,
    slug: event.slug,
    name: event.title,
    categoryId: workshop?.category || 'all',
    categoryLabel: workshop
      ? workshop.category === 'traditional'
        ? 'Traditional'
        : workshop.category === 'contemporary'
          ? 'Contemporary Art'
          : workshop.category === 'wellness'
            ? 'Wellness Practice'
            : workshop.category
      : event.experienceType || 'Event',
    definition: workshop?.definition,
    processSteps: workshop?.processSteps || parseProcessSteps(undefined, workshop?.process),
    outcome: workshop?.outcome,
    skillLevel: workshop?.skillLevel,
    materials: workshop?.materials,
    duration: event.duration || (workshop?.durationDays === 2 ? '2 days' : undefined),
    origin: workshop?.origin,
    media,
    event,
    isWeekly: true,
  }
}

export function fallbackWorkshops(): Workshop[] {
  return CORPORATE_WORKSHOPS
}

