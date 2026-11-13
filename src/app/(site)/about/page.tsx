import { Metadata } from 'next'
import { client, siteSettingsQuery, historyQuery, staffQuery, normalizeStaff, normalizeSiteSettings } from '@/lib/sanity'
import {
  StorySection,
  MissionVisionSection,
  PillarsSection,
  WhatToExpectSection,
  BeliefsSection,
  LeadershipGrid,
  AboutCtaSection,
  TimelineSection,
} from '@/components/about'
import type { SiteSettings, HistoryItem, Staff } from '@/types'

// Staff/history/mission rarely change — revalidate hourly
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'About Us | Restoring Life Family Community Center',
  description: 'Learn about our heart, mission, vision, biblical pillars, and leadership at Restoring Life Family Community Center.',
}

async function getAboutPageData() {
  try {
    const [rawSettings, historyItems, rawStaff] = await Promise.all([
      client.fetch<SiteSettings>(siteSettingsQuery),
      client.fetch<HistoryItem[]>(historyQuery),
      client.fetch<Staff[]>(staffQuery),
    ])
    return {
      settings: normalizeSiteSettings(rawSettings),
      historyItems: historyItems || [],
      staff: normalizeStaff(rawStaff),
    }
  } catch {
    return { settings: normalizeSiteSettings(null), historyItems: [], staff: [] }
  }
}

export default async function AboutPage() {
  const { settings, historyItems, staff } = await getAboutPageData()

  return (
    <>
      {/* Hero Banner — Warm Luminous Plum & Amber */}
      <section className="relative bg-gradient-to-b from-primary-deep via-primary-deep to-primary-ink pt-36 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-primary-light/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/10 blur-[100px] pointer-events-none rounded-full" />

        {/* Subtle dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/25 text-accent text-xs font-semibold tracking-wider uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Heart &amp; Heritage
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-5 font-display font-bold leading-tight">
            Restoring Hope, Renewing Faith
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            Discover the mission, biblical pillars, and spiritual family that guide Restoring Life Family Community Center.
          </p>
        </div>
      </section>

      {/* Story & Heart */}
      <StorySection />

      {/* Mission & Vision Dual Harmony */}
      <MissionVisionSection
        mission={settings?.missionStatement}
        vision={settings?.visionStatement}
      />

      {/* The 5 Biblical Pillars of RLFCC */}
      <PillarsSection />

      {/* What We Believe (Doctrinal Foundations) */}
      <BeliefsSection />

      {/* What to Expect (Answering Newcomer Questions) */}
      <WhatToExpectSection />

      {/* History (Only rendered if authentic history items exist in CMS) */}
      {historyItems && historyItems.length > 0 && (
        <TimelineSection historyItems={historyItems} />
      )}

      {/* Leadership Team */}
      <LeadershipGrid staff={staff} />

      {/* Welcoming Call to Action */}
      <AboutCtaSection />
    </>
  )
}
