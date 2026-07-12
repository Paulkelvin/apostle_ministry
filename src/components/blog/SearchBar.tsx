'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div
      className={`relative flex items-center transition-all duration-200 rounded-xl border ${
        focused
          ? 'border-primary ring-2 ring-primary/10 bg-white'
          : 'border-warm-200 bg-white hover:border-accent'
      }`}
    >
      <Search className="absolute left-4 w-4 h-4 text-warm-500 pointer-events-none" />
      <input
        type="text"
        placeholder="Search articles..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full py-3 pl-11 pr-10 bg-transparent text-sm text-ink placeholder-warm-500 outline-none rounded-xl"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 p-1 rounded-full hover:bg-warm-100 transition-colors"
        >
          <X className="w-3.5 h-3.5 text-warm-500" />
        </button>
      )}
    </div>
  )
}
