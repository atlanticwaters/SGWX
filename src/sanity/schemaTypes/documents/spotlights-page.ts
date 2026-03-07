import { defineType, defineField } from 'sanity'
import { BulbOutlineIcon } from '@sanity/icons'

export const spotlightsPage = defineType({
  name: 'spotlightsPage',
  title: 'Spotlights Page',
  type: 'document',
  icon: BulbOutlineIcon,
  preview: {
    prepare() {
      return { title: 'Spotlights Page' }
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
    defineField({ name: 'seo', type: 'seo', title: 'SEO', group: 'seo' }),
  ],
})
