import { defineType, defineField } from 'sanity'
import { SquareIcon } from '@sanity/icons'

export const cardStyle = defineType({
  name: 'cardStyle',
  title: 'Card Style',
  type: 'document',
  icon: SquareIcon,
  preview: {
    select: {
      title: 'name',
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
      name: 'borderRadius',
      type: 'string',
      title: 'Border Radius',
      options: {
        layout: 'radio',
        list: [
          { title: 'None', value: 'none' },
          { title: 'Large', value: 'lg' },
          { title: 'Extra Large', value: 'xl' },
          { title: '2XL', value: '2xl' },
        ],
      },
      initialValue: '2xl',
    }),
    defineField({
      name: 'padding',
      type: 'string',
      title: 'Padding',
      options: {
        layout: 'radio',
        list: [
          { title: 'Compact', value: 'compact' },
          { title: 'Default', value: 'default' },
          { title: 'Spacious', value: 'spacious' },
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'hoverEffect',
      type: 'string',
      title: 'Hover Effect',
      options: {
        layout: 'radio',
        list: [
          { title: 'Glow', value: 'glow' },
          { title: 'Lift', value: 'lift' },
          { title: 'Border', value: 'border' },
          { title: 'None', value: 'none' },
        ],
      },
      initialValue: 'glow',
    }),
    defineField({
      name: 'accentColor',
      type: 'string',
      title: 'Accent Color',
      options: {
        layout: 'radio',
        list: [
          { title: 'Green', value: 'green' },
          { title: 'Teal', value: 'teal' },
          { title: 'Cyan', value: 'cyan' },
          { title: 'Amber', value: 'amber' },
        ],
      },
      initialValue: 'green',
    }),
    defineField({
      name: 'showBorder',
      type: 'boolean',
      title: 'Show Border',
      initialValue: true,
    }),
    defineField({
      name: 'imageAspect',
      type: 'string',
      title: 'Image Aspect Ratio',
      options: {
        layout: 'radio',
        list: [
          { title: 'Video (16:9)', value: 'video' },
          { title: 'Square (1:1)', value: 'square' },
          { title: 'Wide (2:1)', value: 'wide' },
          { title: 'None', value: 'none' },
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'backgroundStyle',
      type: 'string',
      title: 'Background Style',
      options: {
        layout: 'radio',
        list: [
          { title: 'Surface', value: 'surface' },
          { title: 'Surface Alt', value: 'surface-alt' },
          { title: 'Transparent', value: 'transparent' },
        ],
      },
      initialValue: 'surface',
    }),
  ],
})
