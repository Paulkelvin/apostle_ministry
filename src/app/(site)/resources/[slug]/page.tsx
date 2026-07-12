import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { client, postBySlugQuery, relatedPostsQuery, commentsByPostQuery } from '@/lib/sanity'
import { SanityImageComponent } from '@/components/ui'
import { PortableTextRenderer } from '@/components/portable-text'
import { ShareBar, CommentSection, BlogCard } from '@/components/blog'
import { estimateReadingTime } from '@/lib/utils'
import type { Post, Comment } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPostData(slug: string) {
  try {
    const post = await client.fetch<Post>(postBySlugQuery, { slug })
    if (!post) return { post: null, relatedPosts: [], comments: [] }

    const categoryIds = post.categories?.map((c) => c._id) || []

    const [relatedPosts, comments] = await Promise.all([
      categoryIds.length > 0
        ? client.fetch<Post[]>(relatedPostsQuery, { postId: post._id, categoryIds })
        : Promise.resolve([]),
      client.fetch<Comment[]>(commentsByPostQuery, { postId: post._id }),
    ])

    return { post, relatedPosts, comments }
  } catch {
    return { post: null, relatedPosts: [], comments: [] }
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const { post } = await getPostData(resolvedParams.slug)

  if (!post) {
    return { title: 'Post Not Found | The Apostles Ministry' }
  }

  return {
    title: `${post.title} | The Apostles Ministry`,
    description: post.excerpt || 'Read this article from The Apostles Ministry',
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params
  const { post, relatedPosts, comments } = await getPostData(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  const readTime = estimateReadingTime(post.body)
  const postUrl = `https://theapostlesministry.org/resources/${post.slug.current}`

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-deep pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-warm-200/80 hover:text-white transition-colors mb-8 text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Resources
          </Link>

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((cat) => (
                <span
                  key={cat._id}
                  className="text-xs font-semibold px-3 py-1 rounded-full text-white/90"
                  style={{ backgroundColor: cat.color ? `${cat.color}88` : 'rgba(255,255,255,0.15)' }}
                >
                  {cat.title}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-display text-3xl md:text-5xl font-semibold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4">
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.image ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20">
                    <SanityImageComponent
                      image={post.author.image}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center ring-2 ring-white/20">
                    <span className="text-sm font-bold text-white">{post.author.name?.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-white">{post.author.name}</p>
                  {post.author.role && (
                    <p className="text-xs text-white/60">{post.author.role}</p>
                  )}
                </div>
              </div>
            )}
            <div className="flex items-center gap-4 text-sm text-white/60">
              {post.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {readTime} min read
              </span>
            </div>
          </div>

          {/* Share buttons in hero */}
          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm font-medium text-warm-200/70">Share:</span>
            <ShareBar url={postUrl} title={post.title} variant="hero" />
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.mainImage && (
        <section className="bg-surface pt-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="aspect-[16/9] relative rounded-xl overflow-hidden shadow-[--shadow-card] border border-warm-200">
              <SanityImageComponent
                image={post.mainImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <article className="py-12 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article body */}
          <div className="bg-white rounded-xl p-6 sm:p-10 shadow-[--shadow-card] border border-warm-200">
            {post.body ? (
              <PortableTextRenderer value={post.body} />
            ) : (
              <p className="text-ink">No content available.</p>
            )}
          </div>

          {/* Bottom share bar */}
          <div className="mt-8 pt-8 border-t border-warm-200/50">
            <ShareBar url={postUrl} title={post.title} />
          </div>
        </div>
      </article>

      {/* Author Bio */}
      {post.author && post.author.bio && (
        <section className="py-16 bg-warm-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-white rounded-xl p-8 sm:p-10 shadow-[--shadow-card] border border-warm-200">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {post.author.image && (
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden">
                      <SanityImageComponent
                        image={post.author.image}
                        alt={post.author.name}
                        width={112}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-xs font-semibold text-accent-dark uppercase tracking-[0.15em] mb-2">About the Author</p>
                  <h3 className="font-display text-xl font-semibold text-warm-900 mb-1">{post.author.name}</h3>
                  {post.author.role && (
                    <p className="text-warm-500 text-sm font-medium mb-4">{post.author.role}</p>
                  )}
                  <p className="text-warm-600 text-sm leading-relaxed">{post.author.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Comments */}
      <section className="py-12 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommentSection postId={post._id} comments={comments} />
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-warm-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-primary mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((rp, i) => (
                <BlogCard key={rp._id} post={rp} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
