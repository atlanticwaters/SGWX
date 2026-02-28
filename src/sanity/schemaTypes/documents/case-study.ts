import { defineType, defineField, defineArrayMember } from 'sanity'
import { ProjectsIcon } from '@sanity/icons'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: ProjectsIcon,
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'thumbnail',
    },
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      type: 'string',
      title: 'Client',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'industry',
      type: 'string',
      title: 'Industry Vertical',
      description: 'Used to match this case study with landing page verticals',
      options: {
        list: [
          'Healthcare', 'Automotive', 'Sports', 'Technology',
          'Finance', 'Retail', 'CPG', 'Entertainment',
          'Education', 'Real Estate',
        ],
      },
    }),
    defineField({
      name: 'year',
      type: 'string',
      title: 'Year',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      title: 'Short Description',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'longDescription',
      type: 'array',
      title: 'Long Description',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'thumbnail',
      type: 'image',
      title: 'Thumbnail',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'galleryImages',
      type: 'array',
      title: 'Gallery Images',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'testimonial',
      type: 'object',
      title: 'Testimonial',
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
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Order',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
    }),
  ],
})
