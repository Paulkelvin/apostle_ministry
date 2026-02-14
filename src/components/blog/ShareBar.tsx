'use client'

import { Facebook, Twitter, Link as LinkIcon, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ShareBarProps {
  url: string
  title: string
}

export function ShareBar({ url, title }: ShareBarProps) {
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

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-medium text-[#968B89]">Share:</span>
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${link.label}`}
          className="w-9 h-9 rounded-full bg-[#FDFBF7] border border-[#DCCFC0]/50 flex items-center justify-center hover:border-[#6A3B3F] hover:text-[#6A3B3F] transition-all text-[#968B89]"
        >
          <link.icon className="w-4 h-4" />
        </a>
      ))}
      <button
        onClick={handleCopy}
        aria-label="Copy link"
        className="relative w-9 h-9 rounded-full bg-[#FDFBF7] border border-[#DCCFC0]/50 flex items-center justify-center hover:border-[#6A3B3F] hover:text-[#6A3B3F] transition-all text-[#968B89]"
      >
        <LinkIcon className="w-4 h-4" />
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: -8 }}
              exit={{ opacity: 0 }}
              className="absolute -top-6 text-xs font-medium text-[#6A3B3F] bg-[#E6D8C8] px-2 py-0.5 rounded whitespace-nowrap"
            >
              Copied!
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}
