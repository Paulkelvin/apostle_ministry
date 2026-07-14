'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Facebook, Instagram, Youtube } from 'lucide-react'
import { Button } from '@/components/ui'
import type { SocialLink } from '@/types'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/resources', label: 'Resources' },
  { href: '/give', label: 'Give' },
  { href: '/contact', label: 'Contact' },
]

// Pages that have a full-screen dark hero where the nav should start transparent
const darkHeroPages = ['/', '/about', '/sermons', '/resources']

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
}
const defaultSocialPlatforms = ['facebook', 'instagram', 'youtube']

interface NavbarProps {
  socialLinks?: SocialLink[]
}

function HamburgerIcon({ className = '' }: { className?: string }) {
  return (
    <span className={`flex flex-col items-center justify-center gap-[5px] ${className}`}>
      <span className="block w-5 h-[2px] rounded-full bg-current transition-all duration-300 group-hover:w-[22px]" />
      <span className="block w-[22px] h-[2px] rounded-full bg-current transition-all duration-300" />
      <span className="block w-5 h-[2px] rounded-full bg-current transition-all duration-300 group-hover:w-[22px]" />
    </span>
  )
}

export function Navbar({ socialLinks = [] }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const socialPlatforms = socialLinks.length > 0
    ? socialLinks.map((l) => ({ platform: l.platform, url: l.url }))
    : defaultSocialPlatforms.map((p) => ({ platform: p, url: '#' }))

  const hasDarkHero = darkHeroPages.includes(pathname)

  // On non-hero pages, navbar should always be solid
  const showSolid = isScrolled || !hasDarkHero

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out pt-[env(safe-area-inset-top)] ${
          showSolid
            ? 'bg-surface/95 backdrop-blur-md border-b border-warm-200/60'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px] min-h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <span
                className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
                  showSolid ? 'text-primary' : 'text-white'
                }`}
              >
                RL
                <span className="text-accent transition-colors duration-300">FCC</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      showSolid
                        ? isActive
                          ? 'text-primary bg-warm-100'
                          : 'text-ink hover:text-primary hover:bg-warm-100'
                        : isActive
                          ? 'text-white bg-white/10'
                          : 'text-white/85 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`group md:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                showSolid ? 'text-primary hover:bg-warm-100' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <HamburgerIcon />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-primary-deep z-50 shadow-2xl border-l border-white/10 rounded-l-2xl overflow-hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
            >
              <div className="flex flex-col h-full p-6 pt-[calc(1.5rem+env(safe-area-inset-top))]">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-lg font-semibold text-white">
                      Menu
                    </span>
                    <div className="h-px w-10 bg-accent/40 mt-3" aria-hidden="true" />
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                    aria-label="Close mobile menu"
                  >
                    <X className="w-5 h-5 text-white/80" />
                  </button>
                </div>

                <div className="flex flex-col">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + index * 0.04, duration: 0.3 }}
                      >
                        <Link
                          href={link.href}
                          className="relative flex items-center gap-3 py-3 group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span
                            className={`w-0.5 h-5 rounded-full bg-accent transition-opacity duration-200 ${
                              isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                            }`}
                          />
                          <span
                            className={`font-display text-2xl transition-colors duration-200 ${
                              isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                            }`}
                          >
                            {link.label}
                          </span>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="mt-auto pt-8 border-t border-white/10">
                  <Button
                    href="/contact#directions"
                    variant="gold"
                    size="md"
                    className="w-full mb-6"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Plan Your Visit
                  </Button>
                  <div className="flex items-center gap-3">
                    {socialPlatforms.map(({ platform, url }) => {
                      const Icon = socialIcons[platform]
                      if (!Icon) return null
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                          aria-label={`Follow us on ${platform}`}
                        >
                          <Icon className="w-4 h-4 text-white/80" />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

