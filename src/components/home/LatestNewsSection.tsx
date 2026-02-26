import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowRight, Clock, BookOpen } from 'lucide-react'
import { SanityImageComponent } from '@/components/ui'
import { estimateReadingTime } from '@/lib/utils'
import type { Post } from '@/types'

interface LatestNewsSectionProps {
  posts: Post[]
}

export function LatestNewsSection({ posts }: LatestNewsSectionProps) {
  if (!posts || posts.length === 0) {
    return (
      <section className="py-16 bg-[#F4F0EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ color: '#592D31' }}>Latest from the Blog</h2>
          <p style={{ color: '#332D2D' }}>No posts yet. Check back soon!</p>
        </div>
      </section>
    )
  }

  const featured = posts[0]
  const stacked = posts.slice(1, 3)
  const featuredReadTime = estimateReadingTime(featured.body)
  const featuredCategory = featured.categories?.[0]

  return (
    <section className="py-20 lg:py-28 bg-[#F4F0EA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with watermark */}
        <div className="relative mb-12 lg:mb-16 overflow-hidden">
          {/* Massive watermark - hidden on small mobile to prevent overflow */}
          <span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[4rem] sm:text-[8rem] lg:text-[10rem] font-black uppercase leading-none tracking-tight pointer-events-none select-none"
            style={{ color: '#EAE5DF' }}
            aria-hidden="true"
          >
            JOURNAL
          </span>
          <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-end">
            <div>
              <div className="w-[2px] h-10 bg-[#D4AF37] mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-1" style={{ color: '#592D31' }}>Latest from the Blog</h2>
              <p className="text-sm" style={{ color: '#5C5252' }}>Stories, devotionals, and news from our community</p>
            </div>
            <Link
              href="/blog"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 font-semibold text-sm hover:text-[#3D2A2C] transition-colors"
              style={{ color: '#592D31' }}
            >
              View All Posts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Hero + Stack Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured (Left) — Full-height hero card */}
          <Link href={`/blog/${featured.slug?.current}`} className="group block">
            <article className="relative h-full min-h-[420px] lg:min-h-[520px] rounded-2xl overflow-hidden bg-[#332D2D]">
              {featured.mainImage ? (
                <SanityImageComponent
                  image={featured.mainImage}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#592D31]/30 to-[#D4AF37]/10 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-[#E0D8D2]/30" />
                </div>
              )}
              {/* Scrim overlay */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                {featuredCategory && (
                  <span
                    className="inline-block w-fit text-xs font-semibold px-3 py-1 rounded-full mb-3"
                    style={{ backgroundColor: '#D4AF37', color: '#1A1A1A' }}
                  >
                    {featuredCategory.title}
                  </span>
                )}
                <h3
                  className="text-2xl md:text-3xl font-bold mb-2 leading-tight line-clamp-3"
                  style={{ color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                >
                  {featured.title}
                </h3>
                {featured.excerpt && (
                  <p
                    className="text-sm leading-relaxed line-clamp-2 mb-3 max-w-lg"
                    style={{ color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
                  >
                    {featured.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-3 text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {featured.publishedAt && (
                    <time>{format(new Date(featured.publishedAt), 'MMM d, yyyy')}</time>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featuredReadTime} min
                  </span>
                </div>
              </div>
            </article>
          </Link>

          {/* Right — Stacked smaller posts */}
          <div className="flex flex-col gap-6">
            {stacked.map((post) => {
              const readTime = estimateReadingTime(post.body)
              const category = post.categories?.[0]

              return (
                <Link key={post._id} href={`/blog/${post.slug?.current}`} className="group block flex-1">
                  <article className="flex flex-col sm:flex-row gap-5 h-full bg-white rounded-2xl overflow-hidden border border-[#E0D8D2]/50 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 p-4 sm:p-5">
                    {/* Thumbnail */}
                    <div className="relative w-full sm:w-40 md:w-48 flex-shrink-0 aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden">
                      {post.mainImage ? (
                        <SanityImageComponent
                          image={post.mainImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#592D31]/10 to-[#D4AF37]/10 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-[#E0D8D2]" />
                        </div>
                      )}
                    </div>
                    {/* Text content */}
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      {category && (
                        <span className="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#D4AF37' }}>
                          {category.title}
                        </span>
                      )}
                      <h3 className="text-base md:text-lg font-bold mb-1.5 leading-snug line-clamp-2 group-hover:text-[#6E3A3F] transition-colors" style={{ color: '#592D31' }}>
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-[13px] line-clamp-2 mb-2" style={{ color: '#5C5252' }}>
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-[11px]" style={{ color: '#8A8080' }}>
                        {post.publishedAt && (
                          <time>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</time>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {readTime} min
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}

            {/* If only one stacked post (2 total), add a "View All" card */}
            {stacked.length < 2 && (
              <Link href="/blog" className="flex-1 block">
                <div className="flex items-center justify-center h-full min-h-[200px] rounded-2xl border-2 border-dashed border-[#E0D8D2] hover:border-[#D4AF37] transition-colors duration-300">
                  <div className="text-center">
                    <p className="font-semibold mb-1" style={{ color: '#592D31' }}>Explore More</p>
                    <p className="text-sm" style={{ color: '#8A8080' }}>Visit our blog for all articles</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
