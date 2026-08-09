# 12 --- SEO, Accessibility & Performance

## SEO

Every public page needs:

-   unique title
-   meta description
-   canonical
-   H1
-   meaningful H2/H3 hierarchy
-   OG image
-   indexability decision
-   internal links

------------------------------------------------------------------------

# Cultural SEO

Search content should be useful, not exploitative.

For an artform page, useful metadata may include: - craft name -
region - artform category - technique - experience connection

Do not stuff:
`Indian traditional art Indian handicraft cultural workshop best India craft`

Use natural language.

------------------------------------------------------------------------

# Structured data

Use: - Organization - Article - Event - BreadcrumbList

Only when appropriate.

------------------------------------------------------------------------

# Accessibility

Target WCAG 2.2 AA.

Required: - semantic HTML - keyboard navigation - visible focus -
labels - accessible buttons - accessible dialogs - accessible menus -
alt text - captions where needed - sufficient contrast - reduced motion

------------------------------------------------------------------------

# Performance targets

The website is image-heavy, so image performance is a priority.

Targets:

-   avoid layout shift
-   optimized hero image
-   responsive image sizes
-   lazy-load below-fold images
-   minimal client JavaScript
-   avoid unnecessary third-party embeds
-   avoid loading all galleries at once

------------------------------------------------------------------------

# JavaScript rule

If a section does not require interaction, it should not become a client
component.

Prefer:

``` text
Server Component
```

over:

``` text
"use client"
```

------------------------------------------------------------------------

# Font strategy

Use: - limited font families - limited weights - font-display - no
unnecessary font files

------------------------------------------------------------------------

# Motion accessibility

When reduced motion is requested: - remove parallax - remove large
transforms - remove auto-advancing carousels - simplify reveals

Content must remain fully accessible.

------------------------------------------------------------------------

# Image alt rules

Bad:

`image1.jpg`

Good:

`Artisan shaping wet clay on a pottery wheel during a Kiiro workshop`

But do not over-describe decorative images.

Decorative: `alt=""`

------------------------------------------------------------------------

# Core Web Vitals

Monitor: - LCP - CLS - INP

Especially optimize: - hero media - fonts - navigation - third-party
scripts

------------------------------------------------------------------------

# Search engine migration

The current site is Wix-based.

Before launch: 1. crawl current URLs 2. export important URLs 3. map old
→ new 4. create redirects 5. submit new sitemap 6. verify canonical tags
7. check 404s
