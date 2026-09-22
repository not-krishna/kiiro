import type { NavItem } from './types'

export const SITE_TAGLINE = 'Creative wellness, rooted in living art'

export const PRIMARY_NAV: NavItem[] = [
  {
    label: 'Weekly Events',
    href: '/weekly-events',
  },
  {
    label: 'Experiences',
    href: '/experiences',
    children: [
      {
        label: 'All Experiences',
        href: '/experiences',
        description: 'Browse workshops by category and book as an individual.',
      },
      {
        label: 'Corporates & Organisations',
        href: '/experiences/corporates',
        description: 'Plan a customised group experience.',
      },
      {
        label: 'Hospitality & Luxury',
        href: '/experiences/hospitality-luxury',
        description: 'Signature cultural wellness for guests.',
      },
      {
        label: 'Schools & Colleges',
        href: '/experiences/schools-colleges',
        description: 'Creative literacy with student wellbeing.',
      },
    ],
  },
  {
    label: 'Our Offerings',
    href: '/artforms',
    children: [
      {
        label: 'All Offerings',
        href: '/artforms',
        description: 'Browse all creative workshops, heritage artforms, and wellness practices.',
      },
      {
        label: 'Traditional Art',
        href: '/artforms?category=traditional',
        description: 'Living heritage craft, lineage, and material knowledge.',
      },
      {
        label: 'Contemporary Art',
        href: '/artforms?category=contemporary',
        description: 'Personal expression alongside heritage practice.',
      },
      {
        label: 'Wellness Practice',
        href: '/artforms?category=wellness',
        description: 'Embodied making that restores attention.',
      },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'CSR COLLABS', href: '/partnerships-csr' },
  { label: 'Journal', href: '/journal' },
  { label: 'Enquire', href: '/enquire', cta: true },
]
