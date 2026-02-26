import { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, Headset, MessageSquare, Newspaper, ExternalLink, ArrowRight } from 'lucide-react'
import { client, faqQuery, serviceTimesQuery } from '@/lib/sanity'
import { ContactForm, FAQAccordion, DirectionsForm } from '@/components/contact'
import type { FAQ, ServiceTimes } from '@/types'

export const metadata: Metadata = {
  title: 'Contact Us | The Apostles Ministry',
  description: 'Get in touch with The Apostles Ministry. Find our location, service times, and answers to frequently asked questions.',
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
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#F4F0EA] via-[#FCFBF9] to-[#FFFFFF] relative overflow-hidden">
        {/* Subtle decorative blobs */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-primary/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-accent/[0.05] rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Contact Info */}
            <div className="pt-4 lg:pt-8">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Reach Out</span>
              <h1 className="text-5xl md:text-6xl font-bold text-[#592D31] mb-6 tracking-tight leading-[1.1]">
                Contact Us
              </h1>
              <p className="text-lg text-[#332D2D] mb-10 max-w-md leading-relaxed">
                Email, call, or complete the form to learn how
                The Apostles Ministry can serve you.
              </p>

              <div className="space-y-4 mb-10">
                <a
                  href={`mailto:${serviceTimes?.email || 'admin@rflcc.org'}`}
                  className="flex items-center gap-4 p-3 -ml-3 rounded-xl text-[#332D2D] hover:bg-white/60 hover:text-primary transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <Mail className="w-4.5 h-4.5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <span className="text-xs text-[#8A8080] block">Email</span>
                    <span className="font-medium">{serviceTimes?.email || 'admin@rflcc.org'}</span>
                  </div>
                </a>
                <a
                  href={`tel:${serviceTimes?.phoneNumber || '+12025039579'}`}
                  className="flex items-center gap-4 p-3 -ml-3 rounded-xl text-[#332D2D] hover:bg-white/60 hover:text-primary transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                    <Phone className="w-4.5 h-4.5 text-accent-dark group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <span className="text-xs text-[#8A8080] block">Phone</span>
                    <span className="font-medium">{serviceTimes?.phoneNumber || '(202) 503-9579'}</span>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-3 -ml-3 rounded-xl text-[#332D2D]">
                  <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center">
                    <Clock className="w-4.5 h-4.5 text-sage-dark" />
                  </div>
                  <div>
                    <span className="text-xs text-[#8A8080] block">Office Hours</span>
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
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#fdf2f2] to-white border border-primary/[0.08] hover:border-primary/20 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <Headset className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-[#592D31]">Pastoral Support</h3>
              </div>
              <p className="text-[#332D2D] text-sm leading-relaxed">
                Our pastoral team is available to address any spiritual concerns, prayer 
                requests, or questions you may have.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#fdf8f0] to-white border border-accent/[0.1] hover:border-accent/20 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                  <MessageSquare className="w-5 h-5 text-accent-dark" />
                </div>
                <h3 className="font-bold text-[#592D31]">Feedback &amp; Suggestions</h3>
              </div>
              <p className="text-[#332D2D] text-sm leading-relaxed">
                We value your feedback and are continuously working to improve 
                our ministry. Your input helps shape our community.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#f0f5f1] to-white border border-sage/[0.1] hover:border-sage/20 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center group-hover:bg-sage/15 transition-colors">
                  <Newspaper className="w-5 h-5 text-sage-dark" />
                </div>
                <h3 className="font-bold text-[#592D31]">Media Inquiries</h3>
              </div>
              <p className="text-[#332D2D] text-sm leading-relaxed">
                For media-related questions or press inquiries, please contact us 
                at <a href="mailto:media@theapostlesministry.org" className="text-primary hover:underline font-medium">media@theapostlesministry.org</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Location Section */}
      <section id="directions" className="py-20 bg-gradient-to-b from-[#FCFBF9] via-[#F4F0EA] to-[#E0D8D2] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">Visit Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#592D31] leading-tight">
              Come Worship With Us
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            {/* Map Embed */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-[420px] ring-1 ring-[#E0D8D2]/60">
              <iframe
                src={
                  serviceTimes?.googleMapsLink
                    ? serviceTimes.googleMapsLink.includes('embed')
                      ? serviceTimes.googleMapsLink
                      : `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9!2d-73.935242!3d40.730610!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQzJzUwLjIiTiA3M8KwNTYnMDYuOSJX!5e0!3m2!1sen!2sus!4v1700000000000`
                    : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9503079893093!2d-73.93524268459392!3d40.73061077932937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2590fe71c4f37%3A0x89c92e7f1e4e2e1a!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus'
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Church Location Map"
              />
            </div>

            {/* Location Details Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#F4F0EA] flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-[#592D31] text-xl mb-3">
                    {serviceTimes?.locationName || 'Main Campus'}
                  </h3>
                  <p className="text-[#332D2D] whitespace-pre-line leading-relaxed">
                    {serviceTimes?.address || 'High Calling Ministries\n401-A Prince George\'s Blvd\nUpper Marlboro, MD 20774'}
                  </p>
                </div>

                <div className="h-px bg-[#F4F0EA]" />

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-[#332D2D]">
                    <Phone className="w-4 h-4 text-[#8A8080]" />
                    <a
                      href={`tel:${serviceTimes?.phoneNumber || '+1234567890'}`}
                      className="hover:text-primary transition-colors"
                    >
                      {serviceTimes?.phoneNumber || '(202) 503-9579'}
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-[#332D2D]">
                    <Mail className="w-4 h-4 text-[#8A8080]" />
                    <a
                      href={`mailto:${serviceTimes?.email || 'admin@rflcc.org'}`}
                      className="hover:text-primary transition-colors"
                    >
                      {serviceTimes?.email || 'admin@rflcc.org'}
                    </a>
                  </div>
                </div>

                <a
                  href={serviceTimes?.googleMapsLink || 'https://maps.google.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary/5 hover:bg-primary/10 text-primary font-semibold px-5 py-2.5 rounded-xl transition-colors group w-fit"
                >
                  Open in Maps
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <DirectionsForm
                  churchAddress={serviceTimes?.address || 'High Calling Ministries, 401-A Prince Georges Blvd, Upper Marlboro, MD 20774'}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-[#f5f0ea] to-[#faf5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
            {/* Left: FAQ Heading */}
            <div className="lg:sticky lg:top-28">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1C1B1A] mb-4 leading-tight">
                Common Questions
              </h2>
              <p className="text-[#5F5B55] leading-relaxed mb-6">
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
