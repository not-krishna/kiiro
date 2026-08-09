# 08 --- Complete Sanity Content Model

## 1. `homePage`

Singleton.

Fields:

-   hero
-   manifesto
-   impactStats\[\]
-   featuredArtforms\[\]
-   audienceExperiences\[\]
-   artisanFeature
-   partnershipsSection
-   journalPosts\[\]
-   socialPosts\[\]
-   enquirySection
-   SEO

------------------------------------------------------------------------

# 2. `siteSettings`

Singleton.

Fields:

-   siteName
-   logo
-   favicon
-   phone
-   email
-   whatsapp
-   instagram
-   linkedin
-   youtube
-   defaultSEO
-   defaultShareImage
-   analytics
-   socialLinks

------------------------------------------------------------------------

# 3. `navigation`

Singleton.

Fields:

-   weeklyEvents
-   about
-   artforms
-   experiences
-   partnerships
-   artisans
-   journal
-   enquiry

Each navigation item: - label - href - openInNewTab - children\[\]

------------------------------------------------------------------------

# 4. `footer`

Singleton.

Fields: - footerIntro - linkGroups\[\] - contact - newsletter -
socialLinks - legalLinks - locations\[\]

------------------------------------------------------------------------

# 5. `artform`

Document.

Fields:

``` text
title
slug
category
region
shortDescription
introduction
heritageContext
history
lineage
materials[]
techniques[]
contemporaryRelevance
artisanReferences[]
heroImage
gallery[]
relatedExperiences[]
relatedEvents[]
relatedJournal[]
featured
published
seo
```

------------------------------------------------------------------------

# 6. `artisan`

Document.

Fields:

``` text
name
slug
portrait
craftReferences[]
region
bio
lineage
practice
teachingRole
quote
gallery[]
relatedExperiences[]
impactStory
featured
published
seo
```

------------------------------------------------------------------------

# 7. `experience`

Document.

Fields:

``` text
title
slug
experienceType
audience[]
shortDescription
description
whatParticipantsDo
experienceOutcomes[]
duration
format
deliveryMode
locations[]
artforms[]
artisans[]
gallery[]
featured
enquiryType
bookingMode
bookingUrl
faq[]
published
seo
```

------------------------------------------------------------------------

# 8. `event`

Document.

Fields:

``` text
title
slug
date
startTime
endTime
city
venue
location
experienceReference
artformReferences[]
artisanReferences[]
description
image
price
capacity
bookingStatus
bookingUrl
featured
published
seo
```

`bookingStatus` should use controlled values:

-   open
-   limited
-   sold-out
-   closed
-   enquiry-only
-   cancelled

------------------------------------------------------------------------

# 9. `journalPost`

Fields:

``` text
title
slug
standfirst
category
author
publishedAt
heroImage
body
gallery[]
artforms[]
artisans[]
experiences[]
relatedPosts[]
seo
published
```

------------------------------------------------------------------------

# 10. `testimonial`

Fields:

``` text
quote
personName
role
organisation
organisationLogo
portrait
audience
relatedExperience
approved
featured
```

------------------------------------------------------------------------

# 11. `partner`

Fields:

``` text
name
logo
website
partnerType
description
featured
approved
```

------------------------------------------------------------------------

# 12. `impactStory`

Fields:

``` text
title
summary
body
artisanReferences[]
location
images[]
impactAreas[]
metrics[]
published
seo
```

------------------------------------------------------------------------

# 13. `impactStat`

Fields:

``` text
value
label
suffix
context
order
published
```

------------------------------------------------------------------------

# 14. `location`

Fields:

``` text
city
state
country
active
coordinates
description
experiences[]
events[]
```

------------------------------------------------------------------------

# 15. `communityPage`

Singleton/document.

Fields:

``` text
title
intro
principles[]
whoItsFor
howItWorks
experiences[]
events[]
memberStories[]
gallery[]
cta
seo
```

------------------------------------------------------------------------

# 16. `learningPath`

Fields:

``` text
title
level
description
modules[]
relatedExperiences[]
certificateAvailable
published
seo
```

Levels: - beginner - intermediate - advanced

------------------------------------------------------------------------

# 17. `product`

Fields:

``` text
title
slug
maker/artisan
category
description
story
materials[]
dimensions
price
availability
images[]
featured
published
seo
```

------------------------------------------------------------------------

# 18. `redirect`

Fields:

``` text
from
to
statusCode
active
```

Use for Wix → Next.js migrations.

------------------------------------------------------------------------

# Validation

Every schema must validate: - required title - slug - image alt text -
references - date/time - SEO fields where relevant

The Studio should provide editor guidance through descriptions and
validation messages.

------------------------------------------------------------------------

# Studio editor UX

Use: - groups - field descriptions - previews - icons - Structure
Builder

The goal is that a non-developer can understand what a field does.

------------------------------------------------------------------------

# Content governance

Each content type should have: - owner - publishing status - approved
flag where appropriate

Do not over-engineer editorial workflow on the Free plan.
