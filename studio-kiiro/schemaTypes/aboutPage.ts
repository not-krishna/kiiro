import { defineArrayMember, defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'About Kiiro',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      initialValue: 'Manifesto & Identity',
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
    }),
    defineField({
      name: 'manifestoTitle',
      title: 'Manifesto Title',
      type: 'string',
      initialValue: 'Our Core Purpose',
    }),
    defineField({
      name: 'manifestoText',
      title: 'Manifesto Text',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'ecosystemTitle',
      title: 'Ecosystem Section Title',
      type: 'string',
      initialValue: 'The Living Ecosystem Model',
    }),
    defineField({
      name: 'ecosystemText',
      title: 'Ecosystem Section Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'values',
      title: 'Core Values / Principles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Number / Tag', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
        }),
      ],
    }),
  ],
})
