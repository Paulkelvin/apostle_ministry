'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShieldCheck, ArrowRight, Sparkles, CreditCard, Gift } from 'lucide-react'

export function GivingSpotlightSection() {
  return (
    <section className="py-24 bg-[#FAF7F1] relative overflow-hidden border-t border-[#E6DDCA]">
      {/* Delicate tactile background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e6ddca_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Patch with Layered Stewardship Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden border border-[#E6DDCA] shadow-lg">
              <Image
                src="/images/sermons/sermon_prayer.jpg"
                alt="Worship and Giving at RLFCC"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/60 via-transparent to-transparent" />
            </div>

            {/* Floating Stewardship Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="sm:absolute -bottom-6 -right-6 mt-4 sm:mt-0 max-w-xs bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-[#E6DDCA] shadow-md"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center text-accent-dark">
                  <ShieldCheck className="w-5 h-5 text-accent-dark" />
                </div>
                <div>
                  <p className="text-xs font-bold text-accent-dark uppercase tracking-wider">501(c)(3) Ministry</p>
                  <p className="text-sm font-display font-semibold text-[#251827]">Tax-Deductible Giving</p>
                </div>
              </div>
              <p className="text-xs text-[#5C525C] leading-relaxed">
                All tithes and offerings directly support live worship services, prayer outreach, and community care.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Giving Message & Call to Action */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E6DDCA] text-accent-dark text-xs font-semibold tracking-wider uppercase mb-5 w-fit shadow-xs">
              <Heart className="w-3.5 h-3.5 text-accent fill-accent/20" />
              Stewardship &amp; Generosity
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight">
              Partner With Us in Spreading the Gospel
            </h2>

            <p className="text-base sm:text-lg text-[#5C525C] leading-relaxed mb-6">
              Your faithful support enables Restoring Life Family Community Center to minister every week through live worship, spirit-filled Bible study, and compassionate pastoral outreach.
            </p>

            {/* Scripture Quote Box */}
            <div className="p-6 rounded-2xl bg-white border border-[#E6DDCA] shadow-xs mb-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-accent" />
              <p className="text-base sm:text-lg text-[#251827] italic font-serif leading-relaxed">
                &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;
              </p>
              <p className="text-accent-dark text-xs font-bold mt-2 uppercase tracking-wider">
                — 2 Corinthians 9:7
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <Link
                href="/give"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent hover:bg-accent-dark text-white font-bold text-base shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Gift className="w-4 h-4" />
                Give Online Now
              </Link>
              <Link
                href="/give#ways-to-give"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-[#E6DDCA] bg-white hover:bg-[#FAF7F1] text-primary font-semibold text-base transition-colors duration-200"
              >
                Explore Ways to Give
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
