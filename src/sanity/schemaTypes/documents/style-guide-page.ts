import { defineType, defineField } from 'sanity'

export const styleGuidePage = defineType({
  name: 'styleGuidePage',
  title: 'Style Guide Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Header', default: true },
    { name: 'sections', title: 'Sections' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── Header ──
    defineField({
      name: 'headerHeading',
      title: 'Header Heading',
      type: 'string',
      group: 'header',
    }),
    defineField({
      name: 'headerSubheading',
      title: 'Header Subheading',
      type: 'text',
      rows: 3,
      group: 'header',
    }),

    // ── Section Descriptions ──
    defineField({
      name: 'sectionDescriptions',
      title: 'Section Descriptions',
      type: 'array',
      group: 'sections',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'sectionId', title: 'Section ID', type: 'string' }),
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'heading', subtitle: 'sectionId' },
          },
        },
      ],
    }),

    // ── SEO ──
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Style Guide Page' }),
  },
})
