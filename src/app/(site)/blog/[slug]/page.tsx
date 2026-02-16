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
  const postUrl = `https://theapostlesministry.org/blog/${post.slug.current}`

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #3D2A2C 0%, #592D31 100%)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.15), transparent)',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#E0D8D2]/80 hover:text-[#FFFFFF] transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
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

          <h1
            className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight"
            style={{ color: '#FFFFFF' }}
          >
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
                  <p className="text-sm font-medium" style={{ color: '#FFFFFF' }}>{post.author.name}</p>
                  {post.author.role && (
                    <p className="text-xs" style={{ color: '#E0D8D2' }}>{post.author.role}</p>
                  )}
                </div>
              </div>
            )}
            <div className="flex items-center gap-4 text-sm" style={{ color: '#E0D8D2' }}>
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
            <span className="text-sm font-medium text-[#E0D8D2]/70">Share:</span>
            <ShareBar url={postUrl} title={post.title} variant="hero" />
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.mainImage && (
        <section className="bg-[#FCFBF9] pt-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="aspect-[21/9] relative rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
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
      <article className="py-12 bg-[#FCFBF9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article body */}
          <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-10 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#E0D8D2]/30">
            {post.body ? (
              <PortableTextRenderer value={post.body} />
            ) : (
              <p className="text-[#332D2D]">No content available.</p>
            )}
          </div>

          {/* Bottom share bar */}
          <div className="mt-8 pt-8 border-t border-[#E0D8D2]/50">
            <ShareBar url={postUrl} title={post.title} />
          </div>
        </div>
      </article>

      {/* Author Bio */}
      {post.author && post.author.bio && (
        <section className="py-12 bg-[#F4F0EA]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FFFFFF] rounded-2xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-[#E0D8D2]/30 flex flex-col sm:flex-row gap-6">
              {post.author.image && (
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#E0D8D2]/50">
                    <SanityImageComponent
                      image={post.author.image}
                      alt={post.author.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">About the Author</p>
                <h3 className="text-lg font-bold text-[#592D31]">{post.author.name}</h3>
                {post.author.role && (
                  <p className="text-[#592D31] text-sm mb-3">{post.author.role}</p>
                )}
                <p className="text-[#332D2D] text-sm leading-relaxed">{post.author.bio}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Comments */}
      <section className="py-12 bg-[#FCFBF9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommentSection postId={post._id} comments={comments} />
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-[#F4F0EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#592D31] mb-8 text-center">
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
