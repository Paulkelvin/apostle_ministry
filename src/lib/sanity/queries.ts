import { groq } from 'next-sanity'

// ============================================
// STAFF / LEADERSHIP
// ============================================
export const staffQuery = groq`
  *[_type == "staff"] | order(rank asc) {
    _id,
    name,
    role,
    image,
    bio,
    rank,
    email,
    socialLinks
  }
`

export const staffByIdQuery = groq`
  *[_type == "staff" && _id == $id][0] {
    _id,
    name,
    role,
    image,
    bio,
    rank,
    email,
    socialLinks
  }
`

// ============================================
// MINISTRIES
// ============================================
export const ministriesQuery = groq`
  *[_type == "ministry"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    coverImage,
    meetingTimes,
    featured,
    leader->{
      _id,
      name,
      role,
      image
    }
  }
`

export const featuredMinistriesQuery = groq`
  *[_type == "ministry" && featured == true] | order(order asc) {
    _id,
    name,
    slug,
    description,
    coverImage
  }
`

// ============================================
// HISTORY TIMELINE
// ============================================
export const historyQuery = groq`
  *[_type == "historyItem"] | order(order asc) {
    _id,
    year,
    title,
    description,
    image
  }
`

// ============================================
// FAQ
// ============================================
export const faqQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`

export const faqByCategoryQuery = groq`
  *[_type == "faq" && category == $category] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`

// ============================================
// SERVICE TIMES (Singleton)
// ============================================
export const serviceTimesQuery = groq`
  *[_type == "serviceTimes"][0] {
    sundayServices,
    midweekServices,
    locationName,
    address,
    googleMapsLink,
    phoneNumber,
    email
  }
`

// ============================================
// BLOG POSTS
// ============================================
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    featured,
    body,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    author->{
      _id,
      name,
      image
    }
  }
`

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...$limit] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    body,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    author->{
      _id,
      name,
      image
    }
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    body,
    featured,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    author->{
      _id,
      name,
      role,
      image,
      bio
    }
  }
`

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    body,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    author->{
      _id,
      name,
      image
    }
  }
`

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    color
  }
`

export const relatedPostsQuery = groq`
  *[_type == "post" && _id != $postId && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    body,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    author->{
      _id,
      name,
      image
    }
  }
`

export const commentsByPostQuery = groq`
  *[_type == "comment" && post._ref == $postId && approved == true] | order(createdAt desc) {
    _id,
    name,
    text,
    createdAt
  }
`

// ============================================
// SERMONS
// ============================================
export const sermonsQuery = groq`
  *[_type == "sermon"] | order(date desc) {
    _id,
    title,
    slug,
    speaker->{
      _id,
      name,
      image
    },
    date,
    series,
    scripture,
    videoUrl,
    audioUrl,
    thumbnail,
    description
  }
`

export const sermonBySlugQuery = groq`
  *[_type == "sermon" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    speaker->{
      _id,
      name,
      role,
      image
    },
    date,
    series,
    scripture,
    videoUrl,
    audioUrl,
    thumbnail,
    description,
    notes
  }
`

export const sermonSeriesQuery = groq`
  array::unique(*[_type == "sermon" && defined(series)].series)
`

export const sermonsBySeries = groq`
  *[_type == "sermon" && series == $series] | order(date desc) {
    _id,
    title,
    slug,
    speaker->{
      _id,
      name
    },
    date,
    thumbnail
  }
`

// ============================================
// EVENTS
// ============================================
export const upcomingEventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc) {
    _id,
    title,
    slug,
    date,
    endDate,
    location,
    address,
    description,
    image,
    registrationLink,
    cost,
    featured,
    category,
    isOnline,
    onlineLink,
    ministry->{
      _id,
      name
    }
  }
`

export const allEventsQuery = groq`
  *[_type == "event"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    endDate,
    location,
    address,
    description,
    image,
    registrationLink,
    cost,
    featured,
    category,
    isOnline,
    onlineLink,
    ministry->{
      _id,
      name
    }
  }
`

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    date,
    endDate,
    location,
    address,
    description,
    image,
    registrationLink,
    cost,
    ministry->{
      _id,
      name
    }
  }
`

export const featuredEventsQuery = groq`
  *[_type == "event" && featured == true && date >= now()] | order(date asc)[0...3] {
    _id,
    title,
    slug,
    date,
    location,
    image
  }
`

// ============================================
// SITE SETTINGS (Singleton)
// ============================================
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    siteTagline,
    logo,
    logoLight,
    heroVideo,
    heroImage,
    heroTitle,
    heroSubtitle,
    socialLinks,
    statement501c3,
    tithelyChurchId,
    missionStatement,
    visionStatement,
    watchOnlineUrl
  }
`

// ============================================
// GIVING PAGE (Singleton)
// ============================================
export const givingPageQuery = groq`
  *[_type == "givingPage"][0] {
    heroTitle,
    heroVerse,
    heroVerseRef,
    whyWeGiveHeading,
    whyWeGiveSubtext,
    givingBreakdown,
    givingMethods,
    taxStatement,
    mailingAddress
  }
`
