import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  icon: LinkIcon,
  preview: {
    select: {
      title: 'platform',
      subtitle: 'url',
    },
  },
  fields: [
    defineField({
      name: 'platform',
      type: 'string',
      title: 'Platform',
      validation: (rule) => rule.required(),
      options: {
        list: [
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Twitter', value: 'twitter' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'GitHub', value: 'github' },
          { title: 'Website', value: 'website' },
        ],
      },
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
      validation: (rule) =>
        rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
  ],
})
