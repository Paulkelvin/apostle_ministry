import { client, siteSettingsQuery, serviceTimesQuery, latestPostsQuery, featuredMinistriesQuery, normalizeSiteSettings, normalizeServiceTimes, normalizePosts } from '@/lib/sanity'
import { HeroSection, ServiceTimesSection, LatestNewsSection, FeaturedMinistriesSection, MissionVisionSection } from '@/components/home'
import type { SiteSettings, ServiceTimes, Post, Ministry } from '@/types'

// Revalidate every 5 minutes — highest-traffic page, kept freshest of the low-churn tier
export const revalidate = 300

async function getHomePageData() {
  try {
    const [rawSettings, rawServiceTimes, posts, ministries] = await Promise.all([
      client.fetch<SiteSettings>(siteSettingsQuery),
      client.fetch<ServiceTimes>(serviceTimesQuery),
      client.fetch<Post[]>(latestPostsQuery, { limit: 3 }),
      client.fetch<Ministry[]>(featuredMinistriesQuery),
    ])
    return {
      settings: normalizeSiteSettings(rawSettings),
      serviceTimes: normalizeServiceTimes(rawServiceTimes),
      posts: normalizePosts(posts || []),
      ministries: ministries || [],
    }
  } catch {
    return {
      settings: normalizeSiteSettings(null),
      serviceTimes: normalizeServiceTimes(null),
      posts: [],
      ministries: [],
    }
  }
}

export default async function HomePage() {
  const { settings, serviceTimes, posts, ministries } = await getHomePageData()

  return (
    <>
      <HeroSection settings={settings} />
      <ServiceTimesSection serviceTimes={serviceTimes} />
      <FeaturedMinistriesSection
        ministries={ministries}
      />
      <MissionVisionSection
        mission={settings?.missionStatement}
        vision={settings?.visionStatement}
      />
      <LatestNewsSection posts={posts} />
    </>
  )
}
