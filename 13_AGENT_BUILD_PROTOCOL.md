# 13 --- Antigravity / Codes Build Protocol

## Mandatory reading

Before coding, read:

``` text
00_START_HERE.md
01_SOURCE_OF_TRUTH.md
02_INFORMATION_ARCHITECTURE.md
03_HOMEPAGE_SPEC.md
04_PAGE_SYSTEM.md
05_DESIGN_SYSTEM.md
06_COMPONENTS_AND_INTERACTIONS.md
07_SANITY_ARCHITECTURE.md
08_CONTENT_MODEL.md
09_CONTENT_EDITORIAL_RULES.md
10_TECHNICAL_ARCHITECTURE.md
11_CMS_CONTENT_OPERATIONS.md
12_SEO_ACCESSIBILITY_PERFORMANCE.md
14_ACCEPTANCE_TESTS.md
```

------------------------------------------------------------------------

# Phase 0 --- Audit

Do not change code.

Inspect: - repository - package.json - routes - assets - existing
components - current styling - environment - deployment config

Return: - current architecture - reusable code - technical debt -
missing requirements - proposed architecture

------------------------------------------------------------------------

# Phase 1 --- Foundation

Implement: - Next.js structure - Sanity connection - environment
config - design tokens - typography - global CSS - image system - base
layout

Test: - dev - production build - mobile - desktop

------------------------------------------------------------------------

# Phase 2 --- Studio

Implement: - project config - schemas - structure - singleton
documents - validation - previews - image handling

Create sample content only if clearly labelled as seed/demo content.

------------------------------------------------------------------------

# Phase 3 --- Site shell

Implement: - header - nav - mobile menu - search - footer

Do not build the homepage until shell is stable.

------------------------------------------------------------------------

# Phase 4 --- Homepage

Build exactly according to `03_HOMEPAGE_SPEC.md`.

Every dynamic section must use Sanity.

------------------------------------------------------------------------

# Phase 5 --- Templates

Build: - artform - artisan - experience - event - journal

Test each with multiple data records.

------------------------------------------------------------------------

# Phase 6 --- Business pages

Build: - corporate - schools - hospitality - online - partnerships -
CSR - gifting - needs ideation

------------------------------------------------------------------------

# Phase 7 --- Ecosystem

Build: - impact - community - learning - products

------------------------------------------------------------------------

# Phase 8 --- Production

Implement: - SEO - redirects - analytics - forms - performance -
accessibility - error handling

------------------------------------------------------------------------

# Agent behaviour

## Do

-   inspect before editing
-   reuse components
-   use TypeScript
-   use semantic HTML
-   use Sanity references
-   keep queries separate
-   keep content out of components
-   test responsive behavior
-   run builds
-   remove unused dependencies

## Do not

-   invent content
-   invent cultural history
-   invent artisan identities
-   invent client logos
-   invent testimonials
-   invent events
-   invent pricing
-   use generic AI visuals as documentary material
-   create fake CMS data that appears real
-   add random gradients
-   add decorative Indian motifs
-   add unnecessary dependencies
-   rebuild working code without reason

------------------------------------------------------------------------

# Visual review gate

After every major section, ask:

### Content

Does it communicate something real?

### Culture

Is the cultural representation specific rather than generic?

### Design

Does the composition feel editorial?

### UX

Is the next action obvious?

### Performance

Is the media reasonable?

### Accessibility

Can it be used without a mouse?

------------------------------------------------------------------------

# Before saying "done"

Run:

``` bash
pnpm lint
pnpm typecheck
pnpm build
```

If available:

``` bash
pnpm test
```

Then manually test: - 375px mobile - 768px tablet - 1440px desktop -
keyboard - reduced motion - slow network
