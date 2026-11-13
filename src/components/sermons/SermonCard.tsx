'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { Play, Volume2, BookOpen, ArrowRight, Sparkles } from 'lucide-react'
import { SanityImageComponent } from '@/components/ui'
import type { Sermon } from '@/types'

interface SermonCardProps {
  sermon: Sermon
  index: number
  onPlayVideo?: (videoUrl: string, title: string) => void
  onSelect?: (sermon: Sermon) => void
}

export function SermonCard({ sermon, index, onPlayVideo, onSelect }: SermonCardProps) {
  const date = sermon.date ? new Date(sermon.date) : new Date()

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onSelect?.(sermon)}
      className="bg-white rounded-xl overflow-hidden border border-warm-200/80 shadow-[--shadow-card] hover:shadow-[--shadow-card-hover] transition-all group hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Thumbnail */}
        <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary-deep/5 via-warm-100 to-warm-200/60">
          {sermon.fallbackImageUrl ? (
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={sermon.fallbackImageUrl}
                alt={sermon.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/70 via-transparent to-transparent" />
            </div>
          ) : sermon.thumbnail ? (
            <SanityImageComponent
              image={sermon.thumbnail}
              alt={sermon.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/images/events/bible-study.jpg"
                alt={sermon.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/80 via-primary-deep/40 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                <span className="text-white/90 text-xs font-semibold flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs">
                  <BookOpen className="w-3.5 h-3.5 text-accent" />
                  Scripture Teaching
                </span>
              </div>
            </div>
          )}

          {/* Series Badge */}
          {sermon.series && (
            <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm z-10">
              {sermon.series}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <time className="text-xs text-warm-500">{format(date, 'MMMM d, yyyy')}</time>
          <h3 className="font-display text-lg font-bold text-warm-900 mt-1 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {sermon.title}
          </h3>

          {sermon.speaker && (
            <p className="text-warm-600 mt-1 text-sm font-medium">{sermon.speaker.name}</p>
          )}

          {sermon.scripture && (
            <p className="text-accent-dark text-xs font-bold mt-1.5 flex items-center gap-1">
              <span>📖</span>
              <span>{sermon.scripture}</span>
            </p>
          )}

          {sermon.description && (
            <p className="text-warm-600 text-xs mt-2 line-clamp-2 leading-relaxed">
              {sermon.description}
            </p>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0">
        <div className="flex items-center justify-between pt-3 border-t border-warm-100">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary-dark transition-colors">
            View Message &amp; Notes
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>

          <span className="text-[11px] text-warm-500 font-medium bg-warm-100 px-2.5 py-1 rounded-full">
            Online Archive
          </span>
        </div>
      </div>
    </motion.article>
  )
}

