// Sanity Document Types

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'youtube' | 'tiktok' | 'twitter' | 'linkedin'
  url: string
}

export interface Staff {
  _id: string
  name: string
  role: string
  image?: SanityImage
  bio?: string
  rank: number
  email?: string
  socialLinks?: SocialLink[]
}

export interface Ministry {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  coverImage?: SanityImage
  leader?: Staff
  meetingTimes?: string
  featured?: boolean
  order?: number
}

export interface HistoryItem {
  _id: string
  year: string
  title: string
  description?: string
  image?: SanityImage
  order: number
}

export interface FAQ {
  _id: string
  question: string
  answer: string
  category?: 'visitors' | 'services' | 'kids' | 'involvement' | 'general'
}

export interface ServiceTime {
  name: string
  time: string
  day?: string
}

export interface ServiceTimes {
  sundayServices?: ServiceTime[]
  midweekServices?: ServiceTime[]
  locationName?: string
  address?: string
  googleMapsLink?: string
  phoneNumber?: string
  email?: string
}

export interface Category {
  _id: string
  title: string
  slug: { current: string }
  color?: string
}

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  author?: Staff
  mainImage?: SanityImage
  publishedAt?: string
  excerpt?: string
  body?: PortableTextBlock[]
  categories?: Category[]
  featured?: boolean
}

export interface Comment {
  _id: string
  name: string
  email?: string
  text: string
  post?: { _ref: string }
  approved?: boolean
  createdAt?: string
}

export interface Sermon {
  _id: string
  title: string
  slug: { current: string }
  speaker?: Staff
  date: string
  series?: string
  scripture?: string
  videoUrl?: string
  audioUrl?: string
  thumbnail?: SanityImage
  description?: string
  notes?: PortableTextBlock[]
}

export interface Event {
  _id: string
  title: string
  slug: { current: string }
  date: string
  endDate?: string
  location?: string
  address?: string
  description?: string
  image?: SanityImage
  registrationLink?: string
  cost?: string
  ministry?: Ministry
  featured?: boolean
  category?: 'sunday-service' | 'youth' | 'bible-study' | 'online' | 'outreach' | 'special' | 'general'
  isOnline?: boolean
  onlineLink?: string
}

export interface SiteSettings {
  siteName?: string
  siteTagline?: string
  logo?: SanityImage
  logoLight?: SanityImage
  heroVideo?: string
  heroVideoFile?: {
    _type: 'file'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  heroImage?: SanityImage
  heroTitle?: string
  heroSubtitle?: string
  socialLinks?: SocialLink[]
  statement501c3?: string
  tithelyChurchId?: string
  missionStatement?: string
  visionStatement?: string
  watchOnlineUrl?: string
}

// Portable Text Types
export interface PortableTextBlock {
  _type: string
  _key: string
  [key: string]: unknown
}

export interface CalloutBlock {
  _type: 'calloutBlock'
  _key: string
  type: 'info' | 'warning' | 'scripture' | 'tip'
  title?: string
  body: string
}

export interface YouTubeEmbed {
  _type: 'youtubeEmbed'
  _key: string
  url: string
  caption?: string
}

export interface ImageGallery {
  _type: 'imageGallery'
  _key: string
  images: (SanityImage & { alt?: string; caption?: string })[]
  layout: 'grid-2' | 'grid-3' | 'carousel'
}

export interface PullQuote {
  _type: 'pullQuote'
  _key: string
  quote: string
  attribution?: string
}

export interface VerseBlock {
  _type: 'verseBlock'
  _key: string
  verse: string
  reference: string
}

export interface ButtonLink {
  _type: 'buttonLink'
  _key: string
  label: string
  url: string
  style: 'primary' | 'secondary' | 'text'
}

export interface Divider {
  _type: 'divider'
  _key: string
  style: 'line' | 'dots' | 'space'
}

export interface GivingBreakdownItem {
  title: string
  percentage: string
  description: string
}

export interface GivingMethod {
  title: string
  description: string
  note?: string
  icon: 'credit-card' | 'building' | 'mail'
}

export interface DonationCampaign {
  title: string
  description?: string
  goalAmount: number
  currentAmount: number
  image?: SanityImage
  color?: string
  isActive?: boolean
  endDate?: string
}

export interface GivingPage {
  heroTitle?: string
  heroVerse?: string
  heroVerseRef?: string
  whyWeGiveHeading?: string
  whyWeGiveSubtext?: string
  givingBreakdown?: GivingBreakdownItem[]
  givingMethods?: GivingMethod[]
  taxStatement?: string
  mailingAddress?: string
  donationCampaigns?: DonationCampaign[]
}
