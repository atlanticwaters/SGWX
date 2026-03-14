import { defineType, defineField, defineArrayMember } from 'sanity'
import { SplitHorizontalIcon } from '@sanity/icons'

export const contentSplit = defineType({
  name: 'contentSplit',
  title: 'Content Split',
  type: 'object',
  icon: SplitHorizontalIcon,
  description: 'Two-column layout with rich text on one side and image on the other',
  preview: {
    select: {
      title: 'heading',
      orientation: 'orientation',
      bg: 'backgroundImage',
    },
    prepare({ title, orientation, bg }) {
      const parts = ['Content Split']
      if (orientation) parts.push(orientation === 'imageLeft' ? 'Image Left' : 'Image Right')
      if (bg) parts.push('Has background')
      return {
        title: title || 'Content Split',
        subtitle: parts.join(' / '),
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
