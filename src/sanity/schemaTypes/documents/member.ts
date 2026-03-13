import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const member = defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  icon: UsersIcon,
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'photo',
    },
  },
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Role/Title',
    }),
    defineField({
      name: 'profileTitles',
      type: 'array',
      title: 'Profile Titles',
      description: 'Three title lines shown on the member profile page (instead of Role/Title)',
      of: [{ type: 'string' }],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'mantra',
      type: 'text',
      title: 'Mantra',
      rows: 2,
    }),
    defineField({
      name: 'characterMetaphor',
      type: 'string',
      title: 'Character Metaphor',
    }),
    defineField({
      name: 'bio',
      type: 'text',
      title: 'Bio',
    }),
    defineField({
      name: 'favoriteTools',
      type: 'string',
      title: 'Favorite Tools',
    }),
    defineField({
      name: 'link',
      type: 'object',
      title: 'Link',
      fields: [
        defineField({
          name: 'label',
          type: 'string',
          title: 'Label',
        }),
        defineField({
          name: 'url',
          type: 'url',
          title: 'URL',
        }),
      ],
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: { hotspot: true },
    }),
    defineField({
      name: 'isFeatured',
      type: 'boolean',
      title: 'Is Featured',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Order',
    }),
  ],
})
