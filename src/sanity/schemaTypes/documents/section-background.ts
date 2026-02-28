import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const sectionBackground = defineType({
  name: 'sectionBackground',
  title: 'Section Background',
  type: 'document',
  icon: ImageIcon,
  preview: {
    select: {
      title: 'name',
      media: 'image',
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
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'credit',
      type: 'string',
      title: 'Credit',
    }),
    defineField({
      name: 'sourceUrl',
      type: 'url',
      title: 'Source URL',
    }),
    defineField({
      name: 'overlayColor',
      type: 'string',
      title: 'Overlay Color',
      description: 'Color tint applied over the background image',
      options: {
        list: [
          { title: 'Sage Green (Default)', value: 'sage' },
          { title: 'Steel Blue', value: 'steel' },
          { title: 'Deep Teal', value: 'teal' },
          { title: 'Warm Amber', value: 'amber' },
          { title: 'Carbon (Neutral)', value: 'carbon' },
        ],
        layout: 'radio',
      },
      initialValue: 'sage',
    }),
  ],
})
