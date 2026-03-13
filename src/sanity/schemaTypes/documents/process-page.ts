import { defineType, defineField, defineArrayMember } from 'sanity'
import { ActivityIcon } from '@sanity/icons'

export const processPage = defineType({
  name: 'processPage',
  title: 'Process Page',
  type: 'document',
  icon: ActivityIcon,
  preview: {
    prepare() {
      return { title: 'Process Page' }
    },
  },
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'principles', title: 'Principles' },
    { name: 'sixSteps', title: 'Six Steps' },
    { name: 'governance', title: 'Governance' },
    { name: 'cta', title: 'CTA' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────────
    defineField({
      name: 'heroBackground',
      type: 'reference',
      title: 'Hero Background',
      description: 'Background image for the hero section',
      to: [{ type: 'sectionBackground' }],
      group: 'hero',
    }),
    defineField({ name: 'heroEyebrow', type: 'string', title: 'Eyebrow', group: 'hero' }),
    defineField({ name: 'heroHeading', type: 'string', title: 'Heading', group: 'hero' }),
    defineField({ name: 'heroBody', type: 'text', title: 'Body', rows: 3, group: 'hero' }),

    // ── Principles ───────────────────────────────────────────
    defineField({ name: 'principlesEyebrow', type: 'string', title: 'Eyebrow', group: 'principles' }),
    defineField({ name: 'principlesHeading', type: 'string', title: 'Heading', group: 'principles' }),
    defineField({ name: 'principlesSubheading', type: 'text', title: 'Subheading', rows: 3, group: 'principles' }),
    defineField({
      name: 'principlesCards',
      type: 'array',
      title: 'Cards',
      group: 'principles',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'badge', type: 'string', title: 'Badge' }),
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({
              name: 'paragraphs',
              type: 'array',
              title: 'Paragraphs',
              of: [defineArrayMember({ type: 'text', rows: 4 })],
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'badge' },
          },
        }),
      ],
    }),

    // ── Six Steps ────────────────────────────────────────────
    defineField({ name: 'sixStepsEyebrow', type: 'string', title: 'Eyebrow', group: 'sixSteps' }),
    defineField({ name: 'sixStepsHeading', type: 'string', title: 'Heading', group: 'sixSteps' }),
    defineField({
      name: 'sixStepsItems',
      type: 'array',
      title: 'Steps',
      group: 'sixSteps',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'num', type: 'string', title: 'Number' }),
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({ name: 'whatsHappening', type: 'text', title: "What's Happening", rows: 3 }),
            defineField({ name: 'whyItMatters', type: 'text', title: 'Why It Matters', rows: 2 }),
            defineField({ name: 'whatYouGet', type: 'text', title: 'What You Get', rows: 4 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'num' },
          },
        }),
      ],
    }),

    // ── Governance ───────────────────────────────────────────
    defineField({ name: 'governanceEyebrow', type: 'string', title: 'Eyebrow', group: 'governance' }),
    defineField({ name: 'governanceHeading', type: 'string', title: 'Heading', group: 'governance' }),
    defineField({
      name: 'governanceBullets',
      type: 'array',
      title: 'Bullets',
      of: [defineArrayMember({ type: 'text', rows: 4 })],
      group: 'governance',
    }),

    // ── CTA ──────────────────────────────────────────────────
    defineField({ name: 'closeHeading', type: 'string', title: 'Heading', group: 'cta' }),
    defineField({ name: 'closeCta', type: 'callToAction', title: 'CTA Button', group: 'cta' }),

    // ── SEO ──────────────────────────────────────────────────
    defineField({ name: 'seo', type: 'seo', title: 'SEO', group: 'seo' }),
  ],
})
