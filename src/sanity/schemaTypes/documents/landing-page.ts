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
      name: 'clientName',
      type: 'string',
      title: 'Client Name',
      description: 'The prospect/client this page targets',
    }),
    defineField({
      name: 'template',
      type: 'string',
      title: 'Template',
      options: {
        layout: 'radio',
        list: [
          { title: 'Bold Hero', value: 'bold-hero' },
          { title: 'Minimal', value: 'minimal' },
          { title: 'Services Showcase', value: 'services-showcase' },
        ],
      },
      initialValue: 'bold-hero',
    }),
    defineField({
      name: 'verticals',
      type: 'array',
      title: 'Industry Verticals',
      description: 'Up to 3 verticals to filter content (case studies, posts, testimonials)',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Healthcare', value: 'Healthcare' },
          { title: 'Automotive', value: 'Automotive' },
          { title: 'Sports', value: 'Sports' },
          { title: 'Technology', value: 'Technology' },
          { title: 'Finance', value: 'Finance' },
          { title: 'Retail', value: 'Retail' },
          { title: 'CPG', value: 'CPG' },
          { title: 'Entertainment', value: 'Entertainment' },
          { title: 'Education', value: 'Education' },
          { title: 'Real Estate', value: 'Real Estate' },
        ],
      },
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'heroHeading',
      type: 'string',
      title: 'Hero Heading',
      description: 'Custom hero heading (defaults to client name if empty)',
    }),
    defineField({
      name: 'heroSubheading',
      type: 'text',
      title: 'Hero Subheading',
      rows: 3,
    }),
    defineField({
      name: 'ctaLabel',
      type: 'string',
      title: 'CTA Label',
      initialValue: "Let's Talk",
    }),
    defineField({
      name: 'ctaHref',
      type: 'string',
      title: 'CTA Link',
      initialValue: '/contact',
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
