import { defineType, defineField } from 'sanity'
import { ActivityIcon } from '@sanity/icons'

export const processStage = defineType({
  name: 'processStage',
  title: 'Process Stage',
  type: 'object',
  icon: ActivityIcon,
  preview: {
    select: {
      number: 'number',
      name: 'name',
    },
    prepare({ number, name }) {
      return {
        title: `Stage ${number}`,
        subtitle: name,
      }
    },
  },
  fields: [
    defineField({
      name: 'number',
      type: 'number',
      title: 'Number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'focus',
      type: 'text',
      title: 'Focus',
      rows: 2,
    }),
    defineField({
      name: 'services',
      type: 'array',
      title: 'Services',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'accentColor',
      type: 'string',
      title: 'Accent Color',
      description: 'CSS color value e.g. #6EA87F',
    }),
  ],
})
