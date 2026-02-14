import { Quote } from 'lucide-react'

interface PullQuoteProps {
  quote: string
  attribution?: string
}

export function PullQuote({ quote, attribution }: PullQuoteProps) {
  return (
    <blockquote className="my-12 relative">
      <div className="absolute -top-4 -left-2 text-primary/20">
        <Quote className="w-16 h-16 transform rotate-180" />
      </div>
      <p className="text-2xl md:text-3xl font-serif italic text-warm-800 leading-relaxed pl-8 pr-4">
        &ldquo;{quote}&rdquo;
      </p>
      {attribution && (
        <cite className="block mt-4 pl-8 text-warm-600 font-medium not-italic">
          — {attribution}
        </cite>
      )}
    </blockquote>
  )
}
