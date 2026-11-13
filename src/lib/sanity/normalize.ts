import type { SiteSettings, ServiceTimes, Sermon, Event } from '@/types'

function getNextDayOfWeek(dayOfWeek: number, hour: number, minute: number): Date {
  const now = new Date()
  const result = new Date(now)
  result.setHours(hour, minute, 0, 0)
  const currentDay = now.getDay()
  let daysUntil = (dayOfWeek - currentDay + 7) % 7
  if (daysUntil === 0 && now.getTime() > result.getTime()) {
    daysUntil = 7
  }
  result.setDate(now.getDate() + daysUntil)
  return result
}

function getEventFallbackImage(event: Partial<Event>): string {
  const text = `${event.title || ''} ${event.category || ''}`.toLowerCase()
  if (text.includes('worship') || text.includes('sunday')) {
    return '/images/events/worship.jpg'
  }
  if (text.includes('bible') || text.includes('study')) {
    return '/images/events/bible-study.jpg'
  }
  if (text.includes('prayer') || text.includes('intercession')) {
    return '/images/events/prayer.jpg'
  }
  return '/images/events/fellowship.jpg'
}

/**
 * Normalizes events:
 * 1. Filters out any event containing placeholder / other ministry references (e.g. "High Calling", "Upper Marlboro").
 * 2. If events are empty or only contained placeholder events, provides the verified recurring RLFCC gatherings.
 * 3. Assigns an appealing category photograph to every event card so none show an empty grey placeholder box.
 */
export function normalizeEvents(events: Event[] | null | undefined): Event[] {
  const cleanEvents = (events || []).filter((event) => {
    const combined = `${event.title || ''} ${event.location || ''} ${event.description || ''}`.toLowerCase()
    return (
      !combined.includes('high calling') &&
      !combined.includes('upper marlboro') &&
      !combined.includes('the apostles ministry')
    )
  })

  if (cleanEvents.length > 0) {
    return cleanEvents.map((evt) => ({
      ...evt,
      fallbackImageUrl: getEventFallbackImage(evt),
    }))
  }

  const nextSunday = getNextDayOfWeek(0, 16, 0) // Sunday 4:00 PM
  const nextThursday = getNextDayOfWeek(4, 19, 30) // Thursday 7:30 PM
  const nextPrayer = getNextDayOfWeek(2, 7, 0) // Tuesday 7:00 AM
  const nextFellowship = new Date(nextSunday.getTime() + 7 * 24 * 60 * 60 * 1000)

  return [
    {
      _id: 'rlfcc-sunday-worship',
      title: 'Sunday Worship Service',
      slug: { current: 'sunday-worship-service' },
      date: nextSunday.toISOString(),
      location: 'Online via Zoom',
      description: 'Join us live for praise, worship, and an uplifting message from the Word of God.',
      category: 'sunday-service',
      cost: 'Free',
      featured: true,
      isOnline: true,
      onlineLink: 'https://zoom.us',
      fallbackImageUrl: '/images/events/worship.jpg',
    },
    {
      _id: 'rlfcc-thursday-bible-study',
      title: 'Midweek Bible Study',
      slug: { current: 'midweek-bible-study' },
      date: nextThursday.toISOString(),
      location: 'Online via Zoom',
      description: 'In-depth exploration of scripture, spiritual growth, and interactive discussion every Thursday.',
      category: 'bible-study',
      cost: 'Free',
      isOnline: true,
      onlineLink: 'https://zoom.us',
      fallbackImageUrl: '/images/events/bible-study.jpg',
    },
    {
      _id: 'rlfcc-prayer-meeting',
      title: 'Corporate Prayer & Intercession',
      slug: { current: 'prayer-meeting' },
      date: nextPrayer.toISOString(),
      location: 'Online via Zoom',
      description: 'Start your day grounded in prayer. Join us online via Zoom for corporate intercession.',
      category: 'online',
      cost: 'Free',
      isOnline: true,
      onlineLink: 'https://zoom.us',
      fallbackImageUrl: '/images/events/prayer.jpg',
    },
    {
      _id: 'rlfcc-family-fellowship',
      title: 'Family & Community Fellowship',
      slug: { current: 'family-fellowship' },
      date: nextFellowship.toISOString(),
      location: 'Online via Zoom',
      description: 'Connecting in faith, sharing testimonies, and building authentic community in Christ.',
      category: 'general',
      cost: 'Free',
      isOnline: true,
      onlineLink: 'https://zoom.us',
      fallbackImageUrl: '/images/events/fellowship.jpg',
    },
  ]
}

/**
 * Normalizes SiteSettings to guarantee RLFCC branding and correct metadata.
 */
export function normalizeSiteSettings(settings: SiteSettings | null | undefined): SiteSettings {
  const current = settings || ({} as Partial<SiteSettings>)

  return {
    ...current,
    siteName: 'Restoring Life Family Community Center',
    siteTagline: current.siteTagline || 'A place where everyone belongs.',
    heroTitle: current.heroTitle || 'Welcome Home',
    heroSubtitle: current.heroSubtitle || 'A place where everyone belongs',
    statement501c3:
      'Restoring Life Family Community Center is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the fullest extent allowed by law.',
    missionStatement:
      current.missionStatement?.replace(/RFLCC/g, 'RLFCC').replace(/The Apostles Ministry/g, 'Restoring Life Family Community Center') ||
      'It is the mission of RLFCC to be followers of Christ, at all times; triumphant over every obstacle, the adversary, sin, and imaginations. We will share the Love of God, the life, death, resurrection, and constant intercession of Jesus Christ, and the sweet communion, fellowship, and comfort of the Holy Ghost.',
    visionStatement:
      current.visionStatement ||
      'To be a community where everyone can experience the transforming love of Jesus, discover their purpose, and grow in faith together in genuine Christian fellowship.',
    socialLinks: (current.socialLinks || []).filter(
      (link) => link.platform !== 'youtube' || (link.url && !link.url.includes('example') && link.url !== 'https://youtube.com')
    ),
  } as SiteSettings
}

/**
 * Normalizes ServiceTimes to enforce the verified schedule and mailing address.
 */
export function normalizeServiceTimes(serviceTimes: ServiceTimes | null | undefined): ServiceTimes {
  return {
    locationName: 'Mailing Address & Online Fellowship',
    address: '6916 Hillmeade Road\nGlenn Dale, MD 20769',
    phoneNumber: '(202) 503-9579',
    email: 'admin@rlfcc.org',
    googleMapsLink: 'https://maps.google.com/?q=6916+Hillmeade+Road,+Glenn+Dale,+MD+20769',
    sundayServices: [
      {
        name: 'Sunday Worship Service',
        time: '4:00 PM via Zoom',
      },
    ],
    midweekServices: [
      {
        name: 'Bible Study',
        day: 'Every Thursday',
        time: '7:30 PM via Zoom',
      },
    ],
  }
}

/**
 * Normalizes Sermons to remove placeholder / third-party YouTube videos that are not RLFCC's.
 */
export function normalizeSermons(sermons: Sermon[] | null | undefined): Sermon[] {
  if (!sermons || !Array.isArray(sermons)) return []

  return sermons.map((sermon) => {
    // Strip external YouTube links since they do not belong to RLFCC
    const isThirdPartyYouTube = sermon.videoUrl && sermon.videoUrl.includes('youtube.com')

    return {
      ...sermon,
      videoUrl: isThirdPartyYouTube ? undefined : sermon.videoUrl,
    }
  })
}
