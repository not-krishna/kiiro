import { defineArrayMember, defineField, defineType } from 'sanity'

export const impactPage = defineType({
  name: 'impactPage',
  title: 'Impact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Impact Overview',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      initialValue: 'Ecosystem Metrics & Social Value',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'Measuring Craft Dignity & Economic Independence',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'metrics',
      title: 'Quantified Metrics',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'impactStat' }] })],
    }),
    defineField({
      name: 'financialModelTitle',
      title: 'Financial Model Title',
      type: 'string',
      initialValue: 'Transparent Financial Model',
    }),
    defineField({
      name: 'financialModelText',
      title: 'Financial Model Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'transmissionTitle',
      title: 'Transmission Title',
      type: 'string',
      initialValue: 'Intergenerational Transmission',
    }),
    defineField({
      name: 'transmissionText',
      title: 'Transmission Text',
      type: 'text',
      rows: 3,
    }),
  ],
})
