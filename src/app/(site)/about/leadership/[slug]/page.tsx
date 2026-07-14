import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'
import { client, staffBySlugQuery } from '@/lib/sanity'
import { SanityImageComponent } from '@/components/ui'
import { PortableTextRenderer } from '@/components/portable-text'
import type { Staff } from '@/types'

// Staff bios rarely change once published — revalidate hourly
export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getStaffData(slug: string) {
  try {
    const person = await client.fetch<Staff>(staffBySlugQuery, { slug })
    return person
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const person = await getStaffData(resolvedParams.slug)

  if (!person) {
    return { title: 'Not Found | The Apostles Ministry' }
  }

  return {
    title: `${person.name} | The Apostles Ministry`,
    description: person.bio || `Learn more about ${person.name} at The Apostles Ministry.`,
  }
}

export default async function LeadershipBioPage({ params }: PageProps) {
  const resolvedParams = await params
  const person = await getStaffData(resolvedParams.slug)

  if (!person) {
    notFound()
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-deep pt-40 md:pt-48 pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/45 hover:text-white transition-colors mb-14 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to Our Team
          </Link>

          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {person.role}
          </p>
          <div className="w-14 h-px bg-accent/40 mb-8" aria-hidden="true" />
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white leading-[1.05] tracking-tight">
            {person.name}
          </h1>
          {person.email && (
            <a
              href={`mailto:${person.email}`}
              className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors mt-10"
            >
              <Mail className="w-4 h-4" />
              {person.email}
            </a>
          )}
        </div>
      </section>

      {/* Main photo */}
      {person.image && (
        <section className="bg-surface pt-20 md:pt-28">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <div className="max-w-md mx-auto aspect-[4/5] relative rounded-lg overflow-hidden shadow-[0_30px_60px_-20px_rgb(37_32_53/0.28)]">
              <SanityImageComponent
                image={person.image}
                alt={person.name}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 90vw, 448px"
              />
            </div>
          </div>
        </section>
      )}

      {/* Full biography — editorial article, not a boxed card */}
      <article className="bg-surface pt-16 md:pt-20 pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          {person.fullBio ? (
            <div
              className="[&_p]:!text-warm-800 [&_p]:!text-lg [&_p]:md:!text-[1.1875rem] [&_p]:!leading-[1.9] [&_p]:!mb-9 [&_p:last-child]:!mb-0
                         [&_h2]:!mt-16 [&_h2]:!mb-6 [&_h3]:!mt-14 [&_h3]:!mb-5 [&_h4]:!mt-12 [&_h4]:!mb-4
                         [&_blockquote]:!my-12 [&_blockquote]:!text-xl [&_blockquote]:!leading-[1.7]"
            >
              <PortableTextRenderer value={person.fullBio} />
            </div>
          ) : person.bio ? (
            <p className="text-warm-800 text-lg leading-[1.9]">{person.bio}</p>
          ) : (
            <p className="text-ink">No biography available.</p>
          )}
        </div>
      </article>

      {/* Photo gallery — curated, not a grid of thumbnails */}
      {person.gallery && person.gallery.length > 0 && (
        <section className="bg-surface pb-24 md:pb-36">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <div className="flex items-center gap-4 mb-12">
              <p className="text-accent-dark text-xs font-semibold tracking-[0.3em] uppercase">
                Gallery
              </p>
              <div className="h-px flex-1 bg-warm-200" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-2 gap-6 md:gap-10">
              {person.gallery.map((photo, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] relative rounded-lg overflow-hidden shadow-[0_16px_36px_-16px_rgb(37_32_53/0.22)]"
                >
                  <SanityImageComponent
                    image={photo}
                    alt={`${person.name} photo ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 45vw, 340px"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
