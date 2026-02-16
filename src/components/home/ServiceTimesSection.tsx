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
    <section className="py-24 bg-[#FCFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sunday Services */}
          <div
            className="rounded-2xl p-10 border border-[#E0D7CC]"
            style={{ background: '#FFFFFF', boxShadow: '0 10px 20px rgba(0,0,0,0.04)' }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#592D31]/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#592D31]" />
              </div>
              <h2 className="text-2xl font-bold text-[#592D31]">Sunday Services</h2>
            </div>
            <ul className="space-y-4">
              {sundayServices.map((service, index) => (
                <li key={index} className="flex justify-between items-center border-b border-[#E0D7CC] pb-3">
                  <span className="text-[#332D2D]">{service.name}</span>
                  <span className="font-semibold text-lg text-[#332D2D]">{service.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Midweek Services */}
          <div
            className="rounded-2xl p-10 border border-[#E0D7CC]"
            style={{ background: '#FFFFFF', boxShadow: '0 10px 20px rgba(0,0,0,0.04)' }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h2 className="text-2xl font-bold text-[#592D31]">Midweek</h2>
            </div>
            <ul className="space-y-4">
              {midweekServices.map((service, index) => (
                <li key={index} className="flex justify-between items-center border-b border-[#E0D7CC] pb-3">
                  <div>
                    <span className="text-[#332D2D]">{service.name}</span>
                    {service.day && (
                      <span className="text-[#8A8080] text-sm block">{service.day}</span>
                    )}
                  </div>
                  <span className="font-semibold text-lg text-[#332D2D]">{service.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div
            className="md:col-span-2 lg:col-span-1 rounded-2xl p-10 border border-[#E0D7CC]"
            style={{ background: '#FFFFFF', boxShadow: '0 10px 20px rgba(0,0,0,0.04)' }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#7BA381]/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#7BA381]" />
              </div>
              <h2 className="text-2xl font-bold text-[#592D31]">{locationName}</h2>
            </div>
            <p className="text-[#332D2D] whitespace-pre-line mb-6 leading-relaxed">{address}</p>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#C59853] hover:text-[#A57837] underline underline-offset-2 transition-colors font-medium"
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
