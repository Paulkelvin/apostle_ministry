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
    accentColor: 'from-primary/20 to-primary/5 text-primary',
    badgeColor: 'text-primary bg-primary/10 border-primary/20',
  },
  {
    number: '02',
    title: 'Agape Love',
    subtitle: 'Unconditional Care',
    description: 'Living out the selfless, sacrificial love of Jesus Christ by serving one another, forgiving freely, and welcoming every soul without judgment.',
    icon: Heart,
    accentColor: 'from-accent/20 to-accent/5 text-accent-dark',
    badgeColor: 'text-accent-dark bg-accent/15 border-accent/25',
  },
  {
    number: '03',
    title: 'Fellowship',
    subtitle: 'Koinonia',
    description: 'Creating an authentic community where believers walk together through life, lift each other up in prayer, and share genuine Christian communion.',
    icon: Users,
    accentColor: 'from-sage/20 to-sage/5 text-sage-dark',
    badgeColor: 'text-sage-dark bg-sage-light border-sage/25',
  },
  {
    number: '04',
    title: 'Evangelism',
    subtitle: 'Great Commission',
    description: 'Sharing the life-transforming gospel of Jesus Christ—His death, resurrection, and saving power—with our neighbors and the world.',
    icon: Megaphone,
    accentColor: 'from-accent/20 to-accent/5 text-accent-dark',
    badgeColor: 'text-accent-dark bg-accent/15 border-accent/25',
  },
  {
    number: '05',
    title: 'Word of God',
    subtitle: 'Logos',
    description: 'Anchoring every message, decision, and lifestyle choice firmly in the infallible, living truth of God’s Holy Scriptures.',
    icon: ScrollText,
    accentColor: 'from-primary/20 to-primary/5 text-primary',
    badgeColor: 'text-primary bg-primary/10 border-primary/20',
  },
]

export function PillarsSection() {
  return (
    <section className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ebe3d5_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EBE3D5] text-accent-dark text-xs font-semibold tracking-wider uppercase mb-4 shadow-xs">
            <span className="text-accent">✦</span>
            Our Foundation in Action
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            The Five Pillars of RLFCC
          </h2>
          <p className="text-[#584E59] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Our mission is brought to life every day through these five core spiritual disciplines.
          </p>
        </div>

        {/* 5 Pillars Grid with Cathedral Arch Tops */}
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
                className={`bg-white rounded-t-[2.75rem] rounded-b-2xl p-8 border border-[#EBE3D5] shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group ${
                  isLastOnDesktop ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.accentColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-xs`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="font-mono text-sm font-bold text-accent-dark bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#EBE3D5]">
                      {pillar.number}
                    </span>
                  </div>

                  <span className={`text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border mb-2 inline-block ${pillar.badgeColor}`}>
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#221524] mb-3 group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-[#584E59] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#EBE3D5]/60 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-xs font-bold text-[#221524]/70 uppercase tracking-wider">
                    RLFCC Core Pillar
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
