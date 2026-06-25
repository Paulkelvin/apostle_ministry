'use client'

import { useState, useMemo } from 'react'
import { Video, Search, Calendar, Filter, ChevronDown, X, Play } from 'lucide-react'
import { SermonCard } from './SermonCard'
import { SanityImageComponent } from '@/components/ui'
import { VideoModal } from '@/components/ui/VideoEmbed'
import type { Sermon, SanityImage } from '@/types'

interface SermonsPageClientProps {
  sermons: Sermon[]
  seriesList: string[]
  godRaysImage?: SanityImage
}

export function SermonsPageClient({ sermons, seriesList, godRaysImage }: SermonsPageClientProps) {
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
        <section className="py-12 bg-[#FCFBF9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden bg-[#1A1A1A]">
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
                      <div className="relative z-10 w-20 h-20 rounded-full bg-[#CBA052] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-[#3E1F6B] ml-1" fill="#3E1F6B" />
                      </div>
                    </button>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4B2D7F] to-[#2E1F47] flex items-center justify-center">
                      <Video className="w-24 h-24 text-white/20" />
                    </div>
                  )}
                </div>

                {/* Content side */}
                <div className="p-8 lg:px-12 lg:py-10 flex flex-col justify-center bg-gradient-to-br from-[#1F1F1F] to-[#1A1A1A]">
                  <span className="text-[#CBA052] text-xs font-bold tracking-[1px] uppercase mb-3">
                    Latest Message
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: '#FDEFD3' }}>
                    {featuredSermon.title}
                  </h2>
                  {featuredSermon.speaker && (
                    <p className="font-semibold mb-2" style={{ color: '#E0D8D2' }}>
                      {featuredSermon.speaker.name}
                    </p>
                  )}
                  {featuredSermon.scripture && (
                    <p className="text-sm font-semibold mb-4" style={{ color: '#E0D8D2' }}>
                      {featuredSermon.scripture}
                    </p>
                  )}
                  {featuredSermon.series && (
                    <span className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full bg-[#4B2D7F]/30 text-[#E0D8D2] border border-[#CBA052]/10 mb-6 w-fit">
                      {featuredSermon.series}
                    </span>
                  )}
                  {featuredSermon.videoUrl && (
                    <button
                      onClick={() => handlePlayVideo(featuredSermon.videoUrl!, featuredSermon.title)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#CBA052] text-[#3E1F6B] font-bold rounded-lg hover:bg-[#B8933F] transition-colors w-fit"
                    >
                      <Play className="w-4 h-4" fill="#3E1F6B" />
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
      <section className="py-6 bg-[#FFFFFF] border-b border-[#E0D8D2] sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {/* Top row: Search + sort */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8080]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search sermons..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F4F0EA] border border-[#E0D8D2] rounded-lg text-sm text-[#332D2D] placeholder:text-[#8A8080] focus:outline-none focus:border-[#4B2D7F] transition-colors"
                />
              </div>

              <div className="flex items-center gap-3">
                {/* Filter toggle button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ease-out active:scale-95 ${
                    showFilters || hasActiveFilters
                      ? 'bg-[#4B2D7F] text-white'
                      : 'bg-[#F4F0EA] text-[#332D2D] hover:bg-[#E0D8D2]'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#1A1A1A] text-xs flex items-center justify-center">
                      {(activeSeries ? 1 : 0) + (activeSpeaker ? 1 : 0) + (search ? 1 : 0)}
                    </span>
                  )}
                </button>

                {/* Sort dropdown - Custom */}
                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    onBlur={() => setTimeout(() => setShowSortDropdown(false), 150)}
                    className="flex items-center gap-2 pl-4 pr-3 py-2.5 bg-[#F4F0EA] border border-[#E0D8D2] rounded-xl text-sm font-medium text-[#332D2D] cursor-pointer hover:border-[#4B2D7F]/30 focus:outline-none focus:border-[#4B2D7F] transition-all duration-200"
                  >
                    <Calendar className="w-4 h-4 text-[#8A8080]" />
                    <span>{sortBy === 'newest' ? 'Newest First' : 'Oldest First'}</span>
                    <ChevronDown className={`w-4 h-4 text-[#8A8080] transition-transform duration-200 ${showSortDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Custom dropdown menu */}
                  <div className={`absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl shadow-[#4B2D7F]/10 border border-[#E0D8D2]/50 overflow-hidden z-50 transition-all duration-200 origin-top ${
                    showSortDropdown 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}>
                    <div className="py-1">
                      <button
                        onClick={() => { setSortBy('newest'); setShowSortDropdown(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 ${
                          sortBy === 'newest' 
                            ? 'bg-[#4B2D7F]/5 text-[#4B2D7F] font-semibold' 
                            : 'text-[#332D2D] hover:bg-[#F4F0EA]'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full transition-all duration-200 ${sortBy === 'newest' ? 'bg-[#D4AF37] scale-100' : 'bg-transparent scale-0'}`} />
                        Newest First
                      </button>
                      <button
                        onClick={() => { setSortBy('oldest'); setShowSortDropdown(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 ${
                          sortBy === 'oldest' 
                            ? 'bg-[#4B2D7F]/5 text-[#4B2D7F] font-semibold' 
                            : 'text-[#332D2D] hover:bg-[#F4F0EA]'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full transition-all duration-200 ${sortBy === 'oldest' ? 'bg-[#D4AF37] scale-100' : 'bg-transparent scale-0'}`} />
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
              <div className="flex flex-wrap items-start gap-4 pt-4 border-t border-[#E0D8D2]">
                {/* Series filter */}
                {seriesList.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-[#332D2D] mr-1">Series:</span>
                    <button
                      onClick={() => setActiveSeries(null)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ease-out active:scale-95 ${
                        !activeSeries
                          ? 'bg-[#4B2D7F] text-white'
                          : 'bg-[#F4F0EA] text-[#332D2D] hover:bg-[#E0D8D2]'
                      }`}
                    >
                      All
                    </button>
                    {seriesList.map((series) => (
                      <button
                        key={series}
                        onClick={() => setActiveSeries(activeSeries === series ? null : series)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ease-out active:scale-95 ${
                          activeSeries === series
                            ? 'bg-[#4B2D7F] text-white'
                            : 'bg-[#F4F0EA] text-[#332D2D] hover:bg-[#E0D8D2]'
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
                    <span className="text-sm font-medium text-[#332D2D] mr-1">Speaker:</span>
                    <button
                      onClick={() => setActiveSpeaker(null)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ease-out active:scale-95 ${
                        !activeSpeaker
                          ? 'bg-[#D4AF37] text-[#1A1A1A]'
                          : 'bg-[#F4F0EA] text-[#332D2D] hover:bg-[#E0D8D2]'
                      }`}
                    >
                      All
                    </button>
                    {speakers.map((speaker) => (
                      <button
                        key={speaker}
                        onClick={() => setActiveSpeaker(activeSpeaker === speaker ? null : speaker)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ease-out active:scale-95 ${
                          activeSpeaker === speaker
                            ? 'bg-[#D4AF37] text-[#1A1A1A]'
                            : 'bg-[#F4F0EA] text-[#332D2D] hover:bg-[#E0D8D2]'
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
                    className="inline-flex items-center gap-1 text-sm text-[#4B2D7F] hover:text-[#2E1F47] font-medium ml-auto transition-colors duration-200"
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
        <section className="py-20 bg-[#FCFBF9] relative overflow-hidden">
          {/* Decorative Corner Accents (formerly God Rays) */}
          {/* Decorative Grid Accent - Top Right Diagonal */}
            {godRaysImage && (
              <div className="absolute -top-12 md:-top-16 -right-12 md:-right-16 w-[300px] h-[300px] pointer-events-none opacity-60 mix-blend-multiply z-0 transform rotate-[30deg]">
                <SanityImageComponent
                  image={godRaysImage}
                  alt="Decorative Grid Accent Top Right Diagonal"
                  fill
                  className="object-contain object-top object-right"
                />
              </div>
            )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {filteredSermons.length > 0 ? (
            <>
              <p className="text-sm text-[#8A8080] mb-6">
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
              <div className="w-20 h-20 rounded-full bg-[#F4F0EA] flex items-center justify-center mx-auto mb-6">
                <Video className="w-10 h-10 text-[#E0D8D2]" />
              </div>
              <h2 className="text-2xl font-bold text-[#4B2D7F] mb-2">
                {hasActiveFilters ? 'No Matching Sermons' : 'No Sermons Yet'}
              </h2>
              <p className="text-[#332D2D]">
                {hasActiveFilters
                  ? 'Try adjusting your filters to find what you\'re looking for.'
                  : 'Check back soon for our sermon archive!'}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-[#4B2D7F] font-semibold hover:underline"
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


