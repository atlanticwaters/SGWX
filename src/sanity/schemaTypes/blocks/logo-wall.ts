import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export const logoWall = defineType({
  name: 'logoWall',
  title: 'Logo Wall',
  type: 'object',
  icon: BlockElementIcon,
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Logo Wall',
        subtitle: 'Logo Wall',
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
      name: 'logos',
      type: 'array',
      title: 'Logos',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              title: 'Name',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
})
