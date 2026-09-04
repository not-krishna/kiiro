import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Kiiro Content Operations')
    .items([
      // PAGE SINGLETONS & SITE MANAGEMENT
      S.listItem()
        .title('Site & Page Singletons')
        .child(
          S.list()
            .title('Page Management')
            .items([
              S.listItem()
                .title('Homepage')
                .child(S.document().schemaType('homePage').documentId('homePage')),
              S.listItem()
                .title('About Page')
                .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
              S.listItem()
                .title('Community Page')
                .child(S.document().schemaType('communityPage').documentId('communityPage')),
              S.listItem()
                .title('Impact Page')
                .child(S.document().schemaType('impactPage').documentId('impactPage')),
              S.listItem()
                .title('Learning Page')
                .child(S.document().schemaType('learningPage').documentId('learningPage')),
              S.listItem()
                .title('Partnerships & CSR Page')
                .child(S.document().schemaType('partnershipsCsrPage').documentId('partnershipsCsrPage')),
              S.listItem()
                .title('Products Catalogue Page')
                .child(S.document().schemaType('productsPage').documentId('productsPage')),
              S.listItem()
                .title('Site Settings')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            ])
        ),

      S.divider(),

      // CORE CULTURAL CONTENT
      S.listItem()
        .title('Cultural Content')
        .child(
          S.list()
            .title('Cultural Entities')
            .items([
              S.documentTypeListItem('artform').title('Artforms'),
              S.documentTypeListItem('artisan').title('Artisans'),
              S.documentTypeListItem('experience').title('Experiences'),
              S.documentTypeListItem('event').title('Events'),
              S.documentTypeListItem('journalPost').title('Journal Stories'),
            ])
        ),

      S.divider(),

      // CATALOGUE & PRODUCTS
      S.listItem()
        .title('Catalogue & Products')
        .child(
          S.list()
            .title('Craft Objects')
            .items([
              S.documentTypeListItem('product').title('Craft Products'),
            ])
        ),

      S.divider(),

      // INSTITUTIONAL, PROOF & LOCATIONS
      S.listItem()
        .title('Institutional & Proof')
        .child(
          S.list()
            .title('Partnerships & Locations')
            .items([
              S.documentTypeListItem('partner').title('Partners'),
              S.documentTypeListItem('testimonial').title('Testimonials'),
              S.documentTypeListItem('impactStat').title('Impact Stats'),
              S.documentTypeListItem('location').title('Active Cities / Locations'),
            ])
        ),
    ])
