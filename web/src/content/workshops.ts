import type { PricingTier, Workshop, WorkshopCategory } from './types'
import raw from './workshops.raw.json'

const BATCH_TIERS: Omit<PricingTier, 'pricePerPerson'>[] = [
  { min: 15, max: 25 },
  { min: 26, max: 45 },
  { min: 46, max: 99 },
  { min: 100, max: null },
]

function tiers(row: {
  t15: number | null
  t26: number | null
  t46: number | null
  t100: number | null
}): PricingTier[] {
  const prices = [row.t15, row.t26, row.t46, row.t100]
  return BATCH_TIERS.map((tier, index) => ({
    ...tier,
    pricePerPerson: prices[index],
  }))
}

export const CORPORATE_WORKSHOPS: Workshop[] = (raw as Array<{
  slug: string
  name: string
  category: WorkshopCategory
  definition: string | null
  origin: string | null
  process: string | null
  outcome: string | null
  t15: number | null
  t26: number | null
  t46: number | null
  t100: number | null
  durationDays: number | null
  processSteps?: string[]
  skillLevel?: string
  materials?: string
}>).map((row) => ({
  id: `workshop-${row.slug}`,
  slug: row.slug,
  name: row.name,
  category: row.category,
  definition: row.definition ?? undefined,
  origin: row.origin ?? undefined,
  process: row.process ?? undefined,
  processSteps: parseProcessSteps(row.processSteps, row.process),
  outcome: row.outcome ?? undefined,
  skillLevel: row.skillLevel ?? undefined,
  materials: row.materials ?? undefined,
  durationDays: row.durationDays ?? undefined,
  pricing: tiers(row),
  corporateAvailable: true,
  hospitalityAvailable: true,
  individualAvailable: false,
  media: [],
}))

export function getWorkshopBySlug(slug: string): Workshop | undefined {
  return CORPORATE_WORKSHOPS.find((workshop) => workshop.slug === slug)
}

export function workshopsByCategory(category: WorkshopCategory): Workshop[] {
  return CORPORATE_WORKSHOPS.filter((workshop) => workshop.category === category)
}

export function priceRangeLabel(workshop: Workshop): string | null {
  const amounts = workshop.pricing
    .map((tier) => tier.pricePerPerson)
    .filter((value): value is number => value != null)
  if (amounts.length === 0) return null
  const min = Math.min(...amounts)
  const max = Math.max(...amounts)
  if (min === max) return `₹${min.toLocaleString('en-IN')} / person`
  return `₹${min.toLocaleString('en-IN')}–₹${max.toLocaleString('en-IN')} / person`
}

export function formatTierLabel(tier: PricingTier): string {
  if (tier.max == null) return `${tier.min}+ participants`
  return `${tier.min}–${tier.max} participants`
}

export const WORKSHOP_CATEGORIES: { id: WorkshopCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Experiences' },
  { id: 'traditional', label: 'Traditional' },
  { id: 'contemporary', label: 'Contemporary Art' },
  { id: 'wellness', label: 'Wellness Practice' },
]

export function parseProcessSteps(steps?: string[] | null, process?: string | null): string[] {
  if (steps?.length) return steps.map((step) => step.trim()).filter(Boolean)
  if (!process?.trim()) return []
  const lines = process
    .split(/\n+/)
    .map((line) => line.replace(/^[\s*\-•\d.]+/, '').trim())
    .filter(Boolean)
  return lines.length > 1 ? lines : [process.trim()]
}

export function categoryLabel(id: string, cms: { id: string; label: string }[] = WORKSHOP_CATEGORIES): string {
  return cms.find((item) => item.id === id)?.label || id
}
