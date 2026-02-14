'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import type { FAQ } from '@/types'

interface FAQAccordionProps {
  faqs: FAQ[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  // Default FAQs for demo
  const displayFaqs = faqs.length > 0 ? faqs : [
    {
      _id: '1',
      question: 'What should I wear?',
      answer: 'Come as you are! You\'ll see people in everything from jeans to suits. We want you to be comfortable.',
      category: 'visitors' as const,
    },
    {
      _id: '2',
      question: 'What about my kids?',
      answer: 'We have engaging, age-appropriate programs for children from nursery through 5th grade during all services. Our trained staff and volunteers create a safe, fun environment where kids learn about Jesus.',
      category: 'kids' as const,
    },
    {
      _id: '3',
      question: 'Where do I park?',
      answer: 'We have ample free parking in our main lot. Look for the "First Time Guest" signs for reserved spots near the entrance. Parking attendants will be happy to direct you.',
      category: 'visitors' as const,
    },
    {
      _id: '4',
      question: 'How long are the services?',
      answer: 'Our services typically last about 75-90 minutes. We start with contemporary worship music followed by a practical, Bible-based message.',
      category: 'services' as const,
    },
    {
      _id: '5',
      question: 'How can I get involved?',
      answer: 'We\'d love to help you find your place! Fill out a connection card or visit our Welcome Center after any service. We have ministry teams for every interest from worship to serving in our community.',
      category: 'involvement' as const,
    },
  ]

  return (
    <Accordion.Root
      type="single"
      collapsible
      className="divide-y divide-warm-200 border-t border-warm-200"
    >
      {displayFaqs.map((faq) => (
        <Accordion.Item
          key={faq._id}
          value={faq._id}
        >
          <Accordion.Header>
            <Accordion.Trigger className="w-full flex items-center justify-between py-5 text-left hover:text-primary transition-colors group">
              <span className="text-base font-semibold text-warm-900 pr-4 group-hover:text-primary transition-colors">
                {faq.question}
              </span>
              <ChevronDown className="w-5 h-5 text-warm-400 transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
            <div className="pb-5 text-warm-600 leading-relaxed text-sm">
              {faq.answer}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
