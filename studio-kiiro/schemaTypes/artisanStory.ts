import { defineField, defineType } from 'sanity'

export const artisanStory = defineType({
  name: 'artisanStory',
  title: 'Artisan Story',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Artisan Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'craft',
      title: 'Craft / Designation',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Location / Region',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait / Workshop Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Artisan Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Supporting Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'impactMetric',
      title: 'Impact Metric (e.g. 100%)',
      type: 'string',
      initialValue: '100%',
    }),
    defineField({
      name: 'impactLabel',
      title: 'Impact Label (e.g. Fair Wages)',
      type: 'string',
      initialValue: 'Fair Wages',
    }),
    defineField({
      name: 'impactDescription',
      title: 'Impact Description',
      type: 'string',
      initialValue: '& Transparent Craft Cluster Support',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      initialValue: 'Meet the artisan network',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA Destination URL',
      type: 'string',
      initialValue: '#enquiry',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isPublished',
      title: 'Is Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'craft',
      media: 'portrait',
    },
  },
})
