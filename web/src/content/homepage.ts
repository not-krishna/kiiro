import type { AudiencePathway, Experience, HomepageContent, MethodologyStage } from './types'

export const DEFAULT_HOMEPAGE: HomepageContent = {
  heroEyebrow: 'A creative wellness space rooted in living art',
  heroHeading: 'ROOT. CREATE. RESTORE.',
  heroSubheading:
    'Kiiro sits where traditional craft, contemporary art, and mindful practice meet. The making is the medium. Restoration is the outcome.',
  heroPrimaryCta: {
    label: 'Explore Experiences',
    href: '/experiences',
    kind: 'internal',
  },
  heroSecondaryCta: {
    label: 'Plan a Group Experience',
    href: '/experiences/corporates',
    kind: 'enquiry',
  },
  heroMedia: [],
  methodologyIntro:
    'Every Kiiro experience follows the same three-part arc, whether it begins with craft, contemporary art, or mindful practice.',
  methodologyStages: [
    {
      id: 'root',
      title: 'Root',
      heading: 'Context, material, culture, lineage',
      body: 'Participants understand what they are about to engage with and where it comes from: history, hands, and story before making begins.',
    },
    {
      id: 'create',
      title: 'Create',
      heading: 'Hands-on making, guided practice',
      body: 'Immersion in process with a master artisan or contemporary practitioner. Attention settles into the work of the hands.',
    },
    {
      id: 'restore',
      title: 'Restore',
      heading: 'Reflection, stillness, closure',
      body: 'Guided reflection or a closing practice tied to the day’s making. The creative experience becomes restorative.',
    },
  ] satisfies MethodologyStage[],
  manifestoTitle:
    'Creativity itself is a wellness practice. Not as performance or product, but as process: the slow attention a maker brings to material.',
  manifestoText:
    'Kiiro exists to make that experience accessible, structured, and shared: traditional craft, contemporary art, and mindful practice in one continuous methodology.',
  impactStats: [
    { value: '800+', label: 'Workshops' },
    { value: '10,000+', label: 'Participants' },
    { value: '7', label: 'Cities' },
    { value: '15+', label: 'Corporates' },
    { value: '10+', label: 'Resorts' },
  ],
  ethicalHeading: 'Participant wellbeing and artisan livelihood are the same outcome.',
  ethicalBody:
    'Every session channels fair, transparent income to the master artisans who lead it. Creative wellness for participants and dignified livelihood for artisans are designed together, not as competing priorities and not as generic CSR language.',
  partnershipsTitle: 'Collaboration that holds culture and livelihood in the same frame',
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
    cta: { label: 'Plan a Group Experience', href: '/experiences/corporates', kind: 'enquiry' },
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
