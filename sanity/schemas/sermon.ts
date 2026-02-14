import { defineType, defineField } from 'sanity'

export const sermon = defineType({
  name: 'sermon',
  title: 'Sermons',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sermon Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker',
      type: 'reference',
      to: [{ type: 'staff' }],
    }),
    defineField({
      name: 'date',
      title: 'Date Preached',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'string',
      description: 'e.g., "Faith Over Fear", "The Book of John"',
    }),
    defineField({
      name: 'scripture',
      title: 'Scripture Reference',
      type: 'string',
      description: 'e.g., "Romans 8:28-39"',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or other video link',
    }),
    defineField({
      name: 'audioUrl',
      title: 'Audio URL',
      type: 'url',
      description: 'Link to audio file or podcast',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'notes',
      title: 'Sermon Notes',
      type: 'blockContent',
      description: 'Optional detailed notes or outline',
    }),
  ],
  orderings: [
    {
      title: 'Date (Newest)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      speaker: 'speaker.name',
      date: 'date',
      media: 'thumbnail',
    },
    prepare({ title, speaker, date, media }) {
      return {
        title,
        subtitle: `${speaker || 'Unknown'} • ${date || 'No date'}`,
        media,
      }
    },
  },
})
