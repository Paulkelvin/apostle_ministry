'use client'

import { useState, useMemo } from 'react'
import { BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { BlogCard, FeaturedPost, CategoryFilter, SearchBar, NewsletterSubscribe } from '@/components/blog'
import type { Post, Category } from '@/types'

interface BlogPageClientProps {
  posts: Post[]
  categories: Category[]
}

const POSTS_PER_PAGE = 9
const LOAD_MORE_COUNT = 6

export function BlogPageClient({ posts, categories }: BlogPageClientProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  // Find the featured post (first featured, or newest)
  const featuredPost = useMemo(
    () => posts.find((p) => p.featured) || posts[0],
    [posts]
  )

  // Filter posts (exclude featured from grid)
  const filteredPosts = useMemo(() => {
    let filtered = posts.filter((p) => p._id !== featuredPost?._id)

    // Category filter
    if (activeCategory) {
      filtered = filtered.filter((p) =>
        p.categories?.some((c) => c.slug.current === activeCategory)
      )
    }

    // Search filter
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

    return filtered
  }, [posts, featuredPost, activeCategory, search])

  const visiblePosts = filteredPosts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredPosts.length

  return (
    <>
      {/* Featured Post */}
      {featuredPost && !search && !activeCategory && (
        <section className="pt-10 pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturedPost post={featuredPost} />
          </div>
        </section>
      )}

      {/* Category Filter — full width */}
      <section className={`pb-2 ${(!featuredPost || search || activeCategory) ? 'pt-8' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onSelect={(slug) => {
              setActiveCategory(slug)
              setVisibleCount(POSTS_PER_PAGE)
            }}
          />
        </div>
      </section>

      {/* Main Content: Posts Grid + Sidebar */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Posts Grid — main column */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                {visiblePosts.length > 0 ? (
                  <motion.div
                    key={`${activeCategory}-${search}`}
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

                    {/* Load More */}
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

            {/* Sidebar — desktop only inline, mobile stacked */}
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
