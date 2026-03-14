import { defineType, defineField, defineArrayMember } from 'sanity'
import { RocketIcon } from '@sanity/icons'

export const callToActionBanner = defineType({
  name: 'callToActionBanner',
  title: 'Call to Action Banner',
  type: 'object',
  icon: RocketIcon,
  description: 'Full-width CTA with heading, subheading, buttons, and optional background',
  preview: {
    select: {
      title: 'heading',
      bg: 'backgroundImage',
    },
    prepare({ title, bg }) {
      return {
        title: title || 'Call to Action Banner',
        subtitle: bg ? 'CTA Banner / Has background' : 'Call to Action Banner',
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
