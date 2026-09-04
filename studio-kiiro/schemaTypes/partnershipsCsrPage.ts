import { defineArrayMember, defineField, defineType } from 'sanity'

export const partnershipsCsrPage = defineType({
  name: 'partnershipsCsrPage',
  title: 'Partnerships & CSR Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'CSR & Partnerships',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      initialValue: 'Strategic CSR & Ecosystem Impact',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'Preserving Heritage Through Sustained Livelihoods',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'pillars',
      title: 'CSR Pillars',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'pillarTag', title: 'Pillar Tag', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
            defineField({ name: 'href', title: 'Route Link', type: 'string' }),
          ],
        }),
      ],
    }),
  ],
})
