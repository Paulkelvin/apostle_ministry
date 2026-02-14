import { Metadata } from 'next'
import { client, siteSettingsQuery, historyQuery, staffQuery } from '@/lib/sanity'
import { MissionVisionSection, TimelineSection, LeadershipGrid } from '@/components/about'
import type { SiteSettings, HistoryItem, Staff } from '@/types'

export const metadata: Metadata = {
  title: 'About Us | The Apostles Ministry',
  description: 'Learn about our mission, vision, history, and the leadership of The Apostles Ministry.',
}

async function getAboutPageData() {
  try {
    const [settings, historyItems, staff] = await Promise.all([
      client.fetch<SiteSettings>(siteSettingsQuery),
      client.fetch<HistoryItem[]>(historyQuery),
      client.fetch<Staff[]>(staffQuery),
    ])
    return { settings, historyItems, staff }
  } catch {
    return { settings: null, historyItems: [], staff: [] }
  }
}

export default async function AboutPage() {
  const { settings, historyItems, staff } = await getAboutPageData()

  return (
    <>
      {/* Hero Banner — Luminous */}
      <section
        className="relative pt-32 pb-16 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #4A2629 0%, #6A3B3F 100%)',
        }}
      >
        {/* Gold glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top right, rgba(212, 175, 106, 0.15), transparent)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-5xl font-bold mb-4 tracking-tight"
            style={{ color: '#FDFBF7' }}
          >
            About Us
          </h1>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'rgba(220, 207, 192, 0.9)' }}
          >
            Discover who we are and what we believe
          </p>
        </div>
      </section>

      <MissionVisionSection
        mission={settings?.missionStatement}
        vision={settings?.visionStatement}
      />
      <TimelineSection historyItems={historyItems} />
      <LeadershipGrid staff={staff} />
    </>
  )
}
