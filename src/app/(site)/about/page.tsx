import { Metadata } from 'next'
import { client, siteSettingsQuery, historyQuery, staffQuery } from '@/lib/sanity'
import { MissionVisionSection, TimelineSection, LeadershipGrid } from '@/components/about'
import type { SiteSettings, HistoryItem, Staff } from '@/types'

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'About Us | Restoring Life Family Community Center',
  description: 'Learn about our mission, vision, history, and the leadership of Restoring Life Family Community Center.',
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
          background: 'linear-gradient(135deg, #2E2448 0%, #6B4F9E 100%)',
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-5xl font-bold mb-4 tracking-tight"
            style={{ color: '#FFFFFF' }}
          >
            About Us
          </h1>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'rgba(224, 216, 210, 0.9)' }}
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

