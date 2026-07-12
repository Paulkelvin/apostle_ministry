interface PullQuoteProps {
  quote: string
  attribution?: string
}

export function PullQuote({ quote, attribution }: PullQuoteProps) {
  return (
    <blockquote className="my-12 border-l-2 border-accent pl-8 pr-4">
      <p className="font-display text-2xl md:text-3xl italic text-warm-800 leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
      {attribution && (
        <cite className="block mt-4 text-warm-600 font-medium not-italic">
          — {attribution}
        </cite>
      )}
    </blockquote>
  )
}
