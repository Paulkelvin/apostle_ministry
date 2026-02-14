'use client'

import { useState, useMemo } from 'react'
import { LayoutGrid, CalendarDays } from 'lucide-react'
import type { Event } from '@/types'
import { FeaturedEventCard } from './FeaturedEventCard'
import { EventGridCard } from './EventGridCard'
import { EventCalendarView } from './EventCalendarView'
import { EventDetailModal } from './EventDetailModal'
import { EventsEmptyState } from './EventsEmptyState'

interface EventsPageClientProps {
  events: Event[]
}

const FILTER_OPTIONS = [
  { key: 'all', label: 'All' },
  { key: 'sunday-service', label: 'Sunday Service' },
  { key: 'youth', label: 'Youth' },
  { key: 'bible-study', label: 'Bible Study' },
  { key: 'online', label: 'Online' },
  { key: 'outreach', label: 'Outreach' },
  { key: 'special', label: 'Special' },
] as const

export function EventsPageClient({ events }: EventsPageClientProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid')
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'all') return events
    if (activeFilter === 'online') return events.filter(e => e.isOnline)
    return events.filter(e => e.category === activeFilter)
  }, [events, activeFilter])

  // The featured event is the nearest upcoming featured one, or just the first
  const featuredEvent = useMemo(() => {
    return events.find(e => e.featured) || events[0] || null
  }, [events])

  const gridEvents = useMemo(() => {
    // In grid mode, remove the featured event from the rest
    if (!featuredEvent) return filteredEvents
    return filteredEvents.filter(e => e._id !== featuredEvent._id)
  }, [filteredEvents, featuredEvent])

  return (
    <>
      {/* Controls Bar */}
      <section className="bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#DCCFC0] sticky top-[72px] z-30 rounded-b-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Filter Chips — mask fades the trailing edge on mobile to hint at scrollability */}
            <div className="relative flex-1 min-w-0">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
              {FILTER_OPTIONS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeFilter === key
                      ? 'bg-[#292121] text-white shadow-md shadow-[#292121]/15'
                      : 'bg-white text-[#665A58] hover:bg-[#E6D8C8] hover:text-[#292121]'
                  }`}
                >
                  {label}
                </button>
              ))}
              </div>
              {/* Fade hint on the right edge for mobile */}
              <div className="absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-l from-white/95 to-transparent pointer-events-none sm:hidden" />
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-[#E6D8C8] rounded-xl p-1 shrink-0 self-end sm:self-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#292121] shadow-sm'
                    : 'text-[#968B89] hover:text-[#665A58]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'calendar'
                    ? 'bg-white text-[#292121] shadow-sm'
                    : 'text-[#968B89] hover:text-[#665A58]'
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                <span className="hidden sm:inline">Calendar</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'grid' ? (
            <>
              {filteredEvents.length === 0 ? (
                <EventsEmptyState filterActive={activeFilter !== 'all'} />
              ) : (
                <div className="space-y-10">
                  {/* Featured Event — only show when no filter active or featured matches filter */}
                  {activeFilter === 'all' && featuredEvent && (
                    <FeaturedEventCard
                      event={featuredEvent}
                      onClick={() => setSelectedEvent(featuredEvent)}
                    />
                  )}

                  {/* Grid */}
                  {gridEvents.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold text-[#292121] mb-5">
                        {activeFilter === 'all' ? 'Upcoming Events' : `${FILTER_OPTIONS.find(f => f.key === activeFilter)?.label || ''} Events`}
                      </h2>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gridEvents.map((event) => (
                          <EventGridCard
                            key={event._id}
                            event={event}
                            onClick={() => setSelectedEvent(event)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <EventCalendarView
              events={filteredEvents}
              onSelectEvent={(event) => setSelectedEvent(event)}
            />
          )}
        </div>
      </section>

      {/* Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  )
}
