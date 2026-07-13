'use client'

import { useState } from 'react'
import { Play, X } from 'lucide-react'
import Image from 'next/image'

interface VideoEmbedProps {
  videoUrl: string
  thumbnailUrl?: string
  title?: string
  className?: string
  aspectRatio?: 'video' | 'square'
  showOverlay?: boolean
}

// Extract video ID and platform from URL
function parseVideoUrl(url: string): { platform: 'youtube' | 'vimeo' | 'unknown'; videoId: string | null } {
  // YouTube patterns
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
  ]
  
  for (const pattern of youtubePatterns) {
    const match = url.match(pattern)
    if (match) {
      return { platform: 'youtube', videoId: match[1] }
    }
  }
  
  // Vimeo patterns
  const vimeoPatterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ]
  
  for (const pattern of vimeoPatterns) {
    const match = url.match(pattern)
    if (match) {
      return { platform: 'vimeo', videoId: match[1] }
    }
  }
  
  return { platform: 'unknown', videoId: null }
}

// Get embed URL based on platform
function getEmbedUrl(platform: 'youtube' | 'vimeo' | 'unknown', videoId: string | null): string | null {
  if (!videoId) return null
  
  switch (platform) {
    case 'youtube':
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    case 'vimeo':
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`
    default:
      return null
  }
}

export function VideoEmbed({ 
  videoUrl, 
  thumbnailUrl, 
  title = 'Video',
  className = '',
  aspectRatio = 'video',
  showOverlay = true
}: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const { platform, videoId } = parseVideoUrl(videoUrl)
  const embedUrl = getEmbedUrl(platform, videoId)
  
  // If we can't embed, fallback to external link
  if (!embedUrl) {
    return (
      <a 
        href={videoUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`block relative ${aspectRatio === 'video' ? 'aspect-video' : 'aspect-square'} bg-black ${className}`}
      >
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
            <Play className="w-6 h-6 text-primary-deep ml-1" fill="currentColor" />
          </div>
        </div>
      </a>
    )
  }
  
  return (
    <div className={`relative ${aspectRatio === 'video' ? 'aspect-video' : 'aspect-square'} bg-black ${className}`}>
      {isPlaying ? (
        <>
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
            aria-label="Close video"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 w-full h-full cursor-pointer group"
          aria-label={`Play ${title}`}
        >
          {thumbnailUrl && (
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="object-cover"
            />
          )}
          {showOverlay && <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-primary-deep ml-1" fill="currentColor" />
            </div>
          </div>
        </button>
      )}
    </div>
  )
}

// Modal version for full-screen video playback
export function VideoModal({ 
  videoUrl, 
  isOpen, 
  onClose,
  title = 'Video'
}: { 
  videoUrl: string
  isOpen: boolean
  onClose: () => void
  title?: string
}) {
  const { platform, videoId } = parseVideoUrl(videoUrl)
  const embedUrl = getEmbedUrl(platform, videoId)
  
  if (!isOpen || !embedUrl) return null
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Close video"
      >
        <X className="w-6 h-6 text-white" />
      </button>
      <div 
        className="relative w-full max-w-5xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full rounded-lg"
        />
      </div>
    </div>
  )
}
