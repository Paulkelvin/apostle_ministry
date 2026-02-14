import { defineType, defineField } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
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
      name: 'date',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "Main Sanctuary" or "Fellowship Hall"',
    }),
    defineField({
      name: 'address',
      title: 'Address (if off-site)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      description: 'External registration or sign-up form',
    }),
    defineField({
      name: 'cost',
      title: 'Cost',
      type: 'string',
      description: 'e.g., "Free", "$25 per person"',
    }),
    defineField({
      name: 'ministry',
      title: 'Hosted By',
      type: 'reference',
      to: [{ type: 'ministry' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Sunday Service', value: 'sunday-service' },
          { title: 'Youth', value: 'youth' },
          { title: 'Bible Study', value: 'bible-study' },
          { title: 'Online', value: 'online' },
          { title: 'Outreach', value: 'outreach' },
          { title: 'Special', value: 'special' },
          { title: 'General', value: 'general' },
        ],
      },
      initialValue: 'general',
    }),
    defineField({
      name: 'isOnline',
      title: 'Available Online?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'onlineLink',
      title: 'Online Meeting Link',
      type: 'url',
      description: 'Zoom, YouTube Live, etc.',
      hidden: ({ document }) => !document?.isOnline,
    }),
  ],
  orderings: [
    {
      title: 'Date (Upcoming)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image',
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date set',
        media,
      }
    },
  },
})
