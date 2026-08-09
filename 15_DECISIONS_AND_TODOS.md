# 15 --- Decisions & Open Questions

This document is intentionally explicit about what is not yet known.

Do not let a coding agent silently decide these items.

------------------------------------------------------------------------

## Brand

-   [ ] Final logo files
-   [ ] Final font selection
-   [ ] Final color tokens
-   [ ] Final brand photography
-   [ ] Final brand copy
-   [ ] Final positioning approval

------------------------------------------------------------------------

## Content

-   [ ] Final list of artforms
-   [ ] Verified cultural histories
-   [ ] Artisan profiles
-   [ ] Artisan permissions/image rights
-   [ ] Final testimonials
-   [ ] Final partner logos
-   [ ] Final impact statistics
-   [ ] Final cities/locations

------------------------------------------------------------------------

## Events

-   [ ] Booking system
-   [ ] Event inventory owner
-   [ ] Price display rules
-   [ ] Cancellation policy
-   [ ] Capacity management
-   [ ] Payment requirements

------------------------------------------------------------------------

## Forms

Choose approved destination:

-   [ ] Email
-   [ ] CRM
-   [ ] Google Workspace
-   [ ] WhatsApp
-   [ ] Database
-   [ ] Other

Do not choose an integration merely because it is technically easy.

------------------------------------------------------------------------

## Products

Determine:

-   [ ] catalogue only
-   [ ] enquiry-based
-   [ ] ecommerce
-   [ ] payment provider
-   [ ] inventory
-   [ ] shipping

------------------------------------------------------------------------

## Community

Determine:

-   [ ] open membership
-   [ ] enquiry
-   [ ] paid membership
-   [ ] events only
-   [ ] newsletter/community platform

------------------------------------------------------------------------

## Search

Initial recommendation: Sanity/GROQ.

Only move to a dedicated search service if: - content volume grows -
fuzzy search becomes important - analytics demonstrate poor search
success

------------------------------------------------------------------------

## Multilingual

Not implemented until language requirements are approved.

------------------------------------------------------------------------

## Analytics

Choose: - \[ \] Google Analytics - \[ \] Plausible - \[ \] Matomo - \[
\] other

------------------------------------------------------------------------

## Deployment

-   [ ] Vercel
-   [ ] existing hosting
-   [ ] domain access
-   [ ] DNS access
-   [ ] Sanity Studio domain

------------------------------------------------------------------------

# Decision rule

When an item is unresolved:

``` text
TODO
↓
Document the missing information
↓
Build architecture that supports it
↓
Do not fabricate the final answer
```
