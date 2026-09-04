import { defineField, defineType } from 'sanity'

export const productsPage = defineType({
  name: 'productsPage',
  title: 'Products & Craft Catalogue Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Craft Products & Catalogue',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      initialValue: 'Craft Catalogue & Objects',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'Handmade Works From Master Studios',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'disclaimerText',
      title: 'Catalogue Scope Disclaimer',
      type: 'text',
      rows: 2,
    }),
  ],
})
