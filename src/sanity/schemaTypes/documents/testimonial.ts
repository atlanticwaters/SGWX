import { defineType, defineField } from 'sanity'
import { CommentIcon } from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  preview: {
    select: {
      quote: 'quote',
      authorName: 'authorName',
      role: 'role',
      media: 'photo',
    },
    prepare({ quote, authorName, role, media }) {
      const title = quote
        ? quote.length > 80
          ? `${quote.slice(0, 80)}...`
          : quote
        : 'No quote'
      const subtitle = [authorName, role].filter(Boolean).join(', ')
      return {
        title,
        subtitle,
        media,
      }
    },
  },
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorName',
      type: 'string',
      title: 'Author Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role',
    }),
    defineField({
      name: 'company',
      type: 'string',
      title: 'Company',
    }),
    defineField({
      name: 'industry',
      type: 'string',
      title: 'Industry Vertical',
      description: 'Used to match this testimonial with landing page verticals',
      options: {
        list: [
          'Healthcare', 'Automotive', 'Sports', 'Technology',
          'Finance', 'Retail', 'CPG', 'Entertainment',
          'Education', 'Real Estate',
        ],
      },
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: { hotspot: true },
    }),
  ],
})
