'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart, Users, TrendingUp, Gift } from 'lucide-react'

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
    <section className="py-24 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-dark font-semibold text-sm tracking-widest uppercase">Who We Are</span>
          <h2 className="text-4xl md:text-5xl font-bold text-warm-900 mt-3">Our Mission & Vision</h2>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgba(28,27,26,0.06)] border border-warm-100 overflow-hidden group hover:shadow-[0_12px_40px_rgba(28,27,26,0.1)] transition-shadow duration-300"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-warm-900 mb-4">Our Mission</h3>
              <p className="text-warm-600 leading-relaxed text-lg">
                {missionText}
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgba(28,27,26,0.06)] border border-warm-100 overflow-hidden group hover:shadow-[0_12px_40px_rgba(28,27,26,0.1)] transition-shadow duration-300"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-accent-dark" />
              </div>
              <h3 className="text-2xl font-bold text-warm-900 mb-4">Our Vision</h3>
              <p className="text-warm-600 leading-relaxed text-lg">
                {visionText}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">What Guides Us</span>
            <h3 className="text-3xl md:text-4xl font-bold text-warm-900 mt-3">Our Core Values</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-warm-100 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-warm-900 mb-2">{value.title}</h4>
                  <p className="text-warm-600 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
