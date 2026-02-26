'use client'

import { motion } from 'framer-motion'

/**
 * Subtle animated soft-light particles — evokes warmth, divinity.
 * Place behind hero or section backgrounds for gentle ambiance.
 * Inspired by candlelight flicker / stained-glass glow.
 */

interface GlowParticle {
  id: number
  x: string
  y: string
  size: number
  color: string
  delay: number
  duration: number
}

const particles: GlowParticle[] = [
  { id: 1, x: '15%', y: '20%', size: 6, color: 'rgba(212,175,55,0.35)', delay: 0, duration: 4.5 },
  { id: 2, x: '80%', y: '15%', size: 8, color: 'rgba(212,175,55,0.25)', delay: 1.2, duration: 5.0 },
  { id: 3, x: '45%', y: '70%', size: 5, color: 'rgba(255,255,255,0.2)', delay: 0.6, duration: 3.8 },
  { id: 4, x: '70%', y: '55%', size: 7, color: 'rgba(212,175,55,0.3)', delay: 2.0, duration: 4.2 },
  { id: 5, x: '25%', y: '80%', size: 4, color: 'rgba(255,255,255,0.15)', delay: 1.5, duration: 5.5 },
  { id: 6, x: '90%', y: '40%', size: 5, color: 'rgba(212,175,55,0.2)', delay: 0.8, duration: 4.0 },
  { id: 7, x: '55%', y: '25%', size: 6, color: 'rgba(255,255,255,0.18)', delay: 2.5, duration: 4.8 },
  { id: 8, x: '10%', y: '50%', size: 4, color: 'rgba(212,175,55,0.22)', delay: 3.0, duration: 5.2 },
]

export function AmbientGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.size * 2}px ${p.color}`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/**
 * Gentle floating cross accents — very subtle, barely visible.
 * Use on dark sections for a spiritual aesthetic touch.
 */
const crossElements = [
  { id: 1, x: '8%', y: '30%', size: 16, opacity: 0.06, delay: 0, duration: 8 },
  { id: 2, x: '85%', y: '20%', size: 20, opacity: 0.05, delay: 2, duration: 10 },
  { id: 3, x: '60%', y: '75%', size: 14, opacity: 0.04, delay: 4, duration: 9 },
]

export function FloatingCrosses() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {crossElements.map((c) => (
        <motion.div
          key={c.id}
          className="absolute"
          style={{ left: c.x, top: c.y }}
          animate={{
            y: [-8, 8, -8],
            opacity: [c.opacity * 0.5, c.opacity, c.opacity * 0.5],
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Simple cross shape */}
          <div className="relative" style={{ width: c.size, height: c.size * 1.4 }}>
            <div
              className="absolute rounded-full"
              style={{
                left: '50%',
                top: 0,
                transform: 'translateX(-50%)',
                width: c.size * 0.18,
                height: c.size * 1.4,
                backgroundColor: '#D4AF37',
                opacity: c.opacity / 0.06,
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                top: c.size * 0.3,
                left: 0,
                width: c.size,
                height: c.size * 0.18,
                backgroundColor: '#D4AF37',
                opacity: c.opacity / 0.06,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
