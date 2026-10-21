import { defineField, defineType } from 'sanity'

export const studioMoment = defineType({
  name: 'studioMoment',
  title: 'Moments From The Studio',
  type: 'document',
  fields: [
    defineField({
      name: 'handle',
      title: 'Instagram Handle',
      type: 'string',
      description: 'e.g. @themitti.company, @kiiro.blr',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author / Creator Name',
      type: 'string',
      description: 'e.g. The Mitti Company, Ruchika',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Post Type',
      type: 'string',
      options: {
        list: [
          { title: 'Post', value: 'post' },
          { title: 'Reel', value: 'reel' },
        ],
      },
      initialValue: 'post',
    }),
    defineField({
      name: 'typeLabel',
      title: 'Type Label',
      type: 'string',
      initialValue: 'Post',
    }),
    defineField({
      name: 'url',
      title: 'Instagram Post / Reel URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Moment Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL (static fallback)',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Short Quote / Headline',
      type: 'string',
      description: 'e.g. Happy customer make us happy:)',
    }),
    defineField({
      name: 'caption',
      title: 'Full Caption or Quote',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'overlayTag',
      title: 'Overlay Tag',
      type: 'string',
      description: 'e.g. Handcrafted Clay Diya, Wheel Throwing · Thane',
    }),
    defineField({
      name: 'contextLine',
      title: 'Context Line',
      type: 'string',
      description: 'e.g. Pottery Studio · Living Craft',
    }),
    defineField({
      name: 'badgeBg',
      title: 'Badge Color (CSS class or hex)',
      type: 'string',
      description: 'e.g. bg-[#C17F59] or #4F5B2A',
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
      title: 'handle',
      subtitle: 'quote',
      media: 'image',
    },
  },
})
