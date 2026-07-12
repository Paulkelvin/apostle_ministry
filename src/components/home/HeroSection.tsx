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

      {/* Directional scrim — darker at the base, tinted toward the brand ink */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-ink/80 via-black/40 to-black/25" />
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.h1
          className="font-display font-semibold text-5xl md:text-7xl lg:text-8xl text-white mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-9"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <Button href="/contact#directions" variant="gold" size="md" className="px-9">
            Plan Your Visit
          </Button>
          <Button href={watchOnlineUrl || '/sermons'} variant="inverse" size="md" className="px-9">
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
