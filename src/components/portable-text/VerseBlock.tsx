import { BookOpen } from 'lucide-react'

interface VerseBlockProps {
  verse: string
  reference: string
}

export function VerseBlock({ verse, reference }: VerseBlockProps) {
  return (
    <div className="my-8 bg-warm-100 rounded-xl p-8 border-l-2 border-accent">
      <div className="flex items-start gap-4">
        <BookOpen className="flex-shrink-0 w-5 h-5 text-primary mt-1.5" />
        <div>
          <p className="font-display text-lg text-warm-800 italic leading-relaxed">
            &ldquo;{verse}&rdquo;
          </p>
          <p className="mt-3 text-accent-dark font-semibold">{reference}</p>
        </div>
      </div>
    </div>
  )
}
