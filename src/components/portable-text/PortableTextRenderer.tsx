'use client'

import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { SanityImageComponent, Button } from '@/components/ui'
import { CalloutBlock } from './CalloutBlock'
import { YouTubeEmbed } from './YouTubeEmbed'
import { ImageGallery } from './ImageGallery'
import { PullQuote } from './PullQuote'
import { VerseBlock } from './VerseBlock'
import { Divider } from './Divider'
import type { PortableTextBlock } from '@/types'

interface PortableTextRendererProps {
  value: PortableTextBlock[]
}

const components: PortableTextComponents = {
  // Block styles
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-warm-700 leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-warm-900 mt-12 mb-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold text-warm-900 mt-10 mb-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold text-warm-900 mt-8 mb-4">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-warm-600">
        {children}
      </blockquote>
    ),
  },

  // Lists
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-6 space-y-2 text-warm-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-warm-700">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },

  // Marks (inline styles)
  marks: {
    strong: ({ children }) => <strong className="font-bold text-warm-900">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    'strike-through': ({ children }) => <s className="text-warm-500">{children}</s>,
    highlight: ({ children }) => (
      <mark className="bg-accent/30 px-1 rounded">{children}</mark>
    ),
    link: ({ value, children }) => {
      const target = value?.blank ? '_blank' : undefined
      const rel = value?.blank ? 'noopener noreferrer' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-primary hover:text-primary-dark underline transition-colors"
        >
          {children}
        </a>
      )
    },
  },

  // Custom types
  types: {
    image: ({ value }) => (
      <figure className="my-8">
        <div className="rounded-xl overflow-hidden shadow-md">
          <SanityImageComponent
            image={value}
            alt={value.alt || ''}
            width={800}
            height={500}
            className="w-full h-auto"
          />
        </div>
        {value.caption && (
          <figcaption className="text-center text-sm text-warm-500 mt-3">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),

    calloutBlock: ({ value }) => <CalloutBlock {...value} />,
    youtubeEmbed: ({ value }) => <YouTubeEmbed {...value} />,
    imageGallery: ({ value }) => <ImageGallery {...value} />,
    pullQuote: ({ value }) => <PullQuote {...value} />,
    verseBlock: ({ value }) => <VerseBlock {...value} />,
    divider: ({ value }) => <Divider style={value.style} />,
    buttonLink: ({ value }) => (
      <div className="my-8 text-center">
        <Button
          href={value.url}
          variant={value.style === 'secondary' ? 'outline' : value.style === 'text' ? 'ghost' : 'primary'}
          external={value.url?.startsWith('http')}
        >
          {value.label}
        </Button>
      </div>
    ),
  },
}

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value || value.length === 0) {
    return null
  }

  return (
    <div className="prose-custom">
      <PortableText value={value} components={components} />
    </div>
  )
}
