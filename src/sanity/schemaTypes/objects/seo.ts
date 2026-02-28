import { defineType, defineField } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'SEO Title',
      description: 'Overrides the page title for search engines',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'SEO Description',
      rows: 3,
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Social Sharing Image',
      options: { hotspot: true },
      description: '1200x630 recommended',
    }),
    defineField({
      name: 'noIndex',
      type: 'boolean',
      title: 'Hide from Search Engines',
      initialValue: false,
    }),
  ],
})
