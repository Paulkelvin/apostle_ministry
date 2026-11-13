'use client'

import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import {
  X,
  Calendar,
  BookOpen,
  User,
  Share2,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SanityImageComponent } from '@/components/ui'
import type { Sermon } from '@/types'

interface SermonDetailModalProps {
  sermon: Sermon | null
  onClose: () => void
}

export function SermonDetailModal({ sermon, onClose }: SermonDetailModalProps) {
  const [copied, setCopied] = useState(false)

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (sermon) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEsc)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [sermon, handleEsc])

  if (!sermon) return null

  const date = sermon.date ? new Date(sermon.date) : new Date()

  const handleShare = async () => {
    const text = `${sermon.title} — ${sermon.scripture ? `(${sermon.scripture}) ` : ''}Restoring Life Family Community Center`
    if (navigator.share) {
      try {
        await navigator.share({
          title: sermon.title,
          text: sermon.description || text,
          url: window.location.href,
        })
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(`${text}\n${window.location.href}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleCopyNotes = async () => {
    const text = `Title: ${sermon.title}\nScripture: ${sermon.scripture || 'N/A'}\nSeries: ${sermon.series || 'N/A'}\n\nReflection:\n${sermon.description || ''}`
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-warm-900/60 backdrop-blur-sm" />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-warm-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Banner */}
          <div className="relative aspect-[16/7] w-full overflow-hidden bg-primary-deep shrink-0">
            {sermon.thumbnail ? (
              <SanityImageComponent
                image={sermon.thumbnail}
                alt={sermon.title}
                fill
                className="object-cover"
              />
            ) : (
              <Image
                src="/images/events/bible-study.jpg"
                alt="Bible study background"
                fill
                className="object-cover opacity-60"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/50 to-transparent" />

            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
              {sermon.series && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  {sermon.series}
                </span>
              )}
              <span className="text-white/80 text-xs font-medium bg-black/30 px-3 py-1 rounded-full">
                {format(date, 'MMMM d, yyyy')}
              </span>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-warm-900 leading-tight">
                {sermon.title}
              </h2>

              {sermon.speaker && (
                <div className="flex items-center gap-2 mt-2 text-warm-600 text-sm">
                  <User className="w-4 h-4 text-accent-dark" />
                  <span className="font-semibold text-warm-800">{sermon.speaker.name}</span>
                </div>
              )}
            </div>

            {/* Scripture Pill / Box */}
            {sermon.scripture && (
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-primary block">
                    Scripture Anchor
                  </span>
                  <p className="text-base font-semibold text-warm-900 mt-0.5">
                    {sermon.scripture}
                  </p>
                </div>
              </div>
            )}

            {/* Description / Summary */}
            {sermon.description && (
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider font-bold text-warm-500">
                  Message Overview
                </h4>
                <p className="text-warm-700 leading-relaxed text-base">
                  {sermon.description}
                </p>
              </div>
            )}

            {/* Live Gathering Invitation Card */}
            <div className="p-5 rounded-xl bg-warm-100 border border-warm-200/80 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-warm-700">
                  Hear Our Messages Live
                </span>
              </div>
              <p className="text-sm text-warm-600 leading-relaxed">
                We gather live online every Sunday at 4:00 PM via Zoom. Join our interactive service for worship, fellowship, and the living Word of God.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="/events"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-warm-900 font-bold text-sm hover:bg-accent-dark transition-colors shadow-sm"
                >
                  Join Us This Sunday · 4:00 PM
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleCopyNotes}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-warm-200 text-warm-800 font-semibold text-sm hover:bg-warm-50 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied to Clipboard' : 'Copy Message Notes'}
                </button>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-warm-200 text-warm-800 font-semibold text-sm hover:bg-warm-50 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
