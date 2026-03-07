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
    { name: 'stages', title: 'Stages' },
    { name: 'sixSteps', title: 'Six Steps' },
    { name: 'principles', title: 'Principles' },
    { name: 'governance', title: 'Governance' },
    { name: 'fit', title: 'Fit Check' },
    { name: 'closing', title: 'Closing' },
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

    // ── Stages ───────────────────────────────────────────────
    defineField({
      name: 'stages',
      type: 'array',
      title: 'Stages',
      group: 'stages',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'id', type: 'string', title: 'ID' }),
            defineField({ name: 'number', type: 'string', title: 'Number' }),
            defineField({ name: 'name', type: 'string', title: 'Name' }),
            defineField({
              name: 'accent',
              type: 'string',
              title: 'Accent',
              options: { list: ['green', 'cyan'] },
            }),
            defineField({ name: 'focus', type: 'text', title: 'Focus', rows: 3 }),
            defineField({
              name: 'services',
              type: 'array',
              title: 'Services',
              of: [defineArrayMember({ type: 'string' })],
            }),
            defineField({
              name: 'proof',
              type: 'object',
              title: 'Proof',
              fields: [
                defineField({ name: 'client', type: 'string', title: 'Client' }),
                defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
                defineField({ name: 'result', type: 'string', title: 'Result' }),
              ],
            }),
            defineField({ name: 'glowPosition', type: 'string', title: 'Glow Position' }),
            defineField({ name: 'deepFieldVariant', type: 'number', title: 'Deep Field Variant' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'number' },
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

    // ── Fit ──────────────────────────────────────────────────
    defineField({ name: 'fitEyebrow', type: 'string', title: 'Eyebrow', group: 'fit' }),
    defineField({ name: 'fitHeading', type: 'string', title: 'Heading', group: 'fit' }),
    defineField({
      name: 'fitGoodItems',
      type: 'array',
      title: 'Good Fit Items',
      of: [defineArrayMember({ type: 'string' })],
      group: 'fit',
    }),
    defineField({
      name: 'fitNotItems',
      type: 'array',
      title: 'Not a Fit Items',
      of: [defineArrayMember({ type: 'string' })],
      group: 'fit',
    }),

    // ── Closing ──────────────────────────────────────────────
    defineField({
      name: 'closingStageWords',
      type: 'array',
      title: 'Stage Words',
      group: 'closing',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'text', type: 'string', title: 'Text' }),
            defineField({ name: 'color', type: 'string', title: 'CSS Color Class' }),
          ],
          preview: { select: { title: 'text' } },
        }),
      ],
    }),
    defineField({ name: 'closingWordmark', type: 'string', title: 'Wordmark', group: 'closing' }),
    defineField({ name: 'closingTagline', type: 'string', title: 'Tagline', group: 'closing' }),
    defineField({ name: 'closingCta', type: 'callToAction', title: 'Closing CTA', group: 'closing' }),
    defineField({ name: 'closeHeading', type: 'string', title: 'Close Section Heading', group: 'closing' }),
    defineField({ name: 'closeBody', type: 'text', title: 'Close Section Body', rows: 3, group: 'closing' }),
    defineField({ name: 'closeCta', type: 'callToAction', title: 'Close Section CTA', group: 'closing' }),

    // ── SEO ──────────────────────────────────────────────────
    defineField({ name: 'seo', type: 'seo', title: 'SEO', group: 'seo' }),
  ],
})
