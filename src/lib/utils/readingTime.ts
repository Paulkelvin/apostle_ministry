import type { PortableTextBlock } from '@/types'

/**
 * Estimates reading time from Portable Text blocks.
 * Average adult reads ~238 words per minute.
 */
export function estimateReadingTime(body?: PortableTextBlock[]): number {
  if (!body || body.length === 0) return 1

  let wordCount = 0

  for (const block of body) {
    if (block._type === 'block' && Array.isArray((block as Record<string, unknown>).children)) {
      const children = (block as Record<string, unknown>).children as Array<{ text?: string }>
      for (const child of children) {
        if (child.text) {
          wordCount += child.text.split(/\s+/).filter(Boolean).length
        }
      }
    }
    // Callout blocks contribute text
    if (block._type === 'calloutBlock') {
      const cb = block as Record<string, unknown>
      if (typeof cb.body === 'string') {
        wordCount += cb.body.split(/\s+/).filter(Boolean).length
      }
      if (typeof cb.title === 'string') {
        wordCount += cb.title.split(/\s+/).filter(Boolean).length
      }
    }
    // Pull quotes
    if (block._type === 'pullQuote') {
      const pq = block as Record<string, unknown>
      if (typeof pq.quote === 'string') {
        wordCount += pq.quote.split(/\s+/).filter(Boolean).length
      }
    }
    // Verse blocks
    if (block._type === 'verseBlock') {
      const vb = block as Record<string, unknown>
      if (typeof vb.verse === 'string') {
        wordCount += vb.verse.split(/\s+/).filter(Boolean).length
      }
    }
    // Images/videos add ~12 seconds of "reading time" each (≈ 47 words equivalent)
    if (['image', 'youtubeEmbed', 'imageGallery'].includes(block._type)) {
      wordCount += 47
    }
  }

  const minutes = Math.ceil(wordCount / 238)
  return Math.max(1, minutes)
}
