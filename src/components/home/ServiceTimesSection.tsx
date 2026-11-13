'use client'

import Link from 'next/link'
import { Clock, Video, Mail, ArrowUpRight } from 'lucide-react'
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
    <section id="service-times" className="relative bg-gradient-to-b from-primary-deep via-primary-deep to-primary-ink pt-20 lg:pt-28 pb-32 lg:pb-40 overflow-hidden scroll-mt-12">
      {/* Subtle ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary-light/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-accent/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Subtle dot matrix decoration for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/15 border border-accent/25 text-accent text-xs font-semibold tracking-wider uppercase mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Weekly Gatherings
          </span>
          <h2 className="text-h2 text-white mb-4 font-display">
            Worship With Us Online
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            Join our live weekly worship services and interactive Bible study from the comfort of your home.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Sunday Services */}
          <div className="group bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.1] hover:border-accent/40 rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                  <Video className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-white/80">
                  Every Sunday
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">Sunday Service</h3>
              <p className="text-sm text-white/60 mb-6">Praise, worship, and an uplifting message live via Zoom.</p>
              
              <div className="space-y-3 pt-4 border-t border-white/10">
                {sundayServices.map((service, index) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-white/85">{service.name}</span>
                    <span className="text-sm font-bold text-accent">{service.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <Link
                href="/events"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-light transition-colors group-hover:translate-x-0.5 duration-200"
              >
                Service Details &amp; Zoom
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Midweek Services */}
          <div className="group bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.1] hover:border-accent/40 rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-primary-light/20 border border-primary-light/30 flex items-center justify-center text-primary-light">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-white/80">
                  Every Thursday
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">Bible Study</h3>
              <p className="text-sm text-white/60 mb-6">In-depth exploration of scripture, discussion, and spiritual growth.</p>
              
              <div className="space-y-3 pt-4 border-t border-white/10">
                {midweekServices.map((service, index) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-white/85">{service.name}</span>
                    <span className="text-sm font-bold text-accent">{service.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <Link
                href="/events"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-light transition-colors group-hover:translate-x-0.5 duration-200"
              >
                Join Study Group
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Mailing & Contact */}
          <div className="md:col-span-2 lg:col-span-1 group bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.1] hover:border-sage/40 rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-sage/20 border border-sage/30 flex items-center justify-center text-sage">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-white/80">
                  Church Office
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">{locationName}</h3>
              <p className="text-sm text-white/60 mb-6">Send all correspondence, offerings, and inquiries to our mailing address.</p>
              
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm whitespace-pre-line leading-relaxed text-white/85 font-mono text-xs bg-black/20 p-3 rounded-lg border border-white/5">
                  {address}
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-sage hover:text-sage-light transition-colors group-hover:translate-x-0.5 duration-200"
              >
                Contact Our Ministry
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Seamless curved organic blend into the daytime canvas (Inspired by BuiltByEm) */}
      <div className="absolute -bottom-px left-0 right-0 h-28 pointer-events-none">
        <svg
          className="w-full h-full text-[#FAFAF8] fill-current preserve-3d"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0,32 C288,88 720,112 1440,32 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  )
}
