import { defineArrayMember, defineField, defineType } from 'sanity'

export const workshop = defineType({
  name: 'workshop',
  title: 'Workshop',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category (legacy string)',
      type: 'string',
      options: {
        list: [
          { title: 'Traditional Art', value: 'traditional' },
          { title: 'Contemporary Art', value: 'contemporary' },
          { title: 'Wellness Practice', value: 'wellness' },
        ],
      },
    }),
    defineField({
      name: 'categoryRef',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'workshopCategory' }],
    }),
    defineField({ name: 'definition', title: 'Definition', type: 'text', rows: 4 }),
    defineField({ name: 'origin', title: 'Origin', type: 'string' }),
    defineField({ name: 'process', title: 'Process', type: 'text', rows: 6 }),
    defineField({
      name: 'processSteps',
      title: 'Process steps',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'outcome', title: 'Outcome & takeaway', type: 'text', rows: 5 }),
    defineField({ name: 'skillLevel', title: 'Skill level', type: 'string' }),
    defineField({ name: 'materials', title: 'Materials / inclusions', type: 'text', rows: 3 }),
    defineField({
      name: 'durationDays',
      title: 'Duration (days)',
      type: 'number',
      description: 'Leave empty if not specified. Earth Dialogues is 2 days.',
    }),
    defineField({
      name: 'pricing',
      title: 'Batch pricing (per person)',
      type: 'array',
      of: [defineArrayMember({ type: 'pricingTier' })],
    }),
    defineField({ name: 'corporateAvailable', title: 'Corporate booking', type: 'boolean', initialValue: true }),
    defineField({ name: 'hospitalityAvailable', title: 'Hospitality booking', type: 'boolean', initialValue: true }),
    defineField({ name: 'individualAvailable', title: 'Individual booking', type: 'boolean', initialValue: false }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [defineArrayMember({ type: 'mediaAsset' })],
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'published', title: 'Published', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category' },
  },
})
