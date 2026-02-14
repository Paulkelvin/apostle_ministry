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
  const displayName = siteName || 'The Apostles Ministry'
  const displayTagline = siteTagline || 'A place where everyone belongs.'
  const displayPhone = phone || '(202) 503-9579'
  const displayEmail = email || 'admin@rflcc.org'
  const addressLines = (address || "High Calling Ministries\n401-A Prince George's Blvd\nUpper Marlboro, MD 20774").split('\n')

  return (
    <footer data-footer className="bg-[#382022] text-[#F0E6D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand & Social */}
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#F0E6D8' }}>
              {displayName}
            </h3>
            <p className="mb-6" style={{ color: '#CDBFBA' }}>
              {displayTagline}
            </p>
            <div className="flex space-x-4">
              {(socialLinks || []).map((link) => {
                const Icon = socialIcons[link.platform]
                if (!Icon) return null
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#4A3A38] flex items-center justify-center hover:bg-[#6A3B3F] hover:text-white transition-colors"
                    aria-label={`Follow us on ${link.platform}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#F0E6D8' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:!text-[#C59853]"
                    style={{ color: '#CDBFBA' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#F0E6D8' }}>
              Contact Us
            </h4>
            <address className="not-italic space-y-2" style={{ color: '#CDBFBA' }}>
              {addressLines.map((line, i) => (
                <p key={i} style={{ color: '#CDBFBA' }}>{line}</p>
              ))}
              <p className="mt-4" style={{ color: '#CDBFBA' }}>
                <a
                  href={`tel:${displayPhone.replace(/[^+\d]/g, '')}`}
                  className="transition-colors hover:!text-[#C59853]"
                  style={{ color: '#CDBFBA' }}
                >
                  {displayPhone}
                </a>
              </p>
              <p style={{ color: '#CDBFBA' }}>
                <a
                  href={`mailto:${displayEmail}`}
                  className="transition-colors hover:!text-[#C59853]"
                  style={{ color: '#CDBFBA' }}
                >
                  {displayEmail}
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#4A3A38]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="legal text-sm text-center md:text-left" style={{ color: '#968B89' }}>
              {statement501c3 ||
                'The Apostles Ministry is a 501(c)(3) nonprofit organization. All donations are tax-deductible.'}
            </p>
            <p className="legal text-sm" style={{ color: '#968B89' }}>
              © {currentYear} {displayName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
