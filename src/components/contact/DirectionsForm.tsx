'use client'

import { useState, useCallback } from 'react'
import { Navigation, MapPin, ExternalLink } from 'lucide-react'

interface DirectionsFormProps {
  churchAddress: string
}

export function DirectionsForm({ churchAddress }: DirectionsFormProps) {
  const [fromAddress, setFromAddress] = useState('')

  const handleGetDirections = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!fromAddress.trim()) return

      const destination = encodeURIComponent(churchAddress)
      const origin = encodeURIComponent(fromAddress.trim())
      const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`
      window.open(url, '_blank', 'noopener,noreferrer')
    },
    [fromAddress, churchAddress]
  )

  return (
    <div className="mt-8 pt-8" style={{ borderTop: '1px solid #F4F0EA' }}>
      <div className="flex items-center gap-2 mb-4">
        <Navigation className="w-4 h-4 text-[#D4AF37]" />
        <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#592D31' }}>
          Get Directions
        </h4>
      </div>
      <form onSubmit={handleGetDirections} className="space-y-3">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89E9E]" />
          <input
            type="text"
            value={fromAddress}
            onChange={(e) => setFromAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37]"
            style={{ borderColor: '#E0D8D2', color: '#332D2D', backgroundColor: '#FAFAF8' }}
          />
        </div>
        <button
          type="submit"
          disabled={!fromAddress.trim()}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            backgroundColor: '#D4AF37',
            color: '#1A1A1A',
          }}
          onMouseEnter={(e) => {
            if (fromAddress.trim()) (e.target as HTMLButtonElement).style.backgroundColor = '#B8962E'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#D4AF37'
          }}
        >
          Open in Google Maps
          <ExternalLink className="w-4 h-4" />
        </button>
      </form>
      <p className="text-[11px] mt-2" style={{ color: '#A89E9E' }}>
        Opens Google Maps with turn-by-turn directions
      </p>
    </div>
  )
}
