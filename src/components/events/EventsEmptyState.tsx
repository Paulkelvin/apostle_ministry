'use client'

import { Calendar, Search, CalendarX } from 'lucide-react'
import { motion } from 'framer-motion'

interface EventsEmptyStateProps {
  filterActive?: boolean
  monthly?: boolean
}

export function EventsEmptyState({ filterActive = false, monthly = false }: EventsEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-[#F4F0EA] flex items-center justify-center border border-[#E0D4C2]">
          {filterActive ? (
            <Search className="w-9 h-9 text-[#1C1B1A]/40" />
          ) : monthly ? (
            <CalendarX className="w-9 h-9 text-[#1C1B1A]/40" />
          ) : (
            <Calendar className="w-9 h-9 text-[#1C1B1A]/40" />
          )}
        </div>
        {/* Decorative dots */}
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#D4AF37]/30" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-[#D4AF37]/20" />
      </div>

      {/* Text */}
      <h3 className="text-xl font-bold text-[#1C1B1A] mb-2">
        {filterActive
          ? 'No events match your filter'
          : monthly
            ? 'No events this month'
            : 'No Upcoming Events'}
      </h3>
      <p className="text-[#8F8A80] max-w-md leading-relaxed">
        {filterActive
          ? 'Try selecting a different category or view all events.'
          : monthly
            ? 'Navigate to another month to see more events.'
            : 'Check back soon — new events are added regularly!'}
      </p>
    </motion.div>
  )
}
