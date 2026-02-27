'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart, Users, TrendingUp, Gift, Cross } from 'lucide-react'

interface MissionVisionSectionProps {
  mission?: string
  vision?: string
}

export function MissionVisionSection({ mission, vision }: MissionVisionSectionProps) {
  const missionText = mission || "It is the mission of RFLCC to be followers of Christ, at all times; triumphant over every obstacle, the adversary, sin, and imaginations. We will share the Love of God, the life, death, resurrection, and constant intercession of Jesus Christ, and the sweet communion, fellowship, and comfort of the Holy Ghost. We will accomplish this by Teaching, Agape, Fellowship, Evangelism, and Word of God."
  const visionText = vision || "To be a church where everyone can experience the transforming love of Jesus and become who God created them to be."

  const coreValues = [
    { title: 'Love', description: 'Loving God and loving people is at the heart of everything we do.', icon: Heart, color: '#D4AF37' },
    { title: 'Community', description: 'We believe life is better together in authentic relationships.', icon: Users, color: '#7BA381' },
    { title: 'Growth', description: "We're committed to becoming more like Jesus every day.", icon: TrendingUp, color: '#592D31' },
    { title: 'Generosity', description: 'We give freely because we have been given so much.', icon: Gift, color: '#D4AF37' },
  ]

  return (
    <>
      {/* Who We Are — Full Width Split */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left: Deep burgundy with mission */}
          <div className="relative bg-[#592D31] py-20 px-6 sm:px-10 lg:px-16 flex items-center">
            {/* Decorative cross watermark */}
            <div className="absolute top-10 right-10 opacity-[0.06]">
              <svg width="120" height="150" viewBox="0 0 120 150" fill="none">
                <rect x="45" y="0" width="30" height="150" fill="white"/>
                <rect x="0" y="35" width="120" height="30" fill="white"/>
              </svg>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10 max-w-lg"
            >
              <span className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-6">
                <span className="w-8 h-px bg-[#D4AF37]" />
                Who We Are
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#FFFFFF' }}>
                Our Mission
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {missionText}
              </p>
            </motion.div>
          </div>
          
          {/* Right: Light with vision */}
          <div className="relative bg-[#FCFBF9] py-20 px-6 sm:px-10 lg:px-16 flex items-center">
            {/* Decorative dots */}
            <div className="absolute bottom-10 left-10 grid grid-cols-4 gap-2 opacity-10">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#592D31]" />
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 max-w-lg"
            >
              <span className="inline-flex items-center gap-2 text-[#592D31] text-xs font-bold tracking-[0.2em] uppercase mb-6">
                <span className="w-8 h-px bg-[#592D31]" />
                Where We&apos;re Going
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#592D31] mb-6 leading-tight">
                Our Vision
              </h2>
              <p className="text-lg text-[#332D2D] leading-relaxed">
                {visionText}
              </p>
              
              {/* Accent quote */}
              <div className="mt-8 pl-6 border-l-4 border-[#D4AF37]">
                <p className="text-[#592D31] italic text-base">
                  &ldquo;For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.&rdquo;
                </p>
                <span className="text-sm text-[#8A8080] mt-2 block">— Jeremiah 29:11</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Guides Us — Classic Values Cards */}
      <section className="py-24 bg-gradient-to-b from-[#F4F0EA] to-[#FCFBF9] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center justify-center gap-3 text-[#592D31] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              <span className="w-12 h-px bg-[#D4AF37]" />
              What Guides Us
              <span className="w-12 h-px bg-[#D4AF37]" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#592D31]">Our Core Values</h2>
          </motion.div>

          {/* Values — Classic Elegant Cards */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {coreValues.map((value, index) => {
              const Icon = value.icon
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className={`relative group ${isEven ? 'md:mt-0' : 'md:mt-16'}`}
                >
                  <div className="relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(89,45,49,0.15)]">
                    {/* Top accent bar */}
                    <div 
                      className="h-1.5 w-full"
                      style={{ backgroundColor: value.color }}
                    />
                    
                    <div className="p-8 lg:p-10">
                      {/* Number + Icon row */}
                      <div className="flex items-center justify-between mb-6">
                        <span 
                          className="text-5xl font-light tracking-tight"
                          style={{ color: value.color, fontFamily: 'Georgia, "Times New Roman", serif' }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div 
                          className="w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-100"
                          style={{ 
                            borderColor: value.color,
                            backgroundColor: `${value.color}10`
                          }}
                        >
                          <Icon className="w-6 h-6" style={{ color: value.color }} />
                        </div>
                      </div>
                      
                      {/* Title with elegant underline */}
                      <div className="mb-4">
                        <h3 
                          className="text-2xl lg:text-[1.75rem] font-bold text-[#592D31] mb-2"
                          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                        >
                          {value.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="w-12 h-[2px]" style={{ backgroundColor: value.color }} />
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: value.color, opacity: 0.4 }} />
                        </div>
                      </div>
                      
                      <p className="text-[#5C5252] leading-relaxed text-[15px] lg:text-base">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
