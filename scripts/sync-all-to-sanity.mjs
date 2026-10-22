const SANITY_WRITE_TOKEN = 'skYUSJS8xBvsKLBi5Bp6uAzzV0sfgzwl2jeqTyxMt0EFzcohrcu4Xkc8vAiMhWdtFGgBoEKe6LmVRk2R7AHFSvYNuj0UauhmC7aHrthXkF8gyyczrPPK1gcNuMUqzsc31XoufPxx9jpsfAE0LZ45mSSMZkmuvzNQM5dG2olPgz8AUxS9zYF0'
const url = 'https://s47moswb.api.sanity.io/v2026-01-01/data/mutate/production'

async function syncAllToSanity() {
  const mutations = [
    // 1. Update Homepage copy
    {
      patch: {
        id: 'homePage',
        set: {
          heroEyebrow: 'A creative wellness space for making, connecting & restoring',
          heroHeading: 'Root. Create. Restore.',
          heroSubheading:
            'MELD pairs master artisans with wellness facilitators to guide every session across traditional and contemporary art, alongside restorative practices. Rhythmic making with clay, thread or indigo slows the breath and settles the thoughts, so you leave softer, calmer, and a little more yourself.',
          heroSupportingText: '',
          manifestoTitle: 'We spend our days in our heads. MELD brings you back to your hands.',
          manifestoText:
            'Stress lives in the body, and so does relief. When you shade, stitch, stamp, or shape, your breathing slows and your mind finally gets a break from the noise.',
          showArtisanStories: true,
        },
      },
    },

    // 2. Update Site Settings
    {
      patch: {
        id: 'siteSettings',
        set: {
          siteName: 'MELD EXPERIENCES: Creative Wellness Through Living Craft | Root. Create. Restore.',
          showArtisanStories: true,
        },
      },
    },

    // 3. Update Advisors Order & Names
    {
      patch: {
        id: 'advisor-sham-pahelpakar',
        set: {
          name: 'Shaam Pahelpakar',
          order: 3,
        },
      },
    },
    {
      patch: {
        id: 'advisor-dr-sanjay-pandey',
        set: {
          name: 'Dr. Sanjay Pandey',
          order: 4,
        },
      },
    },

    // 4. Update event-kintsugi-bangalore-march to Candolim, Goa (ITC Fortune)
    {
      patch: {
        id: 'event-kintsugi-bangalore-march',
        set: {
          city: 'Goa',
          venue: 'ITC Fortune',
          address: 'Bamon Vaddo, Candolim, Bardez, North Goa, 403515 / 403516',
          googleMapsUrl:
            'https://www.google.com/maps/search/?api=1&query=ITC+Fortune,+Bamon+Vaddo,+Candolim,+Bardez,+North+Goa,+403515',
        },
      },
    },

    // 5. Create or Replace CSV Events in Sanity
    // 5.1 Kolkata - Bunaphile Roasters
    {
      createOrReplace: {
        _id: 'event-pottery-block-printing-kolkata',
        _type: 'event',
        title: 'Heritage Pottery & Textile Block Printing',
        slug: { _type: 'slug', current: 'pottery-block-printing-kolkata' },
        shortDescription: 'Tactile wheel-throwing, centering, and botanical block printing on organic fabric.',
        date: '2026-10-25',
        startTime: '11:00 AM',
        endTime: '02:30 PM',
        city: 'Kolkata',
        venue: 'Bunaphile Roasters',
        address: '101, Southern Ave, Lake Terrace, Ballygunge, Kolkata, West Bengal 700029',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=Bunaphile+Roasters,+101,+Southern+Ave,+Lake+Terrace,+Ballygunge,+Kolkata,+West+Bengal+700029',
        price: 2600,
        capacity: 12,
        bookingStatus: 'open',
        duration: '3.5 hours',
        facilitator: 'Master Ceramicist & Block Printer',
        format: 'in-person',
        feelsLike: 'earthy, rhythmic, creative',
        keyProcess: 'Clay wedging, wheel throwing, hand-carved woodblock ink alignment, and textile stamping',
        takeAway: 'Handcrafted ceramic piece + customized hand-printed textile stole',
        isWeekly: true,
        audience: 'b2c',
        published: true,
      },
    },

    // 5.2 Thane, Mumbai - Thhikana Cafe
    {
      createOrReplace: {
        _id: 'event-pottery-thane-mumbai',
        _type: 'event',
        title: 'Clay Centering & Terracotta Wheel Throwing',
        slug: { _type: 'slug', current: 'pottery-thane-mumbai' },
        shortDescription: 'Tactile wheel-throwing and calming hand-building guided by master ceramicists.',
        date: '2026-10-24',
        startTime: '10:30 AM',
        endTime: '01:30 PM',
        city: 'Mumbai',
        venue: 'Thhikana Cafe',
        address:
          'Hiranandani Meadows, Shop No. 26, G-Floor, Block No. 3, Emerald Plaza, Market, opposite Currae Speciality Clinic, Mumbai, Maharashtra 400610',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=Thhikana+Cafe,+Hiranandani+Meadows,+Emerald+Plaza,+Thane,+Mumbai',
        price: 2500,
        capacity: 15,
        bookingStatus: 'open',
        duration: '3 hours',
        facilitator: 'Master Ceramicist',
        format: 'in-person',
        feelsLike: 'grounding, slow, centering',
        keyProcess: 'Centering clay, pulling walls, foot trimming, and shaping functional vessels',
        takeAway: 'Fired terracotta bowl crafted by your hands',
        isWeekly: true,
        audience: 'b2c',
        published: true,
      },
    },

    // 5.3 Juhu, Mumbai - T Villa Cafe
    {
      createOrReplace: {
        _id: 'event-pottery-juhu-mumbai',
        _type: 'event',
        title: 'Studio Wheel Pottery & Clay Craft',
        slug: { _type: 'slug', current: 'pottery-juhu-mumbai' },
        shortDescription: 'Guided centering and wheel throwing in unhurried coastal studio ambiance.',
        date: '2026-10-25',
        startTime: '03:30 PM',
        endTime: '06:30 PM',
        city: 'Mumbai',
        venue: 'T Villa Cafe',
        address:
          'Amar Mahal Building, Acharya Donde Marg, near ISKCON Temple, Juhu, Mumbai, Maharashtra 400049',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=T+Villa+Cafe,+Amar+Mahal+Building,+Juhu,+Mumbai',
        price: 2700,
        capacity: 14,
        bookingStatus: 'open',
        duration: '3 hours',
        facilitator: 'Master Ceramicist',
        format: 'in-person',
        feelsLike: 'reflective, calming, mindful',
        keyProcess: 'Rhythmic centering, opening clay wells, creating cylindrical forms, and sponge finishing',
        takeAway: 'Handmade ceramic vessel glazed and fired for studio pick-up',
        isWeekly: true,
        audience: 'b2c',
        published: true,
      },
    },

    // 5.4 Kalyani Nagar, Pune - Kalyani Nagar
    {
      createOrReplace: {
        _id: 'event-pottery-kalyani-nagar-pune',
        _type: 'event',
        title: 'Mindful Wheel Throwing & Hand-Building',
        slug: { _type: 'slug', current: 'pottery-kalyani-nagar-pune' },
        shortDescription: 'Slow tactile craft and nervous-system regulation through sensory clay modeling.',
        date: '2026-10-24',
        startTime: '11:00 AM',
        endTime: '02:00 PM',
        city: 'Pune',
        venue: 'Kalyani Nagar',
        address:
          'Sr. No. 213–215, Jogger’s Park, Plot No. 18, near North Avenue, Kalyani Nagar, Pune, Maharashtra 411006',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=Jogger%27s+Park,+Plot+No.+18,+Kalyani+Nagar,+Pune,+Maharashtra+411006',
        price: 2400,
        capacity: 12,
        bookingStatus: 'open',
        duration: '3 hours',
        facilitator: 'Master Potter',
        format: 'in-person',
        feelsLike: 'peaceful, restorative, focused',
        keyProcess: 'Clay wedging, pinch pot fundamentals, and electric wheel spinning',
        takeAway: 'Custom sculpted and trimmed terracotta planter',
        isWeekly: true,
        audience: 'b2c',
        published: true,
      },
    },

    // 5.5 Mandrem, Goa - Wood Pegger
    {
      createOrReplace: {
        _id: 'event-pottery-mandrem-goa',
        _type: 'event',
        title: 'Coastal Wheel Pottery & Terracotta Hand-Building',
        slug: { _type: 'slug', current: 'pottery-mandrem-goa' },
        shortDescription: 'Unhurried coastal making with natural terracotta clay and coastal breezes.',
        date: '2026-10-25',
        startTime: '04:00 PM',
        endTime: '07:00 PM',
        city: 'Goa',
        venue: 'Wood Pegger',
        address: 'House No. 436, Junaswada, Beach Road, Mandrem, Goa 403527',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=Wood+Pegger,+Beach+Road,+Mandrem,+Goa+403527',
        price: 2500,
        capacity: 16,
        bookingStatus: 'open',
        duration: '3 hours',
        facilitator: 'Master Potter',
        format: 'in-person',
        feelsLike: 'breezy, meditative, grounding',
        keyProcess: 'Sensory centering, thumb pinching, coil construction, and texture burnishing',
        takeAway: 'Fired artisanal terracotta coffee tumbler',
        isWeekly: true,
        audience: 'b2c',
        published: true,
      },
    },
  ]

  console.log(`Sending ${mutations.length} mutations to Sanity...`)
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  })

  const json = await res.json()
  console.log('Sanity mutation response:', JSON.stringify(json, null, 2))
}

syncAllToSanity().catch(console.error)
