'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui'
import { SanityImageComponent } from '@/components/ui'
import type { SiteSettings } from '@/types'

interface HeroSectionProps {
  settings?: SiteSettings | null
}

export function HeroSection({ settings }: HeroSectionProps) {
  const title = settings?.heroTitle || 'Welcome Home'
  const subtitle = settings?.heroSubtitle || 'A place where everyone belongs'
  // Build video URL from uploaded file asset ref, or fall back to external URL
  let videoUrl = settings?.heroVideo
  if (settings?.heroVideoFile?.asset?._ref) {
    // Asset ref format: file-{id}-{ext}
    const ref = settings.heroVideoFile.asset._ref
    const [, id, ext] = ref.match(/^file-(.+)-(\w+)$/) || []
    if (id && ext) {
      videoUrl = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'j2qt3gmh'}/${process.env.NEXT_PUBLIC_SANITY_DATASET || 'rlfcc'}/${id}.${ext}`
    }
  }
  const watchOnlineUrl = settings?.watchOnlineUrl

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background: Video > Image > Gradient */}
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
      ) : settings?.heroImage ? (
        <div className="absolute inset-0">
          <SanityImageComponent
            image={settings.heroImage}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-warm-900" />
      )}

      {/* Directional scrim — softer, luminous ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/65 to-primary-ink/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-light/25 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        {/* Floating pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-accent-light text-xs font-semibold tracking-wider uppercase mb-7 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Virtual Ministry · Worship & Fellowship Online
        </motion.div>

        <motion.h1
          className="text-hero text-white mb-6 drop-shadow-sm font-display tracking-tight"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3.5 justify-center w-full sm:w-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
        >
          <Button href="#service-times" variant="gold" size="lg" className="px-8 shadow-md">
            Join Us This Sunday
          </Button>
          <Button href={watchOnlineUrl || '/sermons'} variant="inverse" size="lg" className="px-8">
            Watch Sermons
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
