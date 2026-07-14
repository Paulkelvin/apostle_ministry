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
      <section className="bg-primary-deep pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-warm-200/80 hover:text-white transition-colors mb-8 text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Our Team
          </Link>

          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            {person.role}
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold text-white mb-4 leading-tight">
            {person.name}
          </h1>
          {person.email && (
            <a
              href={`mailto:${person.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              {person.email}
            </a>
          )}
        </div>
      </section>

      {/* Main photo */}
      {person.image && (
        <section className="bg-surface pt-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-[--shadow-card] border border-warm-200">
              <SanityImageComponent
                image={person.image}
                alt={person.name}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          </div>
        </section>
      )}

      {/* Full biography */}
      <article className="py-12 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-6 sm:p-10 shadow-[--shadow-card] border border-warm-200">
            {person.fullBio ? (
              <PortableTextRenderer value={person.fullBio} />
            ) : person.bio ? (
              <p className="text-warm-700 leading-relaxed">{person.bio}</p>
            ) : (
              <p className="text-ink">No biography available.</p>
            )}
          </div>
        </div>
      </article>

      {/* Photo gallery */}
      {person.gallery && person.gallery.length > 0 && (
        <section className="pb-16 bg-surface">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-accent-dark text-xs font-semibold tracking-[0.15em] uppercase mb-4">
              Gallery
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {person.gallery.map((photo, i) => (
                <div
                  key={i}
                  className="aspect-square relative rounded-lg overflow-hidden border border-warm-200"
                >
                  <SanityImageComponent
                    image={photo}
                    alt={`${person.name} photo ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 25vw"
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
