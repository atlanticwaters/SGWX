import { defineType, defineField, defineArrayMember } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const clientSegments = defineType({
  name: 'clientSegments',
  title: 'Client Segments',
  type: 'object',
  icon: UsersIcon,
  description: 'Audience segments with labels, descriptions, and bullet lists',
  preview: {
    select: {
      title: 'heading',
      eyebrow: 'eyebrow',
    },
    prepare({ title, eyebrow }) {
      return {
        title: title || 'Client Segments',
        subtitle: eyebrow ? `Client Segments / ${eyebrow}` : 'Client Segments',
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
      name: 'segments',
      type: 'array',
      title: 'Segments',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 3,
            }),
            defineField({
              name: 'items',
              type: 'array',
              title: 'Items',
              of: [defineArrayMember({ type: 'string' })],
            }),
          ],
          preview: {
            select: {
              title: 'label',
            },
          },
        }),
      ],
    }),
  ],
})
