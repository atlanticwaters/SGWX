import { defineType, defineField } from 'sanity'
import { ProjectsIcon } from '@sanity/icons'

export const caseStudyFeed = defineType({
  name: 'caseStudyFeed',
  title: 'Case Study Feed',
  type: 'object',
  icon: ProjectsIcon,
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Case Study Feed',
        subtitle: 'Case Study Feed',
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
      description: 'Number of case studies to show',
      initialValue: 3,
      validation: (rule) => rule.min(1).max(12),
    }),
  ],
})
