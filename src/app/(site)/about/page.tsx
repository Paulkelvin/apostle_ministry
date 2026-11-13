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
      <section className="relative bg-gradient-to-b from-primary-deep via-primary-deep to-primary-ink pt-36 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-primary-light/10 blur-[100px] pointer-events-none rounded-full" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/15 border border-accent/25 text-accent text-xs font-semibold tracking-wider uppercase mb-5">
            About Our Ministry
          </span>
          <h1 className="text-h1 text-white mb-4 font-display">
            Who We Are
          </h1>
          <p className="text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed">
            Discover our heart, our mission, and the community of faith that guides Restoring Life Family Community Center.
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

