import { defineType, defineField } from 'sanity'

export const givingPage = defineType({
  name: 'givingPage',
  title: 'Giving Page',
  type: 'document',
  // Singleton — only one document of this type
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Give Generously',
    }),
    defineField({
      name: 'heroVerse',
      title: 'Hero Bible Verse',
      type: 'text',
      rows: 3,
      description: 'The scripture quote shown in the hero section',
    }),
    defineField({
      name: 'heroVerseRef',
      title: 'Verse Reference',
      type: 'string',
      description: 'e.g., "2 Corinthians 9:7"',
    }),
    defineField({
      name: 'whyWeGiveHeading',
      title: '"Why We Give" Heading',
      type: 'string',
      initialValue: 'Why We Give',
    }),
    defineField({
      name: 'whyWeGiveSubtext',
      title: '"Why We Give" Subtext',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'givingBreakdown',
      title: 'Giving Breakdown',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'percentage', type: 'string', title: 'Percentage', description: 'e.g., "30%"' },
            { name: 'description', type: 'text', title: 'Description', rows: 3 },
          ],
          preview: {
            select: { title: 'title', subtitle: 'percentage' },
          },
        },
      ],
    }),
    defineField({
      name: 'givingMethods',
      title: 'Other Ways to Give',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 3 },
            { name: 'note', type: 'string', title: 'Note / Footer Text', description: 'Small text shown below the description' },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon',
              options: {
                list: [
                  { title: 'Credit Card (Online)', value: 'credit-card' },
                  { title: 'Building (In Person)', value: 'building' },
                  { title: 'Mail', value: 'mail' },
                ],
              },
            },
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    defineField({
      name: 'taxStatement',
      title: 'Tax Deductibility Statement',
      type: 'text',
      rows: 3,
      description: 'The 501(c)(3) tax statement shown at the bottom',
    }),
    defineField({
      name: 'mailingAddress',
      title: 'Mailing Address for Checks',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Giving Page',
      }
    },
  },
})
