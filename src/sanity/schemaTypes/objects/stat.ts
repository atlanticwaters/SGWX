import { defineType, defineField } from 'sanity'
import { BarChartIcon } from '@sanity/icons'

export const stat = defineType({
  name: 'stat',
  title: 'Stat',
  type: 'object',
  icon: BarChartIcon,
  preview: {
    select: {
      value: 'value',
      suffix: 'suffix',
      label: 'label',
    },
    prepare({ value, suffix, label }) {
      return {
        title: `${value}${suffix || ''}`,
        subtitle: label,
      }
    },
  },
  fields: [
    defineField({
      name: 'value',
      type: 'string',
      title: 'Value',
      description: 'e.g. 100',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'suffix',
      type: 'string',
      title: 'Suffix',
      description: 'e.g. +, %, M',
    }),
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
      description: 'e.g. Projects Delivered',
      validation: (rule) => rule.required(),
    }),
  ],
})
