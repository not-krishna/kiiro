const SANITY_WRITE_TOKEN = 'skYUSJS8xBvsKLBi5Bp6uAzzV0sfgzwl2jeqTyxMt0EFzcohrcu4Xkc8vAiMhWdtFGgBoEKe6LmVRk2R7AHFSvYNuj0UauhmC7aHrthXkF8gyyczrPPK1gcNuMUqzsc31XoufPxx9jpsfAE0LZ45mSSMZkmuvzNQM5dG2olPgz8AUxS9zYF0'
const url = 'https://s47moswb.api.sanity.io/v2026-01-01/data/mutate/production'

const mutations = [
  {
    patch: {
      id: 'event-bagru-block-printing-bangalore',
      set: {
        city: 'Bengaluru',
        venue: 'Hello World',
        address: '20/B, 18th B Main Road, Sector 3, HSR Layout, Bengaluru, Karnataka 560102',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hello+World,+20%2FB,+18th+B+Main+Road,+Sector+3,+HSR+Layout,+Bengaluru,+Karnataka+560102',
      },
    },
  },
  {
    patch: {
      id: 'event-kolhapuri-chappal-making-mumbai',
      set: {
        city: 'Mumbai',
        venue: 'Sorozaie Restaurant',
        address: 'Shop No. 1, Aaram Nagar Part 1, Seven Bungalows, JP Road, Versova, Andheri West, Mumbai, Maharashtra 400061',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sorozaie+Restaurant,+Shop+No.+1,+Aaram+Nagar+Part+1,+Seven+Bungalows,+JP+Road,+Versova,+Andheri+West,+Mumbai,+Maharashtra+400061',
      },
    },
  },
  {
    patch: {
      id: 'event-portuguese-azulejo-tile-painting-goa',
      set: {
        city: 'Goa',
        venue: 'ITC Fortune',
        address: 'Bamon Vaddo, Candolim, Bardez, North Goa, 403515 / 403516',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=ITC+Fortune,+Bamon+Vaddo,+Candolim,+Bardez,+North+Goa,+403515',
      },
    },
  },
  {
    patch: {
      id: 'event-kintsugi-golden-repair-goa',
      set: {
        city: 'Goa',
        venue: 'ITC Fortune',
        address: 'Bamon Vaddo, Candolim, Bardez, North Goa, 403515 / 403516',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=ITC+Fortune,+Bamon+Vaddo,+Candolim,+Bardez,+North+Goa,+403515',
      },
    },
  },
  {
    patch: {
      id: 'event-kaavi-architectural-fresco-goa',
      set: {
        city: 'Goa',
        venue: 'ITC Fortune',
        address: 'Bamon Vaddo, Candolim, Bardez, North Goa, 403515 / 403516',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=ITC+Fortune,+Bamon+Vaddo,+Candolim,+Bardez,+North+Goa,+403515',
      },
    },
  },
]

async function run() {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  })
  const json = await res.json()
  console.log('Sanity mutation result:', json)
}

run()
