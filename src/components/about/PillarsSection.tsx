'use client'

import { motion } from 'framer-motion'
import { BookOpen, Heart, Users, Megaphone, ScrollText, Sparkles } from 'lucide-react'

const pillars = [
  {
    number: '01',
    title: 'Teaching',
    subtitle: 'Didache',
    description: 'Sound, practical biblical instruction designed to equip believers, strengthen understanding, and build a lasting foundation in Christ.',
    icon: BookOpen,
  },
  {
    number: '02',
    title: 'Agape Love',
    subtitle: 'Unconditional Care',
    description: 'Living out the selfless, sacrificial love of Jesus Christ by serving one another, forgiving freely, and welcoming every soul without judgment.',
    icon: Heart,
  },
  {
    number: '03',
    title: 'Fellowship',
    subtitle: 'Koinonia',
    description: 'Creating an authentic community where believers walk together through life, lift each other up in prayer, and share genuine Christian communion.',
    icon: Users,
  },
  {
    number: '04',
    title: 'Evangelism',
    subtitle: 'Great Commission',
    description: 'Sharing the life-transforming gospel of Jesus Christ—His death, resurrection, and saving power—with our neighbors and the world.',
    icon: Megaphone,
  },
  {
    number: '05',
    title: 'Word of God',
    subtitle: 'Logos',
    description: 'Anchoring every message, decision, and lifestyle choice firmly in the infallible, living truth of God’s Holy Scriptures.',
    icon: ScrollText,
  },
]

export function PillarsSection() {
  return (
    <section className="py-24 bg-[#FAF7F1] relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e6ddca_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E6DDCA] text-accent-dark text-xs font-semibold tracking-wider uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Our Foundation in Action
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            The Five Pillars of RLFCC
          </h2>
          <p className="text-[#5C525C] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Our mission is brought to life every day through these five core spiritual disciplines.
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon
            const isLastOnDesktop = idx === 4
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-white rounded-3xl p-8 border border-[#E6DDCA] shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group ${
                  isLastOnDesktop ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex items-center justify-center text-primary">
                      <Icon className="w-6 h-6 transition-colors duration-300" />
                    </div>
                    <span className="font-mono text-sm font-bold text-accent-dark">
                      {pillar.number}
                    </span>
                  </div>

                  <span className="text-xs font-semibold tracking-wider uppercase text-accent-dark block mb-1">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#251827] mb-3 group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-[#5C525C] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E6DDCA]/60 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-xs font-bold text-[#251827]/70 uppercase tracking-wider">
                    RLFCC Core Practice
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
