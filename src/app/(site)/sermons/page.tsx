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
          background: 'linear-gradient(135deg, #3D2A2C 0%, #592D31 100%)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.12), transparent)',
          }}
        />
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

      {/* Filter Bar */}
      {seriesList.length > 0 && (
        <section className="py-6 bg-[#FFFFFF] border-b border-[#E0D8D2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[#332D2D] font-medium">Filter by Series:</span>
              <button className="px-4 py-2 rounded-full bg-[#592D31] text-white text-sm font-medium cursor-pointer">
                All
              </button>
              {seriesList.slice(0, 5).map((series) => (
                <button
                  key={series}
                  className="px-4 py-2 rounded-full bg-[#F4F0EA] text-[#332D2D] text-sm font-medium hover:bg-[#E0D8D2] cursor-pointer transition-colors"
                >
                  {series}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sermons Grid */}
      <section className="py-20 bg-[#FCFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sermons.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sermons.map((sermon, index) => (
                <SermonCard key={sermon._id} sermon={sermon} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-[#F4F0EA] flex items-center justify-center mx-auto mb-6">
                <Video className="w-10 h-10 text-[#E0D8D2]" />
              </div>
              <h2 className="text-2xl font-bold text-[#592D31] mb-2">No Sermons Yet</h2>
              <p className="text-[#332D2D]">
                Check back soon for our sermon archive!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
