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
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer ${
          active === null
            ? 'bg-[#5B2D91] text-white border-[#5B2D91] shadow-sm'
            : 'bg-[#FFFFFF] text-[#332D2D] border-[#E0D8D2] hover:border-[#5B2D91] hover:text-[#5B2D91]'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <motion.button
          key={cat._id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(cat.slug.current)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer ${
            active === cat.slug.current
              ? 'text-white shadow-sm'
              : 'bg-[#FFFFFF] text-[#332D2D] border-[#E0D8D2] hover:border-[#5B2D91] hover:text-[#5B2D91]'
          }`}
          style={
            active === cat.slug.current
              ? { backgroundColor: cat.color || '#5B2D91', borderColor: cat.color || '#5B2D91' }
              : undefined
          }
        >
          {cat.title}
        </motion.button>
      ))}
    </div>
  )
}
