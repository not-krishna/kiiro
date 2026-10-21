import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'personName',
      title: 'Person Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Designation',
      type: 'string',
      description: 'e.g. Creative Director, AVP Human Resources, Ceramic Artist',
    }),
    defineField({
      name: 'organisation',
      title: 'Organisation / Company',
      type: 'string',
      description: 'Optional company name, e.g. Studio Taj, Network 18',
    }),
    defineField({
      name: 'portrait',
      title: 'Profile / Portrait Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'portraitUrl',
      title: 'Profile / Portrait Image URL',
      type: 'string',
      description: 'Direct image path or URL for the testimonial portrait',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Numerical order for sorting testimonials on the homepage',
      initialValue: 0,
    }),
    defineField({
      name: 'isVideo',
      title: 'Is Video Testimonial',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (MP4 / YouTube / Vimeo)',
      type: 'url',
    }),
    defineField({
      name: 'videoThumbnail',
      title: 'Video Cover Thumbnail',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'pullQuote',
      title: 'Pull Quote (Short bold statement)',
      type: 'string',
      description: 'Short headline displayed prominently above testimonial text',
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (1-5)',
      type: 'number',
      initialValue: 5,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Custom Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
