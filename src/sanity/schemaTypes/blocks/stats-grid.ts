import { defineType, defineField, defineArrayMember } from 'sanity'
import { BarChartIcon } from '@sanity/icons'

export const statsGrid = defineType({
  name: 'statsGrid',
  title: 'Stats Grid',
  type: 'object',
  icon: BarChartIcon,
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Stats Grid',
        subtitle: 'Stats Grid',
      }
    },
  },
  fields: [
    defineField({
      name: 'eyebrow',
      type: 'string',
      title: 'Eyebrow',
    }),
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
    }),
    defineField({
      name: 'stats',
      type: 'array',
      title: 'Stats',
      of: [defineArrayMember({ type: 'stat' })],
    }),
  ],
})
