import { defineType, defineField, defineArrayMember } from 'sanity'
import { ActivityIcon } from '@sanity/icons'

export const processOverview = defineType({
  name: 'processOverview',
  title: 'Process Overview',
  type: 'object',
  icon: ActivityIcon,
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Process Overview',
        subtitle: 'Process Overview',
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
      name: 'stages',
      type: 'array',
      title: 'Stages',
      of: [defineArrayMember({ type: 'processStage' })],
    }),
  ],
})
