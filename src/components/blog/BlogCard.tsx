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
      className="group bg-[#FDFBF7] rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(41,33,33,0.06)] hover:shadow-[0_8px_32px_rgba(41,33,33,0.12)] hover:-translate-y-1 transition-all duration-300 border border-[#DCCFC0]/50 flex flex-col cursor-pointer"
    >
      <Link href={`/blog/${post.slug?.current}`} className="flex flex-col h-full">
        {/* Image */}
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
          {/* Category badge overlay */}
          {category && (
            <span
              className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-0.5 rounded-full text-white backdrop-blur-sm"
              style={{ backgroundColor: category.color ? `${category.color}cc` : 'rgba(106,59,63,0.8)' }}
            >
              {category.title}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="px-5 py-4 flex flex-col flex-1">
          {/* Meta */}
          <div className="flex items-center gap-2 text-[11px] text-[#968B89] mb-2">
            {post.publishedAt && (
              <time>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</time>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime} min
            </span>
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-bold text-[#292121] mb-1 group-hover:text-[#6A3B3F] transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-[13px] text-[#665A58] line-clamp-1">
              {post.excerpt}
            </p>
          )}

          {/* Author */}
          {post.author && (
            <div className="mt-3 pt-3 border-t border-[#DCCFC0]/40 flex items-center gap-2">
              {post.author.image ? (
                <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-[#DCCFC0]/50">
                  <SanityImageComponent
                    image={post.author.image}
                    alt={post.author.name}
                    width={24}
                    height={24}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#E6D8C8] flex items-center justify-center ring-1 ring-[#DCCFC0]/50">
                  <span className="text-[10px] font-bold text-[#6A3B3F]">
                    {post.author.name?.charAt(0)}
                  </span>
                </div>
              )}
              <span className="text-[13px] font-medium text-[#665A58]">{post.author.name}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  )
}
