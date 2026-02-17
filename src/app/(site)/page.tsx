import { client, siteSettingsQuery, serviceTimesQuery, latestPostsQuery, featuredMinistriesQuery } from '@/lib/sanity'
import { HeroSection, ServiceTimesSection, LatestNewsSection, FeaturedMinistriesSection, MissionVisionSection } from '@/components/home'
import type { SiteSettings, ServiceTimes, Post, Ministry } from '@/types'

// Revalidate every 60 seconds so CMS changes appear quickly
export const revalidate = 60

async function getHomePageData() {
  try {
    const [settings, serviceTimes, posts, ministries] = await Promise.all([
      client.fetch<SiteSettings>(siteSettingsQuery),
      client.fetch<ServiceTimes>(serviceTimesQuery),
      client.fetch<Post[]>(latestPostsQuery, { limit: 3 }),
      client.fetch<Ministry[]>(featuredMinistriesQuery),
    ])
    return { settings, serviceTimes, posts, ministries }
  } catch {
    return { settings: null, serviceTimes: null, posts: [], ministries: [] }
  }
}

export default async function HomePage() {
  const { settings, serviceTimes, posts, ministries } = await getHomePageData()

  return (
    <>
      <HeroSection settings={settings} />
      <ServiceTimesSection serviceTimes={serviceTimes} />
      <FeaturedMinistriesSection ministries={ministries} />
      <MissionVisionSection
        mission={settings?.missionStatement}
        vision={settings?.visionStatement}
      />
      <LatestNewsSection posts={posts} />
    </>
  )
}
