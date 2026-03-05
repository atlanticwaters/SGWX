import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'changingGame', title: 'Changing Game' },
    { name: 'comparison', title: 'Comparison Table' },
    { name: 'clients', title: 'Client Segments' },
    { name: 'experts', title: 'Experts' },
    { name: 'process', title: 'Process' },
    { name: 'impact', title: 'Impact / Case Studies' },
    { name: 'spotlights', title: 'Spotlights' },
    { name: 'finalCta', title: 'Final CTA' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── SEO ────────────────────────────────────────────────
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),

    // ── Hero ───────────────────────────────────────────────
    defineField({
      name: 'heroHeading',
      type: 'string',
      title: 'Heading',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroParagraph1',
      type: 'text',
      title: 'Primary Paragraph',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroParagraph2',
      type: 'text',
      title: 'Secondary Paragraph',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCta',
      type: 'callToAction',
      title: 'Primary CTA',
      group: 'hero',
    }),
    defineField({
      name: 'heroSecondaryCta',
      type: 'callToAction',
      title: 'Secondary CTA',
      group: 'hero',
    }),

    // ── Changing Game ──────────────────────────────────────
    defineField({
      name: 'changingGameHeading',
      type: 'string',
      title: 'Heading',
      group: 'changingGame',
    }),
    defineField({
      name: 'changingGameCards',
      type: 'array',
      title: 'Cards',
      group: 'changingGame',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'heading', type: 'string', title: 'Heading' }),
            defineField({ name: 'body', type: 'text', title: 'Body', rows: 3 }),
          ],
          preview: {
            select: { title: 'heading' },
          },
        },
      ],
    }),

    // ── Comparison Table ───────────────────────────────────
    defineField({
      name: 'comparisonEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'comparison',
    }),
    defineField({
      name: 'comparisonHeading',
      type: 'string',
      title: 'Heading',
      group: 'comparison',
    }),
    defineField({
      name: 'comparisonColumns',
      type: 'object',
      title: 'Column Headers',
      group: 'comparison',
      fields: [
        defineField({ name: 'criteria', type: 'string', title: 'Criteria Column' }),
        defineField({ name: 'agency', type: 'string', title: 'Agency Column' }),
        defineField({ name: 'freelance', type: 'string', title: 'Freelance Column' }),
        defineField({ name: 'sageworx', type: 'string', title: 'Sageworx Column' }),
      ],
    }),
    defineField({
      name: 'comparisonRows',
      type: 'array',
      title: 'Rows',
      group: 'comparison',
      of: [{ type: 'comparisonRow' }],
    }),
    defineField({
      name: 'comparisonCta',
      type: 'callToAction',
      title: 'CTA Button',
      group: 'comparison',
    }),

    // ── Client Segments ────────────────────────────────────
    defineField({
      name: 'clientsEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'clients',
    }),
    defineField({
      name: 'clientsHeading',
      type: 'string',
      title: 'Heading',
      group: 'clients',
    }),
    defineField({
      name: 'clientSegments',
      type: 'array',
      title: 'Client Segments',
      group: 'clients',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'type', type: 'string', title: 'Client Type' }),
            defineField({ name: 'painPoint', type: 'text', title: 'Pain Point', rows: 2 }),
            defineField({ name: 'solution', type: 'text', title: 'Sageworx Solution', rows: 2 }),
          ],
          preview: {
            select: { title: 'type' },
          },
        },
      ],
    }),

    // ── Experts ────────────────────────────────────────────
    defineField({
      name: 'expertsEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'experts',
    }),
    defineField({
      name: 'expertsHeading',
      type: 'string',
      title: 'Heading',
      group: 'experts',
    }),
    defineField({
      name: 'expertsSubheading',
      type: 'text',
      title: 'Subheading',
      rows: 2,
      group: 'experts',
    }),

    // ── Process ────────────────────────────────────────────
    defineField({
      name: 'processEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'process',
    }),
    defineField({
      name: 'processHeading',
      type: 'string',
      title: 'Heading',
      group: 'process',
    }),
    defineField({
      name: 'processSubheading',
      type: 'text',
      title: 'Subheading',
      rows: 2,
      group: 'process',
    }),
    defineField({
      name: 'processStages',
      type: 'array',
      title: 'Stages',
      group: 'process',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', type: 'string', title: 'Number (e.g. "01")' }),
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({ name: 'id', type: 'string', title: 'Anchor ID (e.g. "launch")' }),
            defineField({ name: 'description', type: 'text', title: 'Description', rows: 2 }),
            defineField({
              name: 'accent',
              type: 'string',
              title: 'Accent Color',
              options: { list: ['green', 'cyan'], layout: 'radio' },
              initialValue: 'green',
            }),
          ],
          preview: {
            select: { number: 'number', title: 'title' },
            prepare({ number, title }) {
              return { title: `${number} — ${title}` }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'processFooterLink',
      type: 'callToAction',
      title: 'Footer Link',
      group: 'process',
    }),

    // ── Impact / Case Studies ──────────────────────────────
    defineField({
      name: 'impactEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'impact',
    }),
    defineField({
      name: 'impactHeading',
      type: 'string',
      title: 'Heading',
      group: 'impact',
    }),
    defineField({
      name: 'logoWallHeading',
      type: 'string',
      title: 'Logo Wall Heading',
      group: 'impact',
    }),
    defineField({
      name: 'logos',
      type: 'array',
      title: 'Logo Names',
      group: 'impact',
      of: [{ type: 'string' }],
    }),

    // ── Spotlights ─────────────────────────────────────────
    defineField({
      name: 'spotlightsEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'spotlights',
    }),
    defineField({
      name: 'spotlightsHeading',
      type: 'text',
      title: 'Heading',
      rows: 3,
      group: 'spotlights',
    }),
    defineField({
      name: 'spotlightsCta',
      type: 'callToAction',
      title: 'CTA Button',
      group: 'spotlights',
    }),

    // ── Final CTA ──────────────────────────────────────────
    defineField({
      name: 'finalCtaHeading',
      type: 'string',
      title: 'Heading',
      group: 'finalCta',
    }),
    defineField({
      name: 'finalCtaPrimaryCta',
      type: 'callToAction',
      title: 'Primary CTA',
      group: 'finalCta',
    }),
    defineField({
      name: 'finalCtaSecondaryCta',
      type: 'callToAction',
      title: 'Secondary CTA',
      group: 'finalCta',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage' }
    },
  },
})
