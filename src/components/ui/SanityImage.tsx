import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { SanityImage } from '@/types'

interface SanityImageComponentProps {
  image: SanityImage
  alt?: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
  sizes?: string
}

export function SanityImageComponent({
  image,
  alt = '',
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  sizes,
}: SanityImageComponentProps) {
  if (!image?.asset) {
    return (
      <div
        className={`bg-warm-200 flex items-center justify-center ${className}`}
        style={!fill ? { width, height } : undefined}
      >
        <span className="text-warm-400 text-sm">No image</span>
      </div>
    )
  }

  const imageUrl = urlFor(image).url()
  const blurUrl = urlFor(image).width(20).blur(10).url()

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={image.alt || alt}
        fill
        priority={priority}
        className={`object-cover ${className}`}
        sizes={sizes || '100vw'}
        placeholder="blur"
        blurDataURL={blurUrl}
      />
    )
  }

  return (
    <Image
      src={imageUrl}
      alt={image.alt || alt}
      width={width || 800}
      height={height || 600}
      priority={priority}
      className={className}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={blurUrl}
    />
  )
}
