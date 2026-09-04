import { defineArrayMember, defineField, defineType } from 'sanity'

export const communityPage = defineType({
  name: 'communityPage',
  title: 'Community Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Community Hub',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      initialValue: 'Community Hub',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'A Gathering Space for Cultural Enthusiasts',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'circleTitle',
      title: 'Creative Wellness Circle Title',
      type: 'string',
      initialValue: 'Creative Wellness Circle',
    }),
    defineField({
      name: 'circlePurpose',
      title: 'Circle Purpose Narrative',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'principles',
      title: 'Circle Principles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'tag', title: 'Tag', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
        }),
      ],
    }),
  ],
})
