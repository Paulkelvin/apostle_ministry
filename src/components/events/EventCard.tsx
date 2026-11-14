'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { format, isSameDay, parseISO } from 'date-fns'
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react'
import { SanityImageComponent, Button } from '@/components/ui'
import type { Event } from '@/types'

interface EventCardProps {
  event: Event
  index: number
}

export function EventCard({ event, index }: EventCardProps) {
  const startDate = event.date ? parseISO(event.date) : new Date()
  const endDate = event.endDate ? parseISO(event.endDate) : null

  const formatEventDate = () => {
    if (endDate && !isSameDay(startDate, endDate)) {
      return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`
    }
    return format(startDate, 'EEEE, MMMM d, yyyy')
  }

  const formatEventTime = () => {
    if (endDate && isSameDay(startDate, endDate)) {
      return `${format(startDate, 'h:mm a')} - ${format(endDate, 'h:mm a')}`
    }
    return format(startDate, 'h:mm a')
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-[#EBE3D5] shadow-xs hover:shadow-md transition-all duration-300 group"
    >
      <div className="grid md:grid-cols-[300px_1fr]">
        {/* Image */}
        <div className="aspect-[4/3] md:aspect-auto relative overflow-hidden bg-warm-100 min-h-[220px]">
          {event.image ? (
            <SanityImageComponent
              image={event.image}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <Image
              src={event.fallbackImageUrl || '/images/hero-banner.jpg'}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          {/* Date Badge */}
          <div className="absolute top-4 left-4 bg-primary text-white rounded-2xl px-3.5 py-2.5 text-center shadow-md border border-white/20 backdrop-blur-xs">
            <div className="text-xl font-bold font-display leading-tight">{format(startDate, 'd')}</div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-accent-light">{format(startDate, 'MMM')}</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="font-display text-2xl font-normal text-warm-900 group-hover:text-primary transition-colors">
              {event.title}
            </h3>

            <div className="mt-4 space-y-2 text-sm text-warm-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="font-medium text-warm-700">{formatEventDate()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span>{formatEventTime()}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            {event.description && (
              <p className="mt-4 text-warm-600 text-sm leading-relaxed line-clamp-2">{event.description}</p>
            )}

            {event.cost && (
              <p className="mt-3 text-xs font-semibold text-primary uppercase tracking-wider">{event.cost}</p>
            )}
          </div>

          <div className="mt-6 pt-5 border-t border-[#EBE3D5]/60 flex items-center justify-between gap-4">
            {event.registrationLink ? (
              <Button
                href={event.registrationLink}
                external
                size="sm"
                className="bg-primary hover:bg-primary-dark text-white rounded-full px-5 text-xs font-medium"
              >
                Register Now
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            ) : (
              <span className="text-xs text-warm-500 font-medium italic">Open Fellowship &bull; All Welcome</span>
            )}
            {event.ministry && (
              <span className="text-xs text-warm-500">
                Hosted by <strong className="text-warm-700 font-semibold">{event.ministry.name}</strong>
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
