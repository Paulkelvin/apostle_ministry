'use client'

import { useEffect, useState } from 'react'
import { format, parseISO, differenceInSeconds } from 'date-fns'
import { Calendar, Clock, MapPin, Wifi } from 'lucide-react'
import { SanityImageComponent } from '@/components/ui'
import type { Event } from '@/types'

interface FeaturedEventCardProps {
  event: Event
  onClick: () => void
}

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const calculate = () => {
      const now = Date.now()
      const diff = Math.max(0, Math.floor((target - now) / 1000))
      setTimeLeft({
        days: Math.floor(diff / 86400),
        hours: Math.floor((diff % 86400) / 3600),
        minutes: Math.floor((diff % 3600) / 60),
        seconds: diff % 60,
      })
    }

    calculate()
    const interval = setInterval(calculate, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

export function FeaturedEventCard({ event, onClick }: FeaturedEventCardProps) {
  const startDate = event.date ? parseISO(event.date) : new Date()
  const countdown = useCountdown(event.date)
  const isUpcoming = differenceInSeconds(startDate, new Date()) > 0

  return (
    <button
      onClick={onClick}
      className="w-full text-left group"
    >
      <div className="relative bg-white rounded-[20px] overflow-hidden shadow-[0_12px_32px_rgba(28,27,26,0.08)] hover:shadow-[0_16px_40px_rgba(28,27,26,0.12)] hover:-translate-y-1 transition-all duration-300">
        {/* Featured badge */}
        <div className="absolute top-5 left-5 z-10">
          <span className="bg-[#D4AF37] text-[#1C1B1A] text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-lg shadow-[#D4AF37]/20">
            Featured
          </span>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr]">
          {/* Image */}
          <div className="aspect-[16/9] lg:aspect-auto relative overflow-hidden bg-gradient-to-br from-[#F5F2ED] to-[#EDE6DC] min-h-[220px] lg:min-h-[260px]">
            {event.image ? (
              <SanityImageComponent
                image={event.image}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Calendar className="w-20 h-20 text-[#D5CFC5]" />
              </div>
            )}
            {/* Dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
          </div>

          {/* Content */}
          <div className="p-5 lg:p-8 flex flex-col justify-center">
            {/* Date badge inline */}
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#F4F0EA] rounded-xl px-3 py-2 text-center leading-none border border-[#E0D4C2]">
                <span className="text-[10px] font-bold uppercase block tracking-wider text-[#8F8A80]">{format(startDate, 'MMM')}</span>
                <span className="text-2xl font-bold block mt-0.5 text-[#1C1B1A]">{format(startDate, 'd')}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-[#5F5B55]">{format(startDate, 'EEEE')}</p>
                <p className="text-sm text-[#8F8A80]">{format(startDate, 'h:mm a')}</p>
              </div>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-[#1C1B1A] mb-3 group-hover:text-[#592D31] transition-colors tracking-tight leading-tight">
              {event.title}
            </h3>

            {event.description && (
              <p className="text-[#5F5B55] leading-relaxed line-clamp-2 mb-5 text-[15px]">{event.description}</p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#8F8A80] mb-6">
              {event.location && (
                <span className="flex items-center gap-1.5 max-w-full">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                  <span className="truncate">{event.location}</span>
                </span>
              )}
              {event.isOnline && (
                <span className="flex items-center gap-1.5 text-sage-dark">
                  <Wifi className="w-3.5 h-3.5" />
                  Online
                </span>
              )}
            </div>

            {/* Countdown */}
            {isUpcoming && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  {[
                    { value: countdown.days, label: 'Days' },
                    { value: countdown.hours, label: 'Hrs' },
                    { value: countdown.minutes, label: 'Min' },
                    { value: countdown.seconds, label: 'Sec' },
                  ].map(({ value, label }) => (
                    <div key={label} className="bg-[#F4F0EA] text-[#1C1B1A] rounded-md px-2.5 py-2 text-center min-w-[48px] border border-[#E0D4C2]">
                      <span className="text-lg font-bold tabular-nums block leading-none">{String(value).padStart(2, '0')}</span>
                      <span className="text-[9px] uppercase tracking-wider text-[#8F8A80] mt-1 block">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}
