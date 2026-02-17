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
  const displayMinistries = ministries.length > 0 ? ministries : [
    { _id: '1', name: 'Kids Ministry', slug: { current: 'kids' }, description: 'Fun and engaging programs for children of all ages. Our dedicated team creates a safe, nurturing environment where kids can learn about faith through play, story, and song.' },
    { _id: '2', name: 'Youth Ministry', slug: { current: 'youth' }, description: 'Building the next generation of faith leaders. Through mentorship, fellowship, and real-world service, we equip young people to live out their calling with courage.' },
    { _id: '3', name: 'Worship Team', slug: { current: 'worship' }, description: 'Leading our congregation in praise and worship. If you have a heart for music and a desire to serve, there is a place for you on our worship team.' },
    { _id: '4', name: 'Outreach', slug: { current: 'outreach' }, description: 'Serving our community with love and compassion. From food drives to neighborhood events, we are the hands and feet of Jesus in our city.' },
  ]

  return (
    <section className="py-20 lg:py-28 bg-[#FCFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="flex justify-center mb-4">
            <div className="w-[2px] h-10 bg-[#D4AF37]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#592D31' }}>Get Involved</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#5C5252' }}>
            Find your place in our church family
          </p>
        </div>

        {/* Zig-Zag Rows */}
        <div className="space-y-16 lg:space-y-24">
          {displayMinistries.map((ministry, index) => {
            const isReversed = index % 2 !== 0

            return (
              <motion.div
                key={ministry._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16`}
              >
                {/* Image Side — 50% */}
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-2xl">
                    {ministry.coverImage ? (
                      <SanityImageComponent
                        image={ministry.coverImage}
                        alt={ministry.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#592D31]/10 to-[#D4AF37]/10 flex items-center justify-center">
                        <span className="text-7xl font-bold" style={{ color: 'rgba(89,45,49,0.15)' }}>
                          {ministry.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Text Side — 50% */}
                <div className="w-full lg:w-1/2">
                  {/* Gold accent line */}
                  <div className="w-[2px] h-10 bg-[#D4AF37] mb-5" />
                  <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#592D31' }}>
                    {ministry.name}
                  </h3>
                  {ministry.description && (
                    <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: '#5C5252' }}>
                      {ministry.description}
                    </p>
                  )}
                  <Link
                    href={`/ministries/${ministry.slug?.current || ministry._id}`}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border-2 border-[#D4AF37] text-[#D4AF37] font-semibold text-sm hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors duration-300"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
