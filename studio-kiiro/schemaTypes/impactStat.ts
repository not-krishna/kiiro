import { defineField, defineType } from 'sanity'

export const impactStat = defineType({
  name: 'impactStat',
  title: 'Impact Statistic',
  type: 'document',
  fields: [
    defineField({
      name: 'value',
      title: 'Stat Value',
      type: 'string',
      initialValue: '800+',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'context',
      title: 'Context / Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
})
