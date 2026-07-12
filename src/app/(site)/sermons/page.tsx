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
      <section className="bg-primary-deep pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Watch &amp; Listen
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-white mb-4">
            Sermons
          </h1>
          <p className="text-lg text-white/60 max-w-2xl">
            Explore our archive of messages to grow in your faith
          </p>
        </div>
      </section>

      {/* Interactive Sermon Browser */}
      <SermonsPageClient sermons={sermons} seriesList={seriesList} />
    </>
  )
}

