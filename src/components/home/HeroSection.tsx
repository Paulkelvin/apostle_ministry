'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui'
import type { SiteSettings } from '@/types'

interface HeroSectionProps {
  settings?: SiteSettings | null
}

export function HeroSection({ settings }: HeroSectionProps) {
  const title = settings?.heroTitle || 'Welcome Home'
  const subtitle = settings?.heroSubtitle || 'A place where everyone belongs'
  const videoUrl = settings?.heroVideoFileUrl || settings?.heroVideo
  const watchOnlineUrl = settings?.watchOnlineUrl

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      {videoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-warm-900" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <Button href="/contact" variant="white" size="lg">
            Plan Your Visit
          </Button>
          <Button
            href={watchOnlineUrl || '/sermons'}
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-warm-900"
          >
            Watch Online
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
