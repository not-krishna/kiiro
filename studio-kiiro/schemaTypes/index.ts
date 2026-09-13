import { artform } from './artform'
import { artisan } from './artisan'
import { experience } from './experience'
import { event } from './event'
import { journalPost } from './journalPost'
import { homePage } from './homePage'
import { siteSettings } from './siteSettings'
import { testimonial } from './testimonial'
import { partner } from './partner'
import { impactStat } from './impactStat'
import { aboutPage } from './aboutPage'
import { communityPage } from './communityPage'
import { impactPage } from './impactPage'
import { learningPage } from './learningPage'
import { partnershipsCsrPage } from './partnershipsCsrPage'
import { productsPage } from './productsPage'
import { product } from './product'
import { location } from './location'
import { workshop } from './workshop'
import { cta } from './cta'
import { mediaAsset } from './mediaAsset'
import { pricingTier } from './pricingTier'

export const schemaTypes = [
  cta,
  mediaAsset,
  pricingTier,

  homePage,
  aboutPage,
  communityPage,
  impactPage,
  learningPage,
  partnershipsCsrPage,
  productsPage,
  siteSettings,

  artform,
  artisan,
  experience,
  event,
  workshop,
  journalPost,
  product,
  testimonial,
  partner,
  impactStat,
  location,
]
