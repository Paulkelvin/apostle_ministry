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
    <section className="bg-white py-20 lg:py-28 relative overflow-hidden border-b border-[#E6DDCA]">
      {/* Subtle tactile dot pattern & ambient light */}
      <div className="absolute inset-0 bg-[radial-gradient(#e6ddca_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-light/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F1] border border-[#E6DDCA] text-accent-dark text-xs font-semibold tracking-wider uppercase mb-3 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-accent" />
            Our Foundation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary font-display mb-3">
            Driven by Purpose &amp; Faith
          </h2>
          <p className="text-[#5C525C] text-base sm:text-lg max-w-xl mx-auto">
            The mission and vision that anchor our spiritual family in Jesus Christ.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-8 lg:gap-10 items-stretch"
        >
          {/* Mission Card */}
          <div className="bg-[#FAF7F1] rounded-3xl p-8 sm:p-10 border border-[#E6DDCA] shadow-xs hover:border-primary/40 transition-all duration-300 flex flex-col justify-between relative group">
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-primary to-accent rounded-t-full" />
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-primary">Core Purpose</span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#251827]">Our Mission</h3>
                </div>
              </div>
              <p className="text-[#5C525C] text-base sm:text-lg leading-relaxed font-normal">
                {missionText}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#E6DDCA] flex items-center justify-between">
              <span className="text-xs font-bold text-accent-dark uppercase tracking-wider">Followers of Christ</span>
              <span className="w-2 h-2 rounded-full bg-accent" />
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-[#FAF7F1] rounded-3xl p-8 sm:p-10 border border-[#E6DDCA] shadow-xs hover:border-primary/40 transition-all duration-300 flex flex-col justify-between relative group">
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-accent to-primary rounded-t-full" />
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent-dark flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-accent-dark">Future Hope</span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#251827]">Our Vision</h3>
                </div>
              </div>
              <p className="text-[#5C525C] text-base sm:text-lg leading-relaxed font-normal">
                {visionText}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#E6DDCA] flex items-center justify-between">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Transforming Grace</span>
              <span className="w-2 h-2 rounded-full bg-primary" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
