import { Metadata } from 'next'
import { Heart, CreditCard, Building2, Mail, Users, BookOpen, Globe, Utensils } from 'lucide-react'
import { TithelyButton } from '@/components/giving'
import { client, givingPageQuery } from '@/lib/sanity'
import { SanityImageComponent } from '@/components/ui'
import type { GivingPage } from '@/types'

export const metadata: Metadata = {
  title: 'Give | Restoring Life Family Community Center',
  description: 'Support the mission of Restoring Life Family Community Center through your generous giving.',
}

// Donation totals update via the Tithely webhook — keep fairly fresh
export const revalidate = 300

async function getGivingPageData(): Promise<GivingPage | null> {
  try {
    return await client.fetch<GivingPage>(givingPageQuery)
  } catch {
    return null
  }
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'credit-card': CreditCard,
  building: Building2,
  mail: Mail,
}

export default async function GivePage() {
  const data = await getGivingPageData()

  const heroTitle = data?.heroTitle || 'Together, We Build Faith and Create Impact'
  const heroVerse = data?.heroVerse || 'Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.'
  const heroVerseRef = data?.heroVerseRef || '2 Corinthians 9:7'
  const heroImage = data?.heroImage
  const breakdown = data?.givingBreakdown || [
    { title: 'Local Outreach', percentage: '30%', description: 'Feeding the hungry, clothing the needy, and serving our local community with the love of Christ.' },
    { title: 'Ministry Operations', percentage: '50%', description: "Supporting worship, outreach programs, and creating spaces for spiritual growth and community fellowship." },
    { title: 'Global Missions', percentage: '20%', description: 'Partnering with missionaries and organizations around the world to spread the Gospel.' },
  ]
  const methods = data?.givingMethods || [
    { title: 'Online Giving', description: 'Give securely online using credit card, debit card, or bank transfer through our Tithe.ly integration.', icon: 'credit-card' as const },
    { title: 'In Person', description: 'Give during any of our services using the offering boxes located at the back of the sanctuary.', note: 'Cash, checks, and giving envelopes accepted', icon: 'building' as const },
    { title: 'Mail a Check', description: 'Mail your donation to our church office. Make checks payable to "Restoring Life Family Community Center".', icon: 'mail' as const },
  ]
  const mailingAddress = data?.mailingAddress || "Restoring Life Family Community Center\n401-A Prince George's Blvd\nUpper Marlboro, MD 20774"

  // Impact areas with church-appropriate icons and descriptions
  const impactAreas = [
    { 
      title: 'Feeding the Hungry', 
      description: 'Providing nutritious meals to families in need through our weekly food pantry and community meals program.',
      icon: Utensils,
      stat: '500+',
      statLabel: 'meals served monthly'
    },
    { 
      title: 'Discipleship & Education', 
      description: 'Funding Bible studies, Sunday school materials, and spiritual growth resources for all ages.',
      icon: BookOpen,
      stat: '200+',
      statLabel: 'lives transformed'
    },
    { 
      title: 'Community Support', 
      description: 'Helping families with emergency assistance, counseling services, and support groups.',
      icon: Users,
      stat: '100+',
      statLabel: 'families helped yearly'
    },
    { 
      title: 'Global Missions', 
      description: 'Supporting missionaries and church plants spreading the Gospel around the world.',
      icon: Globe,
      stat: '5',
      statLabel: 'mission partners'
    },
  ]

  return (
    <>
      {/* Hero Section — Clean Minimal Design */}
      <section
        className="relative min-h-screen pt-[120px] pb-12 flex items-center overflow-hidden bg-surface"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div className="relative z-10">
              <p className="text-accent-dark text-xs font-semibold tracking-[0.2em] uppercase mb-8">
                Generosity
              </p>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary mb-8 leading-[1.05]">
                {heroTitle}
              </h1>
              
              {/* Scripture as elegant inline quote */}
              <div className="relative mb-10 pl-6 border-l-2 border-accent">
                <p className="text-lg lg:text-xl text-primary-deep italic leading-relaxed">
                  &ldquo;{heroVerse}&rdquo;
                </p>
                <p className="text-accent text-sm font-semibold mt-3 tracking-wide">
                  {heroVerseRef}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <TithelyButton
                  label="Give Now"
                  className="text-base px-10 py-4 bg-accent hover:bg-accent-dark text-warm-900 rounded-lg font-semibold transition-colors duration-300"
                />
              </div>
            </div>
            
            {/* Right: Hero image if provided, else fallback visual */}
            <div className="relative z-10 hidden lg:block">
              <div className="relative">
                {heroImage ? (
                  <div className="aspect-[4/3] max-w-[520px] mx-auto overflow-hidden relative rounded-2xl">
                    <SanityImageComponent
                      image={heroImage}
                      alt={heroTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] max-w-[520px] mx-auto rounded-2xl bg-warm-100 flex items-center justify-center">
                    <Heart className="w-20 h-20 text-warm-300" strokeWidth={1} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Areas — Bento Grid Layout */}
      <section id="impact" className="pt-24 pb-24 bg-warm-100 scroll-mt-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent-dark text-xs font-semibold tracking-[0.2em] uppercase mb-4">Your Impact</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-4">
              Building Kingdom Futures
            </h2>
            <p className="text-warm-600 text-base max-w-2xl mx-auto">
              Every dollar you give is stewarded with care. Here&apos;s how your generosity makes a difference.
            </p>
          </div>

          {/* Bento Grid — two surfaces: primary-deep and white */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[200px]">
            {impactAreas.map((area, index) => {
              const Icon = area.icon
              const isLarge = index === 0 || index === 3
              const isDark = index === 0

              return (
                <div
                  key={area.title}
                  className={`relative rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] ${
                    isLarge ? 'md:col-span-2 md:row-span-2' : ''
                  } ${
                    isDark
                      ? 'bg-primary-deep'
                      : 'bg-white border border-warm-200 shadow-[--shadow-card]'
                  }`}
                >
                  <div className={`relative h-full flex flex-col ${
                    isLarge ? 'p-10' : 'p-8'
                  } ${
                    isDark ? 'justify-end' : 'justify-start'
                  }`}>
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isDark ? 'absolute top-10 left-10 bg-white/10' : 'mb-auto bg-warm-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${isDark ? 'text-accent' : 'text-primary'}`} />
                    </div>

                    {/* Content */}
                    <div className={isDark ? '' : 'mt-auto'}>
                      <div className="flex items-baseline gap-3 mb-3">
                        <span
                          className={`font-display ${isLarge ? 'text-5xl md:text-6xl' : 'text-4xl'} ${
                            isDark ? 'text-accent' : 'text-accent-dark'
                          }`}
                        >
                          {area.stat}
                        </span>
                        <span className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-warm-600'}`}>
                          {area.statLabel}
                        </span>
                      </div>
                      <h3 className={`font-display text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-warm-900'}`}>
                        {area.title}
                      </h3>
                      {isLarge && (
                        <p className={`text-sm leading-relaxed line-clamp-3 hidden md:block ${
                          isDark ? 'text-white/75' : 'text-warm-600'
                        }`}>
                          {area.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Giving Breakdown — Visual */}
      <section className="py-24 bg-primary-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Transparency
            </p>
            <h2 className="text-h2 text-white mb-4">
              Where Your Gift Goes
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              We believe in complete transparency. Here&apos;s how every dollar is stewarded.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {breakdown.map((item) => (
              <div
                key={item.title}
                className="bg-white/[0.04] rounded-xl p-8 border border-white/10 hover:border-white/25 transition-colors duration-300"
              >
                <span className="font-display text-6xl text-accent mb-4 block">{item.percentage}</span>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Give — Flowing Cards */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent-dark text-xs font-semibold tracking-[0.2em] uppercase mb-4">Ways to Give</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary">
              Choose Your Giving Method
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {methods.map((method) => {
              const Icon = iconMap[method.icon] || CreditCard

              return (
                <div
                  key={method.title}
                  className="bg-white rounded-xl p-8 border border-warm-200 shadow-[--shadow-card] hover:shadow-[--shadow-card-hover] transition-shadow duration-300"
                >
                  <div className="w-14 h-14 rounded-lg bg-warm-100 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-warm-900 mb-3">{method.title}</h3>
                  <p className="text-warm-600 mb-6 leading-relaxed text-sm">
                    {method.description}
                  </p>
                  {method.icon === 'credit-card' && (
                    <TithelyButton label="Give Online" className="w-full rounded-lg" />
                  )}
                  {method.note && (
                    <p className="text-sm text-warm-500 bg-warm-100 rounded-lg px-4 py-3">{method.note}</p>
                  )}
                  {method.icon === 'mail' && (
                    <address className="text-sm text-warm-500 not-italic whitespace-pre-line bg-warm-100 rounded-lg px-4 py-3">
                      {mailingAddress}
                    </address>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

    </>
  )
}

