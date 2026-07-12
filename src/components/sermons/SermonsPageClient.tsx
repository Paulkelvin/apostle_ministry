'use client'

import { useState, useMemo } from 'react'
import { Video, Search, Calendar, Filter, ChevronDown, X, Play } from 'lucide-react'
import { SermonCard } from './SermonCard'
import { SanityImageComponent } from '@/components/ui'
import { VideoModal } from '@/components/ui/VideoEmbed'
import type { Sermon } from '@/types'

interface SermonsPageClientProps {
  sermons: Sermon[]
  seriesList: string[]
}

export function SermonsPageClient({ sermons, seriesList }: SermonsPageClientProps) {
  const [search, setSearch] = useState('')
  const [activeSeries, setActiveSeries] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null)
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>('Sermon Video')

  // Handle video playback
  const handlePlayVideo = (videoUrl: string, title: string) => {
    setActiveVideoUrl(videoUrl)
    setActiveVideoTitle(title)
    setShowVideoModal(true)
  }

  // Get unique speakers
  const speakers = useMemo(() => {
    const speakerNames = sermons
      .map((s) => s.speaker?.name)
      .filter((name): name is string => !!name)
    return [...new Set(speakerNames)]
  }, [sermons])

  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null)

  // Filter sermons
  const filteredSermons = useMemo(() => {
    let filtered = [...sermons]

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase()
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.series?.toLowerCase().includes(q) ||
          s.speaker?.name?.toLowerCase().includes(q) ||
          s.scripture?.toLowerCase().includes(q)
      )
    }

    // Series filter
    if (activeSeries) {
      filtered = filtered.filter((s) => s.series === activeSeries)
    }

    // Speaker filter
    if (activeSpeaker) {
      filtered = filtered.filter((s) => s.speaker?.name === activeSpeaker)
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.date || 0).getTime()
      const dateB = new Date(b.date || 0).getTime()
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB
    })

    return filtered
  }, [sermons, search, activeSeries, activeSpeaker, sortBy])

  const hasActiveFilters = activeSeries || activeSpeaker || search

  const clearFilters = () => {
    setSearch('')
    setActiveSeries(null)
    setActiveSpeaker(null)
  }

  // Featured sermon (most recent with video)
  const featuredSermon = useMemo(() => {
    return sermons.find((s) => s.videoUrl) || sermons[0]
  }, [sermons])

  return (
    <>
      {/* Featured Sermon - Only show if there are sermons */}
      {featuredSermon && sermons.length > 0 && (
        <section className="py-12 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-xl overflow-hidden bg-primary-deep">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Video/Thumbnail side */}
                <div className="relative aspect-video lg:aspect-auto lg:min-h-[400px]">
                  {featuredSermon.videoUrl ? (
                    <button 
                      onClick={() => handlePlayVideo(featuredSermon.videoUrl!, featuredSermon.title)}
                      className="absolute inset-0 w-full h-full bg-black flex items-center justify-center group cursor-pointer"
                    >
                      {/* Thumbnail background */}
                      <div className="absolute inset-0">
                        {featuredSermon.thumbnail && (
                          <SanityImageComponent
                            image={featuredSermon.thumbnail}
                            alt={featuredSermon.title}
                            fill
                            className="object-cover"
                          />
                        )}
                        {/* 40% black overlay for depth */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                      </div>
                      <div className="relative z-10 w-20 h-20 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-primary-deep ml-1" fill="currentColor" />
                      </div>
                    </button>
                  ) : (
                    <div className="absolute inset-0 bg-primary-deep flex items-center justify-center">
                      <Video className="w-24 h-24 text-white/20" />
                    </div>
                  )}
                </div>

                {/* Content side */}
                <div className="p-8 lg:px-12 lg:py-10 flex flex-col justify-center">
                  <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                    Latest Message
                  </span>
                  <h2 className="font-display text-2xl lg:text-3xl font-semibold text-white mb-4">
                    {featuredSermon.title}
                  </h2>
                  {featuredSermon.speaker && (
                    <p className="font-semibold text-white/70 mb-2">
                      {featuredSermon.speaker.name}
                    </p>
                  )}
                  {featuredSermon.scripture && (
                    <p className="text-sm font-semibold text-white/70 mb-4">
                      {featuredSermon.scripture}
                    </p>
                  )}
                  {featuredSermon.series && (
                    <span className="inline-block text-xs font-semibold px-4 py-1.5 rounded-lg bg-white/[0.06] text-white/70 border border-white/10 mb-6 w-fit">
                      {featuredSermon.series}
                    </span>
                  )}
                  {featuredSermon.videoUrl && (
                    <button
                      onClick={() => handlePlayVideo(featuredSermon.videoUrl!, featuredSermon.title)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-warm-900 font-bold rounded-lg hover:bg-accent-dark transition-colors w-fit"
                    >
                      <Play className="w-4 h-4" fill="currentColor" />
                      Watch Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter Bar */}
      <section className="py-6 bg-white border-b border-warm-200 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {/* Top row: Search + sort */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search sermons..."
                  className="w-full pl-10 pr-4 py-2.5 bg-warm-100 border border-warm-200 rounded-lg text-sm text-ink placeholder:text-warm-500 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="flex items-center gap-3">
                {/* Filter toggle button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ease-out active:scale-95 ${
                    showFilters || hasActiveFilters
                      ? 'bg-primary text-white'
                      : 'bg-warm-100 text-ink hover:bg-warm-200'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="w-5 h-5 rounded-full bg-accent text-warm-900 text-xs flex items-center justify-center">
                      {(activeSeries ? 1 : 0) + (activeSpeaker ? 1 : 0) + (search ? 1 : 0)}
                    </span>
                  )}
                </button>

                {/* Sort dropdown - Custom */}
                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    onBlur={() => setTimeout(() => setShowSortDropdown(false), 150)}
                    className="flex items-center gap-2 pl-4 pr-3 py-2.5 bg-warm-100 border border-warm-200 rounded-xl text-sm font-medium text-ink cursor-pointer hover:border-primary/30 focus:outline-none focus:border-primary transition-all duration-200"
                  >
                    <Calendar className="w-4 h-4 text-warm-500" />
                    <span>{sortBy === 'newest' ? 'Newest First' : 'Oldest First'}</span>
                    <ChevronDown className={`w-4 h-4 text-warm-500 transition-transform duration-200 ${showSortDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Custom dropdown menu */}
                  <div className={`absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl shadow-primary/10 border border-warm-200/50 overflow-hidden z-50 transition-all duration-200 origin-top ${
                    showSortDropdown 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}>
                    <div className="py-1">
                      <button
                        onClick={() => { setSortBy('newest'); setShowSortDropdown(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 ${
                          sortBy === 'newest' 
                            ? 'bg-primary/5 text-primary font-semibold' 
                            : 'text-ink hover:bg-warm-100'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full transition-all duration-200 ${sortBy === 'newest' ? 'bg-accent scale-100' : 'bg-transparent scale-0'}`} />
                        Newest First
                      </button>
                      <button
                        onClick={() => { setSortBy('oldest'); setShowSortDropdown(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 ${
                          sortBy === 'oldest' 
                            ? 'bg-primary/5 text-primary font-semibold' 
                            : 'text-ink hover:bg-warm-100'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full transition-all duration-200 ${sortBy === 'oldest' ? 'bg-accent scale-100' : 'bg-transparent scale-0'}`} />
                        Oldest First
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expandable filters */}
            <div className={`overflow-hidden transition-all duration-300 ease-out ${
              showFilters ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="flex flex-wrap items-start gap-4 pt-4 border-t border-warm-200">
                {/* Series filter */}
                {seriesList.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-ink mr-1">Series:</span>
                    <button
                      onClick={() => setActiveSeries(null)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ease-out active:scale-95 ${
                        !activeSeries
                          ? 'bg-primary text-white'
                          : 'bg-warm-100 text-ink hover:bg-warm-200'
                      }`}
                    >
                      All
                    </button>
                    {seriesList.map((series) => (
                      <button
                        key={series}
                        onClick={() => setActiveSeries(activeSeries === series ? null : series)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ease-out active:scale-95 ${
                          activeSeries === series
                            ? 'bg-primary text-white'
                            : 'bg-warm-100 text-ink hover:bg-warm-200'
                        }`}
                      >
                        {series}
                      </button>
                    ))}
                  </div>
                )}

                {/* Speaker filter */}
                {speakers.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-ink mr-1">Speaker:</span>
                    <button
                      onClick={() => setActiveSpeaker(null)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ease-out active:scale-95 ${
                        !activeSpeaker
                          ? 'bg-primary text-white'
                          : 'bg-warm-100 text-ink hover:bg-warm-200'
                      }`}
                    >
                      All
                    </button>
                    {speakers.map((speaker) => (
                      <button
                        key={speaker}
                        onClick={() => setActiveSpeaker(activeSpeaker === speaker ? null : speaker)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ease-out active:scale-95 ${
                          activeSpeaker === speaker
                            ? 'bg-primary text-white'
                            : 'bg-warm-100 text-ink hover:bg-warm-200'
                        }`}
                      >
                        {speaker}
                      </button>
                    ))}
                  </div>
                )}

                {/* Clear filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-deep font-medium ml-auto transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                    Clear all
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sermons Grid */}
        <section className="py-20 bg-surface relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {filteredSermons.length > 0 ? (
            <>
              <p className="text-sm text-warm-500 mb-6">
                Showing {filteredSermons.length} {filteredSermons.length === 1 ? 'sermon' : 'sermons'}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSermons.map((sermon, index) => (
                  <SermonCard 
                    key={sermon._id} 
                    sermon={sermon} 
                    index={index}
                    onPlayVideo={handlePlayVideo}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-warm-100 flex items-center justify-center mx-auto mb-6">
                <Video className="w-10 h-10 text-warm-200" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                {hasActiveFilters ? 'No Matching Sermons' : 'No Sermons Yet'}
              </h2>
              <p className="text-ink">
                {hasActiveFilters
                  ? 'Try adjusting your filters to find what you\'re looking for.'
                  : 'Check back soon for our sermon archive!'}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-primary font-semibold hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Video Modal for embedded playback */}
      {activeVideoUrl && (
        <VideoModal
          videoUrl={activeVideoUrl}
          isOpen={showVideoModal}
          onClose={() => {
            setShowVideoModal(false)
            setActiveVideoUrl(null)
          }}
          title={activeVideoTitle}
        />
      )}
    </>
  )
}


