import { Metadata } from 'next'
import Image from 'next/image'
import { Heart, CreditCard, Mail, Video, ShieldCheck, Sparkles, CheckCircle } from 'lucide-react'
import { TithelyButton } from '@/components/giving'
import { client, givingPageQuery } from '@/lib/sanity'
import type { GivingPage } from '@/types'

export const metadata: Metadata = {
  title: 'Give | Restoring Life Family Community Center',
  description: 'Support the mission of Restoring Life Family Community Center through your generous giving.',
}

export const revalidate = 300

async function getGivingPageData(): Promise<GivingPage | null> {
  try {
    return await client.fetch<GivingPage>(givingPageQuery)
  } catch {
    return null
  }
}

export default async function GivePage() {
  const data = await getGivingPageData()

  const heroVerse = data?.heroVerse || 'Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.'
  const heroVerseRef = data?.heroVerseRef || '2 Corinthians 9:7'
  const mailingAddress = data?.mailingAddress || 'Restoring Life Family Community Center\n6916 Hillmeade Road\nGlenn Dale, MD 20769'

  return (
    <div className="bg-[#FAF7F1] min-h-screen text-[#251827]">
      {/* Hero Section — Clean, Human, Warm & Editorial */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-[#FAF7F1]">
        {/* Subtle dot matrix pattern & soft ambient light */}
        <div className="absolute inset-0 bg-[radial-gradient(#e6ddca_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary-light/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Heading, Scripture & Action */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E6DDCA] text-accent-dark text-xs font-semibold tracking-wider uppercase mb-6 shadow-xs">
                <Heart className="w-3.5 h-3.5 text-accent fill-accent/20" />
                Stewardship &amp; Generosity
              </span>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                Support the Mission of RLFCC
              </h1>

              <p className="text-base sm:text-lg text-[#5C525C] leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                Thank you for partnering with Restoring Life Family Community Center. Your giving helps us share the gospel, minister through live online worship, and build a loving, Christ-centered community.
              </p>

              {/* Scripture Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E6DDCA] shadow-xs mb-8 text-left relative overflow-hidden">
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-accent" />
                <p className="text-base sm:text-lg text-[#251827] italic leading-relaxed font-serif">
                  &ldquo;{heroVerse}&rdquo;
                </p>
                <p className="text-accent-dark text-xs font-bold mt-2 uppercase tracking-wider">
                  — {heroVerseRef}
                </p>
              </div>

              {/* Primary Action Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <TithelyButton
                  label="Give Online Now"
                  className="w-full sm:w-auto px-10 py-4 bg-accent hover:bg-accent-dark text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 text-base"
                />
                <a
                  href="#ways-to-give"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl border border-[#E6DDCA] bg-white hover:bg-[#FAF7F1] text-primary font-semibold text-sm transition-colors"
                >
                  Other Ways to Give
                </a>
              </div>
            </div>

            {/* Right Column: Warm Visual Image Patch */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden border border-[#E6DDCA] shadow-lg">
                <Image
                  src="/images/sermons/sermon_prayer.jpg"
                  alt="Generosity and Stewardship at RLFCC"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/60 via-transparent to-transparent" />
              </div>

              {/* Layered Tax Statement Pill */}
              <div className="sm:absolute -bottom-6 -left-6 mt-4 sm:mt-0 max-w-xs bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-[#E6DDCA] shadow-md">
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider">Tax-Deductible</p>
                    <p className="text-xs font-medium text-[#5C525C]">501(c)(3) Nonprofit</p>
                  </div>
                </div>
                <p className="text-[11px] text-[#5C525C] leading-normal">
                  All donations are tax-deductible to the fullest extent permitted by law.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Give Section — 3 Simple, Clear Options */}
      <section id="ways-to-give" className="py-20 bg-white border-y border-[#E6DDCA] scroll-mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-dark block mb-2">
              Simple Options
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              Ways to Give
            </h2>
            <p className="text-[#5C525C] text-base max-w-xl mx-auto mt-3">
              Choose the method of giving that works best for you and your family.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Method 1: Online Giving */}
            <div className="p-8 rounded-2xl bg-[#FAF7F1] border border-[#E6DDCA] flex flex-col justify-between shadow-xs hover:border-primary/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#251827] mb-3">
                  Online Giving
                </h3>
                <p className="text-sm text-[#5C525C] leading-relaxed mb-6">
                  Fast, secure digital giving using your debit card, credit card, or bank transfer. Give once or set up recurring gifts.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E6DDCA]">
                <TithelyButton label="Give Online" className="w-full rounded-lg" />
              </div>
            </div>

            {/* Method 2: During Live Service */}
            <div className="p-8 rounded-2xl bg-[#FAF7F1] border border-[#E6DDCA] flex flex-col justify-between shadow-xs hover:border-primary/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center text-accent-dark mb-6">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#251827] mb-3">
                  Live Gatherings
                </h3>
                <p className="text-sm text-[#5C525C] leading-relaxed mb-6">
                  You can give during our Sunday Worship Service (4:00 PM) or Thursday Bible Study (7:30 PM) via the giving links shared in the live Zoom chat.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E6DDCA]">
                <a
                  href="/events"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-[#E6DDCA] bg-white text-primary font-semibold text-sm hover:bg-[#FAF7F1] transition-colors"
                >
                  View Service Times
                </a>
              </div>
            </div>

            {/* Method 3: Mail-in Check */}
            <div className="p-8 rounded-2xl bg-[#FAF7F1] border border-[#E6DDCA] flex flex-col justify-between shadow-xs hover:border-primary/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sage/15 flex items-center justify-center text-sage-dark mb-6">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#251827] mb-3">
                  Mail a Check
                </h3>
                <p className="text-sm text-[#5C525C] leading-relaxed mb-4">
                  Please make checks payable to <span className="font-semibold text-[#251827]">Restoring Life Family Community Center</span> and mail to:
                </p>
                <div className="bg-white p-3 rounded-lg border border-[#E6DDCA] text-xs font-mono text-[#5C525C] whitespace-pre-line leading-relaxed mb-6">
                  {mailingAddress}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E6DDCA]">
                <a
                  href="/contact"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-[#E6DDCA] bg-white text-primary font-semibold text-sm hover:bg-[#FAF7F1] transition-colors"
                >
                  Contact Ministry Office
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Deductibility & Stewardship Statement */}
      <section className="py-16 bg-[#FAF7F1]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 rounded-2xl bg-white border border-[#E6DDCA] shadow-xs">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#251827] mb-2">
              Tax-Deductible 501(c)(3) Organization
            </h3>
            <p className="text-sm text-[#5C525C] max-w-xl mx-auto leading-relaxed">
              Restoring Life Family Community Center is a registered 501(c)(3) nonprofit religious organization. All donations are tax-deductible to the fullest extent permitted by law. Donors will receive a contribution statement for tax records.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
