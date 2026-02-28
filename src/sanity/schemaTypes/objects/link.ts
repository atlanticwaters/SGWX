import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'linkType',
      type: 'string',
      title: 'Link Type',
      options: {
        layout: 'radio',
        list: [
          { title: 'Internal', value: 'internal' },
          { title: 'External', value: 'external' },
        ],
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'internalLink',
      type: 'reference',
      title: 'Internal Link',
      to: [{ type: 'page' }, { type: 'landingPage' }],
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      type: 'url',
      title: 'External URL',
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'openInNewTab',
      type: 'boolean',
      title: 'Open in New Tab',
      initialValue: false,
    }),
  ],
})
