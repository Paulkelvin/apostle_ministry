'use client'

import { motion } from 'framer-motion'
import { Mail, ArrowUpRight } from 'lucide-react'
import { SanityImageComponent } from '@/components/ui'
import type { Staff } from '@/types'

interface LeadershipGridProps {
  staff: Staff[]
}

export function LeadershipGrid({ staff }: LeadershipGridProps) {
  // Default staff for demo if none from CMS
  const displayStaff = staff.length > 0 ? staff : [
    { _id: '1', name: 'Pastor John Smith', role: 'Senior Pastor', bio: 'Pastor John has been leading our congregation for over 15 years with a heart for teaching and shepherding.', rank: 1 },
    { _id: '2', name: 'Jane Smith', role: 'Worship Pastor', bio: 'Jane leads our worship ministry with a passion for creating meaningful worship experiences.', rank: 2 },
    { _id: '3', name: 'Michael Johnson', role: 'Youth Pastor', bio: 'Michael is dedicated to helping the next generation discover their faith and purpose.', rank: 3 },
    { _id: '4', name: 'Sarah Williams', role: 'Children\'s Director', bio: 'Sarah creates fun and engaging environments where kids can learn about Jesus.', rank: 4 },
  ]

  // Alternating accent colors for avatar fallbacks
  const accentColors = [
    { bg: 'bg-primary/10', text: 'text-primary' },
    { bg: 'bg-accent/10', text: 'text-accent-dark' },
    { bg: 'bg-sage/10', text: 'text-sage-dark' },
    { bg: 'bg-warm-200', text: 'text-warm-500' },
  ]

  // Determine layout: if lead pastor exists (first), feature them large
  const leadPerson = displayStaff[0]
  const otherStaff = displayStaff.slice(1)

  return (
    <section className="py-24 bg-gradient-to-b from-[#faf5f0] to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Meet The Team</span>
          <h2 className="text-4xl md:text-5xl font-bold text-warm-900 mb-5 tracking-tight">Our Leadership</h2>
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
            <div className="bg-white rounded-3xl overflow-hidden border border-warm-100 shadow-sm hover:shadow-lg transition-shadow duration-500 max-w-3xl mx-auto">
              <div className="grid md:grid-cols-[1fr_1.4fr]">
                {/* Photo */}
                <div className="aspect-[3/4] md:aspect-auto relative overflow-hidden bg-gradient-to-br from-warm-100 to-warm-200">
                  {leadPerson.image ? (
                    <SanityImageComponent
                      image={leadPerson.image}
                      alt={leadPerson.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center min-h-[360px]">
                      <div className={`w-32 h-32 rounded-full ${accentColors[0].bg} flex items-center justify-center`}>
                        <span className={`text-5xl font-bold ${accentColors[0].text}`}>
                          {leadPerson.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 flex flex-col justify-center">
                  <span className="text-xs font-bold tracking-[0.15em] uppercase text-primary mb-2">{leadPerson.role}</span>
                  <h3 className="text-2xl md:text-4xl font-bold text-warm-900 mb-3 md:mb-4 tracking-tight">{leadPerson.name}</h3>
                  {leadPerson.bio && (
                    <p className="text-warm-600 leading-relaxed mb-4 md:mb-6 text-sm md:text-[15px] line-clamp-4 md:line-clamp-none">{leadPerson.bio}</p>
                  )}
                  {leadPerson.email && (
                    <a
                      href={`mailto:${leadPerson.email}`}
                      className="inline-flex items-center gap-2 bg-primary/5 hover:bg-primary/10 text-primary font-semibold px-5 py-2.5 rounded-xl transition-colors w-fit text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      Send a Message
                    </a>
                  )}
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
              const accent = accentColors[(index + 1) % accentColors.length]
              return (
                <motion.div
                  key={person._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="bg-white rounded-2xl overflow-hidden border border-warm-100 shadow-sm hover:shadow-lg hover:border-warm-200 transition-all duration-500 group"
                >
                  {/* Photo */}
                  <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-warm-100 to-warm-50">
                    {person.image ? (
                      <SanityImageComponent
                        image={person.image}
                        alt={person.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className={`w-20 h-20 rounded-full ${accent.bg} flex items-center justify-center`}>
                          <span className={`text-3xl font-bold ${accent.text}`}>
                            {person.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary/70 mb-1 block">{person.role}</span>
                    <h3 className="text-lg font-bold text-warm-900 mb-2">{person.name}</h3>
                    {person.bio && (
                      <p className="text-warm-600 text-sm leading-relaxed line-clamp-2">{person.bio}</p>
                    )}
                    {person.email && (
                      <a
                        href={`mailto:${person.email}`}
                        className="inline-flex items-center gap-1.5 text-primary hover:text-primary-dark text-sm font-medium mt-4 transition-colors group/link"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Contact
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                      </a>
                    )}
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
