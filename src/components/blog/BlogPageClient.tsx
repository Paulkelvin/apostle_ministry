'use client'

import { useState, useMemo } from 'react'
import { BookOpen, ChevronDown, Clock, ArrowRight } from 'lucide-react'
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

const POSTS_PER_PAGE = 8
const LOAD_MORE_COUNT = 6

type SortOption = 'newest' | 'oldest'

export function BlogPageClient({ posts, categories }: BlogPageClientProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [sortOpen, setSortOpen] = useState(false)

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

  const visiblePosts = filteredPosts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredPosts.length
  const featuredReadTime = featuredPost ? estimateReadingTime(featuredPost.body) : 0
  const featuredCategory = featuredPost?.categories?.[0]

  return (
    <>
      {/* ──── HERO: Featured Post as Full-Width Image ──── */}
      {featuredPost && !search && !activeCategory && (
        <Link href={`/blog/${featuredPost.slug?.current}`} className="block group">
          <section className="relative w-full h-[70vh] min-h-[480px] max-h-[640px] overflow-hidden">
            {/* Background image */}
            {featuredPost.mainImage ? (
              <SanityImageComponent
                image={featuredPost.mainImage}
                alt={featuredPost.title}
                fill
                priority
                sizes="100vw"
                className="group-hover:scale-[1.02] transition-transform duration-700"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A2629] to-[#6A3B3F]" />
            )}

            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Pagination dots (decorative) */}
            <div className="absolute bottom-8 left-8 sm:left-12 flex gap-2 z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-white" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16">
              <div className="max-w-7xl mx-auto w-full">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                  {/* Left: Post info */}
                  <div className="max-w-2xl">
                    {/* Category badge */}
                    {featuredCategory && (
                      <span
                        className="inline-block text-xs font-semibold px-3.5 py-1 rounded-full text-white backdrop-blur-sm mb-4"
                        style={{ backgroundColor: featuredCategory.color ? `${featuredCategory.color}cc` : 'rgba(106,59,63,0.85)' }}
                      >
                        {featuredCategory.title}
                      </span>
                    )}

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight tracking-tight">
                      {featuredPost.title}
                    </h1>

                    {featuredPost.excerpt && (
                      <p className="text-sm sm:text-base text-white/80 leading-relaxed line-clamp-2 max-w-xl">
                        {featuredPost.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Right: Author + meta */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    {featuredPost.author && (
                      <div className="flex items-center gap-3">
                        {featuredPost.author.image ? (
                          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/30">
                            <SanityImageComponent
                              image={featuredPost.author.image}
                              alt={featuredPost.author.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center ring-2 ring-white/30">
                            <span className="text-sm font-bold text-white">{featuredPost.author.name?.charAt(0)}</span>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-white">{featuredPost.author.name}</p>
                          <div className="flex items-center gap-2 text-xs text-white/60">
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
        </Link>
      )}

      {/* ──── Heading + Category Tabs + Sort ──── */}
      <section className="pt-10 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#292121]">Blog</h2>
            <p className="text-sm text-[#665A58] mt-1">
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
                setVisibleCount(POSTS_PER_PAGE)
              }}
            />

            {/* Sort dropdown */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 text-sm text-[#665A58] bg-[#FDFBF7] border border-[#DCCFC0] rounded-lg px-4 py-2 hover:border-[#6A3B3F] transition-colors"
              >
                Sort by: <span className="font-medium text-[#292121]">{sortBy === 'newest' ? 'Newest' : 'Oldest'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute right-0 mt-1 bg-[#FDFBF7] border border-[#DCCFC0] rounded-lg shadow-lg z-20 overflow-hidden"
                  >
                    {(['newest', 'oldest'] as SortOption[]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setSortBy(opt); setSortOpen(false); }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#E6D8C8] transition-colors ${
                          sortBy === opt ? 'text-[#6A3B3F] font-medium bg-[#E6D8C8]/50' : 'text-[#292121]'
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
                {visiblePosts.length > 0 ? (
                  <motion.div
                    key={`${activeCategory}-${search}-${sortBy}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      {visiblePosts.map((post, i) => (
                        <BlogCard key={post._id} post={post} index={i} />
                      ))}
                    </div>

                    {hasMore && (
                      <div className="mt-10 text-center">
                        <button
                          onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
                          className="px-8 py-2.5 rounded-xl border-2 border-[#6A3B3F] text-[#6A3B3F] font-semibold text-sm hover:bg-[#6A3B3F] hover:text-white transition-all duration-200"
                        >
                          Load More Articles
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
                    <div className="w-16 h-16 rounded-full bg-[#E6D8C8] flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-[#DCCFC0]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#292121] mb-2">
                      {search || activeCategory ? 'No matching articles' : 'No Posts Yet'}
                    </h2>
                    <p className="text-sm text-[#665A58]">
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
                        className="mt-4 text-sm text-[#6A3B3F] font-medium hover:underline"
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
