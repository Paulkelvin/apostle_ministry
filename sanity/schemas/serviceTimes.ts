import { defineType, defineField } from 'sanity'

export const serviceTimes = defineType({
  name: 'serviceTimes',
  title: 'Service Times & Location',
  type: 'document',
  // This is a singleton - only one document of this type should exist
  fields: [
    defineField({
      name: 'sundayServices',
      title: 'Sunday Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Service Name', description: 'e.g., "Sunday Service (via Zoom)"' },
            { name: 'time', type: 'string', title: 'Time', description: 'e.g., "4:00 PM"' },
          ],
        },
      ],
    }),
    defineField({
      name: 'midweekServices',
      title: 'Midweek Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Service Name', description: 'e.g., "Bible Study (via Zoom)"' },
            { name: 'day', type: 'string', title: 'Day', description: 'e.g., "Thursday"' },
            { name: 'time', type: 'string', title: 'Time', description: 'e.g., "7:30 PM"' },
          ],
        },
      ],
    }),
    defineField({
      name: 'locationName',
      title: 'Location Name',
      type: 'string',
      description: 'e.g., "Mailing Address (Virtual Ministry)"',
      initialValue: 'Mailing Address (Virtual Ministry)',
    }),
    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'text',
      rows: 2,
      description: 'e.g., "6916 Hillmeade Road\nGlenn Dale, MD 20769"',
      initialValue: '6916 Hillmeade Road\nGlenn Dale, MD 20769',
    }),
    defineField({
      name: 'googleMapsLink',
      title: 'Google Maps Link',
      type: 'url',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Service Times & Location',
      }
    },
  },
})
