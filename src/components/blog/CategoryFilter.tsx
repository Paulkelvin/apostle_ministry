'use client'

import { motion } from 'framer-motion'
import type { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  active: string | null
  onSelect: (slug: string | null) => void
}

export function CategoryFilter({ categories, active, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border cursor-pointer ${
          active === null
            ? 'bg-primary text-white border-primary shadow-sm'
            : 'bg-white text-ink border-warm-200 hover:border-primary hover:text-primary'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <motion.button
          key={cat._id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(cat.slug.current)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border cursor-pointer ${
            active === cat.slug.current
              ? 'text-white shadow-sm'
              : 'bg-white text-ink border-warm-200 hover:border-primary hover:text-primary'
          }`}
          style={
            active === cat.slug.current
              ? { backgroundColor: cat.color || 'var(--color-primary)', borderColor: cat.color || 'var(--color-primary)' }
              : undefined
          }
        >
          {cat.title}
        </motion.button>
      ))}
    </div>
  )
}
