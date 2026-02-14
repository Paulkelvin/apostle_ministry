import { Metadata } from 'next'
import { Heart, CreditCard, Building2, Mail } from 'lucide-react'
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

  const heroTitle = data?.heroTitle || 'Give Generously'
  const heroVerse = data?.heroVerse || 'Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.'
  const heroVerseRef = data?.heroVerseRef || '2 Corinthians 9:7'
  const whyHeading = data?.whyWeGiveHeading || 'Why We Give'
  const whySubtext = data?.whyWeGiveSubtext || "Your generosity makes an eternal impact. Here's how your gifts are used:"
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

  const methodColors = ['primary', 'accent', 'sage']
  const methodIconColors = ['text-primary', 'text-accent-dark', 'text-sage-dark']
  const methodBgColors = ['bg-primary/10', 'bg-accent/10', 'bg-sage/10']

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 text-white/90" />
          <h1 className="text-5xl font-bold mb-6 tracking-tight">{heroTitle}</h1>
          <blockquote className="text-xl text-white/90 italic mb-8">
            &ldquo;{heroVerse}&rdquo;
            <cite className="block text-white/80 text-lg mt-2 not-italic">— {heroVerseRef}</cite>
          </blockquote>
          <TithelyButton 
            label="Give Now" 
            className="text-lg px-10 py-5" 
          />
        </div>
      </section>

      {/* Why We Give */}
      <section className="py-20 bg-[#F0E6D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#292121] mb-4">{whyHeading}</h2>
            <p className="text-[#665A58] text-lg max-w-2xl mx-auto">
              {whySubtext}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {breakdown.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 shadow-md text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{item.percentage}</div>
                <h3 className="text-xl font-bold text-[#292121] mb-3">{item.title}</h3>
                <p className="text-[#665A58]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#292121] mb-4">Other Ways to Give</h2>
            <p className="text-[#665A58] text-lg">
              Choose the giving method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {methods.map((method, index) => {
              const Icon = iconMap[method.icon] || CreditCard
              return (
                <div key={method.title} className="border-2 border-[#DCCFC0] rounded-2xl p-8 hover:border-primary transition-colors">
                  <div className={`w-14 h-14 rounded-full ${methodBgColors[index] || 'bg-primary/10'} flex items-center justify-center mb-6`}>
                    <Icon className={`w-7 h-7 ${methodIconColors[index] || 'text-primary'}`} />
                  </div>
                  <h3 className="text-xl font-bold text-[#292121] mb-3">{method.title}</h3>
                  <p className="text-[#665A58] mb-6">
                    {method.description}
                  </p>
                  {method.icon === 'credit-card' && (
                    <TithelyButton label="Give Online" className="w-full" />
                  )}
                  {method.note && (
                    <p className="text-sm text-[#968B89]">{method.note}</p>
                  )}
                  {method.icon === 'mail' && (
                    <address className="text-sm text-[#968B89] not-italic whitespace-pre-line">
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
      <section className="py-12 bg-[#F0E6D8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#665A58]">
            {taxStatement}
          </p>
        </div>
      </section>
    </>
  )
}
