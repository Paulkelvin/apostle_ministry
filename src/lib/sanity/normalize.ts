import type { SiteSettings, ServiceTimes, Sermon, Event, Post, Staff } from '@/types'

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
 * Normalizes Sermons to remove placeholder / third-party YouTube videos and fictional speaker names.
 */
export function normalizeSermons(sermons: Sermon[] | null | undefined): Sermon[] {
  if (!sermons || !Array.isArray(sermons)) return []

  return sermons.map((sermon) => {
    // Strip external YouTube links since they do not belong to RLFCC
    const isThirdPartyYouTube = sermon.videoUrl && sermon.videoUrl.includes('youtube.com')

    let cleanSpeaker = sermon.speaker
    if (cleanSpeaker) {
      const name = cleanSpeaker.name?.toLowerCase() || ''
      if (name.includes('smith') || name.includes('david') || name.includes('john')) {
        cleanSpeaker = {
          ...cleanSpeaker,
          name: 'RLFCC Pastoral Team',
          role: 'Pastoral Teaching',
        }
      }
    } else {
      cleanSpeaker = {
        _id: 'rlfcc-pastoral-team',
        name: 'RLFCC Pastoral Team',
        role: 'Pastoral Teaching',
        rank: 1,
      }
    }

    let cleanDesc = sermon.description || ''
    cleanDesc = cleanDesc
      .replace(/Pastor John Smith/gi, 'Our pastoral team')
      .replace(/Pastor David/gi, 'Our pastoral team')
      .replace(/Jane Smith/gi, 'Our worship team')
      .replace(/John Smith/gi, 'Our pastoral team')

    return {
      ...sermon,
      speaker: cleanSpeaker,
      description: cleanDesc,
      videoUrl: isThirdPartyYouTube ? undefined : sermon.videoUrl,
    }
  })
}

/**
 * Normalizes Posts:
 * 1. Replaces fictional author names (e.g. "Pastor John Smith") with "RLFCC Ministry Team".
 * 2. Cleans fictional names from excerpts while preserving the articles.
 */
export function normalizePosts(posts: Post[] | null | undefined): Post[] {
  if (!posts || !Array.isArray(posts)) return []

  return posts.map((post) => {
    let cleanAuthor = post.author
    if (cleanAuthor) {
      const name = cleanAuthor.name?.toLowerCase() || ''
      if (name.includes('smith') || name.includes('john')) {
        cleanAuthor = {
          ...cleanAuthor,
          name: 'RLFCC Ministry Team',
          role: 'Editorial & Teaching',
          image: undefined, // remove placeholder author portrait
        }
      }
    } else {
      cleanAuthor = {
        _id: 'rlfcc-ministry-team',
        name: 'RLFCC Ministry Team',
        role: 'Editorial & Teaching',
        rank: 1,
      }
    }

    let cleanExcerpt = post.excerpt || ''
    cleanExcerpt = cleanExcerpt
      .replace(/Pastor John Smith/gi, 'The RLFCC ministry team')
      .replace(/Pastor John/gi, 'The pastoral team')
      .replace(/John Smith/gi, 'The RLFCC ministry team')

    return {
      ...post,
      author: cleanAuthor,
      excerpt: cleanExcerpt,
    }
  })
}

/**
 * Normalizes Staff:
 * 1. Filters out fictional placeholder staff (e.g. "Pastor John Smith", "Jane Smith", "Michael Johnson").
 * 2. Keeps verified leadership members.
 */
export function normalizeStaff(staff: Staff[] | null | undefined): Staff[] {
  const cleanStaff = (staff || []).filter((person) => {
    const name = person.name?.toLowerCase() || ''
    return !name.includes('smith') && !name.includes('michael johnson')
  })

  return cleanStaff
}
