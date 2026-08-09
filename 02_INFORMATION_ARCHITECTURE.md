# 02 --- Information Architecture

## Design objective

The IA should help visitors understand Kiiro through **four questions**:

1.  What is Kiiro?
2.  What can I experience?
3.  Who makes it possible?
4.  How can I participate or partner?

Navigation should not expose every page.

------------------------------------------------------------------------

# Primary navigation

Desktop:

-   Weekly Events
-   About
-   Artforms
-   Experiences
-   Partnerships & CSR
-   Artisan Ecosystem
-   Journal
-   Enquire

`Enquire` is the primary navigation CTA.

------------------------------------------------------------------------

# Artforms

Dropdown groups:

### Traditional

Living traditional practices and heritage crafts.

### Contemporary

Contemporary interpretations, collaborations, and modern creative
formats.

### Wellness

Craft and creative practices positioned around mindful participation,
grounding, connection, or creative wellbeing.

### Artform detail

`/artforms/[slug]`

------------------------------------------------------------------------

# Experiences

### Schools & Colleges

`/experiences/schools-colleges`

### Corporates

`/experiences/corporates`

### Hospitality & Luxury

`/experiences/hospitality-luxury`

### Online Experiences

`/experiences/online`

### Public Workshops

`/experiences/workshops`

### Retreats

`/experiences/retreats`

### Experience detail

`/experiences/[slug]`

------------------------------------------------------------------------

# Partnerships & CSR

This must be separate from ordinary corporate workshops.

### Capacity Building

Artisan recruitment, facilitator training, support, and ecosystem
development.

### Gifting

Traditional/craft-led gifting and curated products.

### Needs Ideation

Custom partnership/program design.

Route: `/partnerships-csr`

------------------------------------------------------------------------

# Artisan Ecosystem

### Artisan directory

`/artisans`

### Artisan profile

`/artisans/[slug]`

### Impact

`/impact`

------------------------------------------------------------------------

# Community

### Creative Wellness Circle

`/community/creative-wellness-circle`

### Events

Weekly/public event discovery remains a primary path.

------------------------------------------------------------------------

# Journal

`/journal`

`/journal/[slug]`

The Journal should be editorial and educational, not a marketing blog
dump.

------------------------------------------------------------------------

# Learning

`/learning`

`/learning/certificates`

Support:

-   beginner
-   intermediate
-   advanced
-   certificates
-   progression

------------------------------------------------------------------------

# Products

`/products`

This is an expandable future vertical.

The first version can be editorial/catalogue-driven if transactional
ecommerce is not part of the approved scope.

Do not build a payment system unless explicitly required.

------------------------------------------------------------------------

# Suggested full sitemap

``` text
/
├── weekly-events/
│   └── [event-slug]/
│
├── about/
│
├── artforms/
│   ├── traditional/
│   ├── contemporary/
│   ├── wellness/
│   └── [artform-slug]/
│
├── experiences/
│   ├── workshops/
│   ├── retreats/
│   ├── schools-colleges/
│   ├── corporates/
│   ├── hospitality-luxury/
│   ├── online/
│   └── [experience-slug]/
│
├── partnerships-csr/
│   ├── capacity-building/
│   ├── gifting/
│   └── needs-ideation/
│
├── artisans/
│   └── [artisan-slug]/
│
├── impact/
│
├── community/
│   └── creative-wellness-circle/
│
├── products/
│
├── learning/
│   └── certificates/
│
├── journal/
│   └── [article-slug]/
│
├── enquire/
│
├── privacy/
└── terms/
```

------------------------------------------------------------------------

# Navigation principles

## Do not expose everything

The navigation is a map, not a sitemap.

## Use contextual linking

An artform page should link to: - its artisans - its experiences -
relevant events - relevant journal stories

An artisan page should link to: - craft - related experiences - impact

An event should link to: - artform - facilitator - related experiences

This creates an ecosystem rather than isolated pages.

------------------------------------------------------------------------

# Mobile IA

Mobile uses:

-   menu button
-   drawer
-   accordion sections
-   clear CTA
-   search

No hover dependency.

Touch targets should be at least comfortably tappable.

------------------------------------------------------------------------

# URL rules

-   lowercase
-   hyphen-separated
-   stable
-   human-readable
-   no CMS IDs in URLs
-   no Wix-style route names
-   no dates in article URLs unless editorially required

Once published, URLs should not change casually.
