import type { AudiencePathway, Experience, HomepageContent, MethodologyStage } from './types'

export const DEFAULT_HOMEPAGE: HomepageContent = {
  heroEyebrow: 'A creative wellness space for making, connecting & restoring',
  heroHeading: 'ROOT. CREATE. RESTORE.',
  heroSubheading:
    'Put the phone down and pick up the clay, the thread, the indigo. Kiiro is where you slow down, make something with your hands alongside master artisans and wellness facilitators, and leave lighter than you arrived. In person across India, around...',
  heroSupportingText:
    'Kiiro pairs master artisans with wellness facilitators to guide every session across traditional and contemporary art, alongside restorative practices. Rhythmic making with clay, thread or indigo slows the breath and settles the thoughts, so you leave softer, calmer, and a little more yourself.',
  heroPrimaryCta: {
    label: 'Book a Session',
    href: '/weekly-events',
    kind: 'booking',
  },
  heroSecondaryCta: {
    label: 'Explore Experiences',
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
    'Co-led by a master artisan and a wellness facilitator, every session navigates you through three guided phases, from mental noise to calm.',
  methodologyStages: [
    {
      id: 'root',
      title: '01 Root',
      heading: 'Ground. Orient. Settle.',
      body: 'A facilitated grounding practice, then the story of the craft and its lineage. Your attention shifts from racing thoughts to the present moment.',
      ledBy: 'Facilitator + Artisan',
      youFeel: 'Grounded, present',
    },
    {
      id: 'create',
      title: '02 Create',
      heading: 'Hands busy. Mind quiet.',
      body: 'Guided, rhythmic making that engages your senses, paired with breath cues that support nervous-system regulation. Repetitive, tactile movement is known to ease the stress response and invite a flow state.',
      ledBy: 'Artisan + Facilitator',
      youFeel: 'Regulated, absorbed',
    },
    {
      id: 'restore',
      title: '03 Restore',
      heading: 'Reflect. Integrate. Carry it home.',
      body: 'A guided group reflection gives you a way to express and process what came up, even when words fall short. Completing a piece brings a real sense of accomplishment.',
      ledBy: 'Facilitator',
      youFeel: 'Lighter, connected, accomplished',
    },
  ] satisfies MethodologyStage[],
  manifestoTitle: 'We spend our days in our heads. Kiiro brings you back to your hands.',
  manifestoText:
    'Stress lives in the body, and so does relief. When you shade, stitch, stamp, or shape, your breathing slows and your mind finally gets a break from the noise. Add a master artisan, a centuries-old craft, and good company, and an ordinary afternoon becomes a reset.\n\nEvery Kiiro session is guided by living traditions, so your restoration also keeps a craft, and a craftsperson, alive.',
  impactStats: [
    { value: '800+', label: 'Workshops', context: 'Hands-on sessions across India' },
    { value: '10,000+', label: 'Participants', context: 'People who took a creative break' },
    { value: '7', label: 'Cities', context: 'Mumbai, Kolkata, Pune, Goa, Bangalore, Jaipur' },
    { value: '15+', label: 'Corporate teams', context: 'Team wellness through making' },
    { value: '10+', label: 'Resorts', context: 'Guest wellness experiences' },
  ],
  ethicalHeading: 'Participant wellbeing and artisan livelihood are the same outcome.',
  ethicalBody:
    'Every session channels fair, transparent income to the master artisans who lead it. Creative wellness for participants and dignified livelihood for artisans are designed together, not as competing priorities.',
  partnershipsTitle: 'Wellbeing that reaches further',
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
    description: 'A few hours that are just for you. Book a seat, bring nothing but yourself.',
    audience: ['Individuals'],
    href: '/weekly-events',
    media: [],
  },
  {
    id: 'exp-corporate',
    slug: 'group-corporate',
    name: 'Team wellness through making',
    description:
      'Replace the passive wellness talk with something real. Hands-on workshops that reduce stress and build connection, at your venue or online for distributed teams.',
    audience: ['Corporates', 'Organisations'],
    href: '/experiences/corporates',
    media: [],
  },
  {
    id: 'exp-hospitality',
    slug: 'hospitality',
    name: 'Signature wellness for your guests',
    description:
      'Craft-led wellness experiences that give resorts and properties something memorable, rooted, and restorative.',
    audience: ['Hospitality'],
    href: '/experiences/hospitality-luxury',
    media: [],
  },
  {
    id: 'exp-schools',
    slug: 'schools-colleges',
    name: 'Wellbeing through creativity',
    description: 'Structured making that supports student wellbeing, focus, and cultural literacy.',
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
      'Slow down with something ancestral. Heritage crafts taught by the artisans who carry them. Patience, ritual, and the quiet comfort of continuing something older than you.',
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
      'Express freely. Modern, experimental practices that make room for play, self-expression, and no wrong answers.',
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
    title: 'Restorative Practice',
    pillar: 'Restore',
    description:
      'Settle into your body. Sound, breath, and mindful movement woven into the making, so your whole system exhales.',
    practices: [
      'Art journaling and expressive art therapy',
      'Breathwork, sound, and somatic movement',
      'Dance movement therapy',
      'Silent making and guided reflection',
    ],
    href: '/artforms?category=wellness',
  },
]
