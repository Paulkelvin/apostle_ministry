'use client'

import { format, parseISO } from 'date-fns'
import { Calendar, MapPin, Wifi } from 'lucide-react'
import { SanityImageComponent } from '@/components/ui'
import type { Event } from '@/types'

interface EventGridCardProps {
  event: Event
  onClick: () => void
}

export function EventGridCard({ event, onClick }: EventGridCardProps) {
  const startDate = event.date ? parseISO(event.date) : new Date()

  return (
    <button
      onClick={onClick}
      className="w-full max-w-full text-left group"
    >
      <article className="h-full flex flex-col bg-white rounded-xl overflow-hidden border border-warm-200 shadow-[--shadow-card] hover:shadow-[--shadow-card-hover] hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-white to-warm-100">
          {event.image ? (
            <SanityImageComponent
              image={event.image}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Calendar className="w-12 h-12 text-warm-300" />
            </div>
          )}

          {/* Date badge — mini calendar */}
          <div className="absolute top-3 left-3 bg-warm-100 border border-warm-200 rounded-xl shadow-md overflow-hidden text-center w-[52px]">
            <div className="bg-warm-200 text-ink text-[10px] font-bold uppercase tracking-wider py-1">
              {format(startDate, 'MMM')}
            </div>
            <div className="text-xl font-bold text-ink py-1.5 leading-none">
              {format(startDate, 'd')}
            </div>
          </div>

          {/* Online / In-Person badge */}
          <div className="absolute top-3 right-3">
            {event.isOnline ? (
              <span className="bg-sage/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Wifi className="w-3 h-3" />
                Online
              </span>
            ) : (
              <span className="bg-primary/85 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                In-Person
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col min-w-0">
          <h3 className="text-base font-bold text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug break-words">
            {event.title}
          </h3>

          <div className="space-y-1.5 text-sm text-warm-500 min-w-0">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span className="truncate">{format(startDate, 'EEE, MMM d · h:mm a')}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </button>
  )
}
