# Kiiro Website Redesign --- Project Operating System

## Purpose

This specification pack is the working contract for the Kiiro website
redesign.

The objective is **not** to generate a generic "Indian culture" website,
a wellness landing page, or an AI-generated visual showcase.

The objective is to build a **credible cultural platform** for Kiiro
that makes living craft traditions, artisans, experiences, learning,
community, and impact feel contemporary without flattening their
cultural identity.

The frontend should feel editorial, tactile, cinematic, human, and
premium.

The CMS should make the website maintainable by non-developers.

The architecture should scale to a 35+ page ecosystem without creating
35 independent page implementations.

------------------------------------------------------------------------

## Source hierarchy

When making a decision, use this order:

1.  Client-approved content and assets.
2.  The supplied Kiiro website brief/deck.
3.  The supplied current Kiiro website export.
4.  This specification pack.
5.  Technical best practice.

If two sources conflict, **do not silently invent a resolution**. Mark
the conflict as a TODO/decision and ask for approval.

------------------------------------------------------------------------

## Primary stack

### Frontend

-   Next.js App Router
-   TypeScript
-   React
-   Tailwind CSS + project-specific CSS where useful
-   Server Components by default
-   Client Components only for interaction

### CMS

-   Sanity
-   Sanity Studio
-   GROQ
-   `next-sanity`

### Hosting

-   Vercel or equivalent Next.js-compatible host

### Media

-   Sanity image assets for editorial imagery
-   Next.js image optimization
-   CDN delivery

### Forms

Sanity is **not** the transactional form database.

Use a server-side form endpoint and connect it to the client's approved
destination: - email - CRM - database - WhatsApp handoff - or another
approved service

Do not expose secrets in browser code.

------------------------------------------------------------------------

## Sanity plan assumption

The initial implementation targets Sanity's current Free plan.

At the time of this specification: - Free is \$0 - up to 20 seats - 2
public datasets - unlimited content types/locales - hosted real-time
content database - live previews/visual editing - no overage billing on
Free projects

This plan is suitable for a public content-driven website, but quotas
must be monitored.

**Important:** the Free plan's datasets are public. Never place secrets,
private customer information, internal credentials, payment data, or
sensitive operational data in Sanity.

Recommended datasets: - `production` - `staging`

Do not create unnecessary datasets.

------------------------------------------------------------------------

## Core product model

Kiiro is not simply selling "workshops."

The website must communicate a connected ecosystem:

**Living Culture → Artisan → Knowledge → Experience → Participant →
Community → Impact**

The site should make it possible to move naturally between these
entities.

Example:

`Warli` → `Warli artisan` → `Warli workshop` → `Upcoming event` →
`Related journal story` → `Creative Wellness Circle`

This relationship model is more important than having many decorative
pages.

------------------------------------------------------------------------

## What we are building

### Primary journeys

#### Visitor interested in an experience

Home → Experiences → Audience → Experience → Event/Enquiry

#### Visitor interested in culture

Home → Artforms → Artform → Heritage → Artisan → Related experiences

#### Corporate decision-maker

Home → Corporate → Program formats → Proof → Partnership enquiry

#### School/college decision-maker

Home → Schools & Colleges → Educational programs → Learning outcomes →
Enquiry

#### CSR/impact partner

Home → Partnerships & CSR → Capacity building → Artisan ecosystem →
Impact → Enquiry

#### Culture enthusiast

Home → Artforms → Journal → Community → Events

------------------------------------------------------------------------

## Non-negotiable quality bar

The website must not look like:

-   AI-generated Indian motifs pasted everywhere
-   generic wellness branding
-   a template marketplace
-   a SaaS dashboard
-   a travel website
-   an ecommerce theme
-   a gallery of disconnected cards
-   "heritage" reduced to sepia filters
-   decorative mandalas with no cultural reason
-   excessive rounded cards
-   excessive gradients
-   stock-photo-heavy storytelling
-   invented artisan stories
-   invented cultural claims
-   invented testimonials
-   invented statistics

The design must communicate **real people, real materials, real places,
real processes, and real knowledge**.

------------------------------------------------------------------------

## First build sequence

Do not ask an agent to build the entire website in one pass.

### Phase 01 --- Foundation

-   repository audit
-   Next.js setup
-   Sanity setup
-   environment variables
-   design tokens
-   typography
-   image handling
-   global CSS
-   layout shell

### Phase 02 --- Navigation

-   desktop header
-   mobile drawer
-   dropdowns
-   CTA
-   footer
-   responsive behavior

### Phase 03 --- Homepage

Build the complete homepage using CMS-driven content.

### Phase 04 --- Content system

Build: - Artform template - Artisan template - Experience template -
Event template - Journal template

### Phase 05 --- Business routes

Build: - Corporate - Schools & Colleges - Hospitality & Luxury -
Online - Partnerships & CSR - Capacity Building - Gifting - Needs
Ideation

### Phase 06 --- Community / ecosystem

Build: - Community - Creative Wellness Circle - Impact - Learning -
Certificates - Products

### Phase 07 --- Production

-   SEO
-   accessibility
-   performance
-   analytics
-   redirects
-   forms
-   monitoring
-   QA

------------------------------------------------------------------------

## Agent instruction

Before changing code:

1.  Read all `.md` files in this pack.
2.  Inspect the current repository.
3.  Inspect existing assets.
4.  Identify what is missing.
5.  Produce a plan.
6.  Wait for implementation approval if the task is architectural.
7.  Implement in small verifiable phases.
8.  Run the production build after meaningful changes.

Do not fabricate missing Kiiro content.
