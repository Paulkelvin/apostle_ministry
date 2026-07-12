'use client'

import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { Play, Volume2 } from 'lucide-react'
import { SanityImageComponent } from '@/components/ui'
import type { Sermon } from '@/types'

interface SermonCardProps {
  sermon: Sermon
  index: number
  onPlayVideo?: (videoUrl: string, title: string) => void
}

export function SermonCard({ sermon, index, onPlayVideo }: SermonCardProps) {
  const date = sermon.date ? new Date(sermon.date) : new Date()

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl overflow-hidden border border-warm-200 shadow-[--shadow-card] hover:shadow-[--shadow-card-hover] transition-shadow group"
    >
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden bg-warm-200">
        {sermon.thumbnail ? (
          <SanityImageComponent
            image={sermon.thumbnail}
            alt={sermon.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-warm-100">
            <Play className="w-10 h-10 text-warm-300 ml-1" />
          </div>
        )}

        {/* Play Button Overlay */}
        {sermon.videoUrl && (
          <button
            onClick={() => onPlayVideo?.(sermon.videoUrl!, sermon.title)}
            className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-primary ml-1" />
            </div>
          </button>
        )}

        {/* Series Badge */}
        {sermon.series && (
          <div className="absolute top-4 left-4 bg-primary text-white text-xs font-medium px-3 py-1 rounded-lg">
            {sermon.series}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <time className="text-xs text-warm-500">{format(date, 'MMMM d, yyyy')}</time>
        <h3 className="font-display text-lg font-semibold text-warm-900 mt-1 group-hover:text-primary transition-colors line-clamp-2">
          {sermon.title}
        </h3>

        {sermon.speaker && (
          <p className="text-warm-600 mt-1 text-sm">{sermon.speaker.name}</p>
        )}

        {sermon.scripture && (
          <p className="text-primary text-xs font-semibold mt-1">{sermon.scripture}</p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-3">
          {sermon.videoUrl && (
            <button
              onClick={() => onPlayVideo?.(sermon.videoUrl!, sermon.title)}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              <Play className="w-4 h-4" />
              Watch
            </button>
          )}
          {sermon.audioUrl && (
            <a
              href={sermon.audioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-warm-600 hover:text-warm-900 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              Listen
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

