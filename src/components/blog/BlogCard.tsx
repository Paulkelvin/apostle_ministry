'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { Clock, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { SanityImageComponent } from '@/components/ui'
import { estimateReadingTime } from '@/lib/utils'
import type { Post } from '@/types'

interface BlogCardProps {
  post: Post
  index?: number
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const readTime = estimateReadingTime(post.body)
  const category = post.categories?.[0]

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 border border-[#E0D8D2]/50 flex flex-col cursor-pointer"
    >
      <Link href={`/blog/${post.slug?.current}`} className="flex flex-col h-full">
        {/* Image */}
        <div className="aspect-[16/9] relative overflow-hidden">
          {post.mainImage ? (
            <SanityImageComponent
              image={post.mainImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#592D31]/10 to-[#D4AF37]/10 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-[#E0D8D2]" />
            </div>
          )}
          {/* Category badge overlay */}
          {category && (
            <span
              className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-0.5 rounded-full text-white backdrop-blur-sm"
              style={{ backgroundColor: category.color ? `${category.color}cc` : 'rgba(89,45,49,0.8)' }}
            >
              {category.title}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="px-5 py-4 flex flex-col flex-1">
          {/* Meta */}
          <div className="flex items-center gap-2 text-[11px] text-[#8A8080] mb-2">
            {post.publishedAt && (
              <time>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</time>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime} min
            </span>
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-bold text-[#592D31] mb-1 group-hover:text-[#6E3A3F] transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-[13px] text-[#332D2D] line-clamp-1">
              {post.excerpt}
            </p>
          )}

          {/* Author */}
          {post.author && (
            <div className="mt-3 pt-3 border-t border-[#E0D8D2]/40 flex items-center gap-2">
              {post.author.image ? (
                <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-[#E0D8D2]/50">
                  <SanityImageComponent
                    image={post.author.image}
                    alt={post.author.name}
                    width={24}
                    height={24}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#F4F0EA] flex items-center justify-center ring-1 ring-[#E0D8D2]/50">
                  <span className="text-[10px] font-bold text-[#592D31]">
                    {post.author.name?.charAt(0)}
                  </span>
                </div>
              )}
              <span className="text-[13px] font-medium text-[#332D2D]">{post.author.name}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  )
}
