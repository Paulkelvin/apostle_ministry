import { defineType, defineField, defineArrayMember } from 'sanity'

/**
 * Block Content schema with custom blocks for rich blog editing
 * This allows authors full creative freedom - no rigid title/subtitle/body/conclusion structure
 */
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    // Standard text block with full formatting options
    defineArrayMember({
      type: 'block',
      title: 'Text Block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
          { title: 'Highlight', value: 'highlight' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              { name: 'href', type: 'url', title: 'URL' },
              { name: 'blank', type: 'boolean', title: 'Open in new tab', initialValue: true },
            ],
          },
        ],
      },
    }),

    // Standard image with caption
    defineArrayMember({
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Important for accessibility',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),

    // Custom: Callout Block (info, warning, scripture)
    defineArrayMember({
      name: 'calloutBlock',
      type: 'object',
      title: 'Callout',
      fields: [
        {
          name: 'type',
          type: 'string',
          title: 'Callout Type',
          options: {
            list: [
              { title: 'Info', value: 'info' },
              { title: 'Warning', value: 'warning' },
              { title: 'Scripture', value: 'scripture' },
              { title: 'Tip', value: 'tip' },
            ],
          },
          initialValue: 'info',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Title (optional)',
        },
        {
          name: 'body',
          type: 'text',
          title: 'Content',
          rows: 3,
        },
      ],
      preview: {
        select: { title: 'title', type: 'type' },
        prepare({ title, type }) {
          return {
            title: title || 'Callout',
            subtitle: type?.charAt(0).toUpperCase() + type?.slice(1),
          }
        },
      },
    }),

    // Custom: YouTube Embed
    defineArrayMember({
      name: 'youtubeEmbed',
      type: 'object',
      title: 'YouTube Video',
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'YouTube URL',
          description: 'Paste the full YouTube video URL',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption (optional)',
        },
      ],
      preview: {
        select: { url: 'url' },
        prepare({ url }) {
          return {
            title: 'YouTube Video',
            subtitle: url,
          }
        },
      },
    }),

    // Custom: Image Gallery
    defineArrayMember({
      name: 'imageGallery',
      type: 'object',
      title: 'Image Gallery',
      fields: [
        {
          name: 'images',
          type: 'array',
          title: 'Images',
          of: [
            {
              type: 'image',
              options: { hotspot: true },
              fields: [
                { name: 'alt', type: 'string', title: 'Alt Text' },
                { name: 'caption', type: 'string', title: 'Caption' },
              ],
            },
          ],
        },
        {
          name: 'layout',
          type: 'string',
          title: 'Gallery Layout',
          options: {
            list: [
              { title: 'Grid (2 columns)', value: 'grid-2' },
              { title: 'Grid (3 columns)', value: 'grid-3' },
              { title: 'Carousel', value: 'carousel' },
            ],
          },
          initialValue: 'grid-2',
        },
      ],
      preview: {
        select: { images: 'images' },
        prepare({ images }) {
          return {
            title: 'Image Gallery',
            subtitle: `${images?.length || 0} images`,
          }
        },
      },
    }),

    // Custom: Pull Quote
    defineArrayMember({
      name: 'pullQuote',
      type: 'object',
      title: 'Pull Quote',
      fields: [
        {
          name: 'quote',
          type: 'text',
          title: 'Quote',
          rows: 3,
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'attribution',
          type: 'string',
          title: 'Attribution (optional)',
          description: 'Who said this?',
        },
      ],
      preview: {
        select: { quote: 'quote' },
        prepare({ quote }) {
          return {
            title: quote?.substring(0, 50) + (quote?.length > 50 ? '...' : ''),
            subtitle: 'Pull Quote',
          }
        },
      },
    }),

    // Custom: Bible Verse
    defineArrayMember({
      name: 'verseBlock',
      type: 'object',
      title: 'Bible Verse',
      fields: [
        {
          name: 'verse',
          type: 'text',
          title: 'Verse Text',
          rows: 3,
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'reference',
          type: 'string',
          title: 'Reference',
          description: 'e.g., "John 3:16" or "Psalm 23:1-3 (NIV)"',
          validation: (Rule) => Rule.required(),
        },
      ],
      preview: {
        select: { reference: 'reference' },
        prepare({ reference }) {
          return {
            title: reference,
            subtitle: 'Bible Verse',
          }
        },
      },
    }),

    // Custom: Button/CTA Link
    defineArrayMember({
      name: 'buttonLink',
      type: 'object',
      title: 'Button Link',
      fields: [
        {
          name: 'label',
          type: 'string',
          title: 'Button Label',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'url',
          type: 'string',
          title: 'URL',
          description: 'Can be external URL or internal path like /events',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'style',
          type: 'string',
          title: 'Button Style',
          options: {
            list: [
              { title: 'Primary (Filled)', value: 'primary' },
              { title: 'Secondary (Outline)', value: 'secondary' },
              { title: 'Text Link', value: 'text' },
            ],
          },
          initialValue: 'primary',
        },
      ],
      preview: {
        select: { label: 'label' },
        prepare({ label }) {
          return {
            title: label,
            subtitle: 'Button Link',
          }
        },
      },
    }),

    // Custom: Divider
    defineArrayMember({
      name: 'divider',
      type: 'object',
      title: 'Divider',
      fields: [
        {
          name: 'style',
          type: 'string',
          title: 'Divider Style',
          options: {
            list: [
              { title: 'Line', value: 'line' },
              { title: 'Dots', value: 'dots' },
              { title: 'Space', value: 'space' },
            ],
          },
          initialValue: 'line',
        },
      ],
      preview: {
        prepare() {
          return { title: '--- Divider ---' }
        },
      },
    }),
  ],
})
