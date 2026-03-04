import { Metadata } from 'next'
import { Heart, CreditCard, Building2, Mail, Users, BookOpen, Globe, Utensils, ArrowRight, Target, TrendingUp } from 'lucide-react'
import { TithelyButton } from '@/components/giving'
import { client, givingPageQuery } from '@/lib/sanity'
import { SanityImageComponent } from '@/components/ui'
import { SubtleSparkle, FloatingCross, DottedSquare } from '@/components/ui/MicroGraphics'
import type { GivingPage, DonationCampaign } from '@/types'

export const metadata: Metadata = {
  title: 'Give | The Apostles Ministry',
  description: 'Support the mission of The Apostles Ministry through your generous giving.',
}

// Revalidate frequently so published Sanity changes show up quickly
export const revalidate = 60

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
      {/* Hero Section — Clean Minimal Design */}
      <section
        className="relative min-h-screen pt-[120px] pb-12 flex items-center overflow-hidden bg-[#FCFBF9]"
      >
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #592D31 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        
        {/* Decorative MicroGraphics */}
        <SubtleSparkle className="top-[20%] left-[8%] opacity-60" size={30} delay={0.5} color="#CBA052" />
        <DottedSquare className="bottom-[15%] right-[5%] opacity-20" delay={2} color="#592D31" />
        <FloatingCross className="top-[15%] right-[12%] opacity-30" size={40} delay={1.2} color="#CBA052" />

        {/* Decorative gold accent */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-30" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div className="relative z-10">
              {/* Decorative line */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-[2px] bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase">
                  Generosity
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#592D31] mb-8 leading-[1.05] tracking-tight" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                {heroTitle}
              </h1>
              
              {/* Scripture as elegant inline quote */}
              <div className="relative mb-10 pl-6 border-l-2 border-[#D4AF37]">
                <p className="text-lg lg:text-xl text-[#4A2B2D] italic leading-relaxed">
                  &ldquo;{heroVerse}&rdquo;
                </p>
                <p className="text-[#D4AF37] text-sm font-semibold mt-3 tracking-wide">
                  {heroVerseRef}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <TithelyButton 
                  label="Give Now" 
                  className="group text-base px-10 py-4 bg-[#592D31] hover:bg-[#3D2A2C] text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]" 
                />
              </div>
            </div>
            
            {/* Right: Hero image if provided, else fallback visual */}
            <div className="relative z-10 hidden lg:block">
              <div className="relative">
                {heroImage ? (
                  <div
                    className="aspect-[4/3] max-w-[520px] mx-auto overflow-hidden relative"
                    style={{ borderRadius: '52% 48% 46% 54% / 58% 44% 56% 42%' }}
                  >
                    <SanityImageComponent
                      image={heroImage}
                      alt={heroTitle}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="aspect-square max-w-[420px] mx-auto rounded-full bg-gradient-to-br from-[#592D31]/5 via-[#F4F0EA] to-[#D4AF37]/10 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-[#FFFFFF] to-[#F8F6F3] shadow-[0_8px_60px_rgba(89,45,49,0.15)] flex items-center justify-center">
                      <Heart className="w-20 h-20 text-[#D4AF37]" strokeWidth={1} />
                    </div>
                  </div>
                )}
                {/* Floating accent elements */}
                <div className="absolute top-8 right-8 w-4 h-4 rounded-full bg-[#D4AF37]" />
                <div className="absolute bottom-12 left-4 w-2 h-2 rounded-full bg-[#592D31]/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Areas — Bento Grid Layout */}
      <section id="impact" className="py-24 bg-[#F7F5F0] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-[1px] bg-[#CBA052]" />
              <span className="text-[#CBA052] text-xs font-semibold tracking-[0.25em] uppercase">Your Impact</span>
              <div className="w-16 h-[1px] bg-[#CBA052]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A2B2D] mb-4" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
              Building Kingdom Futures
            </h2>
            <p className="text-[#595959] text-base max-w-2xl mx-auto">
              Every dollar you give is stewarded with care. Here&apos;s how your generosity makes a difference.
            </p>
          </div>

          {/* Bento Grid - Refined with exact brand colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[200px]">
            {impactAreas.map((area, index) => {
              const Icon = area.icon
              const isLarge = index === 0 || index === 3
              
              return (
                <div 
                  key={area.title}
                  className={`relative rounded-[24px] overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                    isLarge ? 'md:col-span-2 md:row-span-2' : ''
                  } ${
                    index === 0 ? 'bg-[#4A2B2D]' : 
                    index === 3 ? 'bg-[#CBA052]' : 
                    'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]'
                  }`}
                  style={{ 
                    ...(index !== 0 && index !== 3 ? { boxShadow: '0 4px 20px rgba(0,0,0,0.05)' } : {})
                  }}
                >
                  {/* Background pattern for burgundy card (Card 1) */}
                  {index === 0 && (
                    <div className="absolute inset-0" style={{ opacity: 0.1 }}>
                      <div className="absolute -top-10 -right-10 w-48 h-48 border border-white rounded-full" />
                      <div className="absolute -bottom-16 -left-16 w-40 h-40 border border-white rounded-full" />
                    </div>
                  )}
                  
                  <div className={`relative h-full flex flex-col ${
                    isLarge ? 'p-10' : 'p-8'
                  } ${
                    index === 0 ? 'justify-end' : 'justify-start'
                  }`}>
                    {/* Icon - positioned at top for all cards */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      index === 0 ? 'absolute top-10 left-10' : 'mb-auto'
                    } ${
                      index === 0 ? 'bg-white/10' : 
                      index === 3 ? 'bg-[#4A2B2D]/15' : 
                      'bg-[#F7F5F0]'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        index === 0 ? 'text-[#CBA052]' : 
                        index === 3 ? 'text-[#4A2B2D]' : 
                        'text-[#4A2B2D]'
                      }`} />
                    </div>
                    
                    {/* Content */}
                    <div className={index === 0 ? '' : 'mt-auto'}>
                      <div className="flex items-baseline gap-3 mb-3">
                        <span 
                          className={`font-bold drop-shadow-sm ${isLarge ? 'text-5xl md:text-6xl' : 'text-4xl'}`}
                          style={{ color: index === 0 ? '#FDEFD3' : index === 3 ? '#2B1A1C' : '#CBA052' }}
                        >
                          {area.stat}
                        </span>
                        <span 
                          className="text-sm font-medium"
                          style={{ color: index === 0 ? '#FFFFFF' : index === 3 ? '#2B1A1C' : '#595959' }}
                        >
                          {area.statLabel}
                        </span>
                      </div>
                      <h3 
                        className="text-lg font-bold mb-2" 
                        style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: index === 0 ? '#FFFFFF' : index === 3 ? '#2B1A1C' : '#4A2B2D' }}
                      >
                        {area.title}
                      </h3>
                      {isLarge && (
                        <p 
                          className="text-sm leading-relaxed line-clamp-3 hidden md:block"
                          style={{ color: index === 0 ? '#FFFFFF' : index === 3 ? '#2B1A1C' : '#595959' }}
                        >
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

      {/* Ways to Give — Flowing Cards */}
      <section className="py-24 bg-[#FCFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-[1px] bg-[#D4AF37]" />
              <span className="text-[#592D31] text-xs font-semibold tracking-[0.25em] uppercase">Ways to Give</span>
              <div className="w-16 h-[1px] bg-[#D4AF37]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#592D31]" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
              Choose Your Giving Method
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {methods.map((method, index) => {
              const Icon = iconMap[method.icon] || CreditCard
              const colors = [
                { gradient: 'from-[#592D31] to-[#6E3A3F]', light: 'bg-[#592D31]/5', text: 'text-[#592D31]' },
                { gradient: 'from-[#D4AF37] to-[#C9A431]', light: 'bg-[#D4AF37]/5', text: 'text-[#D4AF37]' },
                { gradient: 'from-[#7BA381] to-[#6E9475]', light: 'bg-[#7BA381]/5', text: 'text-[#7BA381]' },
              ][index]
              
              return (
                <div 
                  key={method.title} 
                  className="relative bg-white rounded-3xl p-8 hover:shadow-2xl hover:shadow-[#592D31]/10 transition-all duration-500 group"
                >
                  {/* Subtle gradient line at top */}
                  <div className={`absolute top-0 left-8 right-8 h-1 bg-gradient-to-r ${colors.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className={`w-14 h-14 rounded-2xl ${colors.light} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-bold text-[#592D31] mb-3" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>{method.title}</h3>
                  <p className="text-[#5C5252] mb-6 leading-relaxed text-sm">
                    {method.description}
                  </p>
                  {method.icon === 'credit-card' && (
                    <TithelyButton label="Give Online" className="w-full rounded-full" />
                  )}
                  {method.note && (
                    <p className="text-sm text-[#8A8080] bg-[#F4F0EA]/60 rounded-2xl px-4 py-3">{method.note}</p>
                  )}
                  {method.icon === 'mail' && (
                    <address className="text-sm text-[#8A8080] not-italic whitespace-pre-line bg-[#F4F0EA]/60 rounded-2xl px-4 py-3">
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
