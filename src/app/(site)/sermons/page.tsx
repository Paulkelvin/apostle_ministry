import { Metadata } from 'next'
import { client, sermonsQuery, sermonSeriesQuery } from '@/lib/sanity'
import { SermonsPageClient } from '@/components/sermons'
import type { Sermon } from '@/types'

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Sermons | Restoring Life Family Community Center',
  description: 'Watch and listen to past sermons from Restoring Life Family Community Center.',
}

async function getSermonsData() {
  try {
    const [sermons, seriesList] = await Promise.all([
      client.fetch<Sermon[]>(sermonsQuery),
      client.fetch<string[]>(sermonSeriesQuery),
    ])
    return { sermons, seriesList }
  } catch {
    return { sermons: [], seriesList: [] }
  }
}

export default async function SermonsPage() {
  const { sermons, seriesList } = await getSermonsData()

  return (
    <>
      {/* Hero Banner */}
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
      <SermonsPageClient sermons={sermons} seriesList={seriesList} />
    </>
  )
}

