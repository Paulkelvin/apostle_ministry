'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { SanityImageComponent } from '@/components/ui'
import type { HistoryItem } from '@/types'

interface TimelineSectionProps {
  historyItems: HistoryItem[]
}

export function TimelineSection({ historyItems }: TimelineSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Default history for demo if none from CMS
  const displayItems = historyItems.length > 0 ? historyItems : [
    { _id: '1', year: '1985', title: 'Church Founded', description: 'Our journey began with a small group of believers meeting in a living room. What started as a dream became reality through faith and dedication.', order: 1 },
    { _id: '2', year: '1992', title: 'First Building', description: 'We moved into our first dedicated worship space on Main Street. This milestone marked a new chapter in our growth.', order: 2 },
    { _id: '3', year: '2005', title: 'Community Outreach', description: 'Launched our first major community outreach program, feeding over 500 families annually. We became a beacon of hope in our neighborhood.', order: 3 },
    { _id: '4', year: '2015', title: 'New Campus', description: 'Opened our current campus with expanded facilities for ministry, including a youth center and community hall.', order: 4 },
    { _id: '5', year: '2020', title: 'Digital Ministry', description: 'Expanded online presence to reach people around the world. Our services now touch lives across continents.', order: 5 },
  ]

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-bold text-warm-900 mt-3 mb-4">Our Journey</h2>
          <p className="text-warm-600 text-lg max-w-2xl mx-auto">
            See how God has been faithful throughout our church&apos;s history
          </p>
        </motion.div>

        {/* Desktop Timeline - Alternating Left/Right */}
        <div className="hidden lg:block relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-warm-200 -translate-x-1/2" />

          <div className="space-y-16">
            {displayItems.map((item, index) => {
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* Dot */}
                  <div className="absolute left-1/2 top-6 w-4 h-4 bg-primary rounded-full -translate-x-1/2 z-10 ring-4 ring-white" />

                  {/* Content */}
                  <div className={`grid grid-cols-2 gap-12 ${isEven ? '' : 'direction-rtl'}`}>
                    <div className={isEven ? 'text-right pr-12' : 'order-2 text-left pl-12'}>
                      <span className="text-primary font-bold text-lg">{item.year}</span>
                      <h3 className="text-2xl font-bold text-warm-900 mt-1">{item.title}</h3>
                      {item.description && (
                        <p className="text-warm-600 mt-2">{item.description}</p>
                      )}
                    </div>
                    <div className={isEven ? 'pl-12' : 'order-1 pr-12'}>
                      {item.image ? (
                        <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
                          <SanityImageComponent
                            image={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video rounded-2xl bg-gradient-to-br from-warm-100 to-warm-50 flex items-center justify-center">
                          <span className="text-5xl font-bold text-warm-200">{item.year}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile Timeline - Accordion */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-warm-200" />

            <div className="space-y-4">
              {displayItems.map((item, index) => {
                const isExpanded = expandedId === item._id
                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="relative"
                  >
                    {/* Dot */}
                    <motion.div
                      animate={{ scale: isExpanded ? 1.2 : 1 }}
                      className={`absolute left-6 top-6 w-3 h-3 rounded-full -translate-x-1/2 z-10 ring-4 ring-white transition-colors duration-300 ${
                        isExpanded ? 'bg-accent' : 'bg-primary'
                      }`}
                    />

                    {/* Accordion Card */}
                    <div className="ml-12">
                      <button
                        onClick={() => toggleExpand(item._id)}
                        className={`w-full text-left bg-warm-50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md ${
                          isExpanded ? 'shadow-lg ring-1 ring-warm-200' : ''
                        }`}
                      >
                        <div className="p-5 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 flex-1">
                            <span className={`text-lg font-bold min-w-[50px] transition-colors duration-300 ${
                              isExpanded ? 'text-accent' : 'text-primary'
                            }`}>
                              {item.year}
                            </span>
                            <h3 className="text-lg font-bold text-warm-900">
                              {item.title}
                            </h3>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0"
                          >
                            <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${
                              isExpanded ? 'text-accent' : 'text-warm-400'
                            }`} />
                          </motion.div>
                        </div>
                      </button>

                      {/* Expandable Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="bg-white rounded-b-2xl border border-t-0 border-warm-100 p-5">
                              {item.description && (
                                <p className="text-warm-600 leading-relaxed mb-4 text-sm">
                                  {item.description}
                                </p>
                              )}
                              {item.image ? (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.15 }}
                                  className="aspect-video rounded-xl overflow-hidden shadow-md"
                                >
                                  <SanityImageComponent
                                    image={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                  />
                                </motion.div>
                              ) : (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.15 }}
                                  className="aspect-video rounded-xl bg-gradient-to-br from-warm-100 to-warm-50 flex items-center justify-center"
                                >
                                  <span className="text-4xl font-bold text-warm-200">{item.year}</span>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
