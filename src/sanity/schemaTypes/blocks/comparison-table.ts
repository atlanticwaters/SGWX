import { defineType, defineField, defineArrayMember } from 'sanity'
import { ThListIcon } from '@sanity/icons'

export const comparisonTable = defineType({
  name: 'comparisonTable',
  title: 'Comparison Table',
  type: 'object',
  icon: ThListIcon,
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Comparison Table',
        subtitle: 'Comparison Table',
      }
    },
  },
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
    }),
    defineField({
      name: 'subheading',
      type: 'text',
      title: 'Subheading',
      rows: 2,
    }),
    defineField({
      name: 'rows',
      type: 'array',
      title: 'Rows',
      of: [defineArrayMember({ type: 'comparisonRow' })],
    }),
  ],
})
