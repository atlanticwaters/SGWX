import { defineType, defineField, defineArrayMember } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const membersPage = defineType({
  name: 'membersPage',
  title: 'Members Page',
  type: 'document',
  icon: UsersIcon,
  preview: {
    prepare() {
      return { title: 'Members Page' }
    },
  },
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'origin', title: 'Origin' },
    { name: 'growth', title: 'Growth' },
    { name: 'stats', title: 'Stats' },
    { name: 'join', title: 'Join' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────────
    defineField({ name: 'heroHeading', type: 'string', title: 'Heading', group: 'hero' }),
    defineField({ name: 'heroBody', type: 'text', title: 'Body', rows: 4, group: 'hero' }),

    // ── Origin ───────────────────────────────────────────────
    defineField({ name: 'originEyebrow', type: 'string', title: 'Eyebrow', group: 'origin' }),
    defineField({ name: 'originHeading', type: 'string', title: 'Heading', group: 'origin' }),
    defineField({
      name: 'originParagraphs',
      type: 'array',
      title: 'Paragraphs',
      of: [defineArrayMember({ type: 'text', rows: 4 })],
      group: 'origin',
    }),

    // ── Growth ───────────────────────────────────────────────
    defineField({ name: 'growthEyebrow', type: 'string', title: 'Eyebrow', group: 'growth' }),
    defineField({ name: 'growthHeading', type: 'string', title: 'Heading', group: 'growth' }),
    defineField({
      name: 'growthParagraphs',
      type: 'array',
      title: 'Paragraphs',
      of: [defineArrayMember({ type: 'text', rows: 4 })],
      group: 'growth',
    }),

    // ── Stats ────────────────────────────────────────────────
    defineField({ name: 'statsEyebrow', type: 'string', title: 'Eyebrow', group: 'stats' }),
    defineField({ name: 'statsHeading', type: 'string', title: 'Heading', group: 'stats' }),
    defineField({
      name: 'statsParagraphs',
      type: 'array',
      title: 'Paragraphs',
      of: [defineArrayMember({ type: 'text', rows: 4 })],
      group: 'stats',
    }),
    defineField({
      name: 'statsItems',
      type: 'array',
      title: 'Stats',
      of: [defineArrayMember({ type: 'stat' })],
      group: 'stats',
    }),

    // ── Join ─────────────────────────────────────────────────
    defineField({ name: 'joinHeading', type: 'string', title: 'Heading', group: 'join' }),
    defineField({ name: 'joinSubheading', type: 'string', title: 'Subheading', group: 'join' }),
    defineField({
      name: 'joinParagraphs',
      type: 'array',
      title: 'Paragraphs',
      of: [defineArrayMember({ type: 'text', rows: 4 })],
      group: 'join',
    }),
    defineField({ name: 'joinCta', type: 'callToAction', title: 'CTA', group: 'join' }),

    // ── SEO ──────────────────────────────────────────────────
    defineField({ name: 'seo', type: 'seo', title: 'SEO', group: 'seo' }),
  ],
})
