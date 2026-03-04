import { Metadata } from 'next'
import { client, siteSettingsQuery, historyQuery, staffQuery } from '@/lib/sanity'
import { MissionVisionSection, TimelineSection, LeadershipGrid } from '@/components/about'
import { WaveLine, DottedSquare } from '@/components/ui/MicroGraphics'
import type { SiteSettings, HistoryItem, Staff } from '@/types'

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
          background: 'linear-gradient(135deg, #3D2A2C 0%, #592D31 100%)',
        }}
      >
        {/* Gold glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.15), transparent)',
          }}
        />

        {/* Decorative MicroGraphics */}
        <WaveLine className="top-20 left-[5%] opacity-30 mix-blend-overlay rotate-[15deg]" delay={0.2} color="#D4AF37" />
        <DottedSquare className="bottom-[10%] right-[10%] opacity-20 mix-blend-overlay" delay={1.5} color="#D4AF37" />

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
        accentImage={settings?.missionVisionAccentImage}
      />
      <TimelineSection historyItems={historyItems} parchmentImage={settings?.timelineParchmentImage} />
      <LeadershipGrid staff={staff} />
    </>
  )
}

