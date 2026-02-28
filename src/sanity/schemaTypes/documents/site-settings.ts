import { defineType, defineField, defineArrayMember } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
  fields: [
    defineField({
      name: 'siteTitle',
      type: 'string',
      title: 'Site Title',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Site Description',
      rows: 3,
    }),
    defineField({
      name: 'navigation',
      type: 'array',
      title: 'Navigation',
      of: [
        defineArrayMember({
          type: 'object',
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
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'isCta',
              type: 'boolean',
              title: 'Is CTA',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'footer',
      type: 'object',
      title: 'Footer',
      fields: [
        defineField({
          name: 'copyright',
          type: 'string',
          title: 'Copyright',
        }),
        defineField({
          name: 'socialLinks',
          type: 'array',
          title: 'Social Links',
          of: [defineArrayMember({ type: 'socialLink' })],
        }),
      ],
    }),
  ],
})
