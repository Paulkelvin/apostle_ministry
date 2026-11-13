import { Metadata } from 'next'
import { client, allEventsQuery, normalizeEvents } from '@/lib/sanity'
import { EventsPageClient } from '@/components/events'
import type { Event } from '@/types'

// People check listings before attending — keep fairly fresh
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Events & Gatherings | Restoring Life Family Community Center',
  description: 'Join us for weekly worship, Bible study, and community fellowship online via Zoom.',
}

async function getEvents(): Promise<Event[]> {
  try {
    const rawEvents = await client.fetch<Event[]>(allEventsQuery)
    return normalizeEvents(rawEvents)
  } catch {
    return normalizeEvents([])
  }
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div className="relative bg-[#FAFAF8] min-h-screen">
      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-[#FAFAF8]">
        {/* Subtle dot matrix pattern & ambient light */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-light/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-warm-200/80 text-accent-dark text-xs font-semibold tracking-wider uppercase mb-5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Weekly Gatherings &amp; Fellowship
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-warm-900 mb-5">
            Gather With Us
          </h1>
          <p className="text-lg text-warm-600 max-w-2xl mx-auto leading-relaxed">
            Worship, study God&apos;s Word, and grow together in community online via Zoom.
          </p>
        </div>
      </section>

      {/* Interactive Events Section */}
      <section className="py-10 md:py-14 bg-[#FAFAF8] min-h-[60vh] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EventsPageClient events={events} />
        </div>
      </section>
    </div>
  )
}
