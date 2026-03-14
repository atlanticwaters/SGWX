import { defineType, defineField, defineArrayMember } from 'sanity'
import { TextIcon } from '@sanity/icons'

export const richTextSection = defineType({
  name: 'richTextSection',
  title: 'Rich Text Section',
  type: 'object',
  icon: TextIcon,
  description: 'Free-form rich text with inline images and optional background',
  preview: {
    select: {
      title: 'heading',
      bg: 'backgroundImage',
    },
    prepare({ title, bg }) {
      return {
        title: title || 'Rich Text Section',
        subtitle: bg ? 'Rich Text / Has background' : 'Rich Text Section',
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
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
            defineField({ name: 'caption', type: 'string', title: 'Caption' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'backgroundImage',
      type: 'reference',
      title: 'Background Image',
      to: [{ type: 'sectionBackground' }],
    }),
  ],
})
