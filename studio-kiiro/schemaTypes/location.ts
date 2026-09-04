import { defineField, defineType } from 'sanity'

export const location = defineType({
  name: 'location',
  title: 'City / Location',
  type: 'document',
  fields: [
    defineField({
      name: 'city',
      title: 'City Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      initialValue: 'India',
    }),
    defineField({
      name: 'active',
      title: 'Active Presence',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
