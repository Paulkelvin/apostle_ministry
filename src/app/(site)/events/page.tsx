import { Metadata } from 'next'
import { client, allEventsQuery } from '@/lib/sanity'
import { EventsPageClient } from '@/components/events'
import type { Event } from '@/types'

// People check listings before attending — keep fairly fresh
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Events | Restoring Life Family Community Center',
  description: 'See upcoming events, programs, and gatherings at Restoring Life Family Community Center.',
}

// Demo events used when Sanity has no data
function getDemoEvents(): Event[] {
  const now = new Date()
  const makeDate = (daysFromNow: number, hour: number = 16, minute: number = 0) => {
    const d = new Date(now)
    d.setDate(d.getDate() + daysFromNow)
    d.setHours(hour, minute, 0, 0)
    return d.toISOString()
  }

  // Next Sunday at 4:00 PM
  const daysUntilSunday = ((7 - now.getDay()) % 7) || 7
  // Next Thursday at 7:30 PM
  const daysUntilThursday = ((4 - now.getDay() + 7) % 7) || 7

  return [
    {
      _id: 'demo-1',
      title: 'Sunday Worship Service',
      slug: { current: 'sunday-worship' },
      date: makeDate(daysUntilSunday, 16, 0),
      location: 'Online via Zoom',
      description: 'Join us every Sunday at 4:00 PM via Zoom for a powerful time of praise, worship, and the Word. All are welcome!',
      category: 'sunday-service',
      featured: true,
      cost: 'Free',
      isOnline: true,
      onlineLink: 'https://zoom.us',
    },
    {
      _id: 'demo-2',
      title: 'Thursday Bible Study',
      slug: { current: 'bible-study' },
      date: makeDate(daysUntilThursday, 19, 30),
      location: 'Online via Zoom',
      description: 'Dive deeper into the Word of God with our weekly Bible study every Thursday at 7:30 PM via Zoom. Bring your Bible and a friend!',
      category: 'bible-study',
      isOnline: true,
      onlineLink: 'https://zoom.us',
    },
    {
      _id: 'demo-3',
      title: 'Prayer & Worship Night',
      slug: { current: 'prayer-worship-night' },
      date: makeDate(5, 19, 0),
      location: 'Online via Zoom',
      description: 'An evening of deep prayer, worship, and fellowship. Come expecting to encounter the presence of God.',
      category: 'special',
      cost: 'Free',
      isOnline: true,
      onlineLink: 'https://zoom.us',
    },
    {
      _id: 'demo-4',
      title: 'Online Morning Prayer',
      slug: { current: 'online-prayer' },
      date: makeDate(2, 7, 0),
      description: 'Start your day with the power of prayer. Join us online via Zoom for corporate intercession.',
      category: 'online',
      isOnline: true,
      onlineLink: 'https://zoom.us',
    },
    {
      _id: 'demo-5',
      title: 'Community Outreach & Food Drive',
      slug: { current: 'community-outreach' },
      date: makeDate(12, 10, 0),
      location: 'Glenn Dale Community Area',
      description: 'Serving our community with love! Volunteers are welcome to help distribute food and essentials to families in need.',
      category: 'outreach',
    },
    {
      _id: 'demo-6',
      title: 'Annual Church Anniversary Celebration',
      slug: { current: 'anniversary' },
      date: makeDate(20, 16, 0),
      endDate: makeDate(20, 18, 0),
      location: 'Online via Zoom',
      description: 'Celebrate the faithfulness of God as we mark another year of ministry with special praise, guest speakers, and fellowship.',
      category: 'special',
      featured: true,
      cost: 'Free',
      isOnline: true,
      onlineLink: 'https://zoom.us',
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
    <div className="relative">
      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-warm-100">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent-dark text-xs font-semibold tracking-[0.2em] uppercase mb-5">
            Upcoming Gatherings
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-warm-900 mb-5">
            Events
          </h1>
          <p className="text-lg text-warm-600 max-w-2xl mx-auto leading-relaxed">
            Join us for worship, fellowship, and community online via Zoom.
          </p>
        </div>
      </section>

      {/* Interactive Events Section */}
      <section className="py-10 md:py-14 bg-warm-100 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EventsPageClient events={events} />
        </div>
      </section>
    </div>
  )
}

