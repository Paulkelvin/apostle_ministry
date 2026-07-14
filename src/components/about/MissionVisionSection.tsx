'use client'

import { motion } from 'framer-motion'
import { Heart, Users, TrendingUp, Gift } from 'lucide-react'

interface MissionVisionSectionProps {
  mission?: string
  vision?: string
}

export function MissionVisionSection({ mission, vision }: MissionVisionSectionProps) {
  const missionText = mission || "It is the mission of RFLCC to be followers of Christ, at all times; triumphant over every obstacle, the adversary, sin, and imaginations. We will share the Love of God, the life, death, resurrection, and constant intercession of Jesus Christ, and the sweet communion, fellowship, and comfort of the Holy Ghost. We will accomplish this by Teaching, Agape, Fellowship, Evangelism, and Word of God."
  const visionText = vision || "To be a church where everyone can experience the transforming love of Jesus and become who God created them to be."

  const coreValues = [
    { title: 'Love', description: 'Loving God and loving people is at the heart of everything we do.', icon: Heart },
    { title: 'Community', description: 'We believe life is better together in authentic relationships.', icon: Users },
    { title: 'Growth', description: "We're committed to becoming more like Jesus every day.", icon: TrendingUp },
    { title: 'Generosity', description: 'We give freely because we have been given so much.', icon: Gift },
  ]

  return (
    <div className="relative w-full overflow-hidden">
      {/* Who We Are — Full Width Split */}
      <section className="relative overflow-hidden z-10">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left: Deep purple with mission */}
          <div className="relative bg-primary-deep py-20 px-6 sm:px-10 lg:px-16 flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10 max-w-lg"
            >
              <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6 block">
                Who We Are
              </span>
              <h2 className="text-h2 text-white mb-6 leading-tight">
                Our Mission
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                {missionText}
              </p>
            </motion.div>
          </div>

          {/* Right: Light with vision */}
          <div className="relative bg-surface py-20 px-6 sm:px-10 lg:px-16 flex items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 max-w-lg"
            >
              <span className="text-accent-dark text-xs font-semibold tracking-[0.2em] uppercase mb-6 block">
                Where We&apos;re Going
              </span>
              <h2 className="text-h2 text-primary mb-6 leading-tight">
                Our Vision
              </h2>
              <p className="text-lg text-ink leading-relaxed">
                {visionText}
              </p>

              {/* Accent quote */}
              <div className="mt-8 pl-6 border-l-2 border-accent">
                <p className="text-primary italic text-base">
                  &ldquo;For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.&rdquo;
                </p>
                <span className="text-sm text-warm-500 mt-2 block">— Jeremiah 29:11</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Guides Us — Values Cards */}
      <section className="py-24 bg-warm-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-accent-dark text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
              What Guides Us
            </span>
            <h2 className="text-h2 text-primary">Our Core Values</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {coreValues.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="h-full bg-white border border-warm-200 rounded-xl shadow-[--shadow-card] hover:shadow-[--shadow-card-hover] transition-shadow duration-300 p-8 lg:p-10">
                    {/* Number + Icon row */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-display text-4xl text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    <h3 className="font-display text-2xl font-semibold text-warm-900 mb-3">
                      {value.title}
                    </h3>

                    <p className="text-warm-600 leading-relaxed text-[15px] lg:text-base">{value.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
