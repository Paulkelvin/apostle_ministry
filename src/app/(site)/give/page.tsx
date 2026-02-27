import { Metadata } from 'next'
import { Heart, CreditCard, Building2, Mail, Users, BookOpen, Globe, Utensils, ArrowRight, Target, TrendingUp } from 'lucide-react'
import { TithelyButton } from '@/components/giving'
import { client, givingPageQuery } from '@/lib/sanity'
import { SanityImageComponent } from '@/components/ui'
import type { GivingPage, DonationCampaign } from '@/types'

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
  
  // Demo donation campaigns if none exist
  const donationCampaigns: DonationCampaign[] = data?.donationCampaigns?.filter(c => c.isActive) || [
    { title: 'Building Fund', description: 'Help us expand our sanctuary to accommodate our growing congregation.', goalAmount: 100000, currentAmount: 67500, color: '#592D31', isActive: true },
    { title: 'Youth Ministry', description: 'Support programs, camps, and resources for the next generation.', goalAmount: 25000, currentAmount: 18750, color: '#D4AF37', isActive: true },
    { title: 'Community Outreach', description: 'Provide meals, supplies, and support to families in need.', goalAmount: 15000, currentAmount: 12300, color: '#7BA381', isActive: true },
  ]

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
      {/* Hero Section — Folder Tab Design */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background with folder shapes */}
        <div className="absolute inset-0 bg-[#FCFBF9]" />
        
        {/* Folder tab shapes - decorative */}
        <div className="absolute top-0 right-0 w-[60%] h-full">
          {/* Main folder shape */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 800" preserveAspectRatio="none" fill="none">
            <path d="M80 0 L600 0 L600 800 L0 800 L0 100 Q0 60 40 60 L60 60 Q80 60 80 40 Z" fill="#592D31"/>
          </svg>
          {/* Inner folder tab */}
          <svg className="absolute top-8 left-8 w-[90%] h-[95%]" viewBox="0 0 500 700" preserveAspectRatio="none" fill="none">
            <path d="M60 0 L500 0 L500 700 L0 700 L0 80 Q0 50 30 50 L45 50 Q60 50 60 30 Z" fill="#D4AF37" opacity="0.15"/>
          </svg>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-[#592D31]/5 rounded-full blur-2xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="relative z-10">
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
                  href="#campaigns"
                  className="inline-flex items-center justify-center gap-2 text-[#592D31] font-semibold px-6 py-3 rounded-full border-2 border-[#592D31]/20 hover:border-[#592D31] hover:bg-[#592D31]/5 transition-all"
                >
                  View Campaigns
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              
              {/* Scripture quote */}
              <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#E0D8D2] max-w-md">
                <p className="text-[#5C5252] text-sm italic leading-relaxed">
                  &ldquo;{heroVerse}&rdquo;
                </p>
                <span className="text-[#D4AF37] text-xs font-semibold mt-2 block">
                  — {heroVerseRef}
                </span>
              </div>
            </div>
            
            {/* Right: Stats card on top of folder */}
            <div className="relative z-10 lg:pl-8">
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_20px_60px_rgba(89,45,49,0.2)] border border-white/50">
                {/* Decorative cross */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#D4AF37] rounded-2xl flex items-center justify-center shadow-lg">
                  <svg width="24" height="30" viewBox="0 0 24 30" fill="none">
                    <rect x="9" y="0" width="6" height="30" fill="white"/>
                    <rect x="0" y="8" width="24" height="6" fill="white"/>
                  </svg>
                </div>
                
                <div className="text-center mb-8">
                  <span className="text-7xl sm:text-8xl font-bold text-[#592D31] block" style={{ textShadow: '0 4px 20px rgba(89,45,49,0.1)' }}>
                    1,200+
                  </span>
                  <p className="text-[#8A8080] text-lg">Lives touched this year</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E0D8D2]">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-[#D4AF37]">$150K+</span>
                    <p className="text-xs text-[#8A8080] mt-1">Given this year</p>
                  </div>
                  <div className="text-center border-x border-[#E0D8D2]">
                    <span className="text-2xl font-bold text-[#D4AF37]">100%</span>
                    <p className="text-xs text-[#8A8080] mt-1">To ministry</p>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-[#D4AF37]">500+</span>
                    <p className="text-xs text-[#8A8080] mt-1">Donors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Campaigns — Progress Tracking */}
      <section id="campaigns" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center justify-center gap-3 text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              <span className="w-12 h-px bg-[#D4AF37]" />
              Current Campaigns
              <span className="w-12 h-px bg-[#D4AF37]" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#592D31] mb-4">
              Help Us Reach Our Goals
            </h2>
            <p className="text-[#332D2D] text-lg max-w-2xl mx-auto">
              Track our progress and see how your giving makes a real difference in these focused initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {donationCampaigns.map((campaign, index) => {
              const percentage = Math.min(Math.round((campaign.currentAmount / campaign.goalAmount) * 100), 100)
              const remaining = campaign.goalAmount - campaign.currentAmount
              const accentColor = campaign.color || '#592D31'
              
              return (
                <div 
                  key={campaign.title}
                  className="group relative bg-[#FCFBF9] rounded-2xl overflow-hidden border border-[#E0D8D2] hover:shadow-xl transition-all duration-500"
                >
                  {/* Folder tab top */}
                  <div className="relative h-3" style={{ backgroundColor: accentColor }}>
                    <div 
                      className="absolute -bottom-3 left-6 w-12 h-6 rounded-b-lg"
                      style={{ backgroundColor: accentColor }}
                    />
                  </div>
                  
                  {/* Image or placeholder */}
                  {campaign.image ? (
                    <div className="aspect-[16/9] relative">
                      <SanityImageComponent
                        image={campaign.image}
                        alt={campaign.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  ) : (
                    <div 
                      className="aspect-[16/9] flex items-center justify-center"
                      style={{ backgroundColor: `${accentColor}10` }}
                    >
                      <Target className="w-16 h-16" style={{ color: accentColor, opacity: 0.3 }} />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#592D31] mb-2">{campaign.title}</h3>
                    {campaign.description && (
                      <p className="text-[#8A8080] text-sm leading-relaxed mb-6">{campaign.description}</p>
                    )}
                    
                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold" style={{ color: accentColor }}>
                          ${campaign.currentAmount.toLocaleString()}
                        </span>
                        <span className="text-[#8A8080]">
                          ${campaign.goalAmount.toLocaleString()} goal
                        </span>
                      </div>
                      <div className="h-3 bg-[#E0D8D2] rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${percentage}%`, 
                            backgroundColor: accentColor,
                            boxShadow: `0 0 10px ${accentColor}40`
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Stats row */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#E0D8D2]">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" style={{ color: accentColor }} />
                        <span className="text-sm font-bold" style={{ color: accentColor }}>{percentage}%</span>
                        <span className="text-xs text-[#8A8080]">funded</span>
                      </div>
                      <span className="text-xs text-[#8A8080]">
                        ${remaining.toLocaleString()} to go
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* CTA */}
          <div className="text-center mt-12">
            <TithelyButton 
              label="Contribute Now" 
              className="text-base px-8 py-4 bg-[#592D31] hover:bg-[#3D2A2C] text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl" 
            />
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
