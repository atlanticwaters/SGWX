import { defineType, defineField, defineArrayMember } from 'sanity'
import { SplitHorizontalIcon } from '@sanity/icons'

export const contentSplit = defineType({
  name: 'contentSplit',
  title: 'Content Split',
  type: 'object',
  icon: SplitHorizontalIcon,
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Content Split',
        subtitle: 'Content Split',
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
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'orientation',
      type: 'string',
      title: 'Orientation',
      options: {
        layout: 'radio',
        list: [
          { title: 'Image Left', value: 'imageLeft' },
          { title: 'Image Right', value: 'imageRight' },
        ],
      },
      initialValue: 'imageLeft',
    }),
    defineField({
      name: 'backgroundImage',
      type: 'reference',
      title: 'Background Image',
      to: [{ type: 'sectionBackground' }],
    }),
  ],
})
