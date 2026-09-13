import { defineField, defineType } from 'sanity'

export const mediaAsset = defineType({
  name: 'mediaAsset',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.type === 'video',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      hidden: ({ parent }) => parent?.type !== 'video',
    }),
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
      hidden: ({ parent }) => parent?.type !== 'video',
    }),
    defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
  ],
})
