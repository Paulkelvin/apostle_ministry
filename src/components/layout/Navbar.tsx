'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/blog', label: 'Blog' },
  { href: '/give', label: 'Give' },
  { href: '/contact', label: 'Contact' },
]

// Pages that have a full-screen dark hero where the nav should start transparent
const darkHeroPages = ['/', '/give', '/about', '/sermons', '/blog']

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          showSolid
            ? 'bg-[#FCFBF9]/95 backdrop-blur-md shadow-sm'
            : 'bg-gradient-to-b from-black/30 to-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <span
                className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
                  showSolid ? 'text-[#592D31]' : 'text-white'
                }`}
                style={!showSolid ? { color: '#FFFFFF' } : undefined}
              >
                The Apostles{' '}
                <span
                  className={`${showSolid ? 'text-primary' : ''} transition-colors duration-300`}
                  style={!showSolid ? { color: '#D4AF37' } : undefined}
                >
                  Ministry
                </span>
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
                          ? 'text-[#592D31] bg-[#F4F0EA]'
                          : 'text-[#332D2D] hover:text-[#592D31] hover:bg-[#F4F0EA]'
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
              className={`md:hidden p-2 rounded-lg transition-colors ${
                showSolid ? 'text-[#592D31] hover:bg-[#F4F0EA]' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
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
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-10">
                  <span className="text-xl font-bold text-[#592D31]">
                    Menu
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-[#F4F0EA] transition-colors"
                    aria-label="Close mobile menu"
                  >
                    <X className="w-5 h-5 text-[#8A8080]" />
                  </button>
                </div>
                <div className="flex flex-col space-y-1">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`text-base font-medium py-3 px-4 rounded-lg transition-all ${
                          isActive
                            ? 'text-[#592D31] bg-[#F4F0EA]'
                            : 'text-[#332D2D] hover:text-[#592D31] hover:bg-[#F4F0EA]'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
