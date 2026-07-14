import { Metadata } from 'next'
import { client, postsQuery, categoriesQuery } from '@/lib/sanity'
import { BlogPageClient } from '@/components/blog'
import type { Post, Category } from '@/types'

// Blog listing, moderate churn
export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Resources | Restoring Life Family Community Center',
  description: 'Read the latest news, devotionals, and updates from Restoring Life Family Community Center.',
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
    <div className="bg-surface min-h-screen">
      <BlogPageClient posts={posts} categories={categories} />
    </div>
  )
}

