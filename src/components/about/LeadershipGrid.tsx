'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowUpRight } from 'lucide-react'
import { SanityImageComponent, Button } from '@/components/ui'
import type { Staff } from '@/types'

interface LeadershipGridProps {
  staff: Staff[]
}

export function LeadershipGrid({ staff }: LeadershipGridProps) {
  // Default staff for demo if none from CMS
  const displayStaff = staff.length > 0 ? staff : [
    { _id: '1', name: 'Pastor John Smith', role: 'Senior Pastor', bio: 'Pastor John has been leading our congregation for over 15 years with a heart for teaching and shepherding.', rank: 1 },
    { _id: '2', name: 'Jane Smith', role: 'Worship Pastor', bio: 'Jane leads our worship ministry with a passion for creating meaningful worship experiences.', rank: 2 },
    { _id: '3', name: 'Michael Johnson', role: 'Outreach Pastor', bio: 'Michael is dedicated to serving the community and expanding the reach of our ministry.', rank: 3 },
  ]

  // Determine layout: if lead pastor exists (first), feature them large
  const leadPerson = displayStaff[0]
  const otherStaff = displayStaff.slice(1)

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-accent-dark text-xs font-semibold tracking-[0.2em] uppercase mb-4">Meet The Team</span>
          <h2 className="text-h2 text-primary mb-5">Our Leadership</h2>
          <p className="text-warm-600 text-lg max-w-xl mx-auto leading-relaxed">
            Dedicated servants who guide our church with wisdom, compassion, and unwavering faith.
          </p>
        </motion.div>

        {/* Featured Lead Pastor */}
        {leadPerson && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="bg-white rounded-xl overflow-hidden border border-warm-200 shadow-[--shadow-card] hover:shadow-[--shadow-card-hover] transition-shadow duration-300 max-w-3xl mx-auto">
              <div className="grid md:grid-cols-[1fr_1.4fr]">
                {/* Photo */}
                <div className="aspect-[4/5] md:aspect-auto relative overflow-hidden bg-warm-100 min-h-[240px] md:min-h-[320px]">
                  {leadPerson.image ? (
                    <SanityImageComponent
                      image={leadPerson.image}
                      alt={leadPerson.name}
                      fill
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center min-h-[360px]">
                      <span className="font-display text-7xl text-warm-300">
                        {leadPerson.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 flex flex-col justify-center">
                  <span className="text-accent-dark text-xs font-semibold tracking-[0.15em] uppercase mb-2">{leadPerson.role}</span>
                  <h3 className="font-display text-2xl md:text-4xl font-semibold text-warm-900 mb-3 md:mb-4">{leadPerson.name}</h3>
                  {leadPerson.bio && (
                    <p className="text-warm-600 leading-relaxed mb-4 md:mb-6 text-sm md:text-[15px] line-clamp-4 md:line-clamp-none">{leadPerson.bio}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-3">
                    {leadPerson.email && (
                      <a
                        href={`mailto:${leadPerson.email}`}
                        className="inline-flex items-center gap-2 bg-primary/5 hover:bg-primary/10 text-primary font-semibold px-5 py-2.5 rounded-lg transition-colors w-fit text-sm"
                      >
                        <Mail className="w-4 h-4" />
                        Send a Message
                      </a>
                    )}
                    {leadPerson.slug && (
                      <Button href={`/about/leadership/${leadPerson.slug.current}`} variant="outline" size="sm">
                        Read Full Bio
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Staff Grid */}
        {otherStaff.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`grid gap-6 ${otherStaff.length === 2 ? 'sm:grid-cols-2 max-w-3xl mx-auto' : 'sm:grid-cols-2 lg:grid-cols-3'}`}
          >
            {otherStaff.map((person, index) => {
              return (
                <motion.div
                  key={person._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="bg-white rounded-xl overflow-hidden border border-warm-200 shadow-[--shadow-card] hover:shadow-[--shadow-card-hover] transition-shadow duration-300 group"
                >
                  {/* Photo */}
                  <div className="aspect-[4/5] relative overflow-hidden bg-warm-100">
                    {person.image ? (
                      <SanityImageComponent
                        image={person.image}
                        alt={person.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-5xl text-warm-300">
                          {person.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <span className="text-accent-dark text-[11px] font-semibold tracking-[0.15em] uppercase mb-1 block">{person.role}</span>
                    <h3 className="font-display text-lg font-semibold text-warm-900 mb-2">{person.name}</h3>
                    {person.bio && (
                      <p className="text-warm-600 text-sm leading-relaxed line-clamp-2">{person.bio}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4">
                      {person.email && (
                        <a
                          href={`mailto:${person.email}`}
                          className="inline-flex items-center gap-1.5 text-primary hover:text-primary-dark text-sm font-medium transition-colors group/link"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          Contact
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                        </a>
                      )}
                      {person.slug && (
                        <Link
                          href={`/about/leadership/${person.slug.current}`}
                          className="inline-flex items-center gap-1.5 text-primary hover:text-primary-dark text-sm font-medium transition-colors group/link"
                        >
                          Read Full Bio
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </section>
  )
}
