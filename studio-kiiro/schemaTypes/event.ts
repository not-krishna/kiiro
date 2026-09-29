import { defineArrayMember, defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Teaser summary for event cards on the homepage and weekly calendar (max 180 characters)',
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startTime',
      title: 'Start Time',
      type: 'string',
    }),
    defineField({
      name: 'endTime',
      title: 'End Time',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      initialValue: 'Venue to be confirmed',
    }),
    defineField({
      name: 'locationRef',
      title: 'Location Reference',
      type: 'reference',
      to: [{ type: 'location' }],
    }),
    defineField({
      name: 'workshop',
      title: 'Workshop',
      type: 'reference',
      to: [{ type: 'workshop' }],
    }),
    defineField({
      name: 'isWeekly',
      title: 'Weekly event',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'audience',
      title: 'Audience',
      type: 'string',
      options: {
        list: [
          { title: 'B2C', value: 'b2c' },
          { title: 'B2B', value: 'b2b' },
          { title: 'Both', value: 'both' },
        ],
      },
      initialValue: 'b2c',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
    }),
    defineField({
      name: 'facilitator',
      title: 'Facilitator / artisan',
      type: 'string',
    }),
    defineField({
      name: 'experienceType',
      title: 'Experience type',
      type: 'string',
    }),
    defineField({
      name: 'keyProcess',
      title: 'Key Process',
      type: 'text',
      rows: 3,
      description: 'Major stages and craft processes involved in this session',
    }),
    defineField({
      name: 'takeAway',
      title: 'Take Away / Keepsake',
      type: 'string',
      description: 'Handcrafted piece or keepsake participants take home',
    }),
    defineField({
      name: 'heroImage',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'experienceReference',
      title: 'Experience',
      type: 'reference',
      to: [{ type: 'experience' }],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
    }),
    defineField({
      name: 'bookingStatus',
      title: 'Booking Status',
      type: 'string',
      options: {
        list: [
          { title: 'Open', value: 'open' },
          { title: 'Limited', value: 'limited' },
          { title: 'Sold Out', value: 'sold-out' },
          { title: 'Closed', value: 'closed' },
          { title: 'Enquiry Only', value: 'enquiry-only' },
        ],
      },
      initialValue: 'open',
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
