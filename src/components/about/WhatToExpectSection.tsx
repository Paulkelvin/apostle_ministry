'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Video, Clock, Smile, Users, HelpCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface FaqItem {
  question: string
  answer: string
  highlight?: string
}

const faqs: FaqItem[] = [
  {
    question: 'How do weekly gatherings work at RLFCC?',
    answer: 'We gather virtually every Sunday afternoon at 4:00 PM for live worship, heartfelt prayer, and biblical preaching, followed by friendly community fellowship. On Thursday evenings at 7:30 PM, we host our interactive online Bible study where anyone can ask questions and study Scripture together.',
    highlight: 'Sunday Worship: 4:00 PM &bull; Thursday Bible Study: 7:30 PM (Zoom)',
  },
  {
    question: 'What is the atmosphere like during online services?',
    answer: 'Warm, uplifting, and Christ-centered. You will hear praise and worship, a spirit-filled message from our pastoral team, and have the opportunity to engage in the chat or turn on your camera if you wish. You can participate actively or simply listen and be blessed.',
    highlight: 'Come as you are from the comfort of home',
  },
  {
    question: 'Do I have to dress up or turn my camera on?',
    answer: 'Not at all! Whether you join in your Sunday best or comfortable casual attire, you are welcomed with open arms. Turning your camera on or off is completely up to your personal comfort level.',
    highlight: 'No dress code &bull; Free participation',
  },
  {
    question: 'How can I connect with the pastors or request personal prayer?',
    answer: 'We believe prayer is essential. You can submit prayer requests directly through our Contact page, message our pastoral team, or stay online after any service for personal prayer and encouragement.',
    highlight: 'Pastoral team is here to support and pray with you',
  },
  {
    question: 'Is RLFCC open to newcomers and first-time guests?',
    answer: 'Absolutely yes! Everyone belongs here, regardless of your background or where you are on your spiritual journey. We would be honored to have you worship with our church family.',
    highlight: 'Everyone has a seat at the table',
  },
]

export function WhatToExpectSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section className="py-24 bg-white border-y border-[#E6DDCA] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F1] border border-[#E6DDCA] text-accent-dark text-xs font-semibold tracking-wider uppercase mb-4 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-accent" />
            New Here?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            What to Expect
          </h2>
          <p className="text-[#5C525C] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Everything you need to know before joining us for worship and fellowship.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#FAF7F1] border-primary/30 shadow-xs'
                    : 'bg-white border-[#E6DDCA] hover:border-warm-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-display text-lg sm:text-xl font-bold text-[#251827]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-[#E6DDCA] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-primary text-white rotate-180 border-primary' : 'bg-white text-[#5C525C]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-[#5C525C] text-base sm:text-[16px] leading-relaxed border-t border-[#E6DDCA]/60 mt-1">
                        <p className="mb-4">{faq.answer}</p>
                        {faq.highlight && (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#E6DDCA] text-xs font-semibold text-primary">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            <span dangerouslySetInnerHTML={{ __html: faq.highlight }} />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Quick Join Card */}
        <div className="mt-12 p-8 rounded-3xl bg-[#FAF7F1] border border-[#E6DDCA] text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#251827] mb-1">
              Ready to experience our worship gathering?
            </h3>
            <p className="text-sm text-[#5C525C]">
              Join us live this Sunday at 4:00 PM via Zoom. We can&apos;t wait to meet you!
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-dark text-white font-bold text-sm shadow-sm transition-all duration-300 shrink-0"
          >
            Gather With Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
