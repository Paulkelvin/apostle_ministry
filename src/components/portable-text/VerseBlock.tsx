import { BookOpen } from 'lucide-react'

interface VerseBlockProps {
  verse: string
  reference: string
}

export function VerseBlock({ verse, reference }: VerseBlockProps) {
  return (
    <div className="my-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 border border-primary/10">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-lg text-warm-800 italic leading-relaxed">
            &ldquo;{verse}&rdquo;
          </p>
          <p className="mt-3 text-primary font-bold">{reference}</p>
        </div>
      </div>
    </div>
  )
}
