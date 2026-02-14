'use client'

import { useState, useMemo, useRef } from 'react'
import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
} from 'date-fns'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import type { Event } from '@/types'
import { EventsEmptyState } from './EventsEmptyState'

interface EventCalendarViewProps {
  events: Event[]
  onSelectEvent: (event: Event) => void
}

export function EventCalendarView({ events, onSelectEvent }: EventCalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  const tooltipTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Map events to their dates for quick lookup
  const eventsByDate = useMemo(() => {
    const map = new Map<string, Event[]>()
    events.forEach(event => {
      const dateKey = format(parseISO(event.date), 'yyyy-MM-dd')
      const existing = map.get(dateKey) || []
      existing.push(event)
      map.set(dateKey, existing)
    })
    return map
  }, [events])

  // Calendar grid generation
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const calStart = startOfWeek(monthStart, { weekStartsOn: 0 })
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })
    return eachDayOfInterval({ start: calStart, end: calEnd })
  }, [currentMonth])

  const monthEvents = useMemo(() => {
    return events.filter(e => {
      const d = parseISO(e.date)
      return isSameMonth(d, currentMonth)
    })
  }, [events, currentMonth])

  const goToPrev = () => setCurrentMonth(prev => subMonths(prev, 1))
  const goToNext = () => setCurrentMonth(prev => addMonths(prev, 1))
  const goToToday = () => setCurrentMonth(new Date())

  const handleDateHover = (date: Date) => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current)
    setHoveredDate(date)
  }

  const handleDateLeave = () => {
    tooltipTimeout.current = setTimeout(() => setHoveredDate(null), 200)
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-8">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-[#292121] tracking-tight">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button
            onClick={goToToday}
            className="text-xs font-semibold text-[#292121] bg-[#E6D8C8] hover:bg-[#DCCFC0] px-3 py-1.5 rounded-lg transition-colors border border-[#DCCFC0] cursor-pointer"
          >
            Today
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={goToPrev}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#968B89] hover:bg-[#E6D8C8] transition-colors cursor-pointer"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#968B89] hover:bg-[#E6D8C8] transition-colors cursor-pointer"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop Calendar Grid */}
      <div className="hidden md:block">
        <div className="bg-white rounded-2xl shadow-[0_12px_32px_rgba(28,27,26,0.08)] overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-7 border-b border-[#E6D8C8]">
            {weekDays.map(day => (
              <div key={day} className="py-3 text-center text-xs font-bold uppercase tracking-wider text-[#968B89]">
                {day}
              </div>
            ))}
          </div>

          {/* Day Cells */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, idx) => {
              const dateKey = format(day, 'yyyy-MM-dd')
              const dayEvents = eventsByDate.get(dateKey) || []
              const hasEvents = dayEvents.length > 0
              const isCurrentMonth = isSameMonth(day, currentMonth)
              const isCurrentDay = isToday(day)
              const isHovered = hoveredDate && isSameDay(hoveredDate, day)

              return (
                <div
                  key={idx}
                  className={`relative min-h-[100px] border-b border-r border-[#F5F2ED] p-2 transition-colors ${
                    !isCurrentMonth ? 'bg-[#F5F2ED]/50' : 'bg-white hover:bg-[#F3EBDD]/30'
                  } ${idx % 7 === 0 ? 'border-l-0' : ''}`}
                  onMouseEnter={() => hasEvents && handleDateHover(day)}
                  onMouseLeave={handleDateLeave}
                >
                  {/* Date Number */}
                  <div className="flex items-start justify-between">
                    <span
                      className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${
                        isCurrentDay
                          ? 'bg-[#292121] text-white font-bold'
                          : isCurrentMonth
                            ? 'text-[#665A58]'
                            : 'text-[#D5CFC5]'
                      }`}
                    >
                      {format(day, 'd')}
                    </span>
                  </div>

                  {/* Event indicators */}
                  {hasEvents && isCurrentMonth && (
                    <div className="mt-1 space-y-0.5">
                      {dayEvents.slice(0, 2).map(event => (
                        <button
                          key={event._id}
                          onClick={() => onSelectEvent(event)}
                          className="w-full text-left px-1.5 py-0.5 rounded text-[11px] font-medium truncate bg-[#F0E6D8] text-[#292121] hover:bg-[#DCCFC0] transition-colors block cursor-pointer"
                        >
                          {event.title}
                        </button>
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="text-[10px] text-[#968B89] pl-1.5">
                          +{dayEvents.length - 2} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Accent dot for events */}
                  {hasEvents && isCurrentMonth && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {dayEvents.slice(0, 3).map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-accent" />
                      ))}
                    </div>
                  )}

                  {/* Tooltip on hover */}
                  {isHovered && hasEvents && (
                    <div className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-[#292121] text-white rounded-xl p-3 shadow-xl pointer-events-none">
                      <p className="text-[10px] uppercase tracking-wider text-[#968B89] mb-1.5">
                        {format(day, 'EEEE, MMMM d')}
                      </p>
                      {dayEvents.map(event => (
                        <div key={event._id} className="text-sm py-1 border-b border-[#2E2D2B] last:border-0">
                          <p className="font-medium truncate">{event.title}</p>
                          <p className="text-[#968B89] text-xs">{format(parseISO(event.date), 'h:mm a')}</p>
                        </div>
                      ))}
                      {/* Tooltip arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#292121] rotate-45 -mt-1.5" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Vertical list for the month */}
      <div className="md:hidden space-y-4">
        {monthEvents.length > 0 ? (
          monthEvents.map(event => {
            const d = parseISO(event.date)
            return (
              <button
                key={event._id}
                onClick={() => onSelectEvent(event)}
                className="w-full text-left bg-white rounded-xl p-4 flex items-center gap-4 shadow-[0_4px_16px_rgba(28,27,26,0.06)] hover:shadow-[0_8px_24px_rgba(28,27,26,0.1)] hover:-translate-y-0.5 transition-all active:scale-[0.98]"
              >
                <div className="bg-[#F0E6D8] text-[#292121] rounded-xl px-2.5 py-2 text-center leading-none shrink-0">
                  <span className="text-[9px] font-bold uppercase block tracking-wider text-[#968B89]">{format(d, 'MMM')}</span>
                  <span className="text-xl font-bold block mt-0.5">{format(d, 'd')}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-[#292121] text-sm truncate">{event.title}</h3>
                  <p className="text-xs text-[#968B89] mt-0.5">
                    {format(d, 'EEEE · h:mm a')}
                    {event.location && ` · ${event.location}`}
                  </p>
                </div>
              </button>
            )
          })
        ) : (
          <EventsEmptyState filterActive={false} monthly />
        )}
      </div>
    </div>
  )
}
