import type { AudiencePathway, Experience, HomepageContent, MethodologyStage } from './types'

export const DEFAULT_HOMEPAGE: HomepageContent = {
  heroEyebrow: 'A cultural space for making, discovering & connecting',
  heroHeading: 'ROOT. CREATE. RESTORE.',
  heroSubheading:
    'Kiiro is a destination for people who want to make something with their hands, learn from master artisans, and spend time differently — together, offline, and in person.',
  heroPrimaryCta: {
    label: 'Explore Weekly Events',
    href: '/weekly-events',
    kind: 'booking',
  },
  heroSecondaryCta: {
    label: 'Discover Experiences',
    href: '/experiences',
    kind: 'internal',
  },
  heroMedia: [
    {
      type: 'image',
      source: '/images/hero/hero-1.png',
      alt: 'Kiiro workshop experience - Making process',
    },
    {
      type: 'image',
      source: '/images/hero/hero-2.png',
      alt: 'Artisan-led practice session',
    },
    {
      type: 'image',
      source: '/images/hero/hero-3.png',
      alt: 'Participants engaged in creative workshop',
    },
  ],
  methodologyIntro:
    'In a world of constant scrolling, Kiiro gives people something real to do with their time. Every experience follows a thoughtful three-part arc.',
  methodologyStages: [
    {
      id: 'root',
      title: 'Root',
      heading: 'Context, material, culture, lineage',
      body: 'Understand what you are about to create and where it comes from: history, hands, and story before making begins.',
    },
    {
      id: 'create',
      title: 'Create',
      heading: 'Hands-on making, guided practice',
      body: 'Immerse in tactile process with master artisans and contemporary practitioners. Attention settles into the work of your hands.',
    },
    {
      id: 'restore',
      title: 'Restore',
      heading: 'Connection, reflection, closure',
      body: 'Leave with a handcrafted piece, a new skill, and meaningful connections made through shared creative discovery.',
    },
  ] satisfies MethodologyStage[],
  manifestoTitle:
    'Make something. Learn something. Try something new. Meet people. Spend time differently.',
  manifestoText:
    'Kiiro is a place to discover things worth doing. Whether you are picking up clay for the first time, learning an ancient textile technique, or joining a weekend sound circle, our sessions prioritize the joy of making and the people you meet along the way.',
  impactStats: [
    { value: '800+', label: 'Sessions hosted' },
    { value: '10,000+', label: 'Hands-on makers' },
    { value: '7', label: 'Active cities' },
    { value: '15+', label: 'Corporate teams' },
    { value: '10+', label: 'Hospitality partners' },
  ],
  ethicalHeading: 'Participant wellbeing and artisan livelihood are the same outcome.',
  ethicalBody:
    'Every session channels fair, transparent income to the master artisans who lead it. Creative wellness for participants and dignified livelihood for artisans are designed together, not as competing priorities.',
  partnershipsTitle: 'Collaboration that holds culture and community in the same frame',
}

export const AUDIENCE_PATHWAYS: AudiencePathway[] = [
  {
    id: 'individuals',
    title: 'Individuals',
    promise: 'A creative reset that is more active than a spa day, more grounded than a generic art class.',
    who: 'Friends, families, and anyone seeking screen-free making and restoration.',
    href: '/weekly-events',
    cta: { label: 'Book Your Spot', href: '/weekly-events', kind: 'booking' },
  },
  {
    id: 'corporates',
    title: 'Corporates & organisations',
    promise: 'Team wellness through tactile collaboration: screen-free, quietly bonding, and not another icebreaker.',
    who: 'Organisations planning group experiences with measurable restoration, not theatre.',
    href: '/experiences/corporates',
    cta: { label: 'Plan a Corporate Experience', href: '/experiences/corporates', kind: 'enquiry' },
  },
  {
    id: 'hospitality',
    title: 'Hospitality & luxury resorts',
    promise: 'Signature cultural wellness beyond spa menus, with programming guests actually remember.',
    who: 'Resorts and properties seeking differentiated guest experiences.',
    href: '/experiences/hospitality-luxury',
    cta: { label: 'Plan guest programming', href: '/experiences/hospitality-luxury', kind: 'enquiry' },
  },
  {
    id: 'schools',
    title: 'Schools & colleges',
    promise: 'Creative and cultural literacy that also supports student wellbeing, not only skill-building.',
    who: 'Educators and institutions designing programmes with living art at the centre.',
    href: '/experiences/schools-colleges',
    cta: { label: 'Plan an education programme', href: '/experiences/schools-colleges', kind: 'enquiry' },
  },
]

export const HOMEPAGE_EXPERIENCES: Experience[] = [
  {
    id: 'exp-public',
    slug: 'weekly-sessions',
    name: 'Weekly public sessions',
    description:
      'Scheduled, artisan-led making for individuals and small groups. Book a seat when programming is listed.',
    audience: ['Individuals'],
    href: '/weekly-events',
    media: [],
  },
  {
    id: 'exp-corporate',
    slug: 'group-corporate',
    name: 'Corporate & organisation programmes',
    description:
      'Batch-priced workshops from the corporate and hospitality catalogue. Browse, compare, then enquire.',
    audience: ['Corporates', 'Organisations'],
    href: '/experiences/corporates',
    media: [],
  },
  {
    id: 'exp-hospitality',
    slug: 'hospitality',
    name: 'Hospitality & guest programming',
    description:
      'The same living-art catalogue, framed for resorts and properties as signature cultural wellness.',
    audience: ['Hospitality'],
    href: '/experiences/hospitality-luxury',
    media: [],
  },
  {
    id: 'exp-schools',
    slug: 'schools-colleges',
    name: 'Schools & colleges',
    description: 'Structured making for cultural literacy and student wellbeing.',
    audience: ['Schools', 'Colleges'],
    href: '/experiences/schools-colleges',
    media: [],
  },
]

export const ARTFROM_CHAPTERS = [
  {
    id: 'traditional' as const,
    title: 'Traditional Art',
    pillar: 'Root',
    description:
      'Living heritage craft transmitted from master artisans. Lineage, patience, ritual, and the felt sense of continuing something ancestral rather than consuming it.',
    practices: [
      'Jaipur blue pottery and tile painting',
      'Warli ritual painting',
      'Mata ni Pachedi and Kalamkari',
      'Bagru block printing and natural dyeing',
      'Madhubani, Gond, Kaavi, and related lineages in the catalogue',
    ],
    href: '/artforms?category=traditional',
  },
  {
    id: 'contemporary' as const,
    title: 'Contemporary Art',
    pillar: 'Create',
    description:
      'Modern creative practice that sits alongside heritage craft rather than replacing it, with expression, experimentation, and relevance.',
    practices: [
      'Ceramics as sculptural form',
      'Mixed-media and resin studios',
      'Printmaking, perfume, and candle craft',
      'Collaborative music, voice, and movement workshops',
    ],
    href: '/artforms?category=contemporary',
  },
  {
    id: 'wellness' as const,
    title: 'Wellness Practice',
    pillar: 'Restore',
    description:
      'Mindful, embodied practice woven into making, not bolted on afterward. Nervous-system regulation, presence, and leaving lighter than you arrived.',
    practices: [
      'Art journaling and expressive art therapy',
      'Breathwork, sound, and somatic movement',
      'Dance movement therapy',
      'Silent making and guided reflection',
    ],
    href: '/artforms?category=wellness',
  },
]
