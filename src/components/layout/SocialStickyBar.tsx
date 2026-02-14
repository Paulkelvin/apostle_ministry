'use client'

import { Facebook, Instagram, Youtube } from 'lucide-react'
import type { SocialLink } from '@/types'

interface SocialStickyBarProps {
  socialLinks?: SocialLink[]
}

// Brand colors for each platform — visible bg by default
const socialConfig: Record<string, {
  Icon: React.ComponentType<{ className?: string }>;
  defaultBg: string;
  defaultText: string;
  hoverStyle: string;
  label: string;
}> = {
  facebook: {
    Icon: Facebook,
    defaultBg: 'bg-white',
    defaultText: 'text-[#292121]',
    hoverStyle: 'hover:bg-[#292121] hover:text-white hover:shadow-[0_10px_28px_rgba(41,33,33,0.18)]',
    label: 'Facebook',
  },
  instagram: {
    Icon: Instagram,
    defaultBg: 'bg-white',
    defaultText: 'text-[#292121]',
    hoverStyle: 'hover:bg-[#292121] hover:text-white hover:shadow-[0_10px_28px_rgba(41,33,33,0.18)]',
    label: 'Instagram',
  },
  youtube: {
    Icon: Youtube,
    defaultBg: 'bg-white',
    defaultText: 'text-[#292121]',
    hoverStyle: 'hover:bg-[#292121] hover:text-white hover:shadow-[0_10px_28px_rgba(41,33,33,0.18)]',
    label: 'YouTube',
  },
  tiktok: {
    Icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    defaultBg: 'bg-white',
    defaultText: 'text-[#292121]',
    hoverStyle: 'hover:bg-[#292121] hover:text-white hover:shadow-[0_10px_28px_rgba(41,33,33,0.18)]',
    label: 'TikTok',
  },
  twitter: {
    Icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    defaultBg: 'bg-white',
    defaultText: 'text-[#292121]',
    hoverStyle: 'hover:bg-[#292121] hover:text-white hover:shadow-[0_10px_28px_rgba(41,33,33,0.18)]',
    label: 'X (Twitter)',
  },
}

const defaultPlatforms = ['facebook', 'instagram', 'youtube']

export function SocialStickyBar({ socialLinks = [] }: SocialStickyBarProps) {
  const links = socialLinks || []
  const platforms = links.length > 0
    ? links.map((l) => ({ platform: l.platform, url: l.url }))
    : defaultPlatforms.map((p) => ({ platform: p, url: '#' }))

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-1.5 p-2 bg-white/90 backdrop-blur-md rounded-l-2xl shadow-[0_10px_28px_rgba(41,33,33,0.18)] border border-[#DCCFC0] border-r-0">
      {platforms.map(({ platform, url }) => {
        const config = socialConfig[platform]
        if (!config) return null
        const { Icon, defaultBg, defaultText, hoverStyle, label } = config
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${defaultBg} ${defaultText} ${hoverStyle} hover:scale-110`}
            aria-label={`Follow us on ${label}`}
          >
            <Icon className="w-[18px] h-[18px]" />
          </a>
        )
      })}
    </div>
  )
}
