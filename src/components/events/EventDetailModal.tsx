'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import {
  X,
  CalendarDays,
  Clock,
  MapPin,
  Globe,
  DollarSign,
  Share2,
  Copy,
  ExternalLink,
} from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { Event } from '@/types'

interface EventDetailModalProps {
  event: Event | null
  onClose: () => void
}

export function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  // Escape key handler
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (event) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEsc)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [event, handleEsc])

  const handleAddToGoogleCalendar = (evt: Event) => {
    const start = parseISO(evt.date)
    const end = evt.endDate ? parseISO(evt.endDate) : new Date(start.getTime() + 2 * 60 * 60 * 1000) // default 2hrs
    const fmt = (d: Date) => format(d, "yyyyMMdd'T'HHmmss")
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(evt.title)}&dates=${fmt(start)}/${fmt(end)}&location=${encodeURIComponent(evt.location || '')}&details=${encodeURIComponent(evt.description || '')}`
    window.open(url, '_blank')
  }

  const handleShare = async (evt: Event) => {
    const text = `${evt.title} — ${format(parseISO(evt.date), 'EEEE, MMMM d · h:mm a')}${evt.location ? ` at ${evt.location}` : ''}`
    if (navigator.share) {
      try {
        await navigator.share({ title: evt.title, text })
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(text)
      // Could show a toast here
    }
  }

  const getCategoryLabel = (cat?: string) => {
    const labels: Record<string, string> = {
      'sunday-service': 'Sunday Service',
      youth: 'Youth',
      'bible-study': 'Bible Study',
      online: 'Online',
      outreach: 'Outreach',
      special: 'Special Event',
      general: 'General',
    }
    return cat ? labels[cat] || cat : null
  }

  const getCategoryColor = (cat?: string) => {
    const colors: Record<string, string> = {
      'sunday-service': 'bg-primary/10 text-primary',
      youth: 'bg-blue-50 text-blue-600',
      'bible-study': 'bg-sage/10 text-sage',
      online: 'bg-purple-50 text-purple-600',
      outreach: 'bg-orange-50 text-orange-600',
      special: 'bg-accent/10 text-accent',
      general: 'bg-[#EDE6DC] text-[#5F5B55]',
    }
    return cat ? colors[cat] || 'bg-[#EDE6DC] text-[#5F5B55]' : 'bg-[#EDE6DC] text-[#5F5B55]'
  }

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#1C1B1A]/60 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-[#8F8A80] hover:text-[#1C1B1A] hover:bg-white transition-all"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Container */}
            <div className="overflow-y-auto flex-1">
              {/* Top Section: Image + Info */}
              <div className="md:flex">
                {/* Event Image */}
                {event.image && (
                  <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[400px] shrink-0">
                    <Image
                      src={urlFor(event.image).width(800).height(600).url()}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />
                  </div>
                )}

                {/* Event Info */}
                <div className={`p-6 md:p-8 ${event.image ? 'md:w-1/2' : 'w-full'}`}>
                  {/* Category Badge */}
                  {event.category && (
                    <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${getCategoryColor(event.category)} mb-4`}>
                      {getCategoryLabel(event.category)}
                    </span>
                  )}

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1C1B1A] tracking-tight leading-tight">
                    {event.title}
                  </h2>

                  {/* Meta Info */}
                  <div className="mt-5 space-y-3">
                    <div className="flex items-start gap-3 text-[#5F5B55]">
                      <CalendarDays className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#1C1B1A]">{format(parseISO(event.date), 'EEEE, MMMM d, yyyy')}</p>
                        {event.endDate && (
                          <p className="text-sm text-[#8F8A80]">
                            to {format(parseISO(event.endDate), 'EEEE, MMMM d, yyyy')}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-[#5F5B55]">
                      <Clock className="w-5 h-5 text-[#D4AF37] shrink-0" />
                      <p className="font-medium">{format(parseISO(event.date), 'h:mm a')}</p>
                    </div>

                    {event.location && (
                      <div className="flex items-start gap-3 text-[#5F5B55]">
                        <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <p className="font-medium">{event.location}</p>
                      </div>
                    )}

                    {event.isOnline && (
                      <div className="flex items-center gap-3 text-[#5F5B55]">
                        <Globe className="w-5 h-5 text-[#D4AF37] shrink-0" />
                        <p className="font-medium">Online Event</p>
                      </div>
                    )}

                    {event.cost && (
                      <div className="flex items-center gap-3 text-[#5F5B55]">
                        <DollarSign className="w-5 h-5 text-sage shrink-0" />
                        <p className="font-medium">{event.cost}</p>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {event.description && (
                    <div className="mt-6 pt-5 border-t border-[#E0D4C2]">
                      <p className="text-[#5F5B55] leading-relaxed whitespace-pre-line">
                        {event.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="sticky bottom-0 bg-white border-t border-[#E0D4C2] px-6 md:px-8 py-4">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Add to Calendar */}
                  <button
                    onClick={() => handleAddToGoogleCalendar(event)}
                    className="flex items-center gap-2 bg-[#1C1B1A] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#3A3836] transition-colors"
                  >
                    <CalendarDays className="w-4 h-4" />
                    Add to Calendar
                  </button>

                  {/* Join Online */}
                  {event.isOnline && event.onlineLink && (
                    <a
                      href={event.onlineLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#1C1B1A] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#3A3836] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Join Online
                    </a>
                  )}

                  {/* Share */}
                  <button
                    onClick={() => handleShare(event)}
                    className="flex items-center gap-2 bg-[#EDE6DC] text-[#5F5B55] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#E0D4C2] transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>

                  {/* Copy link */}
                  <button
                    onClick={async () => {
                      await navigator.clipboard.writeText(window.location.href)
                    }}
                    className="flex items-center gap-2 bg-[#EDE6DC] text-[#5F5B55] font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-[#E0D4C2] transition-colors"
                    title="Copy link"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
