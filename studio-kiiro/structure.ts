import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Kiiro Content Operations')
    .items([
      // SITE SINGLETONS & SETTINGS
      S.listItem()
        .title('Site Settings & Homepage')
        .child(
          S.list()
            .title('Site Management')
            .items([
              S.listItem()
                .title('Homepage')
                .child(S.document().schemaType('homePage').documentId('homePage')),
              S.listItem()
                .title('Site Settings')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            ])
        ),

      S.divider(),

      // CORE CONTENT
      S.listItem()
        .title('Cultural Content')
        .child(
          S.list()
            .title('Content Entities')
            .items([
              S.documentTypeListItem('artform').title('Artforms'),
              S.documentTypeListItem('artisan').title('Artisans'),
              S.documentTypeListItem('experience').title('Experiences'),
              S.documentTypeListItem('event').title('Events'),
              S.documentTypeListItem('journalPost').title('Journal Stories'),
            ])
        ),

      S.divider(),

      // INSTITUTIONAL & COMMUNITY
      S.listItem()
        .title('Institutional & Community')
        .child(
          S.list()
            .title('Partnerships & Proof')
            .items([
              S.documentTypeListItem('partner').title('Partners'),
              S.documentTypeListItem('testimonial').title('Testimonials'),
              S.documentTypeListItem('impactStat').title('Impact Stats'),
            ])
        ),
    ])
