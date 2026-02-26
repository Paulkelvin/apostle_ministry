'use client'

import { motion } from 'framer-motion'
import { FloatingCrosses } from '@/components/ui/AmbientGlow'

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
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: '#592D31' }}>
      {/* Floating crosses */}
      <FloatingCrosses />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col lg:flex-row items-stretch min-h-[520px]">

          {/* Left — Photo placeholder (60% width on desktop) */}
          <div className="relative w-full lg:w-[60%] min-h-[300px] lg:min-h-0 rounded-2xl overflow-hidden">
            {/* B&W community photo placeholder — gradient simulates a faded photo */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(60,40,42,0.9) 0%, rgba(89,45,49,0.6) 50%, rgba(40,25,27,0.8) 100%)',
                opacity: 0.4,
              }}
            />
            {/* Decorative text watermark */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
              <span
                className="text-[8rem] sm:text-[10rem] md:text-[14rem] font-bold uppercase leading-none tracking-wide"
                style={{ color: 'rgba(255,255,255,0.04)', letterSpacing: '0.05em' }}
              >
                Faith
              </span>
            </div>
            {/* Cross pattern — subtle decorative element */}
            <div className="absolute inset-0 flex items-end p-8 lg:p-12">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[2px] bg-[#D4AF37]/50" />
                <span className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: 'rgba(212,175,55,0.6)' }}>
                  Est. in Faith
                </span>
              </div>
            </div>
          </div>

          {/* Right — White overlap box */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full lg:w-[55%] lg:-ml-[15%] mt-6 sm:mt-[-20px] lg:mt-0 lg:my-10 z-10"
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 lg:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              {/* Gold accent */}
              <div className="w-[2px] h-10 bg-[#D4AF37] mb-6" />

              {/* Mission */}
              <h3
                className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
                style={{ color: '#592D31', fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Our Mission
              </h3>
              <p className="text-base md:text-lg leading-relaxed mb-10" style={{ color: '#5C5252' }}>
                {missionText}
              </p>

              {/* Divider line */}
              <div className="w-16 h-[1px] bg-[#E0D8D2] mb-10" />

              {/* Vision */}
              <h3
                className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
                style={{ color: '#592D31', fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Our Vision
              </h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: '#5C5252' }}>
                {visionText}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
