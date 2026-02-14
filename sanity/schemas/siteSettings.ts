import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton - only one document of this type
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'The Apostles Ministry',
    }),
    defineField({
      name: 'siteTagline',
      title: 'Tagline',
      type: 'string',
      description: 'A short slogan or mission statement',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'logoLight',
      title: 'Logo (Light/White version)',
      type: 'image',
      description: 'For use on dark backgrounds',
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video URL',
      type: 'url',
      description: 'URL to the homepage hero background video (MP4)',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Fallback Image',
      type: 'image',
      description: 'Shown while video loads or on mobile',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Welcome Home',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
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
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'Twitter/X', value: 'twitter' },
                ],
              },
            },
            { name: 'url', type: 'url', title: 'URL' },
          ],
          preview: {
            select: { platform: 'platform', url: 'url' },
            prepare({ platform, url }) {
              return {
                title: platform?.charAt(0).toUpperCase() + platform?.slice(1),
                subtitle: url,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'statement501c3',
      title: '501(c)(3) Statement',
      type: 'text',
      rows: 3,
      description: 'Legal statement for the footer',
      initialValue: 'The Apostles Ministry is a 501(c)(3) nonprofit organization. All donations are tax-deductible.',
    }),
    defineField({
      name: 'tithelyChurchId',
      title: 'Tithe.ly Church ID',
      type: 'string',
      description: 'Your data-tithely-cid for the giving button',
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'visionStatement',
      title: 'Vision Statement',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'watchOnlineUrl',
      title: 'Watch Online URL',
      type: 'url',
      description: 'Link to live stream or YouTube channel',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
