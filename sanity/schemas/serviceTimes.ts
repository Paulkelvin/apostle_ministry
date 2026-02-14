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
            { name: 'name', type: 'string', title: 'Service Name', description: 'e.g., "Morning Worship"' },
            { name: 'time', type: 'string', title: 'Time', description: 'e.g., "9:00 AM"' },
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
            { name: 'name', type: 'string', title: 'Service Name', description: 'e.g., "Bible Study"' },
            { name: 'day', type: 'string', title: 'Day', description: 'e.g., "Wednesday"' },
            { name: 'time', type: 'string', title: 'Time', description: 'e.g., "7:00 PM"' },
          ],
        },
      ],
    }),
    defineField({
      name: 'locationName',
      title: 'Location Name',
      type: 'string',
      description: 'e.g., "Main Campus"',
    }),
    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'text',
      rows: 2,
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
