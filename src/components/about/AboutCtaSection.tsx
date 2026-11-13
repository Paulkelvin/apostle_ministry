'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Calendar, MessageSquare, ArrowRight } from 'lucide-react'

export function AboutCtaSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-primary-deep via-primary-deep to-primary-ink relative overflow-hidden text-white">
      {/* Luminous ambient gold & plum lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary-light/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-accent/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Subtle tactile dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-accent text-xs font-semibold tracking-wider uppercase mb-6 shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-accent/30" />
            You Belong Here
          </span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            There is a Seat Saved for You in Our Church Family
          </h2>

          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
            No matter where you are in your spiritual journey, you are welcomed, valued, and loved at Restoring Life Family Community Center.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/events"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent hover:bg-accent-dark text-white font-bold text-base shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Calendar className="w-4 h-4" />
              Join Sunday Worship
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-base backdrop-blur-xs transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              Request Prayer / Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
