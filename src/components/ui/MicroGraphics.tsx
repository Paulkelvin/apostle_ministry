'use client'

import { motion } from 'framer-motion'

export function FloatingRing({ className = '', color = "#D4AF37", size = 40, delay = 0 }) {
  return (
    <motion.div
      className={`absolute pointer-events-none z-0 ${className}`}
      initial={{ y: 0, opacity: 0.5 }}
      animate={{ 
        y: [0, -15, 0],
        opacity: [0.3, 0.7, 0.3]
      }}
      transition={{ 
        duration: 5, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" stroke={color} strokeWidth="4" strokeOpacity="0.5"/>
      </svg>
    </motion.div>
  )
}

export function SubtleSparkle({ className = '', color = "#D4AF37", size = 30, delay = 0 }) {
  return (
    <motion.div
      className={`absolute pointer-events-none z-0 ${className}`}
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 90, 180],
        opacity: [0.3, 0.8, 0.3]
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        ease: "linear",
        delay 
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill={color} fillOpacity="0.4"/>
      </svg>
    </motion.div>
  )
}

export function DottedSquare({ className = '', color = "#5B2D91", delay = 0 }) {
  return (
    <motion.div
      className={`absolute pointer-events-none z-0 opacity-20 ${className}`}
      animate={{ 
        y: [0, 8, 0]
      }}
      transition={{ 
        duration: 6, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
    >
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle fill={color} cx="2" cy="2" r="2"></circle>
        </pattern>
        <rect x="0" y="0" width="60" height="60" fill="url(#dots)"></rect>
      </svg>
    </motion.div>
  )
}

export function FloatingCross({ className = '', color = "#CBA052", size = 40, delay = 0 }) {
  return (
    <motion.div
      className={`absolute pointer-events-none z-0 ${className}`}
      animate={{ 
        y: [0, -10, 0],
        opacity: [0.15, 0.5, 0.15]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
    >
      <svg width={size} height={size * 1.4} viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0H14V10H24V14H14V34H10V14H0V10H10V0Z" fill={color} fillOpacity="0.3"/>
      </svg>
    </motion.div>
  )
}

export function WaveLine({ className = '', color = "#D4AF37", delay = 0 }) {
  return (
    <motion.div
      className={`absolute pointer-events-none z-0 ${className}`}
      initial={{ opacity: 0.3 }}
      animate={{ 
        x: [0, -10, 0],
        opacity: [0.2, 0.5, 0.2]
      }}
      transition={{ 
        duration: 7, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
    >
      <svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10 Q 15 0 30 10 T 60 10 T 90 10 T 120 10" stroke={color} strokeWidth="2" fill="none" strokeOpacity="0.4"/>
      </svg>
    </motion.div>
  )
}
