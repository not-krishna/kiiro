# 06 --- Components & Interaction Architecture

## Principle

Components should encode **design intent**, not just HTML repetition.

------------------------------------------------------------------------

# Global shell

-   `SiteHeader`
-   `DesktopNavigation`
-   `MobileNavigation`
-   `Search`
-   `SiteFooter`
-   `Breadcrumbs`
-   `PageTransition` only if needed

------------------------------------------------------------------------

# Typography primitives

-   `DisplayHeading`
-   `SectionHeading`
-   `Eyebrow`
-   `BodyText`
-   `MetaText`
-   `PullQuote`
-   `RichText`

------------------------------------------------------------------------

# Media primitives

-   `SanityImage`
-   `ResponsiveImage`
-   `VideoHero`
-   `ImageGallery`
-   `Lightbox`
-   `ArtisanPortrait`
-   `ProcessImage`

All Sanity image rendering must use Sanity's image URL builder.

------------------------------------------------------------------------

# Content components

-   `ArtformFeature`
-   `ArtformRow`
-   `ExperienceFeature`
-   `ExperienceCard`
-   `EventCard`
-   `ArtisanFeature`
-   `JournalCard`
-   `Testimonial`
-   `PartnerLogoWall`
-   `ImpactStat`
-   `QuoteBlock`
-   `RelatedContent`
-   `CTASection`

------------------------------------------------------------------------

# Form components

-   `EnquiryForm`
-   `CorporateEnquiryForm`
-   `GeneralEnquiryForm`
-   `NewsletterForm`
-   `FormField`
-   `FormStatus`

------------------------------------------------------------------------

# Navigation interactions

## Desktop

Dropdowns: - open on intentional hover - also work on click - keyboard
accessible - escape closes - focus remains logical

## Mobile

Drawer: - open - close - nested disclosure - focus trap - body scroll
lock

------------------------------------------------------------------------

# Search

Search should be treated as a first-class content discovery feature.

Potential searchable entities: - artforms - artisans - experiences -
events - journal

Use Sanity/GROQ for initial search if scale is small.

Do not add Algolia/Typesense/Elastic unless actual search requirements
justify the infrastructure.

------------------------------------------------------------------------

# Event interaction

Event cards must show:

-   date
-   location
-   event type
-   availability/enquiry status
-   CTA

Do not expose internal booking state.

------------------------------------------------------------------------

# Gallery interaction

Requirements: - keyboard accessible - close with Escape -
previous/next - captions where supplied - alt text - no forced autoplay

------------------------------------------------------------------------

# Form architecture

Forms submit to a server-side route/action.

Flow:

``` text
Browser
  ↓
Next.js Server Action / Route Handler
  ↓
Validation
  ↓
Spam protection
  ↓
Approved destination
  ↓
Success response
```

Never:

``` text
Browser → secret API
```

------------------------------------------------------------------------

# Animation architecture

Create a small motion utility layer.

Do not scatter animation libraries across every component.

Recommended categories: - reveal - stagger - image reveal - hover - page
entrance

All animation should have: - duration - easing - reduced-motion fallback

------------------------------------------------------------------------

# Error states

Every dynamic component must define: - loading - empty - error -
unavailable

Especially: - events - journal - forms - CMS queries

------------------------------------------------------------------------

# Empty content rule

Do not render empty shells such as:

`"Read more"` with no article.

If a relationship has no content: - hide the section, or - show a
meaningful fallback

Do not expose broken UI.
