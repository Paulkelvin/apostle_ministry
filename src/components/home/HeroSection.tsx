'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui'
import { SanityImageComponent } from '@/components/ui'
import { Video, Calendar, Sparkles, Heart } from 'lucide-react'
import type { SiteSettings } from '@/types'

interface HeroSectionProps {
  settings?: SiteSettings | null
}

export function HeroSection({ settings }: HeroSectionProps) {
  const title = settings?.heroTitle || 'Welcome Home'
  const subtitle = settings?.heroSubtitle || 'A place where everyone belongs'
  const isDefaultTitle = !settings?.heroTitle || settings.heroTitle === 'Welcome Home'

  // Check if a new custom image was uploaded via CMS (excluding legacy template asset)
  const isCustomCmsImage =
    settings?.heroImage?.asset?._ref &&
    settings.heroImage.asset._ref !== 'image-cae6eaecd222aa5e4ed0fa40c1d51b7e7ee60a98-1920x1080-png'

  return (
    <section className="relative min-h-[94vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image: Curated warm aesthetic hero banner or CMS image */}
      <div className="absolute inset-0">
        {settings?.heroImage && isCustomCmsImage ? (
          <SanityImageComponent
            image={settings.heroImage}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-[1.01] transition-transform duration-1000"
          />
        ) : (
          <Image
            src="/images/hero-banner.jpg"
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-[1.01] transition-transform duration-1000"
          />
        )}
      </div>

      {/* Directional scrim — softer, luminous ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/65 to-primary-ink/45" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center pt-24 pb-20">
        {/* Floating Sacred Crest Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-accent/40 text-accent-light text-xs font-semibold tracking-wider uppercase mb-7 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>Restoring Life Family Community Center</span>
        </motion.div>

        {/* Distinctive Editorial Heading */}
        <motion.h1
          className="text-hero text-white mb-6 drop-shadow-sm font-display tracking-tight text-4xl sm:text-6xl lg:text-7xl leading-[1.08]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          {isDefaultTitle ? (
            <>
              Where Lives Are <span className="italic font-serif text-accent-light">Restored</span>
              <br />
              <span className="text-white/95 font-normal">&amp; Faith Comes Alive.</span>
            </>
          ) : (
            title
          )}
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-8 leading-relaxed font-normal"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          {subtitle}
        </motion.p>

        {/* Live Service Ribbon Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs sm:text-sm font-medium mb-10"
        >
          <span className="flex items-center gap-1.5 text-accent-light font-semibold">
            <Video className="w-4 h-4 text-accent" />
            Live Sunday Worship
          </span>
          <span className="text-white/40">&bull;</span>
          <span>4:00 PM via Zoom</span>
          <span className="text-white/40">&bull;</span>
          <span className="text-white/80">Thursday Bible Study 7:30 PM</span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
        >
          <Button href="#service-times" variant="gold" size="lg" className="px-8 shadow-md font-bold">
            Join Us This Sunday
          </Button>
          <Button href="/sermons" variant="inverse" size="lg" className="px-8">
            Explore Messages
          </Button>
        </motion.div>

        {/* 3 Pillars Micro-Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-white/70 uppercase tracking-widest font-semibold"
        >
          <span className="flex items-center gap-1.5">
            <span className="text-accent">✦</span> Biblical Teaching
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-accent">✦</span> Agape Love
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-accent">✦</span> Authentic Fellowship
          </span>
        </motion.div>
      </div>

      {/* Sanctuary Arch Transition Mask into Content */}
      <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-14 bg-[#FAF8F5] [clip-path:ellipse(65%_100%_at_50%_100%)] pointer-events-none" />
    </section>
  )
}
