import { MapPin, Clock, ExternalLink } from 'lucide-react'
import type { ServiceTimes as ServiceTimesType } from '@/types'

interface ServiceTimesSectionProps {
  serviceTimes?: ServiceTimesType | null
}

export function ServiceTimesSection({ serviceTimes }: ServiceTimesSectionProps) {
  // Default times if no data from CMS
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
  const mapsLink = serviceTimes?.googleMapsLink || '#'

  return (
    <section className="py-24 bg-warm-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-24 gap-y-16">
          {/* Sunday Services */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Sunday Services</h2>
            </div>
            <ul className="space-y-4">
              {sundayServices.map((service, index) => (
                <li key={index} className="flex justify-between items-center border-b border-warm-700 pb-3">
                  <span className="text-warm-200">{service.name}</span>
                  <span className="font-semibold text-lg">{service.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Midweek Services */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <Clock className="w-6 h-6 text-warm-900" />
              </div>
              <h2 className="text-2xl font-bold">Midweek</h2>
            </div>
            <ul className="space-y-4">
              {midweekServices.map((service, index) => (
                <li key={index} className="flex justify-between items-center border-b border-warm-700 pb-3">
                  <div>
                    <span className="text-warm-200">{service.name}</span>
                    {service.day && (
                      <span className="text-warm-400 text-sm block">{service.day}</span>
                    )}
                  </div>
                  <span className="font-semibold text-lg">{service.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-sage flex items-center justify-center">
                <MapPin className="w-6 h-6 text-warm-900" />
              </div>
              <h2 className="text-2xl font-bold">{locationName}</h2>
            </div>
            <p className="text-warm-200 whitespace-pre-line mb-6">{address}</p>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-dark transition-colors font-medium"
            >
              Get Directions
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
