'use client'

import { motion } from 'framer-motion'

interface MissionVisionSectionProps {
  mission?: string
  vision?: string
}

export function MissionVisionSection({ mission, vision }: MissionVisionSectionProps) {
  const missionText =
    mission ||
    'It is the mission of RFLCC to be followers of Christ, at all times; triumphant over every obstacle, the adversary, sin, and imaginations. We will share the Love of God, the life, death, resurrection, and constant intercession of Jesus Christ, and the sweet communion, fellowship, and comfort of the Holy Ghost.'
  const visionText =
    vision ||
    'To be a church where everyone can experience the transforming love of Jesus and become who God created them to be.'

  return (
    <section className="bg-primary-deep py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-16 items-start"
        >
          {/* Mission — hosts the faint watermark, like a photo placeholder would */}
          <div className="relative overflow-hidden">
            <span
              className="absolute inset-0 flex items-center justify-center text-white/10 text-[6rem] sm:text-[8rem] font-black uppercase leading-none tracking-wide pointer-events-none select-none"
              aria-hidden="true"
            >
              Faith
            </span>
            <div className="absolute bottom-0 right-0 hidden sm:flex items-center gap-3" aria-hidden="true">
              <div className="w-8 h-[2px] bg-accent/50" />
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-accent/60">Est. in Faith</span>
            </div>

            <p className="relative text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Our Mission
            </p>
            <h2 className="relative font-display text-3xl md:text-4xl font-semibold text-white mb-6">
              Followers of Christ, at all times
            </h2>
            <p className="relative text-white/75 text-lg leading-relaxed">{missionText}</p>
          </div>

          <div className="hidden lg:block w-px self-stretch bg-white/10" aria-hidden="true" />

          <div>
            <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Our Vision
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
              A church where everyone belongs
            </h2>
            <p className="text-white/75 text-lg leading-relaxed">{visionText}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
