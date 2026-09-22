export interface ArtformItem {
  _id: string
  title: string
  slug: string
  category: 'Traditional' | 'Contemporary' | 'Wellness'
  region: string
  shortDescription: string
  heroImage?: unknown
  imageUrl?: string
  materials: string[]
  techniques: string[]
  introduction?: string
  culturalContext?: string
}

export interface ArtisanItem {
  _id: string
  name: string
  slug: string
  region: string
  bio: string
  lineage: string
  quote: string
  portrait?: unknown
  imageUrl?: string
  craftReferences?: { title: string; slug: string }[]
}

export interface ExperienceItem {
  _id: string
  title: string
  slug: string
  experienceType: string
  audience: string[]
  shortDescription: string
  duration: string
  format: string
  imageUrl?: string
  artforms?: { title: string; slug: string }[]
  artisans?: { name: string; slug: string; region: string }[]
}

export interface EventItem {
  _id: string
  title: string
  slug: string
  date: string
  startTime: string
  city: string
  venue: string
  price: number
  capacity: number
  bookingStatus: 'open' | 'limited' | 'sold-out' | 'closed' | 'enquiry-only'
  imageUrl?: string
  experienceReference?: { title: string; slug: string }
}

export interface JournalItem {
  _id: string
  title: string
  slug: string
  standfirst: string
  category: string
  author: string
  publishedAt: string
  heroImage?: unknown
  imageUrl?: string
  bodyParagraphs?: string[]
}

export interface ProductItem {
  _id: string
  title: string
  slug: string
  category: string
  maker: string
  region: string
  materials: string
  dimensions: string
  price: string
  availability: string
  imageUrl?: string
  shortDescription: string
}

export const FALLBACK_ARTFORMS: ArtformItem[] = [
  {
    _id: 'artform-1',
    title: 'Warli Ritual Painting',
    slug: 'warli-painting',
    category: 'Traditional',
    region: 'North Sahyadri, Maharashtra',
    shortDescription: 'Sacred tribal geometry drawn with rice paste and natural gum on terracotta walls celebrating communal rhythm.',
    imageUrl: '/images/workshops/warli-art-workshop.jpg',
    materials: ['Rice paste', 'Water-soluble natural gum', 'Geru (red ochre substrate)', 'Bamboo twigs'],
    techniques: ['Triangular body geometry', 'Rhizomatic movement lines', 'Wall plastering with cow-dung & clay'],
    introduction: 'Warli painting is not merely decorative; it is an elemental script of the indigenous Warli community of the Western Ghats. Historically painted by women (Savasinis) during marriage ceremonies and harvest festivals, it uses simple geometric forms—circle, triangle, square—to represent the sun, moon, mountains, and sacred enclosures.',
    culturalContext: 'Rooted in sacred ritual and animistic reverence, Warli art communicates harmonious coexistence with nature, forest ecology, and seasonal cycles.',
  },
  {
    _id: 'artform-2',
    title: 'Mata ni Pachedi Shrine Textiles',
    slug: 'mata-ni-pachedi',
    category: 'Traditional',
    region: 'Ahmedabad, Gujarat',
    shortDescription: 'Sacred hand-painted and block-printed ritual textile hangings dedicated to the Divine Mother.',
    imageUrl: '/images/workshops/kalamkari-art-process.jpg',
    materials: ['Unbleached cotton cloth', 'Harda (myrobalan dye)', 'Iron rust fluid', 'Alum mordant', 'Natural madder root'],
    techniques: ['Freehand kalam brushwork', 'Carved teakwood block printing', 'Boiling in copper cauldrons with dhawda flowers'],
    introduction: 'Translating literally to "Behind the Mother Goddess", Mata ni Pachedi emerged centuries ago when marginalized communities denied temple entry created painted shrines on cloth. Each cloth is a portable sacred space featuring the central goddess surrounded by musicians, guardians, and celestial flora.',
    culturalContext: 'A historic testament to devotion, resilience, and democratization of sacred spaces through textile artistry.',
  },
  {
    _id: 'artform-3',
    title: 'Phad Scroll Painting',
    slug: 'phad-painting',
    category: 'Traditional',
    region: 'Bhilwara & Shahpura, Rajasthan',
    shortDescription: 'Epic narrative scroll painting rendered on long canvas used by itinerant bards for oral performances.',
    imageUrl: '/images/workshops/madhubani-painting-process.jpg',
    materials: ['Handwoven coarse cotton', 'Starch & rice paste sizing', 'Natural mineral pigments', 'Squirrel hair brushes'],
    techniques: ['Yellow under-drawing', 'Layered mineral shading', 'Black outline work (Shyahi)'],
    introduction: 'Phad is a 700-year-old tradition of painted scrolls measuring up to 30 feet in length. The scroll acts as a mobile temple for the Bhopa and Bhopi bards who travel at night, chanting legendary folklore accompanied by the stringed Ravanantha instrument.',
    culturalContext: 'A vibrant synthesis of visual storytelling, ballad performance, and community heritage in rural Rajasthan.',
  },
  {
    _id: 'artform-4',
    title: 'Jaipur Blue Pottery',
    slug: 'blue-pottery',
    category: 'Contemporary',
    region: 'Jaipur, Rajasthan',
    shortDescription: 'Turquoise and cobalt glazed ceramics crafted without clay using quartz powder and natural oxides.',
    imageUrl: '/images/other/pottery-1.png',
    materials: ['Quartz powder', 'Glass powder', 'Multani Mitti (Fuller earth)', 'Gum tragacanth', 'Cobalt oxide dye'],
    techniques: ['Dough kneading without clay', 'Mould pressing', 'Underglaze brush painting', 'Wood-fired kiln firing'],
    introduction: 'Distinct from traditional pottery, Jaipur Blue Pottery is clay-free. Introduced to Jaipur in the 19th century under Maharaja Sawai Ram Singh II, its vivid cobalt and turquoise motifs draw inspiration from Turko-Persian aesthetics and indigenous flora.',
    culturalContext: 'A delicate fusion of royal patronage, Persian heritage, and contemporary artisanal design.',
  },
  {
    _id: 'artform-5',
    title: 'Kalamkari Hand-Painted Art',
    slug: 'kalamkari',
    category: 'Traditional',
    region: 'Srikalahasti, Andhra Pradesh',
    shortDescription: 'Intricate pen-drawn narrative paintings on cotton using organic dye extracts and bamboo nibs.',
    imageUrl: '/images/workshops/kalamkari-art-process.jpg',
    materials: ['Kalam (bamboo pen with hair wool)', 'Myrobalan milk solution', 'Ferrous acetate', 'Alizarin red dye', 'Indigo extract'],
    techniques: ['23-step washing process', 'Freehand kalam outline', 'Organic dye bath infusion'],
    introduction: 'Kalamkari ("Kalam" meaning pen, "Kari" meaning craftsmanship) from Srikalahasti relies entirely on freehand drawing with a bamboo reed pen. The process involves up to 23 meticulous natural washing, mordanting, and dyeing steps.',
    culturalContext: 'Temple narrative art carrying centuries of literary epic folklore and botanical dye wisdom.',
  },
  {
    _id: 'artform-6',
    title: 'Tactile Clay & Grounding',
    slug: 'tactile-clay-wellness',
    category: 'Wellness',
    region: 'Bangalore & Pune Studios',
    shortDescription: 'Mindful pottery and clay shaping focused on sensory focus, nervous system calibration, and elemental grounding.',
    imageUrl: '/images/other/pottery-2.png',
    materials: ['Natural terracotta clay', 'Terracotta slip', 'Wooden ribs', 'Smooth river stones'],
    techniques: ['Pinch-pot meditation', 'Coil building rhythm', 'Blind tactile shaping'],
    introduction: 'Tactile Clay & Grounding bridges living craft techniques with creative wellbeing. Participants slow down their breathing and focus on tactile feedback as raw earth transforms under deliberate, gentle hand pressure.',
    culturalContext: 'Modern wellness rooted in ancient material intimacy—reconnecting urban lives to earth and stillness.',
  },
]

export const FALLBACK_ARTISANS: ArtisanItem[] = [
  {
    _id: 'artisan-1',
    name: 'Ramesh Hengadi',
    slug: 'ramesh-hengadi',
    region: 'Ganjad, Dahanu, Maharashtra',
    bio: 'Master Warli artist hailing from a generational lineage in Dahanu. Ramesh has spent over 25 years teaching the ritual and ecological roots of Warli geometry across India and internationally.',
    lineage: '4th Generation Warli Practitioner',
    quote: 'Warli is not about drawing lines on a wall; it is the rhythm of our village breathing together.',
    imageUrl: '/images/ramu-master-craftsman.png',
    craftReferences: [{ title: 'Warli Ritual Painting', slug: 'warli-painting' }],
  },
  {
    _id: 'artisan-2',
    name: 'Kiran Chitara',
    slug: 'kiran-chitara',
    region: 'Ahmedabad, Gujarat',
    bio: 'National Award-winning master of Mata ni Pachedi. Kiran continues the 300-year Chitara family tradition of hand-drawing sacred textiles with bamboo kalam and natural madder dye.',
    lineage: 'Chitara Family Lineage (7th Generation)',
    quote: 'When my kalam touches the cloth, I do not rush. The dyes must drink the sun and water in their own time.',
    imageUrl: '/images/testimonials/avatar1.png',
    craftReferences: [{ title: 'Mata ni Pachedi Shrine Textiles', slug: 'mata-ni-pachedi' }],
  },
  {
    _id: 'artisan-3',
    name: 'Kalyan Joshi',
    slug: 'kalyan-joshi',
    region: 'Bhilwara, Rajasthan',
    bio: 'Preserving the ancient 700-year-old Phad scroll painting legacy. Kalyan combines classical epic iconography with contemporary storytelling themes for modern educational contexts.',
    lineage: 'Joshi Phad Lineage',
    quote: 'A Phad scroll is a living temple. When we unroll it, history speaks through color.',
    imageUrl: '/images/testimonials/avatar2.png',
    craftReferences: [{ title: 'Phad Scroll Painting', slug: 'phad-painting' }],
  },
  {
    _id: 'artisan-4',
    name: 'Leela Devi Sharma',
    slug: 'leela-devi-sharma',
    region: 'Jaipur, Rajasthan',
    bio: 'Senior ceramic artist with 30 years of experience in quartz-glaze blue pottery, specializing in Persian floral motifs and underglaze precision.',
    lineage: 'Master Blue Pottery Craftsman',
    quote: 'Quartz requires patience. One wrong temperature, and the blue vanishes into ash. Precision is devotion.',
    imageUrl: '/images/testimonials/divya-sudarshana.png',
    craftReferences: [{ title: 'Jaipur Blue Pottery', slug: 'blue-pottery' }],
  },
]

export const FALLBACK_EXPERIENCES: ExperienceItem[] = [
  {
    _id: 'exp-1',
    title: 'Warli Tribal Geometry & Rhythm',
    slug: 'warli-immersion',
    experienceType: 'Public Workshop & Masterclass',
    audience: ['Beginners', 'Designers', 'Culture Enthusiasts'],
    shortDescription: 'Immerse in the sacred geometry, rice paste pigments, and village narrative of Warli art led by master artisan Ramesh Hengadi.',
    duration: '3.5 Hours',
    format: 'In-person Weekend Masterclass',
    imageUrl: '/images/workshops/warli-art-workshop.jpg',
    artforms: [{ title: 'Warli Ritual Painting', slug: 'warli-painting' }],
    artisans: [{ name: 'Ramesh Hengadi', slug: 'ramesh-hengadi', region: 'Maharashtra' }],
  },
  {
    _id: 'exp-2',
    title: 'Sacred Cloth & Kalamkari Ink Preparation',
    slug: 'sacred-kalamkari',
    experienceType: 'Weekend Intensive Workshop',
    audience: ['Textile Lovers', 'Artists', 'Educators'],
    shortDescription: 'Learn myrobalan mordanting, bamboo pen preparation, and natural iron-rust dye application on organic cotton.',
    duration: '2 Days (Full Day)',
    format: 'Hands-on Studio Intensive',
    imageUrl: '/images/workshops/kalamkari-art-process.jpg',
    artforms: [{ title: 'Kalamkari Hand-Painted Art', slug: 'kalamkari' }],
    artisans: [{ name: 'Kiran Chitara', slug: 'kiran-chitara', region: 'Gujarat' }],
  },
  {
    _id: 'exp-3',
    title: 'Quartz & Cobalt Glaze Studio Experience',
    slug: 'jaipur-blue-pottery-studio',
    experienceType: 'Studio Workshop',
    audience: ['Ceramic Enthusiasts', 'Craft Collectors', 'Couples & Groups'],
    shortDescription: 'Knead clay-free quartz dough, press traditional moulds, and paint underglaze turquoise motifs in Jaipur style.',
    duration: '4 Hours',
    format: 'Studio Craft Workshop',
    imageUrl: '/images/other/pottery-1.png',
    artforms: [{ title: 'Jaipur Blue Pottery', slug: 'blue-pottery' }],
    artisans: [{ name: 'Leela Devi Sharma', slug: 'leela-devi-sharma', region: 'Rajasthan' }],
  },
  {
    _id: 'exp-4',
    title: 'Corporate Creative Grounding & Craft Circle',
    slug: 'corporate-craft-grounding',
    experienceType: 'Corporate Team Retreat',
    audience: ['Corporate Teams', 'Leadership Groups', 'HR & Wellness Heads'],
    shortDescription: 'Unplug teams from screens with sensory clay tactile work, collaborative Warli canvas painting, and mindful reflection.',
    duration: 'Half-Day / Full-Day',
    format: 'On-site or Offsite Corporate Experience',
    imageUrl: '/images/other/pottery-2.png',
    artforms: [{ title: 'Tactile Clay & Grounding', slug: 'tactile-clay-wellness' }],
  },
]

export const FALLBACK_EVENTS: EventItem[] = [
  {
    _id: 'event-1',
    title: 'Warli Harvest Canvas & Storytelling Circle',
    slug: 'warli-harvest-canvas-mumbai',
    date: '2026-09-12',
    startTime: '10:30 AM',
    city: 'Mumbai',
    venue: 'Kiiro Studio, Bandra West',
    price: 2400,
    capacity: 15,
    bookingStatus: 'open',
    imageUrl: '/images/workshops/warli-art-workshop.jpg',
    experienceReference: { title: 'Warli Tribal Geometry & Rhythm', slug: 'warli-immersion' },
  },
  {
    _id: 'event-2',
    title: 'Mata ni Pachedi Natural Dye Workshop',
    slug: 'mata-ni-pachedi-ahmedabad',
    date: '2026-09-19',
    startTime: '11:00 AM',
    city: 'Ahmedabad',
    venue: 'Chitara Heritage Studio',
    price: 3200,
    capacity: 12,
    bookingStatus: 'limited',
    imageUrl: '/images/workshops/kalamkari-art-process.jpg',
    experienceReference: { title: 'Sacred Cloth & Kalamkari Ink Preparation', slug: 'sacred-kalamkari' },
  },
  {
    _id: 'event-3',
    title: 'Blue Pottery Tiles & Underglaze Masterclass',
    slug: 'blue-pottery-jaipur-bengaluru',
    date: '2026-09-26',
    startTime: '02:00 PM',
    city: 'Bangalore',
    venue: 'Indiranagar Craft Collective',
    price: 2800,
    capacity: 10,
    bookingStatus: 'open',
    imageUrl: '/images/other/pottery-3.png',
    experienceReference: { title: 'Quartz & Cobalt Glaze Studio Experience', slug: 'jaipur-blue-pottery-studio' },
  },
  {
    _id: 'event-4',
    title: 'Phad Epic Storytelling & Miniature Painting',
    slug: 'phad-miniature-delhi',
    date: '2026-10-03',
    startTime: '10:00 AM',
    city: 'Delhi NCR',
    venue: 'India International Centre Annex',
    price: 3500,
    capacity: 15,
    bookingStatus: 'enquiry-only',
    imageUrl: '/images/workshops/madhubani-painting-process.jpg',
    experienceReference: { title: 'Phad Scroll Painting Masterclass', slug: 'phad-painting' },
  },
]

export const FALLBACK_JOURNAL: JournalItem[] = [
  {
    _id: 'journal-1',
    title: 'The Grammar of Warli: Why Triangles Sing of Mountains',
    slug: 'grammar-of-warli-triangles',
    standfirst: 'Exploring how simple geometric forms communicate thousands of years of ecological wisdom without a written script.',
    category: 'Craft Heritage',
    author: 'Sunil Sahdev',
    publishedAt: '2026-08-20',
    imageUrl: '/images/workshops/warli-art-workshop.jpg',
    bodyParagraphs: [
      'In the quiet villages of Dahanu, walls made of karvy reeds and red mud are transformed during harvest. There are no written books in traditional Warli culture; the wall is the canvas, and the triangle is the word.',
      'A circle represents the sun and moon. A square indicates sacred land or enclosure. Two triangles joined at the tip represent a human being—the upper triangle points to the heavens, while the lower rests upon the earth.',
      'When master artisan Ramesh Hengadi paints a Tarpa dance, hundreds of tiny geometric figures swirl around a musician. The dance does not end at the edge of the painting; it radiates into the surrounding forest.',
    ],
  },
  {
    _id: 'journal-2',
    title: 'Boiling Madder & Rust: The 23 Steps of Sacred Kalamkari',
    slug: '23-steps-of-sacred-kalamkari',
    standfirst: 'Behind every vibrant red and deep black line of Srikalahasti Kalamkari lies weeks of patient natural alchemy with myrobalan and iron.',
    category: 'Material Wisdom',
    author: 'Ananya Roy',
    publishedAt: '2026-08-14',
    imageUrl: '/images/workshops/kalamkari-art-process.jpg',
    bodyParagraphs: [
      'Modern synthetic printing promises instant color in minutes. Kalamkari requires twenty-three days of ritualized interaction with nature.',
      'The cloth is first treated with myrobalan (harda) fruit milk so the natural tannins bind with iron. Ferrous acetate—made by fermenting rusted iron nails in sugarcane jaggery water—creates permanent deep black outlines.',
      'To see a master artisan draw freehand with a bamboo reed wrapped in wool is to witness muscle memory forged over generations.',
    ],
  },
  {
    _id: 'journal-3',
    title: 'Slowing Down in a Fast World: Creative Wellness through Craft',
    slug: 'slowing-down-creative-wellness',
    standfirst: 'How hands-on engagement with tactile materials acts as a powerful antidote to digital burnout and mental fatigue.',
    category: 'Creative Wellbeing',
    author: 'Dr. Meera Iyer',
    publishedAt: '2026-08-01',
    imageUrl: '/images/other/pottery-2.png',
    bodyParagraphs: [
      'Our hands were designed to shape, press, weave, and hold earth. Yet modern professional work confines our physical interaction to glass touchscreens and plastic keyboards.',
      'When participants join Kiiro’s Creative Wellness Circle, the shift in brainwave activity is palpable within twenty minutes. As raw clay or natural paint engages tactile receptors, focus sharpens and digital anxiety recedes.',
      'Craft is not merely art appreciation; it is active somatic grounding.',
    ],
  },
]

export const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    _id: 'prod-1',
    title: 'Hand-Painted Warli Ceremonial Tray',
    slug: 'warli-ceremonial-tray',
    category: 'Home Decor',
    maker: 'Ramesh Hengadi & Artisans',
    region: 'Dahanu, Maharashtra',
    materials: 'Reclaimed Teakwood & Natural Rice-Pigment Lacquer',
    dimensions: '14" x 10" x 1.5"',
    price: '₹4,500',
    availability: 'Made to Order (14 Days)',
    imageUrl: '/images/workshops/warli-art-workshop.jpg',
    shortDescription: 'Hand-carved solid teakwood serving tray hand-painted with traditional Warli harvest imagery and sealed with non-toxic matte sealant.',
  },
  {
    _id: 'prod-2',
    title: 'Mata ni Pachedi Sacred Wall Hanging',
    slug: 'mata-ni-pachedi-wall-hanging',
    category: 'Textile Art',
    maker: 'Kiran Chitara Family',
    region: 'Ahmedabad, Gujarat',
    materials: '100% Organic Handspun Cotton & Natural Plant Dyes',
    dimensions: '36" x 48"',
    price: '₹12,800',
    availability: 'Limited Edition (2 In Stock)',
    imageUrl: '/images/workshops/kalamkari-art-process.jpg',
    shortDescription: 'Authentic 23-step hand-drawn and block-printed ritual textile hanging featuring floral mandalas and guardian iconography.',
  },
  {
    _id: 'prod-3',
    title: 'Jaipur Turquoise Quartz Tile Set (Set of 4)',
    slug: 'jaipur-quartz-tile-set',
    category: 'Ceramics',
    maker: 'Leela Devi Studio',
    region: 'Jaipur, Rajasthan',
    materials: 'Quartz Powder, Glass, & Cobalt Mineral Underglaze',
    dimensions: '6" x 6" per tile',
    price: '₹3,200',
    availability: 'In Stock',
    imageUrl: '/images/other/pottery-2.png',
    shortDescription: 'Traditional clay-free blue pottery coasters/tiles with hand-painted Persian arabesque patterns.',
  },
]
