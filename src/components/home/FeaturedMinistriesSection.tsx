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
    <section className="py-20 bg-[#F4F0EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#592D31' }}>Get Involved</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#332D2D' }}>
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
                  className="block bg-white rounded-2xl overflow-hidden border border-[#E0D8D2] shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-full"
                >
                  <div className="aspect-[16/9] relative overflow-hidden bg-[#F4F0EA]">
                    {ministry.coverImage ? (
                      <SanityImageComponent
                        image={ministry.coverImage}
                        alt={ministry.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#592D31]/10 to-[#D4AF37]/10">
                        <span className="text-5xl font-bold" style={{ color: 'rgba(89,45,49,0.2)' }}>
                          {ministry.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-bold mb-1 group-hover:text-[#6E3A3F] transition-colors" style={{ color: '#592D31' }}>
                      {ministry.name}
                    </h3>
                    {ministry.description && (
                      <p className="text-sm line-clamp-2" style={{ color: '#332D2D' }}>
                        {ministry.description}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-1.5 text-sm font-medium cursor-pointer" style={{ color: '#D4AF37' }}>
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
