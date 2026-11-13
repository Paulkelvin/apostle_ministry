import Link from 'next/link'
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react'
import type { SocialLink } from '@/types'

interface FooterProps {
  socialLinks?: SocialLink[]
  statement501c3?: string
  siteName?: string
  siteTagline?: string
  address?: string
  locationName?: string
  phone?: string
  email?: string
}

const quickLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/events', label: 'Events' },
  { href: '/sermons', label: 'Messages' },
  { href: '/give', label: 'Give' },
  { href: '/contact', label: 'Contact' },
]

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  tiktok: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
  linkedin: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
}

export function Footer({ socialLinks = [], statement501c3, siteName, siteTagline, address, phone, email }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const displayName = siteName || 'Restoring Life Family Community Center'
  const displayTagline = siteTagline || 'A place where everyone belongs.'
  const displayPhone = phone || '(202) 503-9579'
  const displayEmail = email || 'admin@rlfcc.org'
  const addressLines = (address || "6916 Hillmeade Road\nGlenn Dale, MD 20769").split('\n')

  return (
    <footer className="relative bg-gradient-to-b from-primary-deep via-primary-deep to-primary-ink border-t border-white/[0.08] overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-primary-light/5 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand & Social */}
          <div>
            <div className="h-1 w-12 bg-accent rounded-full mb-6" aria-hidden="true" />
            <h3 className="text-2xl font-bold font-display text-white mb-3">
              {displayName}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-sm">
              {displayTagline}
            </p>
            <div className="flex space-x-3">
              {(socialLinks || []).map((link) => {
                const Icon = socialIcons[link.platform]
                if (!Icon) return null
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/[0.07] border border-white/10 text-white/80 flex items-center justify-center hover:bg-accent hover:text-warm-900 hover:border-accent transition-all duration-200"
                    aria-label={`Follow us on ${link.platform}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold font-display text-white mb-4 uppercase tracking-wider text-xs text-accent">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-accent transition-colors flex items-center gap-1.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-semibold font-display text-white mb-4 uppercase tracking-wider text-xs text-accent">
              Connect
            </h4>
            <address className="not-italic space-y-2 text-sm text-white/70 leading-relaxed">
              {addressLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              <div className="pt-2 space-y-1">
                <p>
                  <a
                    href={`tel:${displayPhone.replace(/[^+\d]/g, '')}`}
                    className="text-white/85 hover:text-accent transition-colors font-medium"
                  >
                    {displayPhone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${displayEmail}`}
                    className="text-white/85 hover:text-accent transition-colors font-medium"
                  >
                    {displayEmail}
                  </a>
                </p>
              </div>
            </address>
          </div>
        </div>

        {statement501c3 && (
          <div className="mt-12 pt-8 border-t border-white/[0.08]">
            <p className="text-xs text-white/50 text-center max-w-2xl mx-auto leading-relaxed">
              {statement501c3}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.08] bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-xs text-white/50 text-center sm:text-left">
              © {currentYear} {displayName}. All rights reserved.
            </p>
            <p className="text-xs text-accent/80 font-medium">
              Sunday 4:00 PM · Thursday 7:30 PM (Zoom)
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

