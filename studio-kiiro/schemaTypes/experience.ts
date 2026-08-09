import { defineArrayMember, defineField, defineType } from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'experienceType',
      title: 'Experience Type',
      type: 'string',
    }),
    defineField({
      name: 'audience',
      title: 'Target Audience',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
    }),
    defineField({
      name: 'artforms',
      title: 'Artforms',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'artform' }] })],
    }),
    defineField({
      name: 'artisans',
      title: 'Artisans',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'artisan' }] })],
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
})
