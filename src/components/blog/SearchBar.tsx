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
          ? 'border-[#6A3B3F] ring-2 ring-[#6A3B3F]/10 bg-white'
          : 'border-[#DCCFC0] bg-[#FDFBF7] hover:border-[#C59853]'
      }`}
    >
      <Search className="absolute left-4 w-4 h-4 text-[#968B89] pointer-events-none" />
      <input
        type="text"
        placeholder="Search articles..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full py-3 pl-11 pr-10 bg-transparent text-sm text-[#292121] placeholder-[#968B89] outline-none rounded-xl"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 p-1 rounded-full hover:bg-[#E6D8C8] transition-colors"
        >
          <X className="w-3.5 h-3.5 text-[#968B89]" />
        </button>
      )}
    </div>
  )
}
