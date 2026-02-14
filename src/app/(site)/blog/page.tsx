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
    <div className="bg-[#F0E6D8] min-h-screen">
      <BlogPageClient posts={posts} categories={categories} />
    </div>
  )
}
