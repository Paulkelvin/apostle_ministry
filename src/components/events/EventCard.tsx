'use client'

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
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
    >
      <div className="grid md:grid-cols-[300px_1fr]">
        {/* Image */}
        <div className="aspect-[4/3] md:aspect-auto relative overflow-hidden bg-warm-200">
          {event.image ? (
            <SanityImageComponent
              image={event.image}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Calendar className="w-16 h-16 text-warm-300" />
            </div>
          )}
          {/* Date Badge */}
          <div className="absolute top-4 left-4 bg-primary text-white rounded-lg p-3 text-center shadow-lg">
            <div className="text-2xl font-bold">{format(startDate, 'd')}</div>
            <div className="text-sm uppercase">{format(startDate, 'MMM')}</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col">
          <h3 className="text-2xl font-bold text-warm-900 group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          <div className="mt-4 space-y-2 text-warm-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{formatEventDate()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>{formatEventTime()}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          {event.description && (
            <p className="mt-4 text-warm-600 line-clamp-2">{event.description}</p>
          )}

          {event.cost && (
            <p className="mt-2 text-primary font-medium">{event.cost}</p>
          )}

          <div className="mt-auto pt-6 flex items-center gap-4">
            {event.registrationLink && (
              <Button
                href={event.registrationLink}
                external
                size="sm"
              >
                Register Now
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            )}
            {event.ministry && (
              <span className="text-sm text-warm-500">
                Hosted by {event.ministry.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
