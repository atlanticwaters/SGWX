import { defineType, defineField } from 'sanity'
import { ThListIcon } from '@sanity/icons'

export const comparisonRow = defineType({
  name: 'comparisonRow',
  title: 'Comparison Row',
  type: 'object',
  icon: ThListIcon,
  preview: {
    select: {
      title: 'criteria',
    },
  },
  fields: [
    defineField({
      name: 'criteria',
      type: 'string',
      title: 'Criteria',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'traditional',
      type: 'string',
      title: 'Traditional',
      description: 'Traditional agency value',
    }),
    defineField({
      name: 'freelancers',
      type: 'string',
      title: 'Freelancers',
      description: 'Freelancers value',
    }),
    defineField({
      name: 'sageworx',
      type: 'string',
      title: 'Sageworx',
      description: 'Sageworx value',
    }),
  ],
})
