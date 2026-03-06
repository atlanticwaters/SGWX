import { defineType, defineField } from 'sanity'

export const animationsPage = defineType({
  name: 'animationsPage',
  title: 'Animations Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Header', default: true },
    { name: 'threeAnimations', title: 'Three.js Animations' },
    { name: 'deepFields', title: 'Deep Fields' },
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

    // ── Three.js Animations ──
    defineField({
      name: 'threeAnimations',
      title: 'Three.js Animations',
      type: 'array',
      group: 'threeAnimations',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'fileName', title: 'File Name', type: 'string' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'fileName' },
          },
        },
      ],
    }),

    // ── Deep Fields ──
    defineField({
      name: 'deepFields',
      title: 'Deep Fields',
      type: 'array',
      group: 'deepFields',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'variant', title: 'Variant', type: 'number' }),
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
            defineField({ name: 'technique', title: 'Technique', type: 'text', rows: 2 }),
            defineField({ name: 'bgColor', title: 'Background Color', type: 'string' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'subtitle' },
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
    prepare: () => ({ title: 'Animations Page' }),
  },
})
