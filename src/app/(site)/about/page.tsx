import { Metadata } from 'next'
import { client, siteSettingsQuery, historyQuery, staffQuery } from '@/lib/sanity'
import { MissionVisionSection, TimelineSection, LeadershipGrid } from '@/components/about'
import type { SiteSettings, HistoryItem, Staff } from '@/types'

// Staff/history/mission rarely change — revalidate hourly
export const revalidate = 3600;

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
      {/* Hero Banner */}
      <section className="bg-primary-deep pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Our Church
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-white mb-4">
            About Us
          </h1>
          <p className="text-lg text-white/60 max-w-2xl">
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

