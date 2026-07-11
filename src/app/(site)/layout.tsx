import { Navbar, Footer, SocialStickyBar } from "@/components/layout";
import { client, siteSettingsQuery, serviceTimesQuery } from "@/lib/sanity";
import type { SiteSettings, ServiceTimes } from "@/types";

async function getSiteData() {
  try {
    const [settings, serviceTimes] = await Promise.all([
      client.fetch<SiteSettings>(siteSettingsQuery),
      client.fetch<ServiceTimes>(serviceTimesQuery),
    ]);
    return { settings, serviceTimes };
  } catch {
    return { settings: null, serviceTimes: null };
  }
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings, serviceTimes } = await getSiteData();

  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <SocialStickyBar socialLinks={settings?.socialLinks} />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer
        socialLinks={settings?.socialLinks}
        statement501c3={settings?.statement501c3}
        siteName={settings?.siteName}
        siteTagline={settings?.siteTagline}
        address={serviceTimes?.address}
        locationName={serviceTimes?.locationName}
        phone={serviceTimes?.phoneNumber}
        email={serviceTimes?.email}
      />
    </div>
  );
}
