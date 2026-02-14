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
      <section className="py-16 bg-[#E6D8C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#292121] mb-3">Latest from the Blog</h2>
          <p className="text-[#665A58]">No posts yet. Check back soon!</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 lg:py-14 bg-[#E6D8C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#292121] mb-1">Latest from the Blog</h2>
            <p className="text-sm text-[#665A58]">Stay updated with what&apos;s happening in our community</p>
          </div>
          <Link
            href="/blog"
            className="mt-3 sm:mt-0 inline-flex items-center gap-2 text-[#6A3B3F] hover:text-[#4A2629] font-medium text-sm transition-colors"
          >
            View All Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => {
            const readTime = estimateReadingTime(post.body)
            const category = post.categories?.[0]

            return (
              <article
                key={post._id}
                className="bg-[#FDFBF7] rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(41,33,33,0.06)] hover:shadow-[0_6px_24px_rgba(41,33,33,0.1)] hover:-translate-y-1 transition-all duration-300 border border-[#DCCFC0]/50 group flex flex-col cursor-pointer"
              >
                <Link href={`/blog/${post.slug?.current}`} className="flex flex-col h-full">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    {post.mainImage ? (
                      <SanityImageComponent
                        image={post.mainImage}
                        alt={post.title}
                        fill
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#6A3B3F]/10 to-[#C59853]/10 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-[#DCCFC0]" />
                      </div>
                    )}
                    {category && (
                      <span
                        className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-0.5 rounded-full text-white backdrop-blur-sm"
                        style={{ backgroundColor: category.color ? `${category.color}cc` : 'rgba(106,59,63,0.8)' }}
                      >
                        {category.title}
                      </span>
                    )}
                  </div>
                  <div className="px-5 py-4 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[11px] text-[#968B89] mb-1.5">
                      {post.publishedAt && (
                        <time>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</time>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {readTime} min
                      </span>
                    </div>
                    <h3 className="text-[15px] font-bold text-[#292121] mb-1 group-hover:text-[#6A3B3F] transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-[13px] text-[#665A58] line-clamp-1">{post.excerpt}</p>
                    )}
                    <div className="mt-3 pt-3 border-t border-[#DCCFC0]/40 flex items-center gap-1.5 text-[13px] font-medium text-[#6A3B3F]">
                      Read More
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
