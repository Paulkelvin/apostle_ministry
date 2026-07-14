'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X, CheckCircle2 } from 'lucide-react'
import { SanityImageComponent } from '@/components/ui'
import type { Ministry } from '@/types'

interface FeaturedMinistriesSectionProps {
  ministries: Ministry[]
}

// Local palette for the Join Department sheet — scoped to this component
// via CSS custom properties rather than the site-wide theme tokens.
const jdTokens = {
  '--jd-ink': '#171B22',
  '--jd-paper': '#F7F2E7',
  '--jd-paper-line': '#E4DCC9',
  '--jd-text-dark': '#262019',
  '--jd-text-muted': '#6B6252',
  '--jd-gold': '#C79A3A',
  '--jd-gold-deep': '#9C7620',
  '--jd-wine': '#5B3A52',
  '--jd-focus': '#B8862B',
} as React.CSSProperties

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
          <h2 className="text-h2 text-primary mb-6">
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
                  <h3 className="text-h3 text-primary mb-4">
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

      {/* Join Department — bottom sheet */}
      <AnimatePresence>
        {selectedMinistry && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Sheet */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="jd-title"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              style={jdTokens}
              className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full sm:max-w-lg rounded-t-[28px] shadow-2xl max-h-[88vh] flex flex-col overflow-hidden font-[family-name:var(--font-inter)] bg-[var(--jd-paper)]"
            >
              {/* Grabber */}
              <div className="flex-shrink-0 pt-3 pb-1 flex justify-center" aria-hidden="true">
                <div className="w-10 h-1.5 rounded-full bg-[var(--jd-paper-line)]" />
              </div>

              {/* Close button */}
              <button
                onClick={closeDrawer}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[var(--jd-ink)]/5 hover:bg-[var(--jd-ink)]/10 flex items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--jd-focus)]"
              >
                <X className="w-4 h-4 text-[var(--jd-text-dark)]" />
              </button>

              {/* Sheet Body (scrollable) */}
              <div className="flex-1 overflow-y-auto px-6 sm:px-8 pb-8 pt-3">
                <div className="relative mb-8">
                  {/* Glow accent behind title */}
                  <div className="absolute -inset-x-8 -top-4 h-24 pointer-events-none" aria-hidden="true">
                    <div
                      className="mx-auto h-full w-3/4 rounded-full blur-2xl opacity-40 motion-safe:animate-[glow-flicker_6s_ease-in-out_infinite]"
                      style={{ background: 'radial-gradient(closest-side, var(--jd-gold), transparent 70%)' }}
                    />
                  </div>

                  <p className="relative text-[var(--jd-wine)] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                    Join a Department
                  </p>
                  <h3
                    id="jd-title"
                    className="relative font-[family-name:var(--font-fraunces)] font-medium text-3xl text-[var(--jd-text-dark)] mb-3"
                  >
                    {selectedMinistry.name}
                  </h3>
                  <p className="relative text-[var(--jd-text-muted)] leading-relaxed">
                    {selectedMinistry.description}
                  </p>
                </div>

                {!isSubmitted ? (
                  <div>
                    <p className="text-[var(--jd-gold-deep)] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Express Interest</p>
                    <p className="text-sm text-[var(--jd-text-muted)] mb-7">Leave your details and leadership will reach out shortly.</p>

                    <form onSubmit={handleJoinSubmit} className="space-y-7">
                      <div className="relative pt-4">
                        <input
                          id="jd-name"
                          name="name"
                          type="text"
                          required
                          placeholder=" "
                          className="peer w-full bg-transparent border-0 border-b-2 border-[var(--jd-paper-line)] focus:border-[var(--jd-focus)] outline-none px-0 py-2.5 text-[var(--jd-text-dark)] transition-colors duration-200 focus-visible:outline-none"
                        />
                        <label
                          htmlFor="jd-name"
                          className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--jd-text-muted)] text-base transition-all duration-200 ease-out pointer-events-none peer-focus:top-1 peer-focus:-translate-y-full peer-focus:text-xs peer-focus:font-semibold peer-focus:tracking-wide peer-focus:text-[var(--jd-gold-deep)] peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:-translate-y-full peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:tracking-wide peer-[:not(:placeholder-shown)]:text-[var(--jd-gold-deep)]"
                        >
                          Full Name
                        </label>
                      </div>

                      <div className="relative pt-4">
                        <input
                          id="jd-phone"
                          name="phone"
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          placeholder=" "
                          className="peer w-full bg-transparent border-0 border-b-2 border-[var(--jd-paper-line)] focus:border-[var(--jd-focus)] outline-none px-0 py-2.5 text-[var(--jd-text-dark)] transition-colors duration-200 focus-visible:outline-none"
                        />
                        <label
                          htmlFor="jd-phone"
                          className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--jd-text-muted)] text-base transition-all duration-200 ease-out pointer-events-none peer-focus:top-1 peer-focus:-translate-y-full peer-focus:text-xs peer-focus:font-semibold peer-focus:tracking-wide peer-focus:text-[var(--jd-gold-deep)] peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:-translate-y-full peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:tracking-wide peer-[:not(:placeholder-shown)]:text-[var(--jd-gold-deep)]"
                        >
                          Phone Number
                        </label>
                      </div>

                      <div className="relative pt-4">
                        <textarea
                          id="jd-message"
                          name="message"
                          rows={3}
                          placeholder=" "
                          className="peer w-full bg-transparent border-0 border-b-2 border-[var(--jd-paper-line)] focus:border-[var(--jd-focus)] outline-none px-0 py-2.5 text-[var(--jd-text-dark)] transition-colors duration-200 resize-none focus-visible:outline-none"
                        ></textarea>
                        <label
                          htmlFor="jd-message"
                          className="absolute left-0 top-4 text-[var(--jd-text-muted)] text-base transition-all duration-200 ease-out pointer-events-none peer-focus:top-1 peer-focus:-translate-y-full peer-focus:text-xs peer-focus:font-semibold peer-focus:tracking-wide peer-focus:text-[var(--jd-gold-deep)] peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:-translate-y-full peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:tracking-wide peer-[:not(:placeholder-shown)]:text-[var(--jd-gold-deep)]"
                        >
                          Message (Optional)
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-4 rounded-full font-semibold text-[var(--jd-ink)] shadow-[0_10px_24px_-8px_rgb(156_118_32/0.55)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-8px_rgb(156_118_32/0.65)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--jd-focus)]"
                        style={{ background: 'linear-gradient(135deg, var(--jd-gold), var(--jd-gold-deep))' }}
                      >
                        {isSubmitting ? (
                          <span className="w-5 h-5 border-2 border-[var(--jd-ink)]/30 border-t-[var(--jd-ink)] rounded-full animate-spin" />
                        ) : (
                          <>
                            Submit Interest
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[var(--jd-gold)]/10 border border-[var(--jd-gold)]/30 p-8 rounded-2xl flex flex-col items-center text-center"
                  >
                    <div className="w-14 h-14 bg-[var(--jd-gold)]/15 text-[var(--jd-gold-deep)] rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h5 className="font-[family-name:var(--font-fraunces)] font-medium text-xl text-[var(--jd-text-dark)] mb-2">Request Sent!</h5>
                    <p className="text-[var(--jd-text-muted)]">
                      Thank you for your interest in joining <strong className="text-[var(--jd-text-dark)]">{selectedMinistry.name}</strong>. A leader will be in touch with you shortly to help you get started.
                    </p>
                    <button
                      onClick={closeDrawer}
                      className="mt-6 font-semibold text-[var(--jd-gold-deep)] hover:text-[var(--jd-wine)] underline underline-offset-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--jd-focus)] rounded-sm"
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
