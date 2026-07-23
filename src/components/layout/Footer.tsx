import Link from 'next/link'
import { Facebook, Instagram, Youtube, Twitter, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui'
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
  { href: '/sermons', label: 'Sermons' },
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
  const displayEmail = email || 'admin@rflcc.org'
  const addressLines = (address || "High Calling Ministries\n401-A Prince George's Blvd\nUpper Marlboro, MD 20774").split('\n')

  return (
    <footer className="bg-background px-4 sm:px-6 lg:px-8 pb-6 lg:pb-10">
      <div className="max-w-7xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-secondary via-white to-accent-light/25 shadow-[--shadow-card-hover]">
        {/* CTA banner */}
        <div className="text-center px-6 sm:px-12 pt-14 pb-10 sm:pt-20 sm:pb-14">
          <p className="text-accent-dark text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Join Us
          </p>
          <h2 className="text-h2 text-primary mb-4">
            Ready to Find Your Place With Us?
          </h2>
          <p className="text-warm-600 max-w-xl mx-auto mb-8">
            From Sunday worship to everyday community, there&apos;s a seat saved for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/contact#directions" variant="primary" size="md">
              Plan Your Visit
            </Button>
            <Button href="/give" variant="outline" size="md" className="bg-white/70 backdrop-blur-sm">
              Give Now
            </Button>
          </div>
        </div>

        {/* Nested footer panel */}
        <div className="mx-3 sm:mx-6">
          <div className="rounded-[1.5rem] bg-white/70 backdrop-blur-sm px-6 sm:px-10 py-10 sm:py-12">
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-10 md:gap-8">
              {/* Brand & Social */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {displayName}
                </h3>
                <p className="text-warm-600 text-sm mb-6">
                  {displayTagline}
                </p>
                <div className="flex flex-wrap gap-3">
                  {(socialLinks || []).map((link) => {
                    const Icon = socialIcons[link.platform]
                    if (!Icon) return null
                    return (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-primary/5 border border-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
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
                <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-warm-500 mb-4">
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-warm-500 mb-4">
                  Visit Us
                </h4>
                <address className="not-italic space-y-3 text-sm text-ink">
                  <div className="flex gap-2.5">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      {addressLines.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                  <a
                    href={`tel:${displayPhone.replace(/[^+\d]/g, '')}`}
                    className="flex items-center gap-2.5 hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    {displayPhone}
                  </a>
                  <a
                    href={`mailto:${displayEmail}`}
                    className="flex items-center gap-2.5 hover:text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    {displayEmail}
                  </a>
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="px-6 sm:px-10 py-6 text-center">
          <p className="text-xs text-warm-500">
            © {currentYear} {displayName}. All rights reserved.
            {statement501c3 && (
              <span className="block sm:inline sm:before:content-['_·_']">{statement501c3}</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  )
}

