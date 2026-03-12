import { defineType, defineField, defineArrayMember } from 'sanity'
import { RocketIcon } from '@sanity/icons'

export const modelPage = defineType({
  name: 'modelPage',
  title: 'Model Page',
  type: 'document',
  icon: RocketIcon,
  preview: {
    prepare() {
      return { title: 'Model Page' }
    },
  },
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'rightTeam', title: 'Right Team' },
    { name: 'capabilities', title: 'Capabilities' },
    { name: 'microteams', title: 'Microteams' },
    { name: 'momentum', title: 'Momentum' },
    { name: 'icp', title: 'Built for You' },
    { name: 'continuity', title: 'Continuity' },
    { name: 'technology', title: 'Technology' },
    { name: 'fit', title: 'Fit Check' },
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
    defineField({
      name: 'heroEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeading',
      type: 'string',
      title: 'Heading',
      group: 'hero',
    }),
    defineField({
      name: 'heroBody',
      type: 'text',
      title: 'Body',
      rows: 4,
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

    // ── Right Team ───────────────────────────────────────────
    defineField({
      name: 'rightTeamBackground',
      type: 'reference',
      title: 'Background',
      description: 'Optional background image for this section',
      to: [{ type: 'sectionBackground' }],
      group: 'rightTeam',
    }),
    defineField({
      name: 'rightTeamAlign',
      type: 'string',
      title: 'Alignment',
      description: 'Left or right align the content',
      group: 'rightTeam',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'right',
    }),
    defineField({
      name: 'rightTeamInlineImage',
      type: 'image',
      title: 'Inline Image',
      description: 'Optional image displayed alongside the copy block',
      group: 'rightTeam',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        }),
      ],
    }),
    defineField({
      name: 'rightTeamEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'rightTeam',
    }),
    defineField({
      name: 'rightTeamHeading',
      type: 'string',
      title: 'Heading',
      group: 'rightTeam',
    }),
    defineField({
      name: 'rightTeamParagraphs',
      type: 'array',
      title: 'Paragraphs',
      of: [defineArrayMember({ type: 'text', rows: 4 })],
      group: 'rightTeam',
    }),

    // ── Capabilities ─────────────────────────────────────────
    defineField({
      name: 'capabilitiesBackground',
      type: 'reference',
      title: 'Background',
      description: 'Optional background image for this section',
      to: [{ type: 'sectionBackground' }],
      group: 'capabilities',
    }),
    defineField({
      name: 'capabilitiesEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'capabilities',
    }),
    defineField({
      name: 'capabilitiesTabs',
      type: 'array',
      title: 'Tabs',
      group: 'capabilities',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'id', type: 'string', title: 'ID' }),
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({
              name: 'items',
              type: 'array',
              title: 'Items',
              of: [defineArrayMember({ type: 'string' })],
            }),
          ],
          preview: {
            select: { title: 'label' },
          },
        }),
      ],
    }),

    // ── Microteams ───────────────────────────────────────────
    defineField({
      name: 'microteamsBackground',
      type: 'reference',
      title: 'Background',
      description: 'Optional background image for this section',
      to: [{ type: 'sectionBackground' }],
      group: 'microteams',
    }),
    defineField({
      name: 'microteamsAlign',
      type: 'string',
      title: 'Alignment',
      description: 'Left or right align the content',
      group: 'microteams',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'right',
    }),
    defineField({
      name: 'microteamsInlineImage',
      type: 'image',
      title: 'Inline Image',
      description: 'Optional image displayed alongside the copy block',
      group: 'microteams',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        }),
      ],
    }),
    defineField({
      name: 'microteamsEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'microteams',
    }),
    defineField({
      name: 'microteamsHeading',
      type: 'string',
      title: 'Heading',
      group: 'microteams',
    }),
    defineField({
      name: 'microteamsBody',
      type: 'text',
      title: 'Body',
      rows: 4,
      group: 'microteams',
    }),
    defineField({
      name: 'microteamsBullets',
      type: 'array',
      title: 'Bullets',
      of: [defineArrayMember({ type: 'string' })],
      group: 'microteams',
    }),
    defineField({
      name: 'microteamsClosing',
      type: 'text',
      title: 'Closing Text',
      rows: 3,
      group: 'microteams',
    }),

    // ── Momentum ─────────────────────────────────────────────
    defineField({
      name: 'momentumBackground',
      type: 'reference',
      title: 'Background',
      description: 'Optional background image for this section',
      to: [{ type: 'sectionBackground' }],
      group: 'momentum',
    }),
    defineField({
      name: 'momentumAlign',
      type: 'string',
      title: 'Alignment',
      description: 'Left or right align the content',
      group: 'momentum',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'momentumInlineImage',
      type: 'image',
      title: 'Inline Image',
      description: 'Optional image displayed alongside the copy block',
      group: 'momentum',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        }),
      ],
    }),
    defineField({
      name: 'momentumEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'momentum',
    }),
    defineField({
      name: 'momentumHeading',
      type: 'string',
      title: 'Heading',
      group: 'momentum',
    }),
    defineField({
      name: 'momentumBody',
      type: 'text',
      title: 'Body',
      rows: 4,
      group: 'momentum',
    }),
    defineField({
      name: 'momentumBullets',
      type: 'array',
      title: 'Bullets',
      of: [defineArrayMember({ type: 'string' })],
      group: 'momentum',
    }),
    defineField({
      name: 'momentumClosing',
      type: 'text',
      title: 'Closing Text',
      rows: 3,
      group: 'momentum',
    }),

    // ── ICP ──────────────────────────────────────────────────
    defineField({
      name: 'icpBackground',
      type: 'reference',
      title: 'Background',
      description: 'Optional background image for this section',
      to: [{ type: 'sectionBackground' }],
      group: 'icp',
    }),
    defineField({
      name: 'icpEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'icp',
    }),
    defineField({
      name: 'icpHeading',
      type: 'string',
      title: 'Heading',
      group: 'icp',
    }),
    defineField({
      name: 'icpSubheading',
      type: 'text',
      title: 'Subheading',
      rows: 2,
      group: 'icp',
    }),
    defineField({
      name: 'icpCards',
      type: 'array',
      title: 'Cards',
      group: 'icp',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'badge', type: 'string', title: 'Badge' }),
            defineField({ name: 'headline', type: 'string', title: 'Headline' }),
            defineField({ name: 'body', type: 'text', title: 'Body', rows: 4 }),
            defineField({ name: 'testimonialQuote', type: 'text', title: 'Testimonial Quote', rows: 4 }),
            defineField({ name: 'testimonialAttribution', type: 'string', title: 'Testimonial Attribution' }),
            defineField({ name: 'testimonialPhoto', type: 'image', title: 'Testimonial Photo', options: { hotspot: true } }),
          ],
          preview: {
            select: { title: 'badge', subtitle: 'headline' },
          },
        }),
      ],
    }),

    // ── Continuity ───────────────────────────────────────────
    defineField({
      name: 'continuityBackground',
      type: 'reference',
      title: 'Background',
      description: 'Optional background image for this section',
      to: [{ type: 'sectionBackground' }],
      group: 'continuity',
    }),
    defineField({
      name: 'continuityAlign',
      type: 'string',
      title: 'Alignment',
      description: 'Left or right align the content',
      group: 'continuity',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'continuityInlineImage',
      type: 'image',
      title: 'Inline Image',
      description: 'Optional image displayed alongside the copy block',
      group: 'continuity',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        }),
      ],
    }),
    defineField({
      name: 'continuityEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'continuity',
    }),
    defineField({
      name: 'continuityHeading',
      type: 'string',
      title: 'Heading',
      group: 'continuity',
    }),
    defineField({
      name: 'continuityParagraphs',
      type: 'array',
      title: 'Paragraphs',
      of: [defineArrayMember({ type: 'text', rows: 4 })],
      group: 'continuity',
    }),

    // ── Technology ───────────────────────────────────────────
    defineField({
      name: 'technologyBackground',
      type: 'reference',
      title: 'Background',
      description: 'Optional background image for this section',
      to: [{ type: 'sectionBackground' }],
      group: 'technology',
    }),
    defineField({
      name: 'technologyAlign',
      type: 'string',
      title: 'Alignment',
      description: 'Left or right align the content',
      group: 'technology',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'right',
    }),
    defineField({
      name: 'technologyInlineImage',
      type: 'image',
      title: 'Inline Image',
      description: 'Optional image displayed alongside the copy block',
      group: 'technology',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        }),
      ],
    }),
    defineField({
      name: 'technologyEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'technology',
    }),
    defineField({
      name: 'technologyHeading',
      type: 'string',
      title: 'Heading',
      group: 'technology',
    }),
    defineField({
      name: 'technologyParagraphs',
      type: 'array',
      title: 'Paragraphs',
      of: [defineArrayMember({ type: 'text', rows: 4 })],
      group: 'technology',
    }),

    // ── Fit ──────────────────────────────────────────────────
    defineField({
      name: 'fitBackground',
      type: 'reference',
      title: 'Background',
      description: 'Optional background image for this section',
      to: [{ type: 'sectionBackground' }],
      group: 'fit',
    }),
    defineField({
      name: 'fitEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'fit',
    }),
    defineField({
      name: 'fitHeading',
      type: 'string',
      title: 'Heading',
      group: 'fit',
    }),
    defineField({
      name: 'fitSubheading',
      type: 'text',
      title: 'Subheading',
      rows: 2,
      group: 'fit',
    }),
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
    defineField({
      name: 'fitClosing',
      type: 'text',
      title: 'Closing Text',
      rows: 3,
      group: 'fit',
    }),
    defineField({
      name: 'fitCtas',
      type: 'array',
      title: 'CTAs',
      of: [defineArrayMember({ type: 'callToAction' })],
      group: 'fit',
    }),

    // ── SEO ──────────────────────────────────────────────────
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
})
