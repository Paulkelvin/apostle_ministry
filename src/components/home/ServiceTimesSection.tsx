'use client'

import Link from 'next/link'
import { MapPin, Clock, ExternalLink } from 'lucide-react'
import type { ServiceTimes as ServiceTimesType } from '@/types'

interface ServiceTimesSectionProps {
  serviceTimes?: ServiceTimesType | null
}

export function ServiceTimesSection({ serviceTimes }: ServiceTimesSectionProps) {
  const sundayServices = serviceTimes?.sundayServices || [
    { name: 'Morning Worship', time: '9:00 AM' },
    { name: 'Sunday School', time: '10:30 AM' },
    { name: 'Evening Service', time: '6:00 PM' },
  ]

  const midweekServices = serviceTimes?.midweekServices || [
    { name: 'Bible Study', day: 'Wednesday', time: '7:00 PM' },
  ]

  const address = serviceTimes?.address || 'High Calling Ministries\n401-A Prince George\'s Blvd\nUpper Marlboro, MD 20774'
  const locationName = serviceTimes?.locationName || 'Main Campus'

  return (
    <section className="bg-primary-deep py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Service Times
          </p>
          <h2 className="text-h2 text-white mb-3">
            Join Us This Week
          </h2>
          <p className="text-base text-white/60 max-w-lg mx-auto">
            Everyone is welcome. Come as you are.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Sunday Services */}
          <div className="bg-white/[0.04] border border-white/10 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-7">
              <Clock className="w-5 h-5 text-accent" />
              <div>
                <h3 className="text-lg font-bold text-white">Sunday Services</h3>
                <p className="text-xs text-white/50">Weekly Worship</p>
              </div>
            </div>
            <ul className="space-y-3">
              {sundayServices.map((service, index) => (
                <li key={index} className="flex justify-between items-center py-2.5 border-b border-white/8">
                  <span className="text-sm text-white/80">{service.name}</span>
                  <span className="text-sm font-semibold text-accent">{service.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Midweek Services */}
          <div className="bg-white/[0.04] border border-white/10 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-7">
              <Clock className="w-5 h-5 text-accent" />
              <div>
                <h3 className="text-lg font-bold text-white">Midweek</h3>
                <p className="text-xs text-white/50">Growth & Fellowship</p>
              </div>
            </div>
            <ul className="space-y-3">
              {midweekServices.map((service, index) => (
                <li key={index} className="flex justify-between items-center py-2.5 border-b border-white/8">
                  <div>
                    <span className="text-sm block text-white/80">{service.name}</span>
                    {service.day && (
                      <span className="text-xs text-white/40">{service.day}</span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-accent">{service.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div className="md:col-span-2 lg:col-span-1 bg-white/[0.04] border border-white/10 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-7">
              <MapPin className="w-5 h-5 text-sage" />
              <div>
                <h3 className="text-lg font-bold text-white">{locationName}</h3>
                <p className="text-xs text-white/50">Our Location</p>
              </div>
            </div>
            <p className="text-sm whitespace-pre-line mb-6 leading-relaxed text-white/70">{address}</p>
            <Link
              href="/contact#directions"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-light"
            >
              Get Directions
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
