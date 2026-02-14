import { Metadata } from 'next'
import { client, postsQuery, categoriesQuery } from '@/lib/sanity'
import { BlogPageClient } from '@/components/blog'
import type { Post, Category } from '@/types'

export const metadata: Metadata = {
  title: 'Blog | The Apostles Ministry',
  description: 'Read the latest news, devotionals, and updates from The Apostles Ministry.',
}

async function getBlogData() {
  try {
    const [posts, categories] = await Promise.all([
      client.fetch<Post[]>(postsQuery),
      client.fetch<Category[]>(categoriesQuery),
    ])
    return { posts, categories }
  } catch {
    return { posts: [], categories: [] }
  }
}

export default async function BlogPage() {
  const { posts, categories } = await getBlogData()

  return (
    <>
      {/* Hero Banner — Luminous */}
      <section
        className="relative pt-32 pb-16 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #4A2629 0%, #6A3B3F 100%)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top right, rgba(212, 175, 106, 0.15), transparent)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-5xl font-bold mb-4 tracking-tight"
            style={{ color: '#FDFBF7' }}
          >
            Blog
          </h1>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'rgba(220, 207, 192, 0.9)' }}
          >
            News, devotionals, and stories from our church family
          </p>
        </div>
      </section>

      {/* Client-side interactive blog */}
      <div className="bg-[#F0E6D8]">
        <BlogPageClient posts={posts} categories={categories} />
      </div>
    </>
  )
}
