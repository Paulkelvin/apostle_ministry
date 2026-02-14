'use client'

import { useEffect } from 'react'
import { Heart } from 'lucide-react'

interface TithelyButtonProps {
  churchId?: string
  className?: string
  label?: string
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    create_tithely_widget?: () => void
  }
}

export function TithelyButton({
  churchId,
  className = '',
  label = 'Give Now',
}: TithelyButtonProps) {
  const cid = churchId || process.env.NEXT_PUBLIC_TITHELY_CHURCH_ID || 'your-church-id'

  useEffect(() => {
    // Load Tithe.ly script if not already loaded
    if (!document.querySelector('script[src*="tithe.ly"]')) {
      const script = document.createElement('script')
      script.src = 'https://tithe.ly/widget/v3/give.js?3'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  return (
    <button
      className={`tithely-give-btn inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${className}`}
      data-church-id={cid}
    >
      <Heart className="w-5 h-5" />
      {label}
    </button>
  )
}
