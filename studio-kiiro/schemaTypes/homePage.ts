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
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      initialValue: 'A creative wellness space rooted in living art',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'ROOT. CREATE. RESTORE.',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 3,
    }),
    defineField({ name: 'heroPrimaryCta', title: 'Hero primary CTA', type: 'cta' }),
    defineField({ name: 'heroSecondaryCta', title: 'Hero secondary CTA', type: 'cta' }),
    defineField({
      name: 'heroMedia',
      title: 'Hero media',
      type: 'array',
      of: [defineArrayMember({ type: 'mediaAsset' })],
    }),
    defineField({ name: 'heroImage', title: 'Hero image (legacy)', type: 'image', hidden: true }),
    defineField({ name: 'methodologyIntro', title: 'Methodology intro', type: 'text', rows: 3 }),
    defineField({
      name: 'methodologyStages',
      title: 'Root / Create / Restore',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'id', title: 'Stage id', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
          ],
        }),
      ],
    }),
    defineField({ name: 'manifestoTitle', title: 'Manifesto Title', type: 'text', rows: 3 }),
    defineField({ name: 'manifestoText', title: 'Manifesto Body Text', type: 'text', rows: 4 }),
    defineField({
      name: 'featuredArtforms',
      title: 'Featured Artforms',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'artform' }] })],
    }),
    defineField({
      name: 'featuredEvents',
      title: 'Featured events',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'event' }] })],
    }),
    defineField({
      name: 'artisanFeature',
      title: 'Artisan Feature',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
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
    defineField({ name: 'partnershipsTitle', title: 'Partnerships Section Title', type: 'string' }),
    defineField({
      name: 'featuredJournalPosts',
      title: 'Featured Journal Posts',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'journalPost' }] })],
    }),
  ],
})
