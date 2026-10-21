import { defineField, defineType } from 'sanity'

export const advisor = defineType({
  name: 'advisor',
  title: 'Distinguished Advisor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name & Degree',
      type: 'string',
      description: 'e.g. Dr. Tapanendu Kundu, Dr. Shalini Purohit',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'initials',
      title: 'Initials (2 letters)',
      type: 'string',
      description: 'Initials shown when portrait is absent, e.g. TK, SP, SA',
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'title',
      title: 'Professional Title / Role',
      type: 'string',
      description: 'e.g. Chief Adviser Students Care, Chartered Psychologist',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'affiliation',
      title: 'Primary Affiliation / Institution',
      type: 'string',
      description: 'e.g. BITS Pilani Goa Campus & IIT Bombay, British Psychological Society',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'specialty',
      title: 'Clinical or Artistic Specialty',
      type: 'string',
      description: 'e.g. Expressive Art Specialist, Specialist Mentor Mental Health',
    }),
    defineField({
      name: 'bio',
      title: 'Full Biography',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'portrait',
      title: 'Advisor Portrait',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({
      name: 'portraitUrl',
      title: 'Advisor Portrait URL',
      type: 'string',
      description: 'Direct image path or Media Library URL for the advisor portrait',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
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
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'portrait',
    },
  },
})
