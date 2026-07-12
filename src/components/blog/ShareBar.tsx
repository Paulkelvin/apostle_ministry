'use client'

import { Facebook, Twitter, Link as LinkIcon, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ShareBarProps {
  url: string
  title: string
  variant?: 'default' | 'hero'
}

export function ShareBar({ url, title, variant = 'default' }: ShareBarProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    {
      label: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: '#1877F2',
    },
    {
      label: 'X / Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: '#1DA1F2',
    },
    {
      label: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: '#25D366',
    },
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  const isHero = variant === 'hero'
  const btnClass = isHero
    ? 'w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all text-warm-200'
    : 'w-9 h-9 rounded-full bg-white border border-warm-200/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all text-warm-500'

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {!isHero && <span className="text-sm font-medium text-warm-500">Share:</span>}
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${link.label}`}
          className={btnClass}
        >
          <link.icon className="w-4 h-4" />
        </a>
      ))}
      <button
        onClick={handleCopy}
        aria-label="Copy link"
        className={`relative ${btnClass}`}
      >
        <LinkIcon className="w-4 h-4" />
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: -8 }}
              exit={{ opacity: 0 }}
              className="absolute -top-6 text-xs font-medium text-primary bg-warm-100 px-2 py-0.5 rounded whitespace-nowrap"
            >
              Copied!
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}
