import { defineType, defineField, defineArrayMember } from 'sanity'
import { InlineElementIcon } from '@sanity/icons'

export const featureCards = defineType({
  name: 'featureCards',
  title: 'Feature Cards',
  type: 'object',
  icon: InlineElementIcon,
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Feature Cards',
        subtitle: 'Feature Cards',
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
      name: 'cards',
      type: 'array',
      title: 'Cards',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              type: 'string',
              title: 'Heading',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'body',
              type: 'text',
              title: 'Body',
              rows: 3,
            }),
            defineField({
              name: 'icon',
              type: 'image',
              title: 'Icon',
            }),
          ],
          preview: {
            select: {
              title: 'heading',
              media: 'icon',
            },
          },
        }),
      ],
    }),
  ],
})
