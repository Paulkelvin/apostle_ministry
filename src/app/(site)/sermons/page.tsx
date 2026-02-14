import { Metadata } from 'next'
import { Video } from 'lucide-react'
import { client, sermonsQuery, sermonSeriesQuery } from '@/lib/sanity'
import { SermonCard } from '@/components/sermons'
import type { Sermon } from '@/types'

export const metadata: Metadata = {
  title: 'Sermons | The Apostles Ministry',
  description: 'Watch and listen to past sermons from The Apostles Ministry.',
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
          background: 'linear-gradient(135deg, #382022 0%, #292121 100%)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top right, rgba(212, 175, 106, 0.12), transparent)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-5xl font-bold mb-4 tracking-tight"
            style={{ color: '#FDFBF7' }}
          >
            Sermons
          </h1>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'rgba(220, 207, 192, 0.9)' }}
          >
            Explore our archive of messages to grow in your faith
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      {seriesList.length > 0 && (
        <section className="py-6 bg-[#FDFBF7] border-b border-[#DCCFC0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[#665A58] font-medium">Filter by Series:</span>
              <button className="px-4 py-2 rounded-full bg-[#6A3B3F] text-white text-sm font-medium cursor-pointer">
                All
              </button>
              {seriesList.slice(0, 5).map((series) => (
                <button
                  key={series}
                  className="px-4 py-2 rounded-full bg-[#E6D8C8] text-[#665A58] text-sm font-medium hover:bg-[#DCCFC0] cursor-pointer transition-colors"
                >
                  {series}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sermons Grid */}
      <section className="py-20 bg-[#F0E6D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sermons.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sermons.map((sermon, index) => (
                <SermonCard key={sermon._id} sermon={sermon} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-[#E6D8C8] flex items-center justify-center mx-auto mb-6">
                <Video className="w-10 h-10 text-[#DCCFC0]" />
              </div>
              <h2 className="text-2xl font-bold text-[#292121] mb-2">No Sermons Yet</h2>
              <p className="text-[#665A58]">
                Check back soon for our sermon archive!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
