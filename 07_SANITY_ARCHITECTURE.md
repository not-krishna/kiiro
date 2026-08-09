# 07 --- Sanity Architecture

## Objective

Sanity is the **content operating system** for Kiiro.

Next.js owns: - presentation - routing - rendering - interactions -
forms - SEO - performance

Sanity owns: - structured content - media - editorial relationships -
publishing - reusable content - navigation data where appropriate

------------------------------------------------------------------------

# Project structure

Recommended repository:

``` text
kiiro/
├── apps/
│   ├── web/
│   └── studio/
│
├── packages/
│   ├── sanity-schema/
│   ├── ui/
│   └── config/
│
├── docs/
│   └── *.md
│
├── package.json
└── pnpm-workspace.yaml
```

A simpler single-app setup is acceptable for the first implementation,
but the content model should remain independent from the frontend.

------------------------------------------------------------------------

# Dataset strategy

Use:

``` text
production
staging
```

Both are public datasets under the current Free plan.

Production: - approved content - live website

Staging: - testing - draft content - migration tests

Do not store private customer data in either dataset.

------------------------------------------------------------------------

# Sanity Studio

Use a dedicated Studio.

Recommended route:

``` text
studio.kiiroexperiences.com
```

Alternative for a smaller deployment:

``` text
kiiroexperiences.com/studio
```

A standalone Studio is preferred once the content ecosystem becomes
substantial because it keeps editorial tooling independent of the
website.

------------------------------------------------------------------------

# Studio organization

Use Sanity Structure Builder to create logical groups:

``` text
CONTENT
  Artforms
  Artisans
  Experiences
  Events
  Journal

BUSINESS
  Partnerships
  Products
  Learning

COMMUNITY
  Community
  Impact
  Testimonials

SITE
  Homepage
  Navigation
  Site Settings
  Footer
  Locations

SYSTEM
  SEO
  Redirects
```

------------------------------------------------------------------------

# Document vs object types

## Documents

Use documents for independently managed entities:

-   `homePage`
-   `siteSettings`
-   `navigation`
-   `footer`
-   `artform`
-   `artisan`
-   `experience`
-   `event`
-   `journalPost`
-   `testimonial`
-   `partner`
-   `location`
-   `impactStory`
-   `impactStat`
-   `product`
-   `learningPath`
-   `communityPage`
-   `redirect`

## Objects

Use objects for reusable embedded structures:

-   `seo`
-   `imageWithAlt`
-   `galleryItem`
-   `richText`
-   `cta`
-   `link`
-   `faqItem`
-   `socialLink`
-   `experienceFormat`
-   `locationReference`
-   `quote`
-   `contentSection`

Do not turn every sentence into a document.

------------------------------------------------------------------------

# Portable Text

Use Portable Text for editorial content where rich formatting is
required.

Use structured fields for: - titles - summaries - metadata - labels -
dates - relationships

Do not put the entire website into one giant Portable Text field.

------------------------------------------------------------------------

# Relationships

Use references.

Example:

``` text
Artform
  ↓
Artisan[]
  ↓
Experience[]
  ↓
Event[]
  ↓
JournalPost[]
```

Do not duplicate the same content in multiple documents.

------------------------------------------------------------------------

# Slugs

Every public content document that has a public route gets a slug.

Rules: - unique - lowercase - stable - manually editable - validated

------------------------------------------------------------------------

# Publishing

Content flow:

``` text
Draft
  ↓
Editorial review
  ↓
Approved
  ↓
Published
```

For the initial Free-plan workflow, use Sanity's normal draft/publish
model.

Do not create a complicated approval workflow unless the client actually
needs it.

------------------------------------------------------------------------

# Frontend fetching

Use `next-sanity`.

Recommended separation:

``` text
src/sanity/
├── env.ts
├── lib/
│   ├── client.ts
│   ├── image.ts
│   ├── live.ts
│   └── queries/
│       ├── home.ts
│       ├── artforms.ts
│       ├── experiences.ts
│       ├── events.ts
│       ├── journal.ts
│       └── artisans.ts
└── types/
```

Components should not contain raw GROQ strings.

------------------------------------------------------------------------

# GROQ

Use typed query definitions where supported.

Example:

``` ts
export const featuredArtformsQuery = defineQuery(`
  *[
    _type == "artform" &&
    published == true &&
    featured == true
  ]
  | order(order asc)[0...6] {
    _id,
    title,
    "slug": slug.current,
    category,
    shortDescription,
    heroImage
  }
`)
```

Only request fields required by the component.

Do not fetch entire documents when the page only needs five fields.

------------------------------------------------------------------------

# Caching

Use Next.js caching intentionally.

Stable content: - cache aggressively

Events: - use shorter revalidation where necessary

Preview: - Draft Mode / Visual Editing

Avoid making every request fully dynamic.

------------------------------------------------------------------------

# Visual Editing

Visual Editing should be considered for the production editorial
workflow.

The official Sanity + Next.js integration supports: - Presentation
Tool - Draft Mode - live content - click-to-edit overlays

This is useful for Kiiro because the client can see content in the
actual website context.

------------------------------------------------------------------------

# Live content caution

Sanity's current documentation notes a Next.js 16 + SanityLive
request/ISR issue and recommends staying on Next.js 15 with
`next-sanity` v12 until the relevant update is available.

Therefore:

**Initial production baseline:** - Next.js 15 - App Router -
`next-sanity` v12

Re-evaluate this before launch.

Do not upgrade solely because a newer Next.js version exists.

------------------------------------------------------------------------

# Environment variables

Example:

``` env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-01

SANITY_API_READ_TOKEN=
SANITY_REVALIDATE_SECRET=
```

Never commit tokens.

------------------------------------------------------------------------

# Security

Sanity is public content infrastructure here.

Never store: - form submissions - passwords - payment details - API
secrets - private customer records - internal credentials

Use a separate secure service for transactional/private information.
