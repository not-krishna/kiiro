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
        label: 'All experiences',
        href: '/experiences',
        description: 'Scheduled sessions and group programmes.',
      },
      {
        label: 'Weekly public sessions',
        href: '/weekly-events',
        description: 'Book a seat in upcoming programming.',
      },
      {
        label: 'Corporates & organisations',
        href: '/experiences/corporates',
        description: 'Screen-free team wellness through making.',
      },
      {
        label: 'Hospitality & luxury',
        href: '/experiences/hospitality-luxury',
        description: 'Signature cultural wellness for guests.',
      },
      {
        label: 'Schools & colleges',
        href: '/experiences/schools-colleges',
        description: 'Creative literacy with student wellbeing.',
      },
    ],
  },
  {
    label: 'Artforms',
    href: '/artforms',
    children: [
      {
        label: 'All artforms',
        href: '/artforms',
        description: 'The practices themselves, separate from the booking calendar.',
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
  { label: 'Collaboration', href: '/partnerships-csr' },
  { label: 'Journal', href: '/journal' },
  { label: 'Enquire', href: '/enquire', cta: true },
]
