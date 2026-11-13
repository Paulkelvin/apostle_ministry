import { Metadata } from 'next'
import { client, sermonsQuery, sermonSeriesQuery, normalizeSermons } from '@/lib/sanity'
import { SermonsPageClient } from '@/components/sermons'
import type { Sermon } from '@/types'

// New sermon posted roughly weekly, people check same-day
export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Sermons | Restoring Life Family Community Center',
  description: 'Worship and grow with spirit-filled messages from Restoring Life Family Community Center.',
}

async function getSermonsData() {
  try {
    const [rawSermons, seriesList] = await Promise.all([
      client.fetch<Sermon[]>(sermonsQuery),
      client.fetch<string[]>(sermonSeriesQuery),
    ])
    return {
      sermons: normalizeSermons(rawSermons),
      seriesList: seriesList || [],
    }
  } catch {
    return { sermons: [], seriesList: [] }
  }
}

export default async function SermonsPage() {
  const { sermons, seriesList } = await getSermonsData()

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-primary-deep via-primary-deep to-primary-ink pt-36 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-primary-light/10 blur-[100px] pointer-events-none rounded-full" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/15 border border-accent/25 text-accent text-xs font-semibold tracking-wider uppercase mb-5">
            Watch &amp; Listen
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Messages &amp; Sermons
          </h1>
          <p className="text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed">
            Explore our archive of spirit-filled messages to grow in faith, wisdom, and fellowship.
          </p>
        </div>
      </section>

      {/* Interactive Sermon Browser */}
      <SermonsPageClient sermons={sermons} seriesList={seriesList} />
    </>
  )
}

