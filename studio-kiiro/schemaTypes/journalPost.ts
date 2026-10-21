import { defineArrayMember, defineField, defineType } from 'sanity'

export const journalPost = defineType({
  name: 'journalPost',
  title: 'Journal Post',
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
      name: 'standfirst',
      title: 'Standfirst / Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'imageUrl',
      title: 'Direct Image URL',
      type: 'url',
      description: 'Image URL from Media Library or CDN',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'artforms',
      title: 'Related Artforms',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'artform' }] })],
    }),
    defineField({
      name: 'artisans',
      title: 'Related Artisans',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'artisan' }] })],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Meta Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
