import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled',
        subtitle: slug ? `/${slug}` : '',
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
        defineArrayMember({ type: 'spotlightsFeed' }),
        defineArrayMember({ type: 'caseStudyFeed' }),
        defineArrayMember({ type: 'richTextSection' }),
        defineArrayMember({ type: 'logoWall' }),
        defineArrayMember({ type: 'callToActionBanner' }),
        defineArrayMember({ type: 'processOverview' }),
      ],
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
    }),
  ],
})
