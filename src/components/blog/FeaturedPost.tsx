'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { Clock, ArrowRight, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { SanityImageComponent } from '@/components/ui'
import { estimateReadingTime } from '@/lib/utils'
import type { Post } from '@/types'

interface FeaturedPostProps {
  post: Post
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  const readTime = estimateReadingTime(post.body)
  const category = post.categories?.[0]

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link href={`/resources/${post.slug?.current}`} className="cursor-pointer">
        <div className="bg-white rounded-xl overflow-hidden shadow-[--shadow-card] hover:shadow-[--shadow-card-hover] transition-all duration-300 border border-warm-200">
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="aspect-[16/10] lg:aspect-auto lg:min-h-[280px] relative overflow-hidden">
              {post.mainImage ? (
                <SanityImageComponent
                  image={post.mainImage}
                  alt={post.title}
                  fill
                  priority
                  className="group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-warm-200" />
                </div>
              )}
              {/* Category badge */}
              {category && (
                <span
                  className="absolute top-6 left-6 text-sm font-semibold px-4 py-1.5 rounded-full text-white backdrop-blur-sm"
                  style={{ backgroundColor: category.color ? `${category.color}cc` : 'rgba(107, 79, 158,0.8)' }}
                >
                  {category.title}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-accent uppercase tracking-wider mb-3">
                <span>Featured Post</span>
              </div>

              <h2 className="font-display text-xl lg:text-2xl font-semibold text-warm-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h2>

              {post.excerpt && (
                <p className="text-sm text-ink mb-4 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Meta row */}
              <div className="flex items-center gap-3 mb-4">
                {post.author && (
                  <div className="flex items-center gap-2">
                    {post.author.image ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-warm-200/50">
                        <SanityImageComponent
                          image={post.author.image}
                          alt={post.author.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-warm-100 flex items-center justify-center ring-1 ring-warm-200/50">
                        <span className="text-xs font-bold text-primary">
                          {post.author.name?.charAt(0)}
                        </span>
                      </div>
                    )}
                    <span className="text-[13px] font-medium text-ink">{post.author.name}</span>
                  </div>
                )}
                <span className="text-warm-200">|</span>
                {post.publishedAt && (
                  <time className="text-[13px] text-warm-500">
                    {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                  </time>
                )}
                <span className="flex items-center gap-1 text-[13px] text-warm-500">
                  <Clock className="w-3 h-3" />
                  {readTime} min
                </span>
              </div>

              <div className="flex items-center gap-2 text-primary font-semibold text-[13px] group-hover:gap-3 transition-all">
                Read Article
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
