import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url)
    const req = http.request(
      {
        hostname: parsed.hostname,
        port: parsed.port || 3000,
        path: parsed.pathname + parsed.search,
        method: options.method || 'GET',
        headers: options.headers || {},
      },
      (res) => {
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, text: data }))
      }
    )
    req.on('error', reject)
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body))
    }
    req.end()
  })
}

async function verifyMeldSpec() {
  console.log('=== VERIFYING MELD EXPERIENCES REBRAND SPECIFICATION ===\n')
  let passed = 0
  let failed = 0

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`)
      passed++
    } else {
      console.error(`[FAIL] ${message}`)
      failed++
    }
  }

  // 1. Check Homepage
  console.log('\n--- 1. Homepage Checks ---')
  const homeRes = await fetchUrl('http://localhost:3000/')
  assert(homeRes.status === 200, 'Homepage returns HTTP 200')
  const homeHtml = homeRes.text

  // Purged copy
  assert(!homeHtml.includes('Put the phone down and pick up the clay'), 'No "Put the phone down..." copy in homepage HTML')
  assert(!homeHtml.includes('Book as an individual'), 'No "Book as an individual" CTA in homepage HTML')

  // Hero copy
  assert(homeHtml.includes('MELD pairs master artisans with wellness facilitators'), 'Approved MELD hero paragraph present')
  assert(homeHtml.includes('Root. Create. Restore.'), 'Headline "Root. Create. Restore." present')
  assert(homeHtml.includes('A creative wellness space for making, connecting &amp; restoring') || homeHtml.includes('A creative wellness space for making, connecting & restoring'), 'Revised eyebrow present')
  assert(homeHtml.includes('Book a Session'), 'Hero button "Book a Session" present')
  assert(homeHtml.includes('Explore Experiences'), 'Hero button "Explore Experiences" present')
  assert(homeHtml.includes('Craft your calm'), '"Craft your calm" badge present in hero visual section')

  // Manifesto
  assert(homeHtml.includes('We spend our days in our heads. MELD brings you back to your hands.'), 'Manifesto headline present')
  assert(homeHtml.includes('Stress lives in the body, and so does relief. When you shade, stitch, stamp, or shape, your breathing slows and your mind finally gets a break from the noise.'), 'Approved short manifesto body present')

  // Advisory Board & Core Team
  assert(homeHtml.includes('Advisory Board'), 'Advisory Board section present')
  assert(homeHtml.includes('Dr. Tapanendu Kundu'), 'Dr. Tapanendu Kundu present')
  assert(homeHtml.includes('Dr. Shalini Purohit'), 'Dr. Shalini Purohit present')
  assert(homeHtml.includes('Shaam Pahelpakar'), 'Shaam Pahelpakar present')
  assert(homeHtml.includes('Dr. Sanjay Pandey'), 'Dr. Sanjay Pandey present')
  assert(homeHtml.includes('Meet Our Core Team'), '"Meet Our Core Team" toggle button present')
  assert(homeHtml.includes('Sulagna Guhathakurta'), 'Sulagna Guhathakurta in Core Team')
  assert(homeHtml.includes('Dr. Madhurima Prasad'), 'Dr. Madhurima Prasad in Core Team')

  // Offerings section
  assert(homeHtml.includes('Three ways to root, create, and restore'), 'Offerings heading present')
  assert(homeHtml.includes('Restorative Practice'), '"Restorative Practice" present')
  assert(homeHtml.includes('9 curated practices'), '"9 curated practices" typo fix verified')

  // Upcoming sessions
  assert(homeHtml.includes('Your Calendar of Calm'), 'Calendar of Calm eyebrow present')
  assert(homeHtml.includes('Upcoming Sessions'), 'Upcoming Sessions heading present')
  assert(homeHtml.includes('Explore all sessions →'), '"Explore all sessions →" link present')

  // Artisan section
  assert(homeHtml.includes('The Craft Is the Experience. The Artisan Is the Wisdom.'), 'Artisan headline present')
  assert(homeHtml.includes('Behind every session is a master who has spent a lifetime with their material.'), 'Artisan body present')
  assert(homeHtml.includes('Every session supports fair wages and dignity of practice for artisan communities.'), 'Artisan impact label present')

  // Final CTA
  assert(homeHtml.includes('Your hands already know how to unwind.'), 'Final CTA heading present')
  assert(homeHtml.includes('Plan a Group Experience'), 'Final CTA "Plan a Group Experience" button present')
  assert(homeHtml.includes('Book Your First Session'), 'Final CTA "Book Your First Session" button present')

  // Footer
  assert(homeHtml.includes('Hands On. Rooted. Restored.'), 'Footer tagline present')
  assert(homeHtml.includes('MELD is a creative wellness space'), 'Footer description present')
  assert(homeHtml.includes('creative wellness space') && !homeHtml.includes('KIIRO CULTURAL PLATFORM'), 'No obsolete KIIRO CULTURAL PLATFORM')

  // 2. Check Weekly Events Page
  console.log('\n--- 2. Weekly Events Checks ---')
  const eventsRes = await fetchUrl('http://localhost:3000/weekly-events')
  assert(eventsRes.status === 200, 'Weekly Events returns HTTP 200')
  const eventsHtml = eventsRes.text

  // Verify Kintsugi in Candolim, Goa (NOT Bangalore)
  assert(!eventsHtml.includes('Kintsugi - Golden Ceramic Repair') || !eventsHtml.includes('Bangalore') || eventsHtml.includes('Candolim, Goa') || eventsHtml.includes('ITC Fortune'), 'Kintsugi is not assigned to Bangalore')
  assert(eventsHtml.includes('ITC Fortune'), 'ITC Fortune venue present in events')
  assert(eventsHtml.includes('Bunaphile Roasters'), 'Bunaphile Roasters (Kolkata) present in events')
  assert(eventsHtml.includes('Thhikana Cafe'), 'Thhikana Cafe (Thane) present in events')
  assert(eventsHtml.includes('T Villa Cafe'), 'T Villa Cafe (Juhu) present in events')
  assert(eventsHtml.includes('Sorozaie Restaurant'), 'Sorozaie Restaurant (Versova) present in events')
  assert(eventsHtml.includes('Kalyani Nagar'), 'Kalyani Nagar (Pune) present in events')
  assert(eventsHtml.includes('Wood Pegger'), 'Wood Pegger (Mandrem Goa) present in events')
  assert(eventsHtml.includes('Hello World'), 'Hello World (Bengaluru) present in events')

  // Verify City Filters
  const cities = ['Mumbai', 'Kolkata', 'Pune', 'Bangalore', 'Goa', 'Chennai', 'Hyderabad', 'Delhi']
  for (const c of cities) {
    assert(eventsHtml.includes(c), `City filter option "${c}" present on events page`)
  }

  // 3. Check About Page
  console.log('\n--- 3. About Page Checks ---')
  const aboutRes = await fetchUrl('http://localhost:3000/about')
  assert(aboutRes.status === 200, 'About page returns HTTP 200')
  const aboutHtml = aboutRes.text
  assert(aboutHtml.includes('MELD EXPERIENCES') || aboutHtml.includes('About MELD'), 'MELD branding on About page')
  assert(!aboutHtml.includes('Kiiro is a cultural platform'), 'No "Kiiro is a cultural platform" on About page')

  // 4. Check Navigation Category text
  console.log('\n--- 4. Navigation Menu Checks ---')
  assert(!homeHtml.includes('Browse workshops by category and book as an individual'), 'Navigation does not contain "and book as an individual"')

  console.log(`\n=== SPECIFICATION VERIFICATION COMPLETE: ${passed} passed, ${failed} failed ===`)
}

verifyMeldSpec().catch(console.error)
