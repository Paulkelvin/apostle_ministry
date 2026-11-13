'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Clock, Video, Mail, ArrowUpRight, Sparkles, MapPin, Calendar } from 'lucide-react'
import type { ServiceTimes as ServiceTimesType } from '@/types'

interface ServiceTimesSectionProps {
  serviceTimes?: ServiceTimesType | null
}

export function ServiceTimesSection({ serviceTimes }: ServiceTimesSectionProps) {
  const sundayServices = serviceTimes?.sundayServices || [
    { name: 'Sunday Worship Service', time: '4:00 PM via Zoom' },
  ]

  const midweekServices = serviceTimes?.midweekServices || [
    { name: 'Bible Study', day: 'Every Thursday', time: '7:30 PM via Zoom' },
  ]

  const address = serviceTimes?.address || '6916 Hillmeade Road\nGlenn Dale, MD 20769'
  const locationName = serviceTimes?.locationName || 'Mailing Address'

  return (
    <section id="service-times" className="relative bg-[#FAF7F1] pt-20 lg:pt-28 pb-28 lg:pb-36 overflow-hidden scroll-mt-12 border-b border-[#E6DDCA]">
      {/* Delicate tactile background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e6ddca_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-accent/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E6DDCA] text-accent-dark text-xs font-semibold tracking-wider uppercase mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Weekly Online Gatherings
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-primary mb-4 font-display font-bold">
            Worship With Us Online
          </h2>
          <p className="text-base sm:text-lg text-[#5C525C] max-w-xl mx-auto leading-relaxed">
            Join our live weekly worship services and interactive Bible study from wherever you are.
          </p>
        </div>

        {/* 3 Interactive Cards with Warm TBHE Styling */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-14">
          {/* Sunday Services Card */}
          <div className="group bg-white border border-[#E6DDCA] hover:border-primary/40 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-primary to-accent rounded-t-full" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Video className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FAF7F1] border border-[#E6DDCA] text-primary">
                  Every Sunday
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#251827] mb-2 font-display">Sunday Worship</h3>
              <p className="text-sm text-[#5C525C] leading-relaxed mb-6">
                Praise, heartfelt worship, and an uplifting biblical message live via Zoom.
              </p>
              
              <div className="space-y-3 pt-4 border-t border-[#E6DDCA]">
                {sundayServices.map((service, index) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <span className="text-sm font-semibold text-[#251827]">{service.name}</span>
                    <span className="text-sm font-bold text-accent-dark">{service.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E6DDCA]/60">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:text-primary-dark transition-colors uppercase tracking-wider"
              >
                Join Sunday Service
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Midweek Services Card */}
          <div className="group bg-white border border-[#E6DDCA] hover:border-primary/40 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-accent to-primary rounded-t-full" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center text-accent-dark group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FAF7F1] border border-[#E6DDCA] text-accent-dark">
                  Every Thursday
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#251827] mb-2 font-display">Thursday Bible Study</h3>
              <p className="text-sm text-[#5C525C] leading-relaxed mb-6">
                Deep biblical exploration and interactive fellowship live via Zoom.
              </p>
              
              <div className="space-y-3 pt-4 border-t border-[#E6DDCA]">
                {midweekServices.map((service, index) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <span className="text-sm font-semibold text-[#251827]">
                      {service.name}
                      {service.day && <span className="text-xs text-[#5C525C] font-normal block">{service.day}</span>}
                    </span>
                    <span className="text-sm font-bold text-accent-dark">{service.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E6DDCA]/60">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:text-primary-dark transition-colors uppercase tracking-wider"
              >
                Join Bible Study
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Location & Giving / Mailing Card */}
          <div className="group bg-white border border-[#E6DDCA] hover:border-primary/40 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md relative overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-primary to-accent rounded-t-full" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FAF7F1] border border-[#E6DDCA] text-primary">
                  {locationName}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#251827] mb-2 font-display">Ministry Office</h3>
              <p className="text-sm text-[#5C525C] leading-relaxed mb-6">
                Official postal address for checks, inquiries, and ministry correspondence.
              </p>
              
              <div className="pt-4 border-t border-[#E6DDCA]">
                <address className="not-italic text-sm text-[#5C525C] whitespace-pre-line leading-relaxed font-mono bg-[#FAF7F1] p-3 rounded-xl border border-[#E6DDCA]">
                  {address}
                </address>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E6DDCA]/60">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:text-primary-dark transition-colors uppercase tracking-wider"
              >
                Contact Ministry
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Warm Visual Patch: Online Gathering Experience Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-[#E6DDCA] bg-white p-6 sm:p-10 shadow-xs">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-dark block mb-2">
                Online Sanctuary
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary mb-3">
                Experience Genuine Fellowship from Home
              </h3>
              <p className="text-sm sm:text-base text-[#5C525C] leading-relaxed mb-6">
                Whether you are joining us for the first time or the hundredth, there is always a seat saved for you. Live praise, prayers, and interactive spiritual family every week.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <Link
                  href="/events"
                  className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-dark text-white font-bold text-sm shadow-sm transition-all"
                >
                  View Upcoming Dates
                </Link>
                <Link
                  href="/about"
                  className="px-6 py-3 rounded-xl border border-[#E6DDCA] bg-[#FAF7F1] hover:bg-white text-primary font-semibold text-sm transition-all"
                >
                  Learn What to Expect
                </Link>
              </div>
            </div>

            {/* Image Patch */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#E6DDCA] shadow-sm">
                <Image
                  src="/images/events/worship.jpg"
                  alt="Worship Gathering"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
                  <span className="bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs">
                    Live Online Fellowship
                  </span>
                  <span className="text-accent font-bold">Every Sunday 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
