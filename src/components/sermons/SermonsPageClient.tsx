'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Video, Search, Calendar, Filter, ChevronDown, X, Play, BookOpen, ArrowUpRight, Sparkles, FileText } from 'lucide-react'
import { SermonCard } from './SermonCard'
import { SermonDetailModal } from './SermonDetailModal'
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
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null)

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
        <section className="py-12 bg-[#FAF7F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-deep via-primary-deep to-primary-ink border border-[#E6DDCA] shadow-md">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Video/Thumbnail side */}
                <div className="relative aspect-video lg:aspect-auto lg:min-h-[420px]">
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
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                      </div>
                      <div className="relative z-10 w-20 h-20 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-primary-deep ml-1" fill="currentColor" />
                      </div>
                    </button>
                  ) : (
                    <div className="relative w-full h-full min-h-[300px] lg:min-h-[420px] flex items-center justify-center overflow-hidden bg-primary-ink">
                      <Image
                        src={featuredSermon.fallbackImageUrl || "/images/sermons/sermon_faith.jpg"}
                        alt={featuredSermon.title || "Restoring Life Sanctuary"}
                        fill
                        className="object-cover opacity-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/50 to-transparent" />
                      <div className="relative z-10 flex flex-col items-center text-center p-6">
                        <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center mb-3">
                          <BookOpen className="w-7 h-7 text-accent" />
                        </div>
                        <span className="text-white/95 text-sm font-semibold">Sunday Worship Archive</span>
                        <span className="text-accent text-xs font-bold uppercase tracking-wider mt-1">Live Online Gathering</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content side */}
                <div className="p-8 lg:px-12 lg:py-10 flex flex-col justify-center">
                  <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                    Featured Message
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
                    <p className="text-sm font-semibold text-accent/90 mb-4">
                      {featuredSermon.scripture}
                    </p>
                  )}
                  {featuredSermon.series && (
                    <span className="inline-block text-xs font-semibold px-4 py-1.5 rounded-lg bg-white/[0.06] text-white/70 border border-white/10 mb-6 w-fit">
                      {featuredSermon.series}
                    </span>
                  )}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setSelectedSermon(featuredSermon)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-warm-900 font-bold rounded-lg hover:bg-warm-100 transition-colors shadow-md text-sm cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-primary" />
                      View Message &amp; Notes
                    </button>
                    <Link
                      href="/events"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-warm-900 font-bold rounded-lg hover:bg-accent-dark transition-colors shadow-md text-sm"
                    >
                      Join Live Worship · Sundays 4:00 PM
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Unified Switcher Tabs (Messages | Devotionals & Articles) */}
      <div className="bg-[#FAF7F1] pt-6 pb-2 border-b border-[#E6DDCA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="inline-flex items-center p-1 rounded-xl bg-white border border-[#E6DDCA]">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FAF7F1] text-primary font-bold text-sm shadow-xs border border-[#E6DDCA]">
              <Sparkles className="w-4 h-4 text-accent" />
              Messages
            </span>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[#5C525C] hover:text-[#251827] font-medium text-sm transition-colors"
            >
              <FileText className="w-4 h-4" />
              Devotionals &amp; Articles
            </Link>
          </div>
          <p className="text-xs text-[#5C525C]">
            Click any message to read scripture notes &amp; reflections
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <section className="py-6 bg-[#FAF7F1]/95 backdrop-blur-md border-b border-[#E6DDCA] sticky top-[72px] z-30">
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
      <section className="py-20 bg-[#FAF7F1] relative overflow-hidden">
        {/* Subtle dot matrix pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e6ddca_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50" />
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
                    onSelect={(s) => setSelectedSermon(s)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-warm-100 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-warm-300" />
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

      {/* Interactive Sermon Detail & Scripture Notes Modal */}
      <SermonDetailModal
        sermon={selectedSermon}
        onClose={() => setSelectedSermon(null)}
      />

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


