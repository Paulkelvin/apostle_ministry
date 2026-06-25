'use client'

import Link from 'next/link'
import { MapPin, Clock, ExternalLink } from 'lucide-react'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
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
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#5B2D91' }}>
      {/* Exquisite Gothic Arch Background Graphic */}
      <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pointer-events-none select-none flex justify-center opacity-[0.03]">
        <svg width="600" height="800" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform translate-y-20">
          <path d="M50 800V300C50 161.929 161.929 50 300 50C438.071 50 550 161.929 550 300V800" stroke="#D4AF37" strokeWidth="4" />
          <path d="M150 800V350C150 267.157 217.157 200 300 200C382.843 200 450 267.157 450 350V800" stroke="#D4AF37" strokeWidth="2" />
          <path d="M250 800V400C250 372.386 272.386 350 300 350C327.614 350 350 372.386 350 400V800" stroke="#D4AF37" strokeWidth="1" />
          <line x1="300" y1="50" x2="300" y2="800" stroke="#D4AF37" strokeWidth="1" strokeDasharray="8 8" />
          <line x1="50" y1="450" x2="550" y2="450" stroke="#D4AF37" strokeWidth="1" strokeDasharray="8 8" />
          <circle cx="300" cy="200" r="30" stroke="#D4AF37" strokeWidth="2" />
        </svg>
      </div>

      {/* Ambient glow particles */}
      <AmbientGlow />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #FFFFFF 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="flex justify-center mb-4">
            <div className="w-[2px] h-10 bg-[#D4AF37]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
            Join Us This Week
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Everyone is welcome. Come as you are.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Sunday Services */}
          <div className="rounded-2xl p-8 md:p-9" style={{ backgroundColor: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>Sunday Services</h3>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Weekly Worship</p>
              </div>
            </div>
            <ul className="space-y-3">
              {sundayServices.map((service, index) => (
                <li key={index} className="flex justify-between items-center py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>{service.name}</span>
                  <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ color: '#D4AF37', backgroundColor: 'rgba(212,175,55,0.1)' }}>{service.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Midweek Services */}
          <div className="rounded-2xl p-8 md:p-9" style={{ backgroundColor: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>Midweek</h3>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Growth & Fellowship</p>
              </div>
            </div>
            <ul className="space-y-3">
              {midweekServices.map((service, index) => (
                <li key={index} className="flex justify-between items-center py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div>
                    <span className="text-sm block" style={{ color: 'rgba(255,255,255,0.8)' }}>{service.name}</span>
                    {service.day && (
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{service.day}</span>
                    )}
                  </div>
                  <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ color: '#D4AF37', backgroundColor: 'rgba(212,175,55,0.1)' }}>{service.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div className="md:col-span-2 lg:col-span-1 rounded-2xl p-8 md:p-9" style={{ backgroundColor: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-11 h-11 rounded-xl bg-[#7BA381]/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#7BA381]" />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>{locationName}</h3>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Our Location</p>
              </div>
            </div>
            <p className="text-sm whitespace-pre-line mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{address}</p>
            <Link
              href="/contact#directions"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#E8CC6A]"
              style={{ color: '#D4AF37' }}
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
