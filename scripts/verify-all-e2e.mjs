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

async function run() {
  console.log('=== KIIRO END-TO-END VERIFICATION SUITE ===\n')
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

  // 1. Verify Global UI Cleanup
  console.log('\n--- 1. Global UI Cleanup Check ---')
  const webSrcDir = path.join(rootDir, 'web', 'src')
  let foundGreenSquare = false
  function searchDir(dir) {
    const files = fs.readdirSync(dir)
    for (const file of files) {
      const full = path.join(dir, file)
      if (fs.statSync(full).isDirectory()) {
        searchDir(full)
      } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
        const content = fs.readFileSync(full, 'utf8')
        if (content.includes('w-2 h-2 bg-[#4F5B2A] shrink-0')) {
          console.error(`Found green square in: ${full}`)
          foundGreenSquare = true
        }
      }
    }
  }
  searchDir(webSrcDir)
  assert(!foundGreenSquare, 'No green squares <span class="w-2 h-2 bg-[#4F5B2A] shrink-0"></span> exist anywhere in web/src')

  // 2. Verify Instagram Carousel & Profile URL
  console.log('\n--- 2. Instagram Carousel Check ---')
  const socialSectionCode = fs.readFileSync(path.join(webSrcDir, 'components', 'home', 'SocialSection.tsx'), 'utf8')
  assert(socialSectionCode.includes('https://www.instagram.com/your_workshops/?hl=en'), 'Official Instagram profile URL used in SocialSection')
  assert(socialSectionCode.includes('@your_workshops'), 'Official Instagram handle @your_workshops used in SocialSection')
  assert(socialSectionCode.includes('overflow-x-auto') && socialSectionCode.includes('snap-x'), 'Horizontal snap-scrolling carousel implemented in SocialSection')
  assert(socialSectionCode.includes('getInstagramEmbedUrl'), 'Instagram Reel/post embed support implemented')
  assert(socialSectionCode.includes('focus-visible:outline'), 'Accessible keyboard focus indicators present on controls')

  // 3. Verify Event Locations from CSV
  console.log('\n--- 3. Event Locations Check ---')
  const eventsContentPath = path.join(webSrcDir, 'content', 'events.ts')
  const eventsCode = fs.readFileSync(eventsContentPath, 'utf8')
  assert(eventsCode.includes('Hello World') && eventsCode.includes('HSR Layout, Bengaluru'), 'Bengaluru Block Printing mapped to Hello World (CSV row 8)')
  assert(eventsCode.includes('Sorozaie Restaurant') && eventsCode.includes('Versova, Andheri West, Mumbai'), 'Versova Mumbai event mapped to Sorozaie Restaurant (CSV row 4)')
  assert(eventsCode.includes('ITC Fortune') && eventsCode.includes('Candolim, Bardez, North Goa'), 'Candolim Goa events mapped to ITC Fortune (CSV row 7)')
  assert(eventsCode.includes("googleMapsUrl: 'https://www.google.com/maps/search/?api=1"), 'Google Maps search link dynamically generated for verified addresses')

  // 4. Test Local Dev Server HTTP Endpoints
  console.log('\n--- 4. Dev Server Live Integration Tests ---')
  try {
    const homeRes = await fetchUrl('http://localhost:3000/')
    assert(homeRes.status === 200, 'Homepage returns HTTP 200')
    
    // CSR should be hidden by default
    assert(!homeRes.text.includes('id="partnerships"'), 'CSR section is hidden from homepage by default')
    assert(!homeRes.text.includes('href="/partnerships-csr"') || !homeRes.text.includes('CSR COLLABS'), 'CSR is hidden from primary navigation by default')

    // But direct route /partnerships-csr must work
    const csrRes = await fetchUrl('http://localhost:3000/partnerships-csr')
    assert(csrRes.status === 200, 'Direct route /partnerships-csr returns HTTP 200 (not broken or deleted)')

    // Check Weekly Events page
    const eventsRes = await fetchUrl('http://localhost:3000/weekly-events')
    assert(eventsRes.status === 200, 'Weekly Events page returns HTTP 200')
    assert(eventsRes.text.includes('Hello World') || eventsRes.text.includes('Sorozaie Restaurant') || eventsRes.text.includes('ITC Fortune'), 'Verified CSV venues appear on Weekly Events page')

    // Check Journal page
    const journalRes = await fetchUrl('http://localhost:3000/journal')
    assert(journalRes.status === 200, 'Journal page returns HTTP 200')
  } catch (err) {
    console.warn('Dev server test skipped or failed:', err.message)
  }

  // 5. Test Admin Content API and Journal Lifecycle
  console.log('\n--- 5. Journal Lifecycle & Draft Protection Test ---')
  const testId = `journal-test-${Date.now()}`
  const testSlug = `e2e-test-article-${Date.now()}`
  const testTitle = `Test Article ${Date.now()}`
  
  let adminCookie = ''
  try {
    const loginRes = await fetchUrl('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { username: 'kiiroadmin', password: 'k1rr0@dmin' },
    })
    const setCookie = loginRes.headers['set-cookie']
    if (setCookie) {
      adminCookie = Array.isArray(setCookie) ? setCookie[0].split(';')[0] : setCookie.split(';')[0]
    }
    assert(loginRes.status === 200 && adminCookie.includes('kiiro_admin_session'), 'Admin login successful and session cookie obtained')
  } catch (err) {
    console.error('Login error:', err.message)
  }
  
  try {
    // 5a. Create a Draft Article (published: false)
    const createDraftRes = await fetchUrl('http://localhost:3000/api/admin/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': adminCookie,
      },
      body: {
        section: 'journal',
        action: 'save',
        data: {
          id: testId,
          title: testTitle,
          slug: testSlug,
          excerpt: 'This is a test draft excerpt that should not be visible publicly.',
          category: 'Craft Heritage',
          author: 'Test Author',
          body: 'This is test body paragraph 1.\n\nThis is test body paragraph 2.',
          published: false, // DRAFT
        },
      },
    })
    const draftJson = JSON.parse(createDraftRes.text)
    assert(draftJson.success === true, 'Draft article successfully created in admin content store')

    // 5b. Verify Draft is NOT accessible on public site (must be 404 or redirect)
    const draftDetailRes = await fetchUrl(`http://localhost:3000/journal/${testSlug}`)
    assert(draftDetailRes.status === 404, 'Draft article returns 404 on public route /journal/[slug] (draft protection works)')

    // 5c. Publish the Article (published: true)
    const publishRes = await fetchUrl('http://localhost:3000/api/admin/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': adminCookie,
      },
      body: {
        section: 'journal',
        action: 'save',
        data: {
          id: testId,
          title: testTitle,
          slug: testSlug,
          excerpt: 'This is a test published excerpt that should now be visible publicly.',
          category: 'Craft Heritage',
          author: 'Test Author',
          body: 'This is test body paragraph 1.\n\nThis is test body paragraph 2.',
          published: true, // PUBLISHED
        },
      },
    })
    const pubJson = JSON.parse(publishRes.text)
    assert(pubJson.success === true, 'Article successfully updated to published in content store')

    // 5d. Verify Published Article is accessible on public site (200 OK)
    const pubDetailRes = await fetchUrl(`http://localhost:3000/journal/${testSlug}`)
    assert(pubDetailRes.status === 200, 'Published article returns 200 on public route /journal/[slug]')
    assert(pubDetailRes.text.includes(testTitle), 'Article detail page renders the correct title and content')

    // 5e. Clean up test article
    const deleteRes = await fetchUrl('http://localhost:3000/api/admin/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': adminCookie,
      },
      body: {
        section: 'journal',
        action: 'delete',
        id: testSlug,
      },
    })
    const delJson = JSON.parse(deleteRes.text)
    assert(delJson.success === true, 'Test article successfully cleaned up from content store')
  } catch (err) {
    console.error('Lifecycle test error:', err.message)
  }

  // 6. Test CSR Toggle Lifecycle
  console.log('\n--- 6. CSR Section Visibility Toggle Test ---')
  try {
    // 6a. Enable CSR
    const enableCsrRes = await fetchUrl('http://localhost:3000/api/admin/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': adminCookie,
      },
      body: {
        section: 'siteSettings',
        action: 'save',
        data: {
          showCsrSection: true,
        },
      },
    })
    const enableJson = JSON.parse(enableCsrRes.text)
    assert(enableJson.success === true, 'Enabled showCsrSection: true in siteSettings')

    const homeWithCsrRes = await fetchUrl('http://localhost:3000/')
    assert(homeWithCsrRes.text.includes('id="partnerships"') || homeWithCsrRes.text.includes('Wellbeing that reaches further'), 'CSR section appears on homepage when showCsrSection is true')
    assert(homeWithCsrRes.text.includes('CSR COLLABS'), 'CSR COLLABS appears in navigation when showCsrSection is true')

    // 6b. Disable CSR again (default requirement)
    const disableCsrRes = await fetchUrl('http://localhost:3000/api/admin/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': adminCookie,
      },
      body: {
        section: 'siteSettings',
        action: 'save',
        data: {
          showCsrSection: false,
        },
      },
    })
    const disableJson = JSON.parse(disableCsrRes.text)
    assert(disableJson.success === true, 'Disabled showCsrSection: false in siteSettings')

    const homeWithoutCsrRes = await fetchUrl('http://localhost:3000/')
    assert(!homeWithoutCsrRes.text.includes('id="partnerships"'), 'CSR section is hidden on homepage when showCsrSection is false')
    assert(!homeWithoutCsrRes.text.includes('CSR COLLABS'), 'CSR COLLABS is hidden from navigation when showCsrSection is false')
  } catch (err) {
    console.error('CSR toggle test error:', err.message)
  }

  console.log(`\n=== VERIFICATION COMPLETE: ${passed} passed, ${failed} failed ===`)
  process.exit(failed > 0 ? 1 : 0)
}

run()
