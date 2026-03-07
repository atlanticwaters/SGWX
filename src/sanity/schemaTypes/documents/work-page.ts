import { defineType, defineField } from 'sanity'
import { DocumentsIcon } from '@sanity/icons'

export const workPage = defineType({
  name: 'workPage',
  title: 'Work Page',
  type: 'document',
  icon: DocumentsIcon,
  preview: {
    prepare() {
      return { title: 'Work Page' }
    },
  },
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'heroBackground',
      type: 'reference',
      title: 'Hero Background',
      description: 'Background image for the hero section',
      to: [{ type: 'sectionBackground' }],
      group: 'hero',
    }),
    defineField({ name: 'heroHeading', type: 'string', title: 'Heading', group: 'hero' }),
    defineField({ name: 'heroSubheading', type: 'text', title: 'Subheading', rows: 3, group: 'hero' }),
    defineField({ name: 'heroProjectsLabel', type: 'string', title: 'Projects Label', group: 'hero' }),
    defineField({ name: 'heroStatusLabel', type: 'string', title: 'Status Label', group: 'hero' }),
    defineField({ name: 'heroStatusValue', type: 'string', title: 'Status Value', group: 'hero' }),
    defineField({ name: 'seo', type: 'seo', title: 'SEO', group: 'seo' }),
  ],
})
