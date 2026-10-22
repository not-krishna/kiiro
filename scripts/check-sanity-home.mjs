import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 's47moswb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skYUSJS8xBvsKLBi5Bp6uAzzV0sfgzwl2jeqTyxMt0EFzcohrcu4Xkc8vAiMhWdtFGgBoEKe6LmVRk2R7AHFSvYNuj0UauhmC7aHrthXkF8gyyczrPPK1gcNuMUqzsc31XoufPxx9jpsfAE0LZ45mSSMZkmuvzNQM5dG2olPgz8AUxS9zYF0'
})

async function main() {
  const home = await client.fetch('*[_type == "homePage"]')
  console.log('Sanity homePage count:', home.length)
  for (const h of home) {
    console.log('ID:', h._id)
    console.log('heroEyebrow:', h.heroEyebrow)
    console.log('heroHeading:', h.heroHeading)
    console.log('heroSubheading:', h.heroSubheading)
    console.log('heroImages:', h.heroImages)
  }
}

main().catch(console.error)
