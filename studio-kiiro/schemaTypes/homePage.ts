import { defineArrayMember, defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Homepage',
      validation: (Rule) => Rule.required(),
    }),

    // 01 Hero
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      initialValue: 'Where Heritage Meets Hands-On Learning',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'Hands On. Rooted. Real.',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 3,
      initialValue: 'Connecting living craft traditions, master artisans, knowledge, and contemporary experiences through immersive hands-on learning.',
    }),
    defineField({
      name: 'heroPrimaryCta',
      title: 'Hero Primary CTA Text',
      type: 'string',
      initialValue: 'Explore Experiences',
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Hero Secondary CTA Text',
      type: 'string',
      initialValue: 'View Weekly Events',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),

    // 02 Manifesto & Impact
    defineField({
      name: 'manifestoTitle',
      title: 'Manifesto Title',
      type: 'string',
      initialValue: 'We believe culture is not something to preserve behind glass. It is something to learn, make, share and carry forward.',
    }),
    defineField({
      name: 'manifestoText',
      title: 'Manifesto Body Text',
      type: 'text',
      rows: 4,
      initialValue: 'Kiiro connects heritage craft traditions directly to participants, ensuring cultural knowledge lives on through hands-on learning and sustained artisan livelihoods.',
    }),

    // 03 Artforms
    defineField({
      name: 'featuredArtforms',
      title: 'Featured Artforms',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'artform' }] })],
    }),

    // 04 Artisan Impact Feature
    defineField({
      name: 'artisanFeature',
      title: 'Artisan Feature',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'The Craft is the Experience. The Artisan is the Knowledge.' }),
        defineField({ name: 'name', title: 'Artisan Name', type: 'string' }),
        defineField({ name: 'craft', title: 'Craft Practice', type: 'string' }),
        defineField({ name: 'region', title: 'Region', type: 'string' }),
        defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3 }),
        defineField({
          name: 'portrait',
          title: 'Portrait Image',
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
      ],
    }),

    // 05 Partnerships & CSR
    defineField({
      name: 'partnershipsTitle',
      title: 'Partnerships Section Title',
      type: 'string',
      initialValue: 'Cultural Programs & Capacity Building',
    }),

    // 06 Journal
    defineField({
      name: 'featuredJournalPosts',
      title: 'Featured Journal Posts',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'journalPost' }] })],
    }),
  ],
})
