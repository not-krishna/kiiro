import { defineField, defineType } from 'sanity'

export const pricingTier = defineType({
  name: 'pricingTier',
  title: 'Pricing tier',
  type: 'object',
  fields: [
    defineField({ name: 'min', title: 'Minimum participants', type: 'number', validation: (Rule) => Rule.required() }),
    defineField({ name: 'max', title: 'Maximum participants (empty = and above)', type: 'number' }),
    defineField({ name: 'pricePerPerson', title: 'Price per person (INR)', type: 'number' }),
    defineField({ name: 'note', title: 'Note', type: 'string' }),
  ],
  preview: {
    select: { min: 'min', max: 'max', price: 'pricePerPerson' },
    prepare({ min, max, price }) {
      const range = max == null ? `${min}+` : `${min}–${max}`
      return {
        title: `${range} participants`,
        subtitle: price == null ? 'Price not listed' : `₹${price} / person`,
      }
    },
  },
})
