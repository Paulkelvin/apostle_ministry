import { Metadata } from 'next'
import { client, allEventsQuery } from '@/lib/sanity'
import { EventsPageClient } from '@/components/events'
import type { Event } from '@/types'

export const metadata: Metadata = {
  title: 'Events | The Apostles Ministry',
  description: 'See upcoming events, programs, and gatherings at The Apostles Ministry.',
}

// Demo events used when Sanity has no data
function getDemoEvents(): Event[] {
  const now = new Date()
  const makeDate = (daysFromNow: number, hour: number = 10) => {
    const d = new Date(now)
    d.setDate(d.getDate() + daysFromNow)
    d.setHours(hour, 0, 0, 0)
    return d.toISOString()
  }

  return [
    {
      _id: 'demo-1',
      title: 'Sunday Worship Service',
      slug: { current: 'sunday-worship' },
      date: makeDate(((7 - now.getDay()) % 7) || 7, 10),
      location: 'High Calling Ministries, 401-A Prince George\'s Blvd, Upper Marlboro, MD 20774',
      description: 'Join us for a powerful time of praise, worship, and the Word. All are welcome!',
      category: 'sunday-service',
      featured: true,
      cost: 'Free',
    },
    {
      _id: 'demo-2',
      title: 'Midweek Bible Study',
      slug: { current: 'bible-study' },
      date: makeDate(3, 19),
      location: 'High Calling Ministries',
      description: 'Dive deeper into the Word of God with our midweek Bible study. Bring your Bible and a friend!',
      category: 'bible-study',
    },
    {
      _id: 'demo-3',
      title: 'Youth Night',
      slug: { current: 'youth-night' },
      date: makeDate(5, 18),
      location: 'High Calling Ministries — Youth Center',
      description: 'An evening of fellowship, games, worship, and an inspiring message for young people ages 13-25.',
      category: 'youth',
      cost: 'Free',
    },
    {
      _id: 'demo-4',
      title: 'Online Prayer Meeting',
      slug: { current: 'online-prayer' },
      date: makeDate(2, 7),
      description: 'Start your day with the power of prayer. Join us online via Zoom for corporate intercession.',
      category: 'online',
      isOnline: true,
      onlineLink: 'https://zoom.us',
    },
    {
      _id: 'demo-5',
      title: 'Community Outreach & Food Drive',
      slug: { current: 'community-outreach' },
      date: makeDate(12, 9),
      location: 'Upper Marlboro Community Center',
      description: 'Serving our community with love! Volunteers are welcome to help distribute food and essentials to families in need.',
      category: 'outreach',
    },
    {
      _id: 'demo-6',
      title: 'Annual Church Anniversary Celebration',
      slug: { current: 'anniversary' },
      date: makeDate(20, 11),
      endDate: makeDate(20, 15),
      location: 'High Calling Ministries',
      description: 'Celebrate the faithfulness of God as we mark another year of ministry. Special guest speakers, music, and dinner to follow.',
      category: 'special',
      featured: true,
      cost: 'Free',
    },
  ]
}

async function getEvents(): Promise<Event[]> {
  try {
    const events = await client.fetch<Event[]>(allEventsQuery)
    return events.length > 0 ? events : getDemoEvents()
  } catch {
    return getDemoEvents()
  }
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-[#E6D8C8]">
        {/* Soft sanctuary light — gentle glow over parchment */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(253,251,247,0.6)_0%,_transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#D4AF6A] font-semibold tracking-[0.2em] text-sm uppercase mb-5">
            Upcoming Gatherings
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-[#1C1B1A] mb-5 tracking-tight">
            Events
          </h1>
          <p className="text-lg text-[#5F5B55] max-w-2xl mx-auto leading-relaxed">
            Join us for worship, fellowship, and community — in person and online.
          </p>
        </div>
      </section>

      {/* Interactive Events Section */}
      <section className="py-10 md:py-14 bg-[#FAF8F5] min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EventsPageClient events={events} />
        </div>
      </section>
    </>
  )
}
