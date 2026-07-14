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
  const [phoneNumber, setPhoneNumber] = useState('')

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '')
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
  }

  const displayMinistries = ministries?.length > 0 ? ministries : [
    { _id: '1', name: 'Worship Team', slug: { current: 'worship' }, description: 'Leading our congregation in praise and worship. If you have a heart for music and a desire to serve, there is a place for you on our worship team.' },
    { _id: '2', name: 'Outreach', slug: { current: 'outreach' }, description: 'Serving our community with love and compassion. From food drives to neighborhood events, we are the hands and feet of Jesus in our city.' },
    { _id: '3', name: 'Prayer Ministry', slug: { current: 'prayer' }, description: 'Standing in the gap through intercession. Our prayer warriors come together to lift up the needs of our church, community, and world.' },
    { _id: '4', name: 'Hospitality', slug: { current: 'hospitality' }, description: 'Creating a warm and welcoming atmosphere for every person who walks through our doors. From greeting to serving, we make everyone feel at home.' },
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
      setPhoneNumber('')
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
    <section className="py-20 lg:py-28 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <p className="text-accent-dark text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Join a Department
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary mb-6">
            Discover Your Purpose
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-warm-600">
            We believe everyone has a unique gift to share. Explore our departments and find your place in our church family.
          </p>
        </div>

        {/* Zig-Zag Rows */}
        <div className="space-y-16 lg:space-y-24">
          {displayMinistries.map((ministry, index) => {
            const isReversed = index % 2 !== 0

            return (
              <motion.div
                key={ministry._id || String(index)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-xl group cursor-pointer" onClick={() => openDrawer(ministry)}>
                    {ministry.coverImage ? (
                      <SanityImageComponent
                        image={ministry.coverImage}
                        alt={ministry.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full bg-warm-100 flex items-center justify-center">
                        <span className="font-display text-7xl text-warm-300">
                          {ministry.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Text Side */}
                <div className="w-full lg:w-1/2">
                  {/* Gold accent line */}
                  <div className="w-px h-10 bg-accent mb-5" />
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-4">
                    {ministry.name}
                  </h3>
                  {ministry.description && (
                    <p className="text-base md:text-lg leading-relaxed text-warm-600 mb-6">
                      {ministry.description}
                    </p>
                  )}
                  <button
                    onClick={() => openDrawer(ministry)}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border border-warm-200 text-ink font-semibold text-sm hover:border-primary hover:text-primary transition-colors duration-300 group"
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
              className="fixed inset-0 bg-primary-ink/70 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-primary-deep shadow-2xl border-l border-white/10 rounded-l-2xl overflow-hidden z-50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex-shrink-0 px-6 py-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-display text-xl text-white">Join Department</h3>
                <button
                  onClick={closeDrawer}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-white/80" />
                </button>
              </div>

              {/* Drawer Body (Scrollable) */}
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="mb-8">
                  <div className="w-12 h-px bg-accent/40 mb-5" />
                  <h4 className="font-display text-2xl font-semibold text-white mb-3">{selectedMinistry.name}</h4>
                  <p className="text-white/60 leading-relaxed">
                    {selectedMinistry.description}
                  </p>
                </div>

                {!isSubmitted ? (
                  <div>
                    <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-2">Express Interest</p>
                    <p className="text-sm text-white/45 mb-6">Leave your details and leadership will reach out shortly.</p>

                    <form onSubmit={handleJoinSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-semibold tracking-wide uppercase text-white/50 mb-2">Full Name</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-white/15 bg-white/5 text-white placeholder-white/30 focus:border-accent focus:bg-white/10 outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-wide uppercase text-white/50 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          className="w-full px-4 py-3 rounded-lg border border-white/15 bg-white/5 text-white placeholder-white/30 focus:border-accent focus:bg-white/10 outline-none transition-colors"
                          placeholder="(555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-wide uppercase text-white/50 mb-2">Message (Optional)</label>
                        <textarea
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-white/15 bg-white/5 text-white placeholder-white/30 focus:border-accent focus:bg-white/10 outline-none transition-colors resize-none"
                          placeholder="Why are you interested in this department?"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 bg-accent text-warm-900 shadow-[inset_0_1px_0_0_rgb(255_255_255/0.35),0_1px_2px_rgb(0_0_0/0.06),0_4px_14px_-4px_rgb(212_175_55/0.5)] hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.3),0_2px_4px_rgb(0_0_0/0.08),0_10px_22px_-6px_rgb(212_175_55/0.6)] font-semibold py-3 px-4 rounded-lg transition-[background-color,box-shadow,transform] duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
                      >
                        {isSubmitting ? (
                          <span className="w-5 h-5 border-2 border-warm-900/30 border-t-warm-900 rounded-full animate-spin"></span>
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
                    className="bg-white/5 border border-accent/30 p-8 rounded-xl flex flex-col items-center text-center"
                  >
                    <div className="w-14 h-14 bg-accent/15 text-accent rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h5 className="font-display text-xl text-white mb-2">Request Sent!</h5>
                    <p className="text-white/60">
                      Thank you for your interest in joining <strong className="text-white/85">{selectedMinistry.name}</strong>. A leader will be in touch with you shortly to help you get started.
                    </p>
                    <button
                      onClick={closeDrawer}
                      className="mt-6 font-semibold text-accent hover:text-accent-dark underline underline-offset-4 transition-colors"
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
