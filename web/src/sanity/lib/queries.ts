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

export const ALL_ARTFORMS_QUERY = defineQuery(`
  *[_type == "artform" && published == true] | order(title asc) {
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

export const ARTFORM_BY_SLUG_QUERY = defineQuery(`
  *[_type == "artform" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    region,
    shortDescription,
    heroImage,
    introduction,
    materials,
    techniques,
    "artisans": *[_type == "artisan" && references(^._id)] {
      _id,
      name,
      "slug": slug.current,
      region,
      portrait,
      quote
    },
    "relatedExperiences": *[_type == "experience" && references(^._id)] {
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      duration,
      format
    }
  }
`)

export const ALL_EXPERIENCES_QUERY = defineQuery(`
  *[_type == "experience" && published == true] | order(title asc) {
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
      title,
      "slug": slug.current
    }
  }
`)

export const EXPERIENCE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "experience" && slug.current == $slug][0] {
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
      title,
      "slug": slug.current,
      region
    },
    artisans[]-> {
      _id,
      name,
      "slug": slug.current,
      region,
      portrait,
      lineage
    }
  }
`)

export const ALL_EVENTS_QUERY = defineQuery(`
  *[_type == "event" && published == true] | order(date asc) {
    _id,
    title,
    "slug": slug.current,
    date,
    startTime,
    city,
    venue,
    price,
    capacity,
    bookingStatus,
    experienceReference-> {
      _id,
      title,
      "slug": slug.current
    }
  }
`)

export const EVENT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    date,
    startTime,
    city,
    venue,
    price,
    capacity,
    bookingStatus,
    experienceReference-> {
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      duration,
      artforms[]-> {
        _id,
        title,
        "slug": slug.current
      }
    }
  }
`)

export const ALL_ARTISANS_QUERY = defineQuery(`
  *[_type == "artisan" && published == true] | order(name asc) {
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

export const ARTISAN_BY_SLUG_QUERY = defineQuery(`
  *[_type == "artisan" && slug.current == $slug][0] {
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
      "slug": slug.current,
      shortDescription,
      heroImage
    },
    "hostedExperiences": *[_type == "experience" && references(^._id)] {
      _id,
      title,
      "slug": slug.current,
      duration,
      format
    }
  }
`)

export const ALL_JOURNAL_POSTS_QUERY = defineQuery(`
  *[_type == "journalPost" && published == true] | order(publishedAt desc) {
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

export const JOURNAL_POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "journalPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    standfirst,
    category,
    author,
    publishedAt,
    heroImage,
    body,
    artforms[]-> {
      _id,
      title,
      "slug": slug.current
    },
    artisans[]-> {
      _id,
      name,
      "slug": slug.current,
      portrait
    }
  }
`)

export const ARTFORMS_QUERY = ALL_ARTFORMS_QUERY
export const EXPERIENCES_QUERY = ALL_EXPERIENCES_QUERY
export const ARTISANS_QUERY = ALL_ARTISANS_QUERY
export const JOURNAL_QUERY = ALL_JOURNAL_POSTS_QUERY

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(featured desc, _createdAt desc) {
    _id,
    quote,
    personName,
    role,
    organisation,
    portrait,
    isVideo,
    videoUrl,
    videoThumbnail
  }
`)

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0] {
    _id,
    title,
    heroHeading,
    heroSubheading,
    visionTitle,
    visionText,
    stats,
    timeline
  }
`)

export const COMMUNITY_PAGE_QUERY = defineQuery(`
  *[_type == "communityPage"][0] {
    _id,
    title,
    heroHeading,
    heroSubheading,
    values,
    memberQuote,
    memberQuoteAuthor
  }
`)

export const IMPACT_PAGE_QUERY = defineQuery(`
  *[_type == "impactPage"][0] {
    _id,
    title,
    heroHeading,
    heroSubheading,
    keyMetrics,
    pillars
  }
`)

export const LEARNING_PAGE_QUERY = defineQuery(`
  *[_type == "learningPage"][0] {
    _id,
    title,
    heroHeading,
    heroSubheading,
    methodologies,
    audienceTypes
  }
`)

export const PARTNERSHIPS_CSR_PAGE_QUERY = defineQuery(`
  *[_type == "partnershipsCsrPage"][0] {
    _id,
    title,
    heroHeading,
    heroSubheading,
    models,
    downloadBrochureCta
  }
`)

export const PRODUCTS_PAGE_QUERY = defineQuery(`
  *[_type == "productsPage"][0] {
    _id,
    title,
    heroHeading,
    heroSubheading,
    categories
  }
`)

export const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && published == true] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    price,
    currency,
    shortDescription,
    image,
    category,
    artform-> {
      _id,
      title,
      "slug": slug.current
    },
    artisan-> {
      _id,
      name,
      "slug": slug.current
    },
    inStock
  }
`)

export const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    price,
    currency,
    shortDescription,
    image,
    category,
    artform-> {
      _id,
      title,
      "slug": slug.current
    },
    artisan-> {
      _id,
      name,
      "slug": slug.current
    },
    inStock
  }
`)

export const LOCATIONS_QUERY = defineQuery(`
  *[_type == "location"] | order(city asc) {
    _id,
    city,
    state,
    venueName,
    address,
    mapsLink,
    image,
    isHub
  }
`)

export const PRESS_COVERAGES_QUERY = defineQuery(`
  *[_type == "pressCoverage"] | order(publishedDate desc) {
    _id,
    title,
    publicationName,
    publicationLogo,
    publishedDate,
    articleUrl,
    summary,
    featured
  }
`)

export const PARTNERSHIPS_QUERY = defineQuery(`
  *[_type == "partnership"] | order(partnerName asc) {
    _id,
    partnerName,
    logo,
    partnershipType,
    websiteUrl,
    summary
  }
`)

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    _id,
    siteTitle,
    tagline,
    contactEmail,
    contactPhone,
    address,
    socialLinks,
    footerTagline
  }
`)
