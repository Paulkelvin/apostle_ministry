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
    <div className="relative bg-[#FAF8F5] min-h-screen">
      {/* Hero Banner with Sanctuary Arch Scallop */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-primary-dark [clip-path:ellipse(120%_100%_at_50%_0%)] text-white">
        {/* Subtle dot matrix pattern & ambient light */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-accent-light text-xs font-semibold tracking-wider uppercase mb-5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Weekly Gatherings &amp; Fellowship
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-white mb-5 tracking-tight">
            Gather <span className="italic font-serif text-accent-light">Together</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Worship, study God&apos;s Word, and grow together in warm fellowship online via Zoom and community gatherings.
          </p>
        </div>
      </section>

      {/* Interactive Events Section */}
      <section className="py-12 md:py-16 bg-[#FAF8F5] min-h-[60vh] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EventsPageClient events={events} />
        </div>
      </section>
    </div>
  )
}
