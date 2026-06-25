import { defineType, defineField } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Blog Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Badge Color (Hex)',
      type: 'string',
      description: 'Hex color for the category badge, e.g. #4B2D7F',
      initialValue: '#4B2D7F',
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
