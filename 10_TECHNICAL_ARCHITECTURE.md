# 10 --- Full Technical Architecture

## System overview

``` text
                 ┌─────────────────────┐
                 │     Sanity Studio   │
                 │  Editorial Interface│
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   Sanity Content    │
                 │       Lake          │
                 └──────────┬──────────┘
                            │ GROQ
                            ▼
┌──────────────┐    ┌─────────────────────┐
│ Visitor      │───▶│ Next.js App Router │
│ Browser      │    │ Server Components  │
└──────────────┘    └──────────┬──────────┘
                               │
             ┌─────────────────┼──────────────────┐
             ▼                 ▼                  ▼
       Sanity Images      Form Endpoint       Analytics
             │                 │                  │
             ▼                 ▼                  ▼
          CDN/Next       Email/CRM/etc.      Approved tool
```

------------------------------------------------------------------------

# Repository

Recommended monorepo:

``` text
/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── features/
│   │   │   ├── sanity/
│   │   │   ├── lib/
│   │   │   └── styles/
│   │   └── public/
│   │
│   └── studio/
│       ├── schemaTypes/
│       ├── components/
│       ├── structure/
│       └── sanity.config.ts
│
├── packages/
│   ├── ui/
│   └── config/
│
├── docs/
├── package.json
└── pnpm-workspace.yaml
```

For a smaller first release, the Studio can live inside the main
repository without a full workspace split.

------------------------------------------------------------------------

# Next.js application

Use App Router.

Recommended baseline while the current SanityLive/Next.js 16 issue is
being resolved:

-   Next.js 15
-   React version compatible with the selected Next.js release
-   TypeScript
-   `next-sanity` v12

Re-evaluate before production launch.

------------------------------------------------------------------------

# Rendering strategy

## Static/editorial

Use static/cached rendering for: - About - Artforms - Artisan profiles -
Journal - evergreen Experiences

## Semi-dynamic

Use shorter cache/revalidation for: - Events - featured content -
homepage

## Draft/preview

Use: - Draft Mode - Sanity Presentation Tool - Visual Editing

------------------------------------------------------------------------

# Data access

Do not:

``` tsx
const data = await client.fetch(...)
```

inside every component.

Instead:

``` text
page
 ↓
feature query
 ↓
data mapper
 ↓
component
```

Example:

``` text
app/artforms/[slug]/page.tsx
        ↓
sanity/queries/artform.ts
        ↓
ArtformPageData
        ↓
ArtformTemplate
```

------------------------------------------------------------------------

# Feature architecture

``` text
features/
├── home/
├── artforms/
├── artisans/
├── experiences/
├── events/
├── journal/
├── partnerships/
├── community/
└── enquiry/
```

A feature owns: - query - types - mapper - page-specific components

------------------------------------------------------------------------

# UI architecture

``` text
components/
├── layout/
├── typography/
├── media/
├── navigation/
├── cards/
├── sections/
├── forms/
└── feedback/
```

Avoid a giant `components/index.ts` that becomes impossible to
understand.

------------------------------------------------------------------------

# Sanity integration

Use:

``` text
src/sanity/
├── env.ts
├── client.ts
├── image.ts
├── live.ts
├── queries/
├── mutations/
└── types/
```

Frontend components should receive typed data.

------------------------------------------------------------------------

# Images

All Sanity images must use the Sanity image URL builder.

Required: - width - quality - format - crop/focal point where
appropriate

Example strategy:

``` text
Hero desktop → large AVIF/WebP
Hero mobile → mobile-specific crop
Card → smaller derivative
Thumbnail → small derivative
```

Never download a 5000px image into a 400px card.

------------------------------------------------------------------------

# Video

Hero video: - muted - autoplay only where appropriate - loop - poster -
mobile fallback - compressed - no blocking playback

If the video is not necessary for understanding, prefer a strong still
image.

------------------------------------------------------------------------

# Forms

Use:

``` text
Server Action / Route Handler
        ↓
Zod validation
        ↓
Rate limiting / anti-spam
        ↓
Email / CRM / approved destination
```

Store no sensitive form data in Sanity.

------------------------------------------------------------------------

# SEO

Use Next.js Metadata API.

Every content type should map: - title - description - OG image -
canonical - robots policy

Generate: - sitemap - robots - structured data

------------------------------------------------------------------------

# Structured data

Potential types: - Organization - Event - Article - BreadcrumbList

Only emit structured data when the page genuinely represents that
entity.

------------------------------------------------------------------------

# Analytics

Track:

``` text
experience_cta
event_view
event_enquiry
corporate_enquiry_start
corporate_enquiry_submit
general_enquiry_start
general_enquiry_submit
newsletter_signup
whatsapp_click
instagram_click
journal_article_open
```

Do not track sensitive form values.

------------------------------------------------------------------------

# Error handling

Implement: - global error boundary - route-level not-found - query
failure state - form failure - image fallback

Never expose stack traces to visitors.

------------------------------------------------------------------------

# Environment separation

Development: `staging`

Production: `production`

Environment variables determine dataset.

------------------------------------------------------------------------

# Deployment

Frontend: - Vercel recommended

Studio: - Sanity hosted Studio or separate deployment

Domain example:

``` text
kiiroexperiences.com
www.kiiroexperiences.com
studio.kiiroexperiences.com
```

Actual DNS/deployment decisions require client approval.

------------------------------------------------------------------------

# Backups / recovery

Sanity is the source of content.

Maintain: - schema in Git - content migration scripts where necessary -
redirects in Git/CMS - asset naming conventions - documented production
dataset

Do not treat the Studio UI as the only copy of the content model.

------------------------------------------------------------------------

# No unnecessary infrastructure

Do not introduce: - Firebase - Supabase - PostgreSQL - Redis -
Elasticsearch - Algolia - custom CMS

unless a concrete requirement justifies it.

Sanity + Next.js is sufficient for the initial website.
