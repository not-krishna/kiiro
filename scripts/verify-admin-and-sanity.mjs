import http from 'http'

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

async function run() {
  console.log('=== ADMIN & SANITY COMPREHENSIVE VERIFICATION ===\n')
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

  // 1. Admin Login with meldadmin
  console.log('\n--- 1. Admin Authentication ---')
  const loginRes = await fetchUrl('http://localhost:3000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { username: 'meldadmin', password: 'k1rr0@dmin' }
  })
  assert(loginRes.status === 200, 'Admin login with meldadmin succeeded')
  const loginJson = JSON.parse(loginRes.text)
  assert(loginJson.success === true, 'Login response has success: true')
  assert(loginJson.user?.name === 'MELD Administrator', 'User name is MELD Administrator')
  
  const cookieHeader = loginRes.headers['set-cookie']
  const sessionCookie = Array.isArray(cookieHeader) ? cookieHeader[0].split(';')[0] : cookieHeader?.split(';')[0]
  assert(Boolean(sessionCookie), 'Received session cookie')

  // Also verify legacy username kiiroadmin still authenticates seamlessly
  const legacyLoginRes = await fetchUrl('http://localhost:3000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { username: 'kiiroadmin', password: 'k1rr0@dmin' }
  })
  assert(legacyLoginRes.status === 200, 'Admin login with legacy kiiroadmin also succeeds')

  // 2. Admin Homepage API content
  console.log('\n--- 2. Admin Homepage Content API ---')
  const contentRes = await fetchUrl('http://localhost:3000/api/admin/content?section=homepage', {
    headers: { Cookie: sessionCookie }
  })
  assert(contentRes.status === 200, 'Admin homepage content returns 200')
  const contentJson = JSON.parse(contentRes.text)
  const hp = contentJson.data
  assert(hp && typeof hp === 'object', 'Homepage data object returned')
  assert(!hp.heroSubheading.toLowerCase().includes('put the phone down'), 'Hero subheading does NOT contain rejected paragraph')
  assert(hp.heroSubheading.includes('MELD pairs master artisans with wellness facilitators'), 'Hero subheading has approved MELD text')
  assert(!hp.heroEyebrow.toLowerCase().includes('cultural space'), 'Hero eyebrow does NOT contain cultural space')
  assert(!hp.heroEyebrow.toLowerCase().includes('offline'), 'Hero eyebrow does NOT contain offline')
  assert(hp.heroEyebrow === 'A creative wellness space for making, connecting & restoring', 'Hero eyebrow is approved text')
  assert(hp.heroHeading === 'Root. Create. Restore.', 'Hero heading is Root. Create. Restore.')
  assert(Array.isArray(hp.heroImages) && hp.heroImages.length >= 3, 'Hero images array has 3 craft items')

  // 3. Admin Homepage HTML page inspection
  console.log('\n--- 3. Admin Homepage Page Render ---')
  const adminHpPageRes = await fetchUrl('http://localhost:3000/admin/homepage', {
    headers: { Cookie: sessionCookie }
  })
  assert(adminHpPageRes.status === 200, 'Admin /admin/homepage returns 200')
  assert(!adminHpPageRes.text.includes('5. Why Making Restores'), 'Admin homepage tabs do NOT contain "5. Why Making Restores"')
  assert(!adminHpPageRes.text.includes('Put the phone down and pick up the clay'), 'Admin homepage HTML does NOT contain rejected paragraph')
  assert(!adminHpPageRes.text.includes('A cultural space for making, offline'), 'Admin homepage HTML does NOT contain rejected eyebrow')

  // 4. Admin Events API & Kintsugi location check
  console.log('\n--- 4. Event Records & Kintsugi Location ---')
  const eventsRes = await fetchUrl('http://localhost:3000/api/admin/content?section=events', {
    headers: { Cookie: sessionCookie }
  })
  assert(eventsRes.status === 200, 'Admin events API returns 200')
  const eventsJson = JSON.parse(eventsRes.text)
  const allEvents = eventsJson.data || []
  assert(allEvents.length >= 8, `Found ${allEvents.length} event records`)

  const kintsugiEvent = allEvents.find(e => e.title?.toLowerCase().includes('kintsugi') || e.slug?.toLowerCase().includes('kintsugi'))
  assert(Boolean(kintsugiEvent), 'Kintsugi event found in content store')
  if (kintsugiEvent) {
    assert(kintsugiEvent.venue === 'ITC Fortune', `Kintsugi venue is ITC Fortune (got: ${kintsugiEvent.venue})`)
    assert(kintsugiEvent.city === 'Goa', `Kintsugi city is Goa (got: ${kintsugiEvent.city})`)
    assert(kintsugiEvent.address?.includes('Candolim'), `Kintsugi address contains Candolim (got: ${kintsugiEvent.address})`)
    assert(!kintsugiEvent.city?.toLowerCase().includes('bangalore') && !kintsugiEvent.venue?.toLowerCase().includes('indiranagar'), 'Kintsugi does NOT reference Bangalore or Indiranagar')
  }

  // 5. Media Library API Deduplication check
  console.log('\n--- 5. Media Library Deduplication Check ---')
  const mediaRes = await fetchUrl('http://localhost:3000/api/admin/media', {
    headers: { Cookie: sessionCookie }
  })
  assert(mediaRes.status === 200, 'Media library API returns 200')
  const mediaJson = JSON.parse(mediaRes.text)
  const mediaAssets = mediaJson.assets || []
  assert(mediaAssets.length > 0, `Media library contains ${mediaAssets.length} assets`)
  
  const urlCounts = new Map()
  let hasDuplicateUrl = false
  for (const asset of mediaAssets) {
    const count = (urlCounts.get(asset.url) || 0) + 1
    urlCounts.set(asset.url, count)
    if (count > 1) {
      hasDuplicateUrl = true
      console.error(`Duplicate asset URL found: ${asset.url}`)
    }
  }
  assert(!hasDuplicateUrl, 'Zero duplicate URLs in Media Library')

  // 6. Journal API check
  console.log('\n--- 6. Journal Management API ---')
  const journalRes = await fetchUrl('http://localhost:3000/api/admin/content?section=journal', {
    headers: { Cookie: sessionCookie }
  })
  assert(journalRes.status === 200, 'Journal content API returns 200')
  const journalJson = JSON.parse(journalRes.text)
  const articles = journalJson.data || []
  assert(articles.length >= 3, `Found ${articles.length} journal articles in store`)

  // 7. Site Settings check (CSR default visibility)
  console.log('\n--- 7. Site Settings & CSR Default ---')
  const settingsRes = await fetchUrl('http://localhost:3000/api/admin/content?section=siteSettings', {
    headers: { Cookie: sessionCookie }
  })
  assert(settingsRes.status === 200, 'Site settings API returns 200')
  const settingsJson = JSON.parse(settingsRes.text)
  assert(settingsJson.data.showCsrSection === false, 'showCsrSection default is strictly false')

  console.log(`\n=== RESULTS: ${passed} PASSED | ${failed} FAILED ===`)
  if (failed > 0) process.exit(1)
}

run().catch((err) => {
  console.error('Fatal verification error:', err)
  process.exit(1)
})
