import { defineType, defineField } from 'sanity'

export const comment = defineType({
  name: 'comment',
  title: 'Blog Comments',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'text',
      title: 'Comment',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(1000),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
      description: 'Comments must be approved before appearing on the site.',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      name: 'name',
      text: 'text',
      post: 'post.title',
      approved: 'approved',
    },
    prepare({ name, text, post, approved }) {
      return {
        title: `${name} on "${post || 'Unknown'}"`,
        subtitle: `${approved ? '✅' : '⏳'} ${text?.slice(0, 60) || ''}...`,
      }
    },
  },
})
