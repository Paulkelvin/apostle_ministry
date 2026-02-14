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
            ? 'bg-[#6A3B3F] text-white border-[#6A3B3F] shadow-sm'
            : 'bg-[#FDFBF7] text-[#665A58] border-[#DCCFC0] hover:border-[#6A3B3F] hover:text-[#6A3B3F]'
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
              : 'bg-[#FDFBF7] text-[#665A58] border-[#DCCFC0] hover:border-[#6A3B3F] hover:text-[#6A3B3F]'
          }`}
          style={
            active === cat.slug.current
              ? { backgroundColor: cat.color || '#6A3B3F', borderColor: cat.color || '#6A3B3F' }
              : undefined
          }
        >
          {cat.title}
        </motion.button>
      ))}
    </div>
  )
}
