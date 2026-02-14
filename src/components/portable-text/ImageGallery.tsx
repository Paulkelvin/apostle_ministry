'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { SanityImageComponent } from '@/components/ui'
import type { SanityImage } from '@/types'

interface ImageGalleryProps {
  images: (SanityImage & { alt?: string; caption?: string })[]
  layout: 'grid-2' | 'grid-3' | 'carousel'
}

export function ImageGallery({ images, layout = 'grid-2' }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!images || images.length === 0) {
    return null
  }

  const gridClass = layout === 'grid-3' ? 'grid-cols-3' : 'grid-cols-2'

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : images.length - 1))
  const nextImage = () => setLightboxIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : 0))

  if (layout === 'carousel') {
    return (
      <>
        <div className="my-8 overflow-x-auto">
          <div className="flex gap-4 pb-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className="flex-shrink-0 w-64 aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <SanityImageComponent
                  image={image}
                  alt={image.alt || ''}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </>
    )
  }

  return (
    <>
      <div className={`my-8 grid ${gridClass} gap-4`}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <SanityImageComponent
              image={image}
              alt={image.alt || ''}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  )
}

interface LightboxProps {
  images: (SanityImage & { alt?: string; caption?: string })[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const currentImage = images[currentIndex]

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
        aria-label="Close lightbox"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 text-white/80 hover:text-white p-2"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 text-white/80 hover:text-white p-2"
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </>
      )}

      {/* Image */}
      <div className="max-w-4xl max-h-[80vh] px-16">
        <SanityImageComponent
          image={currentImage}
          alt={currentImage.alt || ''}
          width={1200}
          height={800}
          className="max-h-[70vh] w-auto object-contain"
        />
        {currentImage.caption && (
          <p className="text-white/70 text-center mt-4">{currentImage.caption}</p>
        )}
        <p className="text-white/50 text-center text-sm mt-2">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  )
}
