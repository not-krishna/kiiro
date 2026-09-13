import { defineField, defineType } from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({ name: 'href', title: 'Destination', type: 'string' }),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {
        list: [
          { title: 'Internal', value: 'internal' },
          { title: 'External', value: 'external' },
          { title: 'Booking', value: 'booking' },
          { title: 'Enquiry', value: 'enquiry' },
        ],
      },
      initialValue: 'internal',
    }),
  ],
})
