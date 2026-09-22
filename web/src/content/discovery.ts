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
  'bandhni-tie-dye': '/images/workshops/bandhni-tie-dye.jpg',
  'batik-print-wax-resist-dyeing': '/images/workshops/bandhni-tie-dye.jpg',
  'cyanotype-printing': '/images/workshops/cyanotype-printing.jpg',
  'kolhapuri-chappal-making': '/images/workshops/block-printing-workshop.jpg',
  'channapatna-toy-making': '/images/other/pottery-2.png',
  'madhubani-painting': '/images/workshops/madhubani-painting-process.jpg',
  'warli-painting': '/images/workshops/warli-art-workshop.jpg',
  'gond-art': '/images/workshops/gond-art-workshop.jpg',
  'jaipur-tile-painting': '/images/other/pottery-1.png',
  'portuguese-azulejo-tile-painting': '/images/other/pottery-3.png',
  'kaavi-art': '/images/workshops/warli-art-workshop.jpg',
  'block-printing': '/images/workshops/block-printing-workshop.jpg',
  kalamkari: '/images/workshops/kalamkari-art-process.jpg',
  'paper-mache': '/images/workshops/madhubani-painting-process.jpg',
  'earth-dialogues-naturalist-sculptor': '/images/other/pottery-2.png',
  'resin-art': '/images/workshops/cyanotype-printing.jpg',
  'candle-making': '/images/workshops/perfume-blending-masterclass.jpg',
  'perfume-making': '/images/workshops/perfume-blending-masterclass.jpg',
  'bollywood-dance-workshop': '/images/workshops/sound-healing-session.jpg',
  'drum-circle': '/images/workshops/sound-healing-session.jpg',
  'choir-workshop': '/images/workshops/sound-healing-session.jpg',
  'music-jam-session': '/images/workshops/sound-healing-session.jpg',
  'vocal-expression-workshop': '/images/workshops/sound-healing-session.jpg',
  'art-journaling': '/images/workshops/madhubani-painting-process.jpg',
  'sound-healing': '/images/workshops/sound-healing-session.jpg',
  breathwork: '/images/workshops/sound-healing-session.jpg',
  'somatic-movement': '/images/workshops/sound-healing-session.jpg',
  'dance-movement-therapy': '/images/workshops/sound-healing-session.jpg',
  'pet-therapy': '/images/workshops/sound-healing-session.jpg',
  'expressive-art-therapy': '/images/workshops/madhubani-painting-process.jpg',
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

