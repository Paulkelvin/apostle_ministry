import { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, Headset, MessageSquare, Newspaper, ExternalLink, ArrowRight } from 'lucide-react'
import { client, faqQuery, serviceTimesQuery } from '@/lib/sanity'
import { ContactForm, FAQAccordion, InteractiveMap } from '@/components/contact'
import type { FAQ, ServiceTimes } from '@/types'

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Contact Us | Restoring Life Family Community Center',
  description: 'Get in touch with Restoring Life Family Community Center. Find our location, service times, and answers to frequently asked questions.',
}

async function getContactPageData() {
  try {
    const [faqs, serviceTimes] = await Promise.all([
      client.fetch<FAQ[]>(faqQuery),
      client.fetch<ServiceTimes>(serviceTimesQuery),
    ])
    return { faqs, serviceTimes }
  } catch {
    return { faqs: [], serviceTimes: null }
  }
}

export default async function ContactPage() {
  const { faqs, serviceTimes } = await getContactPageData()

  return (
    <>
      {/* Contact Hero + Form Section */}
      <section className="pt-32 pb-20 bg-warm-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Contact Info */}
            <div className="pt-4 lg:pt-8">
              <span className="inline-block text-accent-dark text-xs font-semibold tracking-[0.2em] uppercase mb-4">Reach Out</span>
              <h1 className="font-display text-5xl md:text-6xl font-semibold text-primary mb-6 leading-[1.1]">
                Contact Us
              </h1>
              <p className="text-lg text-ink mb-10 max-w-md leading-relaxed">
                Email, call, or complete the form to learn how
                Restoring Life Family Community Center can serve you.
              </p>

              <div className="space-y-4 mb-10">
                <a
                  href={`mailto:${serviceTimes?.email || 'admin@rflcc.org'}`}
                  className="flex items-center gap-4 p-3 -ml-3 rounded-lg text-ink hover:bg-white hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-warm-100 border border-warm-200 flex items-center justify-center">
                    <Mail className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-warm-500 block">Email</span>
                    <span className="font-medium">{serviceTimes?.email || 'admin@rflcc.org'}</span>
                  </div>
                </a>
                <a
                  href={`tel:${serviceTimes?.phoneNumber || '+12025039579'}`}
                  className="flex items-center gap-4 p-3 -ml-3 rounded-lg text-ink hover:bg-white hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-warm-100 border border-warm-200 flex items-center justify-center">
                    <Phone className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-warm-500 block">Phone</span>
                    <span className="font-medium">{serviceTimes?.phoneNumber || '(202) 503-9579'}</span>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-3 -ml-3 rounded-lg text-ink">
                  <div className="w-10 h-10 rounded-lg bg-warm-100 border border-warm-200 flex items-center justify-center">
                    <Clock className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-warm-500 block">Office Hours</span>
                    <span className="font-medium">Mon – Fri, 9:00 AM – 5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form Card — transparent bg to blend */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards Row */}
      <section className="py-16 bg-[#FCFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white border border-warm-200 shadow-[--shadow-card] hover:shadow-[--shadow-card-hover] transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-warm-100 flex items-center justify-center">
                  <Headset className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-warm-900">Pastoral Support</h3>
              </div>
              <p className="text-warm-600 text-sm leading-relaxed">
                Our pastoral team is available to address any spiritual concerns, prayer
                requests, or questions you may have.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-warm-200 shadow-[--shadow-card] hover:shadow-[--shadow-card-hover] transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-warm-100 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-warm-900">Feedback &amp; Suggestions</h3>
              </div>
              <p className="text-warm-600 text-sm leading-relaxed">
                We value your feedback and are continuously working to improve
                our ministry. Your input helps shape our community.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-warm-200 shadow-[--shadow-card] hover:shadow-[--shadow-card-hover] transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-warm-100 flex items-center justify-center">
                  <Newspaper className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-warm-900">Media Inquiries</h3>
              </div>
              <p className="text-warm-600 text-sm leading-relaxed">
                For media-related questions or press inquiries, please contact us
                at <a href="mailto:media@theapostlesministry.org" className="text-primary hover:underline font-medium">media@theapostlesministry.org</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Location Section */}
      <section id="directions" className="py-20 bg-warm-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-accent-dark text-xs font-semibold tracking-[0.2em] uppercase mb-3">Visit Us</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary leading-tight">
              Come Worship With Us
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-start">
            {/* Interactive Map with Directions */}
            <InteractiveMap
              churchAddress={serviceTimes?.address || 'High Calling Ministries, 401-A Prince Georges Blvd, Upper Marlboro, MD 20774'}
            />

            {/* Compact Location Details Card */}
            <div className="bg-white rounded-xl p-6 shadow-[--shadow-card] border border-warm-200 lg:self-center">
              <h3 className="font-semibold text-warm-900 text-lg mb-2">
                {serviceTimes?.locationName || 'Main Campus'}
              </h3>
              <p className="text-warm-600 text-sm whitespace-pre-line leading-relaxed mb-4">
                {serviceTimes?.address || 'High Calling Ministries\n401-A Prince George\'s Blvd\nUpper Marlboro, MD 20774'}
              </p>

              <div className="h-px bg-warm-100 mb-4" />

              <div className="flex flex-col gap-2 mb-5">
                <a
                  href={`tel:${serviceTimes?.phoneNumber || '+1234567890'}`}
                  className="flex items-center gap-2.5 text-sm text-ink hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 text-warm-500" />
                  {serviceTimes?.phoneNumber || '(202) 503-9579'}
                </a>
                <a
                  href={`mailto:${serviceTimes?.email || 'admin@rflcc.org'}`}
                  className="flex items-center gap-2.5 text-sm text-ink hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 text-warm-500" />
                  {serviceTimes?.email || 'admin@rflcc.org'}
                </a>
              </div>

              <a
                href={serviceTimes?.googleMapsLink || 'https://maps.google.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm bg-primary/5 hover:bg-primary/10 text-primary font-semibold px-4 py-2 rounded-lg transition-colors group"
              >
                Open in Google Maps
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
            {/* Left: FAQ Heading */}
            <div className="lg:sticky lg:top-28">
              <span className="inline-block text-accent-dark text-xs font-semibold tracking-[0.2em] uppercase mb-3">FAQ</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-4 leading-tight">
                Common Questions
              </h2>
              <p className="text-warm-600 leading-relaxed mb-6">
                Find answers to the most frequently asked questions about our ministry and services.
              </p>
              <a href={`mailto:${serviceTimes?.email || 'admin@rflcc.org'}`} className="text-primary hover:text-primary-dark font-medium text-sm inline-flex items-center gap-1.5 group">
                Still have questions? Email us
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Right: Accordion */}
            <div>
              <FAQAccordion faqs={faqs} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

