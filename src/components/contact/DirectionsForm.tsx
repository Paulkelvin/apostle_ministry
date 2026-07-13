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
    <div className="mt-8 pt-8 border-t border-warm-100">
      <div className="flex items-center gap-2 mb-4">
        <Navigation className="w-4 h-4 text-accent-dark" />
        <h4 className="text-sm font-bold uppercase tracking-wider text-primary">
          Get Directions
        </h4>
      </div>
      <form onSubmit={handleGetDirections} className="space-y-3">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
          <input
            type="text"
            value={fromAddress}
            onChange={(e) => setFromAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full pl-10 pr-4 py-3 rounded-lg text-sm border border-warm-200 bg-surface text-ink transition-colors focus:outline-none focus:border-primary"
          />
        </div>
        <button
          type="submit"
          disabled={!fromAddress.trim()}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg text-sm font-semibold bg-accent text-warm-900 hover:bg-accent-dark transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Open in Google Maps
          <ExternalLink className="w-4 h-4" />
        </button>
      </form>
      <p className="text-[11px] mt-2 text-warm-400">
        Opens Google Maps with turn-by-turn directions
      </p>
    </div>
  )
}
