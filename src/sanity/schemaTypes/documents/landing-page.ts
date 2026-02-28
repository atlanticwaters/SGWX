import { defineType, defineField, defineArrayMember } from 'sanity'
import { RocketIcon } from '@sanity/icons'

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  icon: RocketIcon,
  preview: {
    select: {
      title: 'title',
      campaign: 'campaign',
      status: 'status',
    },
    prepare({ title, campaign, status }) {
      const subtitle = [campaign, status].filter(Boolean).join(' — ')
      return {
        title: title || 'Untitled',
        subtitle,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'campaign',
      type: 'string',
      title: 'Campaign',
      description: 'Campaign identifier for tracking',
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        layout: 'radio',
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Active', value: 'active' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        defineArrayMember({ type: 'heroStatement' }),
        defineArrayMember({ type: 'featureCards' }),
        defineArrayMember({ type: 'comparisonTable' }),
        defineArrayMember({ type: 'clientSegments' }),
        defineArrayMember({ type: 'statsGrid' }),
        defineArrayMember({ type: 'contentSplit' }),
        defineArrayMember({ type: 'richTextSection' }),
        defineArrayMember({ type: 'logoWall' }),
        defineArrayMember({ type: 'callToActionBanner' }),
      ],
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
    }),
  ],
})
