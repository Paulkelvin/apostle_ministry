'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { BookOpen, ChevronDown, Clock, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { format } from 'date-fns'
import { BlogCard, CategoryFilter, SearchBar, NewsletterSubscribe } from '@/components/blog'
import { SanityImageComponent } from '@/components/ui'
import { estimateReadingTime } from '@/lib/utils'
import type { Post, Category } from '@/types'

interface BlogPageClientProps {
  posts: Post[]
  categories: Category[]
}

const POSTS_PER_PAGE = 6

type SortOption = 'newest' | 'oldest'

export function BlogPageClient({ posts, categories }: BlogPageClientProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [sortOpen, setSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  // Close sort dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false)
      }
    }
    if (sortOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [sortOpen])

  // Find the featured post (first featured, or newest)
  const featuredPost = useMemo(
    () => posts.find((p) => p.featured) || posts[0],
    [posts]
  )

  // Filter posts (exclude featured from grid)
  const filteredPosts = useMemo(() => {
    let filtered = posts.filter((p) => p._id !== featuredPost?._id)

    if (activeCategory) {
      filtered = filtered.filter((p) =>
        p.categories?.some((c) => c.slug.current === activeCategory)
      )
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.author?.name?.toLowerCase().includes(q) ||
          p.categories?.some((c) => c.title.toLowerCase().includes(q))
      )
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.publishedAt || 0).getTime()
      const dateB = new Date(b.publishedAt || 0).getTime()
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB
    })

    return filtered
  }, [posts, featuredPost, activeCategory, search, sortBy])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, search, sortBy])

  const featuredReadTime = featuredPost ? estimateReadingTime(featuredPost.body) : 0
  const featuredCategory = featuredPost?.categories?.[0]

  return (
    <>
      {/* ──── HERO: Featured Post as Full-Width Image ──── */}
      {featuredPost && !search && !activeCategory && (
          <section className="relative w-full h-[70vh] min-h-[480px] max-h-[640px] overflow-hidden">
            {/* Background image */}
            {featuredPost.mainImage ? (
              <SanityImageComponent
                image={featuredPost.mainImage}
                alt={featuredPost.title}
                fill
                priority
                sizes="100vw"
                className="transition-transform duration-700"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#3D2A2C] to-[#592D31]" />
            )}

            {/* Scrim overlay: dark left for text, fading right to show image */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)' }} />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16">
              <div className="max-w-7xl mx-auto w-full">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                  {/* Left: Post info */}
                  <div className="max-w-2xl">
                    {/* Category badge */}
                    {featuredCategory && (
                      <span
                        className="inline-block text-xs font-semibold px-3.5 py-1 rounded-full text-[#1A1A1A] mb-4"
                        style={{ backgroundColor: '#D4AF37' }}
                      >
                        {featuredCategory.title}
                      </span>
                    )}

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight tracking-tight" style={{ color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                      {featuredPost.title}
                    </h1>

                    {featuredPost.excerpt && (
                      <p className="text-sm sm:text-base leading-relaxed line-clamp-2 max-w-xl" style={{ color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        {featuredPost.excerpt}
                      </p>
                    )}

                    {/* Read Article button */}
                    <Link href={`/blog/${featuredPost.slug?.current}`} className="inline-flex items-center gap-2 mt-5 px-6 py-2.5 bg-white text-[#000000] text-sm font-bold rounded-full hover:bg-[#D4AF37] hover:text-[#000000] transition-colors duration-300 shadow-lg">
                      Read Article
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Right: Author + meta */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    {featuredPost.author && (
                      <div className="flex items-center gap-3">
                        {featuredPost.author.image ? (
                          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/40">
                            <SanityImageComponent
                              image={featuredPost.author.image}
                              alt={featuredPost.author.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.2)] flex items-center justify-center ring-2 ring-white/40">
                            <span className="text-sm font-bold text-[#FFFFFF]">{featuredPost.author.name?.charAt(0)}</span>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold" style={{ color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{featuredPost.author.name}</p>
                          <div className="flex items-center gap-2 text-xs text-[#FFFFFF]/80" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            {featuredPost.publishedAt && (
                              <span>{format(new Date(featuredPost.publishedAt), 'd MMM yyyy')}</span>
                            )}
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {featuredReadTime} mins read
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
      )}

      {/* ──── Heading + Category Tabs + Sort ──── */}
      <section className="pt-10 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#592D31]">Blog</h2>
            <p className="text-sm text-[#332D2D] mt-1">
              News, devotionals, and stories from our church family
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
            {/* Category tabs */}
            <CategoryFilter
              categories={categories}
              active={activeCategory}
              onSelect={(slug) => {
                setActiveCategory(slug)
              }}
            />

            {/* Sort dropdown */}
            <div className="relative flex-shrink-0" ref={sortRef}>
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 text-sm text-[#332D2D] bg-[#FFFFFF] border border-[#E0D8D2] rounded-lg px-4 py-2 hover:border-[#592D31] transition-colors"
              >
                Sort by: <span className="font-medium text-[#332D2D]">{sortBy === 'newest' ? 'Newest' : 'Oldest'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute right-0 mt-1 bg-[#FFFFFF] border border-[#E0D8D2] rounded-lg shadow-lg z-20 overflow-hidden"
                  >
                    {(['newest', 'oldest'] as SortOption[]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setSortBy(opt); setSortOpen(false); }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#F4F0EA] transition-colors ${
                          sortBy === opt ? 'text-[#592D31] font-medium bg-[#F4F0EA]/50' : 'text-[#332D2D]'
                        }`}
                      >
                        {opt === 'newest' ? 'Newest' : 'Oldest'}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ──── Posts Grid + Sidebar ──── */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Posts Grid — 2 columns */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                {paginatedPosts.length > 0 ? (
                  <motion.div
                    key={`${activeCategory}-${search}-${sortBy}-${currentPage}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      {paginatedPosts.map((post, i) => (
                        <BlogCard key={post._id} post={post} index={i} />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-10 flex items-center justify-center gap-2">
                        <button
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="w-9 h-9 rounded-lg border border-[#E0D8D2] flex items-center justify-center text-[#332D2D] hover:border-[#592D31] hover:text-[#592D31] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === page
                                ? 'bg-[#592D31] text-white'
                                : 'border border-[#E0D8D2] text-[#332D2D] hover:border-[#592D31] hover:text-[#592D31]'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        <button
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="w-9 h-9 rounded-lg border border-[#E0D8D2] flex items-center justify-center text-[#332D2D] hover:border-[#592D31] hover:text-[#592D31] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#F4F0EA] flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-[#E0D8D2]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#592D31] mb-2">
                      {search || activeCategory ? 'No matching articles' : 'No Posts Yet'}
                    </h2>
                    <p className="text-sm text-[#332D2D]">
                      {search || activeCategory
                        ? 'Try adjusting your search or category filter.'
                        : 'Check back soon for news and updates from our church!'}
                    </p>
                    {(search || activeCategory) && (
                      <button
                        onClick={() => {
                          setSearch('')
                          setActiveCategory(null)
                        }}
                        className="mt-4 text-sm text-[#592D31] font-medium hover:underline"
                      >
                        Clear filters
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-6">
              <SearchBar value={search} onChange={setSearch} />
              <NewsletterSubscribe />
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
