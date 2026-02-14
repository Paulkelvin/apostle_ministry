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
      className="w-full text-left group"
    >
      <article className="h-full flex flex-col bg-[#FDFBF7] rounded-2xl overflow-hidden shadow-[0_12px_32px_rgba(41,33,33,0.08)] hover:shadow-[0_16px_40px_rgba(41,33,33,0.12)] hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-[#FDFBF7] to-[#E6D8C8]">
          {event.image ? (
            <SanityImageComponent
              image={event.image}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Calendar className="w-12 h-12 text-[#D5CFC5]" />
            </div>
          )}

          {/* Date badge — mini calendar */}
          <div className="absolute top-3 left-3 bg-[#F3EBDD] border border-[#DCCFC0] rounded-xl shadow-md overflow-hidden text-center w-[52px]">
            <div className="bg-[#DCCFC0] text-[#292121] text-[10px] font-bold uppercase tracking-wider py-1">
              {format(startDate, 'MMM')}
            </div>
            <div className="text-xl font-bold text-[#292121] py-1.5 leading-none">
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
              <span className="bg-[#6A3B3F]/85 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                In-Person
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-base font-bold text-[#292121] mb-2 group-hover:text-[#6A3B3F] transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>

          <div className="space-y-1.5 text-sm text-[#968B89]">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#C59853]" />
              <span>{format(startDate, 'EEE, MMM d · h:mm a')}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C59853]" />
                <span className="truncate">{event.location}</span>
              </div>
            )}
          </div>

          {event.cost && event.cost.toLowerCase() !== 'free' && (
            <div className="mt-3 text-xs font-semibold text-[#6A3B3F] bg-[#E6D8C8] px-2.5 py-1 rounded-full inline-block">
              {event.cost}
            </div>
          )}
        </div>
      </article>
    </button>
  )
}
