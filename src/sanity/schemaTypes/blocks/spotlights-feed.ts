import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const spotlightsFeed = defineType({
  name: 'spotlightsFeed',
  title: 'Spotlights Feed',
  type: 'object',
  icon: DocumentTextIcon,
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Spotlights Feed',
        subtitle: 'Spotlights Feed',
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
      name: 'subheading',
      type: 'text',
      title: 'Subheading',
      rows: 2,
    }),
    defineField({
      name: 'count',
      type: 'number',
      title: 'Count',
      description: 'Number of latest posts to show',
      initialValue: 3,
      validation: (rule) => rule.min(1).max(12),
    }),
  ],
})
