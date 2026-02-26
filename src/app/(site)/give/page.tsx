import { Metadata } from 'next'
import { Heart, CreditCard, Building2, Mail, Users, BookOpen, Globe, Utensils, ArrowRight, Quote, ChevronRight } from 'lucide-react'
import { TithelyButton } from '@/components/giving'
import { client, givingPageQuery } from '@/lib/sanity'
import type { GivingPage } from '@/types'

export const metadata: Metadata = {
  title: 'Give | The Apostles Ministry',
  description: 'Support the mission of The Apostles Ministry through your generous giving.',
}

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
  const breakdown = data?.givingBreakdown || [
    { title: 'Local Outreach', percentage: '30%', description: 'Feeding the hungry, clothing the needy, and serving our local community with the love of Christ.' },
    { title: 'Ministry Operations', percentage: '50%', description: "Supporting worship, children's programs, youth ministry, and creating spaces for spiritual growth." },
    { title: 'Global Missions', percentage: '20%', description: 'Partnering with missionaries and organizations around the world to spread the Gospel.' },
  ]
  const methods = data?.givingMethods || [
    { title: 'Online Giving', description: 'Give securely online using credit card, debit card, or bank transfer through our Tithe.ly integration.', icon: 'credit-card' as const },
    { title: 'In Person', description: 'Give during any of our services using the offering boxes located at the back of the sanctuary.', note: 'Cash, checks, and giving envelopes accepted', icon: 'building' as const },
    { title: 'Mail a Check', description: 'Mail your donation to our church office. Make checks payable to "The Apostles Ministry".', icon: 'mail' as const },
  ]
  const taxStatement = data?.taxStatement || 'The Apostles Ministry is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the fullest extent allowed by law. You will receive a giving statement for your records.'
  const mailingAddress = data?.mailingAddress || "The Apostles Ministry\n401-A Prince George's Blvd\nUpper Marlboro, MD 20774"

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
      {/* Hero Section — Split Design */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FCFBF9] via-[#F4F0EA] to-[#E8E2DA]" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#592D31]/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <span className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-6">
                <Heart className="w-4 h-4" />
                Give Generously
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#592D31] mb-6 leading-[1.1] tracking-tight">
                {heroTitle}
              </h1>
              
              <p className="text-lg text-[#332D2D] mb-8 max-w-lg leading-relaxed">
                Your generosity transforms lives. Every gift, no matter the size, helps us serve our community and spread the love of Christ.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <TithelyButton 
                  label="Give Now" 
                  className="text-lg px-10 py-5 bg-[#592D31] hover:bg-[#3D2A2C] text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl" 
                />
                <a 
                  href="#impact"
                  className="inline-flex items-center justify-center gap-2 text-[#592D31] font-semibold px-6 py-3 rounded-full border-2 border-[#592D31]/20 hover:border-[#592D31] hover:bg-[#592D31]/5 transition-all"
                >
                  See Your Impact
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Right: Large stat card */}
            <div className="relative">
              <div className="bg-[#592D31] rounded-3xl p-10 lg:p-14 text-center relative overflow-hidden">
                {/* Decorative cross */}
                <div className="absolute top-6 right-6 opacity-10">
                  <svg width="60" height="75" viewBox="0 0 60 75" fill="none">
                    <rect x="22.5" y="0" width="15" height="75" fill="white"/>
                    <rect x="0" y="17.5" width="60" height="15" fill="white"/>
                  </svg>
                </div>
                
                <div className="relative">
                  <span className="text-7xl sm:text-8xl lg:text-9xl font-bold text-white mb-2 block" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                    1,200+
                  </span>
                  <p className="text-white/80 text-lg mb-8">Lives touched this year</p>
                  
                  <div className="h-px bg-white/20 mb-8" />
                  
                  <p className="text-white/90 text-sm leading-relaxed italic">
                    &ldquo;{heroVerse}&rdquo;
                  </p>
                  <span className="text-[#D4AF37] text-sm mt-3 block font-medium">
                    — {heroVerseRef}
                  </span>
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-[#D4AF37] text-[#1A1A1A] rounded-2xl px-6 py-4 shadow-xl">
                <span className="text-2xl font-bold block">100%</span>
                <span className="text-xs font-medium">Goes to Ministry</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Areas — Building Brighter Futures */}
      <section id="impact" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center justify-center gap-3 text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              <span className="w-12 h-px bg-[#D4AF37]" />
              Your Impact
              <span className="w-12 h-px bg-[#D4AF37]" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#592D31] mb-4">
              Building Kingdom Futures
            </h2>
            <p className="text-[#332D2D] text-lg max-w-2xl mx-auto">
              Every dollar you give is stewarded with care. Here&apos;s how your generosity makes a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {impactAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <div 
                  key={area.title}
                  className="group relative bg-[#FCFBF9] rounded-2xl p-8 border border-[#E0D8D2] hover:border-[#D4AF37]/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#592D31]/10 flex items-center justify-center group-hover:bg-[#592D31] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6 text-[#592D31] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#592D31] mb-2">{area.title}</h3>
                      <p className="text-[#332D2D] text-sm leading-relaxed mb-4">{area.description}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-[#D4AF37]">{area.stat}</span>
                        <span className="text-sm text-[#8A8080]">{area.statLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Giving Breakdown — Visual */}
      <section className="py-24 bg-[#592D31] relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white rounded-full" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center justify-center gap-3 text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              <span className="w-12 h-px bg-[#D4AF37]" />
              Transparency
              <span className="w-12 h-px bg-[#D4AF37]" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Where Your Gift Goes
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>
              We believe in complete transparency. Here&apos;s how every dollar is stewarded.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {breakdown.map((item, index) => (
              <div
                key={item.title}
                className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300 group"
              >
                <span className="text-6xl font-bold text-[#D4AF37] mb-4 block">{item.percentage}</span>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#FFFFFF' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.75)' }} className="text-sm leading-relaxed">{item.description}</p>
                
                {/* Hover line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#D4AF37] group-hover:w-full transition-all duration-500 rounded-b-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Give */}
      <section className="py-24 bg-[#FCFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center justify-center gap-3 text-[#592D31] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              <span className="w-12 h-px bg-[#D4AF37]" />
              Ways to Give
              <span className="w-12 h-px bg-[#D4AF37]" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#592D31]">
              Choose Your Giving Method
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {methods.map((method, index) => {
              const Icon = iconMap[method.icon] || CreditCard
              const colors = [
                { bg: 'bg-[#592D31]', light: 'bg-[#592D31]/10', text: 'text-[#592D31]' },
                { bg: 'bg-[#D4AF37]', light: 'bg-[#D4AF37]/10', text: 'text-[#D4AF37]' },
                { bg: 'bg-[#7BA381]', light: 'bg-[#7BA381]/10', text: 'text-[#7BA381]' },
              ][index]
              
              return (
                <div 
                  key={method.title} 
                  className="bg-white rounded-2xl p-8 shadow-sm border border-[#E0D8D2] hover:shadow-xl hover:border-transparent transition-all duration-300 group"
                >
                  <div className={`w-16 h-16 rounded-2xl ${colors.light} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-bold text-[#592D31] mb-3">{method.title}</h3>
                  <p className="text-[#332D2D] mb-6 leading-relaxed">
                    {method.description}
                  </p>
                  {method.icon === 'credit-card' && (
                    <TithelyButton label="Give Online" className="w-full rounded-xl" />
                  )}
                  {method.note && (
                    <p className="text-sm text-[#8A8080] bg-[#F4F0EA] rounded-lg px-4 py-3">{method.note}</p>
                  )}
                  {method.icon === 'mail' && (
                    <address className="text-sm text-[#8A8080] not-italic whitespace-pre-line bg-[#F4F0EA] rounded-lg px-4 py-3">
                      {mailingAddress}
                    </address>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tax Info */}
      <section className="py-12 bg-[#F4F0EA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#332D2D] text-sm leading-relaxed">
            {taxStatement}
          </p>
        </div>
      </section>
    </>
  )
}
