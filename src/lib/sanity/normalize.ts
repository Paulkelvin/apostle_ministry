import type { SiteSettings, ServiceTimes, Sermon } from '@/types'

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
