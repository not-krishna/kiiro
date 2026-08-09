import { defineQuery } from 'next-sanity'

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0] {
    _id,
    title,
    heroEyebrow,
    heroHeading,
    heroSubheading,
    heroPrimaryCta,
    heroSecondaryCta,
    heroImage,
    manifestoTitle,
    manifestoText,
    featuredArtforms[]-> {
      _id,
      title,
      "slug": slug.current,
      category,
      region,
      shortDescription,
      heroImage,
      materials,
      techniques
    },
    artisanFeature {
      heading,
      name,
      craft,
      region,
      quote,
      portrait
    },
    partnershipsTitle,
    featuredJournalPosts[]-> {
      _id,
      title,
      "slug": slug.current,
      standfirst,
      category,
      author,
      publishedAt,
      heroImage
    }
  }
`)

export const ARTFORMS_QUERY = defineQuery(`
  *[_type == "artform" && published == true] | order(title asc)[0...6] {
    _id,
    title,
    "slug": slug.current,
    category,
    region,
    shortDescription,
    heroImage,
    materials,
    techniques
  }
`)

export const EXPERIENCES_QUERY = defineQuery(`
  *[_type == "experience" && published == true] | order(title asc)[0...6] {
    _id,
    title,
    "slug": slug.current,
    experienceType,
    audience,
    shortDescription,
    duration,
    format,
    artforms[]-> {
      _id,
      title
    }
  }
`)

export const ARTISANS_QUERY = defineQuery(`
  *[_type == "artisan" && published == true] | order(name asc)[0...4] {
    _id,
    name,
    "slug": slug.current,
    portrait,
    region,
    bio,
    lineage,
    quote,
    craftReferences[]-> {
      _id,
      title,
      "slug": slug.current
    }
  }
`)

export const JOURNAL_QUERY = defineQuery(`
  *[_type == "journalPost" && published == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    standfirst,
    category,
    author,
    publishedAt,
    heroImage
  }
`)
