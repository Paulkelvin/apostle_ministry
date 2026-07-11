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
          <div>
            <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Our Mission
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
              Followers of Christ, at all times
            </h2>
            <p className="text-white/75 text-lg leading-relaxed">{missionText}</p>
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
