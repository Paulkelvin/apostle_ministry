'use client'

import { motion } from 'framer-motion'
import { Compass, Eye, Quote, Sparkles } from 'lucide-react'

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
    <section className="py-24 bg-white border-y border-[#EBE3D5] relative overflow-hidden">
      {/* Background soft ambient warmth */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary-light/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#EBE3D5] text-accent-dark text-xs font-semibold tracking-wider uppercase mb-4 shadow-xs">
            <span className="text-accent">✦</span>
            Our Guiding Light
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Mission &amp; Vision
          </h2>
          <p className="text-[#584E59] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            The biblical mandate that guides our gatherings, our service, and our daily walk as believers.
          </p>
        </div>

        {/* Dual Harmonious Cards with Arch Frames */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-t-[3.5rem] rounded-b-3xl bg-[#FAF8F5] border border-[#EBE3D5] p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:border-primary/40 transition-all duration-300 relative group"
          >
            <div className="absolute top-0 left-10 right-10 h-1.5 bg-gradient-to-r from-primary to-accent rounded-t-full" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-xs">
                  <Compass className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white border border-[#EBE3D5] text-primary">
                  Core Mandate
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#221524] mb-4">
                Our Mission
              </h3>

              <p className="text-[#584E59] text-base sm:text-lg leading-relaxed font-normal">
                {missionText}
              </p>
            </div>

            <div className="pt-6 mt-8 border-t border-[#EBE3D5] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <p className="text-xs font-bold text-accent-dark uppercase tracking-wider">
                Followers of Christ &bull; Triumphant in Faith
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-t-[3.5rem] rounded-b-3xl bg-[#FAF8F5] border border-[#EBE3D5] p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:border-sage/40 transition-all duration-300 relative group"
          >
            <div className="absolute top-0 left-10 right-10 h-1.5 bg-gradient-to-r from-sage to-accent rounded-t-full" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-sage-light border border-sage/20 flex items-center justify-center text-sage-dark shadow-xs">
                  <Eye className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white border border-[#EBE3D5] text-sage-dark">
                  Future Hope
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#221524] mb-4">
                Our Vision
              </h3>

              <p className="text-[#584E59] text-base sm:text-lg leading-relaxed font-normal mb-6">
                {visionText}
              </p>

              {/* Anchoring Scripture Ribbon */}
              <div className="p-5 rounded-2xl bg-white border border-[#EBE3D5] shadow-xs relative overflow-hidden">
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-sage" />
                <p className="text-[#221524] italic text-sm sm:text-base leading-relaxed font-serif">
                  &ldquo;For I know the plans I have for you,&rdquo; declares the Lord, &ldquo;plans to prosper you and not to harm you, plans to give you hope and a future.&rdquo;
                </p>
                <p className="text-sage-dark text-xs font-bold mt-2 uppercase tracking-wider">
                  — Jeremiah 29:11
                </p>
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-[#EBE3D5] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-sage" />
              <p className="text-xs font-bold text-sage-dark uppercase tracking-wider">
                Experience Transforming Grace &bull; Discover Purpose
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
