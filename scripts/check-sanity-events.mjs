import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 's47moswb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skYUSJS8xBvsKLBi5Bp6uAzzV0sfgzwl2jeqTyxMt0EFzcohrcu4Xkc8vAiMhWdtFGgBoEKe6LmVRk2R7AHFSvYNuj0UauhmC7aHrthXkF8gyyczrPPK1gcNuMUqzsc31XoufPxx9jpsfAE0LZ45mSSMZkmuvzNQM5dG2olPgz8AUxS9zYF0'
})

async function main() {
  const events = await client.fetch('*[_type == "event"]{_id, title, "slug": slug.current, city, venue, address}')
  console.log('Sanity events found:', events.length)
  for (const e of events) {
    console.log(`- [${e._id}] "${e.title}" | City: ${e.city} | Venue: ${e.venue} | Addr: ${e.address}`)
  }
}

main().catch(console.error)
