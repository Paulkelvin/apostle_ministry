import { Metadata } from 'next'
import { client, sermonsQuery, sermonSeriesQuery, siteSettingsQuery } from '@/lib/sanity'
import { SermonsPageClient } from '@/components/sermons'
import { FloatingRing, WaveLine } from '@/components/ui/MicroGraphics'
import type { Sermon, SiteSettings } from '@/types'

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Sermons | Restoring Life Family Community Center',
  description: 'Watch and listen to past sermons from Restoring Life Family Community Center.',
}

async function getSermonsData() {
  try {
    const [sermons, seriesList, settings] = await Promise.all([
      client.fetch<Sermon[]>(sermonsQuery),
      client.fetch<string[]>(sermonSeriesQuery),
      client.fetch<SiteSettings>(siteSettingsQuery),
    ])
    return { sermons, seriesList, settings }
  } catch {
    return { sermons: [], seriesList: [], settings: null }
  }
}

export default async function SermonsPage() {
  const { sermons, seriesList, settings } = await getSermonsData()

  return (
    <>
      {/* Hero Banner */}
      <section
        className="relative pt-32 pb-16 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #3D2A2C 0%, #592D31 100%)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.12), transparent)',
          }}
        />

        {/* Decorative MicroGraphics */}
        <FloatingRing className="top-10 left-[15%] opacity-30 mix-blend-overlay" size={100} delay={0.3} color="#D4AF37" />
        <WaveLine className="bottom-[10%] right-[10%] opacity-20 mix-blend-overlay" delay={1.2} color="#D4AF37" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-5xl font-bold mb-4 tracking-tight"
            style={{ color: '#FFFFFF' }}
          >
            Sermons
          </h1>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'rgba(224, 216, 210, 0.9)' }}
          >
            Explore our archive of messages to grow in your faith
          </p>
        </div>
      </section>

      {/* Interactive Sermon Browser */}
      <SermonsPageClient 
        sermons={sermons} 
        seriesList={seriesList} 
        godRaysImage={settings?.sermonsGodRaysImage}
      />
    </>
  )
}

