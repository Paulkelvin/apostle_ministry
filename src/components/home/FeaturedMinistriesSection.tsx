'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SanityImageComponent } from '@/components/ui'
import type { Ministry } from '@/types'

interface FeaturedMinistriesSectionProps {
  ministries: Ministry[]
}

export function FeaturedMinistriesSection({ ministries }: FeaturedMinistriesSectionProps) {
  // Default ministries for demo if none from CMS
  const displayMinistries = ministries.length > 0 ? ministries : [
    { _id: '1', name: 'Kids Ministry', slug: { current: 'kids' }, description: 'Fun and engaging programs for children of all ages.' },
    { _id: '2', name: 'Youth Ministry', slug: { current: 'youth' }, description: 'Building the next generation of faith leaders.' },
    { _id: '3', name: 'Worship Team', slug: { current: 'worship' }, description: 'Leading our congregation in praise and worship.' },
    { _id: '4', name: 'Outreach', slug: { current: 'outreach' }, description: 'Serving our community with love and compassion.' },
  ]

  return (
    <section className="py-20 bg-[#F0E6D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#6A3B3F' }}>Get Involved</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#665A58' }}>
            Find your place in our church family. We have ministries for everyone.
          </p>
        </div>

        {/* Horizontal Scrolling on Mobile, Grid on Desktop */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex overflow-x-auto pb-6 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 snap-x snap-mandatory md:snap-none no-scrollbar -webkit-overflow-scrolling-touch">
            {displayMinistries.map((ministry, index) => (
              <motion.div
                key={ministry._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-[75vw] max-w-[280px] md:w-auto md:max-w-none snap-start pl-1 first:pl-0"
              >
                <Link
                  href={`/ministries/${ministry.slug?.current || ministry._id}`}
                  className="block bg-[#FDFBF7] rounded-2xl overflow-hidden border border-[#DCCFC0] shadow-[0_2px_12px_rgba(41,33,33,0.06)] hover:shadow-[0_8px_28px_rgba(41,33,33,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-full"
                >
                  <div className="aspect-[16/9] relative overflow-hidden bg-[#E6D8C8]">
                    {ministry.coverImage ? (
                      <SanityImageComponent
                        image={ministry.coverImage}
                        alt={ministry.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#6A3B3F]/10 to-[#C59853]/10">
                        <span className="text-5xl font-bold" style={{ color: 'rgba(106,59,63,0.2)' }}>
                          {ministry.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-bold mb-1 group-hover:text-[#82494E] transition-colors" style={{ color: '#6A3B3F' }}>
                      {ministry.name}
                    </h3>
                    {ministry.description && (
                      <p className="text-sm line-clamp-2" style={{ color: '#665A58' }}>
                        {ministry.description}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-1.5 text-sm font-medium cursor-pointer" style={{ color: '#C59853' }}>
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
