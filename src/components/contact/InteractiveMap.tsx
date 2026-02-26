'use client'

import { useState, useCallback } from 'react'
import { Navigation, MapPin, RotateCcw } from 'lucide-react'

interface InteractiveMapProps {
  churchAddress: string
  initialMapSrc?: string
}

export function InteractiveMap({ churchAddress, initialMapSrc }: InteractiveMapProps) {
  const [fromAddress, setFromAddress] = useState('')
  const [showingDirections, setShowingDirections] = useState(false)
  const [mapSrc, setMapSrc] = useState(
    initialMapSrc ||
      `https://www.google.com/maps?q=${encodeURIComponent(churchAddress)}&output=embed`
  )

  const handleShowDirections = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!fromAddress.trim()) return

      // Generate directions embed URL
      const origin = encodeURIComponent(fromAddress.trim())
      const destination = encodeURIComponent(churchAddress)
      const directionsUrl = `https://www.google.com/maps?saddr=${origin}&daddr=${destination}&output=embed`

      setMapSrc(directionsUrl)
      setShowingDirections(true)
    },
    [fromAddress, churchAddress]
  )

  const handleReset = useCallback(() => {
    setFromAddress('')
    setShowingDirections(false)
    setMapSrc(
      initialMapSrc ||
        `https://www.google.com/maps?q=${encodeURIComponent(churchAddress)}&output=embed`
    )
  }, [churchAddress, initialMapSrc])

  return (
    <div className="space-y-4">
      {/* Directions Input Form */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F4F0EA]">
        <div className="flex items-center gap-2 mb-3">
          <Navigation className="w-4 h-4 text-[#D4AF37]" />
          <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#592D31' }}>
            Get Directions
          </h4>
          {showingDirections && (
            <button
              onClick={handleReset}
              className="ml-auto text-xs flex items-center gap-1 text-[#8A8080] hover:text-[#592D31] transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>

        <form onSubmit={handleShowDirections} className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89E9E]" />
            <input
              type="text"
              value={fromAddress}
              onChange={(e) => setFromAddress(e.target.value)}
              placeholder="Enter your starting address"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37]"
              style={{ borderColor: '#E0D8D2', color: '#332D2D', backgroundColor: '#FAFAF8' }}
            />
          </div>
          <button
            type="submit"
            disabled={!fromAddress.trim()}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            style={{
              backgroundColor: fromAddress.trim() ? '#D4AF37' : '#E0D8D2',
              color: fromAddress.trim() ? '#1A1A1A' : '#8A8080',
            }}
          >
            Show Route
          </button>
        </form>

        {showingDirections && (
          <p className="text-xs mt-2 text-[#7BA381] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7BA381]" />
            Showing directions from your location
          </p>
        )}
      </div>

      {/* Map Embed */}
      <div className="rounded-2xl overflow-hidden shadow-lg h-[380px] ring-1 ring-[#E0D8D2]/60">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={showingDirections ? 'Directions to Church' : 'Church Location Map'}
        />
      </div>
    </div>
  )
}
