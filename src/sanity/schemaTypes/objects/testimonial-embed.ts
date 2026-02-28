import { defineType, defineField } from 'sanity'
import { CommentIcon } from '@sanity/icons'

export const testimonialEmbed = defineType({
  name: 'testimonialEmbed',
  title: 'Testimonial Embed',
  type: 'object',
  icon: CommentIcon,
  preview: {
    select: {
      title: 'quote',
      subtitle: 'author',
    },
    prepare({ title, subtitle }) {
      return {
        title: title ? (title.length > 80 ? `${title.slice(0, 80)}...` : title) : 'No quote',
        subtitle: subtitle || '',
      }
    },
  },
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote',
    }),
    defineField({
      name: 'author',
      type: 'string',
      title: 'Author',
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role',
    }),
  ],
})
