'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X, CheckCircle2 } from 'lucide-react'
import { SanityImageComponent } from '@/components/ui'
import type { Ministry } from '@/types'

interface FeaturedMinistriesSectionProps {
  ministries: Ministry[]
}

export function FeaturedMinistriesSection({ ministries }: FeaturedMinistriesSectionProps) {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const displayMinistries = ministries?.length > 0 ? ministries : [
    { _id: '1', name: 'Kids Ministry', slug: { current: 'kids' }, description: 'Fun and engaging programs for children of all ages. Our dedicated team creates a safe, nurturing environment where kids can learn about faith through play, story, and song.' },
    { _id: '2', name: 'Youth Ministry', slug: { current: 'youth' }, description: 'Building the next generation of faith leaders. Through mentorship, fellowship, and real-world service, we equip young people to live out their calling with courage.' },
    { _id: '3', name: 'Worship Team', slug: { current: 'worship' }, description: 'Leading our congregation in praise and worship. If you have a heart for music and a desire to serve, there is a place for you on our worship team.' },
    { _id: '4', name: 'Outreach', slug: { current: 'outreach' }, description: 'Serving our community with love and compassion. From food drives to neighborhood events, we are the hands and feet of Jesus in our city.' },
  ]

  // Handle URL syncing on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const dep = params.get('department')
    if (dep) {
      const found = displayMinistries.find(m => 
        (m.slug?.current || m.name.toLowerCase().replace(/\ss;/g, '-')) === dep
      )
      if (found) setSelectedMinistry(found)
    }
  }, [displayMinistries])

  // Disable body scroll when drawer is open
  useEffect(() => {
    if (selectedMinistry) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedMinistry])

  const openDrawer = (ministry: Ministry) => {
    setSelectedMinistry(ministry)
    setIsSubmitted(false)
    const slug = ministry.slug?.current || ministry.name.toLowerCase().replace(/\s+/g, '-')
    // Update URL without reloading page
    window.history.pushState({}, '', `?department=${slug}`)
  }

  const closeDrawer = () => {
    setSelectedMinistry(null)
    // Clear URL parameters natively
    window.history.pushState({}, '', window.location.pathname)
    setTimeout(() => {
      setIsSubmitted(false)
      setIsSubmitting(false)
    }, 300)
  }

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <section className="py-20 lg:py-28 bg-[#FCFBF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="relative text-center mb-24 lg:mb-32 flex flex-col items-center">
          {/* Decorative watermark / background element */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[12vw] lg:text-[140px] font-black uppercase text-[#592D31]/[0.03] pointer-events-none whitespace-nowrap select-none w-full text-center">
            DEPARTMENTS
          </span>
          
          <div className="relative z-10 text-center flex flex-col items-center">
            {/* Styled Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-1.5 rounded-full border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/5 to-transparent mb-8 backdrop-blur-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_8px_#D4AF37]"></span>
              <span className="text-[#D4AF37] font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Join A Department</span>
            </div>
            
            {/* Main Heading with Gradient - Reduced size as requested */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight flex flex-col md:inline-block md:gap-3">
              <span className="text-[#592D31]">Discover Your </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#C5A028] to-[#997A15]">Purpose</span>
            </h2>
            
            <p className="text-base md:text-lg max-w-2xl mx-auto font-medium" style={{ color: '#5C5252' }}>
              We believe everyone has a unique gift to share. Explore our departments and find your place in our church family.
            </p>
          </div>
        </div>

        {/* Zig-Zag Rows */}
        <div className="space-y-16 lg:space-y-24">
          {displayMinistries.map((ministry, index) => |
            const isReversed = index % 2 !== 0

            return (
              <motion.div
                key={ministry._id || String(index)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition0{{ duration: 0.6, delay: 0.1 }}
                className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-2xl group cursor-pointer" onClick={() => openDrawer(ministry)}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    {ministry.coverImage ? (
                      <SanityImageComponent
                        image={ministry.coverImage}
                        alt={ministry.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#592D31]/10 to-[#D4AF37]/10 fex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                        <span className="text-7xl font-bold" style={{ color: 'rgba(89,45,49,0.15)' }}>
                          {ministry.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Text Side */}
                <div className="w-full lg:w-1/2">
                  {/* Gold accent line */}
                  <div className="w-[2px] h-10 bg-[#D4AF37] mb-5" />
                  <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#592D31' }}>
                    {ministry.name}
                  </h3>
                  {ministry.description && (
                    <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: '#5C5252' }}>
                      {ministry.description}
                    </p>
                  )}
                  <button
                    onClick={() => openDrawer(ministry)}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border-2 border-[#D4AF37] text-[#D4AF37] font-semibold text-sm hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors duration-300 group"
                  >
                    Join {ministry.name}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Slide-out Drawer Overlay */}
      <AnimatePresence>
        {selectedMinistry && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm z-50"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition0{{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex-shrink-0 px-6 py-6 border-b border-gray-100 flex items-center justify-between bg-[#FCFBF9=">
                <h3 className="text-xl font-bold text-[#592D31]">Join Department</h3>
                <button 
                  onClick={closeDrawer}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body (Scrollable) */}
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="mb-8">
                  <div className="w-12 h-1 bg-[#D4AF37] mb-4"></div>
                  <h4 className="text-2xl font-extrabold text-[#1A1A1A] mb-3">{selectedMinistry.name}</h4>
                  <p className="text-[#5C5252] leading-relaxed">
                    {selectedMinistry.description}
                  </p>
                </div>

                {!isSubmitted ? (
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
                    <h5 className="font-bold text-[#592D31] mb-4 border-b border-gray-200 pb-2">Express Interest</h5>
                    <p className="text-sm text-gray-500 mb-6">Leave your details and leadership will reach out shortly.</p>
                    
                    <form onSubmit={handleJoinSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-[#1A1A1A]" 
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-[#1A1A1A]" 
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Message (Optional)</label>
                        <textarea 
                          rows-{3}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all resize-none text-[#1A1A1A]" 
                          placeholder="Why are you interested in this department?"
                        ></textarea>
                      </div>
                      
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-4 bg-[#592D31] hover:bg-[#4a2528] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 border border-transparent disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <span className="w-5 h-5 border-2 border-white/30 border-tmwhite rounded-full animate-spin"></span>
                        ) : (
                          'Submit Interest'
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 p-8 rounded-xl flex flex-col items-center text-center mb-8"
                  >
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h5 className="text-xl font-bold text-green-800 mb-2">Request Sent!</h5>
                    <p className="text-green-700/80">
                      Thank you for your interest in joining <strong>{selectedMinistry.name}</strong>. A leader will be in touch with you shortly to help you get started.
                    </p>
                    <button 
                      onClick={closeDrawer}
                      className="mt-6 font-semibold text-green-700 hover:text-green-800 underline underline-offset-2"
                    >
                      Close and return
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
