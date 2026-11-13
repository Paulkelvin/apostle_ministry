'use client'

import { motion } from 'framer-motion'
import { Compass, Sparkles } from 'lucide-react'

interface MissionVisionSectionProps {
  mission?: string
  vision?: string
}

export function MissionVisionSection({ mission, vision }: MissionVisionSectionProps) {
  const missionText =
    mission ||
    'It is the mission of RLFCC to be followers of Christ, at all times; triumphant over every obstacle, the adversary, sin, and imaginations. We will share the Love of God, the life, death, resurrection, and constant intercession of Jesus Christ, and the sweet communion, fellowship, and comfort of the Holy Ghost.'
  const visionText =
    vision ||
    'To be a community where everyone can experience the transforming love of Jesus, discover their purpose, and grow in faith together in genuine Christian fellowship.'

  return (
    <section className="bg-[#FAFAF8] py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle tactile dot pattern & ambient light */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-light/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-warm-200/80 text-primary text-xs font-semibold tracking-wider uppercase mb-3 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-primary" />
            Our Foundation
          </span>
          <h2 className="text-h2 text-warm-900 font-display">
            Driven by Purpose &amp; Faith
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-8 lg:gap-10 items-stretch"
        >
          {/* Mission Card */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-warm-200/80 shadow-[--shadow-card] hover:shadow-[--shadow-card-hover] transition-all duration-300 flex flex-col justify-between relative group">
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-primary to-primary-light rounded-t-full opacity-80" />
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-primary">Core Purpose</span>
                  <h3 className="font-display text-2xl font-bold text-warm-900">Our Mission</h3>
                </div>
              </div>
              <p className="text-warm-600 text-base sm:text-lg leading-relaxed font-normal">
                {missionText}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-warm-100 flex items-center justify-between">
              <span className="text-xs font-medium text-warm-500 uppercase tracking-wider">Followers of Christ</span>
              <span className="w-2 h-2 rounded-full bg-primary/40" />
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-warm-200/80 shadow-[--shadow-card] hover:shadow-[--shadow-card-hover] transition-all duration-300 flex flex-col justify-between relative group">
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-accent to-accent-light rounded-t-full opacity-80" />
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent-dark flex items-center justify-center font-bold text-sm">
                  <Sparkles className="w-5 h-5 text-accent-dark" />
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-accent-dark">Future Direction</span>
                  <h3 className="font-display text-2xl font-bold text-warm-900">Our Vision</h3>
                </div>
              </div>
              <p className="text-warm-600 text-base sm:text-lg leading-relaxed font-normal">
                {visionText}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-warm-100 flex items-center justify-between">
              <span className="text-xs font-medium text-warm-500 uppercase tracking-wider">A Place Where You Belong</span>
              <span className="w-2 h-2 rounded-full bg-accent/60" />
            </div>
          </div>
        </motion.div>

        {/* Elegant Section Divider */}
        <div className="mt-20 pt-8 flex items-center justify-center">
          <div className="relative w-full max-w-4xl flex items-center justify-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-warm-200 to-transparent" />
            <span className="absolute bg-[#FAFAF8] px-4 text-warm-400 text-xs tracking-widest uppercase">
              ✦
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
