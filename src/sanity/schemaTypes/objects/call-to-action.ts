import { defineType, defineField } from 'sanity'
import { LaunchIcon } from '@sanity/icons'

export const callToAction = defineType({
  name: 'callToAction',
  title: 'Call to Action',
  type: 'object',
  icon: LaunchIcon,
  preview: {
    select: {
      title: 'label',
      subtitle: 'href',
    },
  },
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      type: 'string',
      title: 'Href',
      description: 'URL or path e.g. /contact',
    }),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Variant',
      options: {
        layout: 'radio',
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Ghost', value: 'ghost' },
        ],
      },
      initialValue: 'primary',
    }),
  ],
})
