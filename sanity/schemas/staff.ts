import { defineType, defineField } from 'sanity'

export const staff = defineType({
  name: 'staff',
  title: 'Staff & Leadership',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Used for this person\'s full bio page URL. Leave empty to show only a summary card with no detail page.',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Short Biography',
      description: 'A 1-3 sentence summary shown on the team grid card.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'fullBio',
      title: 'Full Biography',
      description: 'The complete biography shown on this person\'s full bio page.',
      type: 'blockContent',
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      description: 'Additional photos shown on this person\'s full bio page.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'rank',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Use 1 for Senior Pastor, 2 for Associate Pastor, etc.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform', options: { list: ['facebook', 'twitter', 'instagram', 'linkedin'] } },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'By Rank',
      name: 'rankAsc',
      by: [{ field: 'rank', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
