import type { PricingTier, Workshop, WorkshopCategory } from './types'
import { ALL_OFFERINGS, OFFERING_ALIASES } from './offeringsData'

const BATCH_TIERS: Omit<PricingTier, 'pricePerPerson'>[] = [
  { min: 15, max: 25 },
  { min: 26, max: 45 },
  { min: 46, max: 99 },
  { min: 100, max: null },
]

export const CORPORATE_WORKSHOPS: Workshop[] = ALL_OFFERINGS.map((offering) => {
  const p = offering.pricing || { t15: 1500, t26: 1200, t46: 1100, t100: 1000 }
  const prices = [p.t15, p.t26, p.t46, p.t100]
  const pricingTiers: PricingTier[] = BATCH_TIERS.map((tier, index) => ({
    ...tier,
    pricePerPerson: prices[index],
  }))

  return {
    id: `workshop-${offering.slug}`,
    slug: offering.slug,
    name: offering.title,
    category: offering.category,
    definition: offering.definition,
    origin: offering.origin,
    process: offering.keyProcess.join(' → '),
    processSteps: offering.keyProcess,
    outcome: offering.outcomes,
    skillLevel: 'Open to Beginners & All Levels',
    materials: 'All authentic natural materials and specialized tools provided',
    durationDays: offering.workshopDuration.includes('Day') ? 2 : undefined,
    pricing: pricingTiers,
    corporateAvailable: true,
    hospitalityAvailable: true,
    individualAvailable: true,
    media: offering.imageUrl ? [{ type: 'image', source: offering.imageUrl, alt: offering.title }] : [],
  }
})

export function getWorkshopBySlug(slug: string): Workshop | undefined {
  const canonical = OFFERING_ALIASES[slug] || slug
  return CORPORATE_WORKSHOPS.find((workshop) => workshop.slug === canonical)
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
