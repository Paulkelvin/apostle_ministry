'use client'

import { motion } from 'framer-motion'
import { Shield, BookOpen, Sun, Heart, Sparkles, Anchor } from 'lucide-react'

const beliefs = [
  {
    title: 'The Holy Scriptures',
    scripture: '2 Timothy 3:16-17',
    summary: 'We believe the Bible is the inspired, infallible, and authoritative Word of God—our complete guide for faith, doctrine, and living.',
  },
  {
    title: 'The Triune God',
    scripture: 'Matthew 28:19',
    summary: 'We believe in one eternal God who exists in three distinct persons: the Father, the Son Jesus Christ, and the Holy Spirit.',
  },
  {
    title: 'Salvation by Grace',
    scripture: 'Ephesians 2:8-9',
    summary: 'We believe that salvation is a free gift of God’s grace through personal faith in Jesus Christ’s death and victorious resurrection.',
  },
  {
    title: 'The Holy Spirit',
    scripture: 'John 14:16-17',
    summary: 'We believe the Holy Spirit indwells believers, providing constant communion, guidance, comfort, spiritual gifts, and power to live holy lives.',
  },
  {
    title: 'The Christian Community',
    scripture: 'Hebrews 10:24-25',
    summary: 'We believe the Church is the living body of Christ, called to gather regularly in agape love, mutual edification, and fervent prayer.',
  },
  {
    title: 'Hope & Resurrection',
    scripture: '1 Thessalonians 4:16-17',
    summary: 'We believe in the blessed hope of Christ’s return, the resurrection of the saints, and the eternal life promised to all who believe.',
  },
]

export function BeliefsSection() {
  return (
    <section className="py-24 bg-[#FAF7F1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E6DDCA] text-accent-dark text-xs font-semibold tracking-wider uppercase mb-4 shadow-xs">
            <Anchor className="w-3.5 h-3.5 text-accent" />
            Doctrinal Foundations
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            What We Believe
          </h2>
          <p className="text-[#5C525C] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            The enduring biblical truths that anchor our doctrine, teaching, and fellowship.
          </p>
        </div>

        {/* Beliefs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {beliefs.map((b, idx) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white rounded-2xl p-7 border border-[#E6DDCA] shadow-xs hover:border-primary/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-accent-dark bg-[#FAF7F1] px-2.5 py-1 rounded-full border border-[#E6DDCA]">
                    {b.scripture}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#251827] mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-[#5C525C] leading-relaxed">
                  {b.summary}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#E6DDCA]/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#251827]/60">
                  Scriptural Pillar
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
