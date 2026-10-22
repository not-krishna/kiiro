import http from 'http'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'http://localhost:3000'

async function fetchUrl(pathname, options = {}) {
  const url = `${BASE_URL}${pathname}`
  const res = await fetch(url, options)
  const text = await res.text()
  return { status: res.status, ok: res.ok, text, headers: res.headers }
}

async function loginAdmin() {
  const res = await fetch(`${BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'kiiroadmin', password: 'k1rr0@dmin' }),
  })
  const cookie = res.headers.get('set-cookie')
  if (!cookie) throw new Error('Login failed: no cookie returned')
  return cookie.split(';')[0]
}

async function runVerification() {
  console.log('=================================================================')
  console.log('   KIIRO FULL-STACK VERIFICATION & END-TO-END PIPELINE AUDIT     ')
  console.log('=================================================================\n')

  let allPassed = true
  const results = []

  function check(label, condition, details = '') {
    if (condition) {
      console.log(`[PASS] ${label}`)
      results.push({ label, status: 'PASS', details })
    } else {
      console.error(`[FAIL] ${label} - ${details}`)
      results.push({ label, status: 'FAIL', details })
      allPassed = false
    }
  }

  // Authenticate admin session
  console.log('--- Step 0: Admin Authentication ---')
  const sessionCookie = await loginAdmin()
  check('Admin authentication successful', Boolean(sessionCookie))

  // -------------------------------------------------------------
  // Phase A: Homepage Hero Section Verification
  // -------------------------------------------------------------
  console.log('\n--- Phase A: Homepage Hero Section ---')
  const homeRes = await fetchUrl('/')
  check('Homepage returns HTTP 200', homeRes.status === 200)

  const eyebrowMatches =
    homeRes.text.includes('A creative wellness space for making, connecting &amp; restoring') ||
    homeRes.text.includes('A creative wellness space for making, connecting & restoring')
  check('Hero eyebrow updated', eyebrowMatches, 'Found eyebrow text in homepage HTML')

  const expectedHeadline = 'Root. Create. Restore.'
  check('Hero headline unchanged', homeRes.text.includes(expectedHeadline), 'Headline unchanged')

  const rejectedParagraph = 'Put the phone down and pick up the clay'
  check('Rejected "Put the phone down..." copy completely removed', !homeRes.text.includes(rejectedParagraph), 'Rejected paragraph absent')

  const approvedHeroParagraph = 'MELD pairs master artisans with wellness facilitators to guide every session'
  check('Hero paragraph updated with approved MELD copy', homeRes.text.includes(approvedHeroParagraph), 'Approved MELD paragraph rendered')

  // -------------------------------------------------------------
  // Phase B: Upcoming Sessions / Events Verification
  // -------------------------------------------------------------
  console.log('\n--- Phase B: Upcoming Sessions / Events ---')
  check('Homepage event eyebrow updated to "Your Calendar of Calm"', homeRes.text.includes('Your Calendar of Calm'))
  check('Homepage event heading updated to "Upcoming Sessions"', homeRes.text.includes('Upcoming Sessions'))
  check('Homepage event intro updated to "Weekend sessions for individuals and small groups"', homeRes.text.includes('Weekend sessions for individuals and small groups. Pick a craft, book a seat, and give yourself a few unhurried hours.'))
  check('Exploration link is "Explore all sessions →" without hardcoded count', homeRes.text.includes('Explore all sessions') && !homeRes.text.includes('Explore all 7 sessions'))

  // Event format badge check
  check('Event cards render "In Person" format badge', homeRes.text.includes('In Person'))

  // Events page filter check
  const eventsPageRes = await fetchUrl('/weekly-events')
  check('Events listing page returns HTTP 200', eventsPageRes.status === 200)
  check('Events page includes "All Formats" filter tab', eventsPageRes.text.includes('All Formats'))
  check('Events page includes "In Person" filter tab', eventsPageRes.text.includes('In Person'))
  check('Events page includes "Online" filter tab', eventsPageRes.text.includes('Online'))

  // -------------------------------------------------------------
  // Phase C: Advisory Board Images Verification
  // -------------------------------------------------------------
  console.log('\n--- Phase C: Advisory Board Images ---')
  check('Advisory section exists on homepage', homeRes.text.includes('Distinguished Advisory') || homeRes.text.includes('Guidance & Lineage'))
  // Verify admin advisory page loads
  const advAdminRes = await fetchUrl('/admin/advisory', { headers: { Cookie: sessionCookie } })
  check('Admin advisory page loads successfully', advAdminRes.status === 200)

  // -------------------------------------------------------------
  // Phase D: Section Removal & Dedicated Journal Page
  // -------------------------------------------------------------
  console.log('\n--- Phase D: Section Removal & Journal ---')
  check('"why-making-restores" section ID removed from homepage', !homeRes.text.includes('id="why-making-restores"'))
  check('Heading "Why a creative break works better" removed from homepage', !homeRes.text.includes('Why a creative break works better'))
  check('"The Science of Hand-Making" eyebrow removed from homepage', !homeRes.text.includes('The Science of Hand-Making'))

  // Journal listing page
  const journalRes = await fetchUrl('/journal')
  check('Journal listing page returns HTTP 200', journalRes.status === 200)
  check('Journal listing renders article titles', journalRes.text.includes('The Grammar of Warli') || journalRes.text.includes('Sacred Kalamkari'))
  check('Footer contains link to /journal', homeRes.text.includes('/journal'))

  // Journal detail page
  const detailRes = await fetchUrl('/journal/grammar-of-warli-art')
  check('Published article detail page returns HTTP 200', detailRes.status === 200)
  check('Article detail renders article body content', detailRes.text.includes('Dahanu') || detailRes.text.includes('Warli'))

  // Draft article protection: create draft article and verify it returns 404
  const draftSlug = `test-draft-${Date.now()}`
  const createDraftRes = await fetch(`${BASE_URL}/api/admin/content`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: sessionCookie },
    body: JSON.stringify({
      section: 'journal',
      action: 'save',
      data: {
        id: `draft-${Date.now()}`,
        title: 'Secret Draft Article',
        slug: draftSlug,
        excerpt: 'This is an unpublished draft.',
        body: 'Unpublished body content.',
        published: false,
      },
    }),
  })
  const draftJson = await createDraftRes.json()
  check('Admin can save draft journal article', createDraftRes.status === 200 && draftJson.success)

  const draftPageRes = await fetchUrl(`/journal/${draftSlug}`)
  check('Unpublished draft article returns 404 on public route', draftPageRes.status === 404, `Status was ${draftPageRes.status}`)

  // Clean up draft
  await fetch(`${BASE_URL}/api/admin/content`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: sessionCookie },
    body: JSON.stringify({
      section: 'journal',
      action: 'delete',
      id: draftSlug,
    }),
  })

  // -------------------------------------------------------------
  // Phase E: Artisan Stories Visibility Toggle
  // -------------------------------------------------------------
  check('Artisan Stories section rendered with approved headline', homeRes.text.includes('The Craft Is the Experience. The Artisan Is the Wisdom.'))

  // Verify artisan records are fully preserved in store
  const contentPath = fs.existsSync(path.join(process.cwd(), 'web', 'src', 'content', 'store', 'content.json'))
    ? path.join(process.cwd(), 'web', 'src', 'content', 'store', 'content.json')
    : path.join(process.cwd(), 'src', 'content', 'store', 'content.json')
  const contentRaw = fs.readFileSync(contentPath, 'utf8')
  const contentObj = JSON.parse(contentRaw)
  check('Artisan records remain intact in content store (3 artisans)', Array.isArray(contentObj.artisans) && contentObj.artisans.length === 3)

  // -------------------------------------------------------------
  // Phase F: Media Library Deduplication & Universal Support
  // -------------------------------------------------------------
  console.log('\n--- Phase F: Media Library Deduplication ---')
  const testFilename = `verify_dedup_${Date.now()}.png`
  const testPngBuffer = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64'
  )
  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2)
  const formPayload = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${testFilename}"\r\nContent-Type: image/png\r\n\r\n`),
    testPngBuffer,
    Buffer.from(`\r\n--${boundary}--\r\n`),
  ])

  const uploadRes = await fetch(`${BASE_URL}/api/admin/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      Cookie: sessionCookie,
    },
    body: formPayload,
  })
  const uploadJson = await uploadRes.json()
  check('Image upload endpoint responds with success', uploadRes.status === 200 && uploadJson.success)

  const mediaListRes1 = await fetch(`${BASE_URL}/api/admin/media`, { headers: { Cookie: sessionCookie } })
  const mediaJson1 = await mediaListRes1.json()
  const matching1 = (mediaJson1.assets || []).filter((m) => m.filename === testFilename || (uploadJson.filename && m.filename === uploadJson.filename))
  check('Single upload produces exactly ONE Media Library entry', matching1.length === 1, `Matches count: ${matching1.length}`)

  // Refresh simulation
  const mediaListRes2 = await fetch(`${BASE_URL}/api/admin/media`, { headers: { Cookie: sessionCookie } })
  const mediaJson2 = await mediaListRes2.json()
  const matching2 = (mediaJson2.assets || []).filter((m) => m.filename === testFilename || (uploadJson.filename && m.filename === uploadJson.filename))
  check('Refresh does not produce duplicate Media Library entry', matching2.length === 1, `Matches count: ${matching2.length}`)

  // Clean up uploaded test image
  if (matching1[0]) {
    await fetch(`${BASE_URL}/api/admin/media`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Cookie: sessionCookie },
      body: JSON.stringify({
        id: matching1[0].id,
        filename: matching1[0].filename,
        url: matching1[0].url,
      }),
    })
  }

  // -------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------
  console.log('\n=================================================================')
  console.log(`   TOTAL TESTS: ${results.length} | PASSED: ${results.filter((r) => r.status === 'PASS').length} | FAILED: ${results.filter((r) => r.status === 'FAIL').length}`)
  console.log('=================================================================\n')

  return allPassed
}

runVerification().then((passed) => {
  process.exit(passed ? 0 : 1)
}).catch((err) => {
  console.error('Verification error:', err)
  process.exit(1)
})
