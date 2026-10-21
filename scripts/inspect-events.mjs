const query = encodeURIComponent('*[_type == "event"]{ _id, title, "slug": slug.current, city, venue, address, googleMapsUrl, "workshopSlug": workshop->slug.current, isWeekly }')
const url = `https://s47moswb.api.sanity.io/v2026-01-01/data/query/production?query=${query}`

async function run() {
  const res = await fetch(url)
  const json = await res.json()
  console.log('Sanity Events count:', json.result?.length)
  console.log(JSON.stringify(json.result, null, 2))
}

run()
