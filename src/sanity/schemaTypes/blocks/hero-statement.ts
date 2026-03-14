import { defineType, defineField, defineArrayMember } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const heroStatement = defineType({
  name: 'heroStatement',
  title: 'Hero Statement',
  type: 'object',
  icon: StarIcon,
  description: 'Full-width hero with heading, subheading, CTAs, and optional background image',
  preview: {
    select: {
      title: 'heading',
      bg: 'backgroundImage',
    },
    prepare({ title, bg }) {
      return {
        title: title || 'Hero Statement',
        subtitle: bg ? 'Hero Statement / Has background' : 'Hero Statement',
      }
    },
  },
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subheading',
      type: 'text',
      title: 'Subheading',
      rows: 3,
    }),
    defineField({
      name: 'supportingText',
      type: 'text',
      title: 'Supporting Text',
      rows: 2,
    }),
    defineField({
      name: 'ctas',
      type: 'array',
      title: 'Calls to Action',
      of: [defineArrayMember({ type: 'callToAction' })],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'backgroundImage',
      type: 'reference',
      title: 'Background Image',
      to: [{ type: 'sectionBackground' }],
    }),
  ],
})
