'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Mail, User, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui'

export function ContactForm() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')

    // Simulate form submission - replace with actual API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setFormState('success')
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' })
    } catch {
      setFormState('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (formState === 'success') {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-10 shadow-sm border border-warm-200/50 text-center">
        <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-sage-dark" />
        </div>
        <h3 className="text-2xl font-bold text-warm-900 mb-2">Message Sent!</h3>
        <p className="text-warm-600 mb-6">
          Thank you for reaching out. We&apos;ll get back to you as soon as possible.
        </p>
        <Button onClick={() => setFormState('idle')} variant="outline">
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-warm-200/40 shadow-sm">
      <h2 className="text-2xl md:text-3xl font-bold text-warm-900 mb-1">Get in Touch</h2>
      <p className="text-warm-500 mb-8 text-sm">You can reach us anytime</p>

      {formState === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">Something went wrong. Please try again.</p>
        </div>
      )}

      <div className="space-y-4">
        {/* First & Last Name */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-300" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-warm-200/60 bg-white/80 focus:bg-white focus:border-primary/40 focus:ring-1 focus:ring-primary/10 transition-all text-warm-900 placeholder:text-warm-400 text-sm outline-none"
              placeholder="First name"
            />
          </div>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-warm-200/60 bg-white/80 focus:bg-white focus:border-primary/40 focus:ring-1 focus:ring-primary/10 transition-all text-warm-900 placeholder:text-warm-400 text-sm outline-none"
            placeholder="Last name"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-300" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-warm-200/60 bg-white/80 focus:bg-white focus:border-primary/40 focus:ring-1 focus:ring-primary/10 transition-all text-warm-900 placeholder:text-warm-400 text-sm outline-none"
            placeholder="Your email"
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-300" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-warm-200/60 bg-white/80 focus:bg-white focus:border-primary/40 focus:ring-1 focus:ring-primary/10 transition-all text-warm-900 placeholder:text-warm-400 text-sm outline-none"
            placeholder="Phone number"
          />
        </div>

        {/* Message */}
        <div className="relative">
          <MessageCircle className="absolute left-3.5 top-3.5 w-4 h-4 text-warm-300" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            maxLength={500}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-warm-200/60 bg-white/80 focus:bg-white focus:border-primary/40 focus:ring-1 focus:ring-primary/10 transition-all resize-none text-warm-900 placeholder:text-warm-400 text-sm outline-none"
            placeholder="How can we help?"
          />
          <span className="absolute bottom-3 right-4 text-[11px] text-warm-400">
            {formData.message.length}/500
          </span>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={formState === 'submitting'}
        >
          {formState === 'submitting' ? (
            <>
              <span className="animate-spin mr-2">&#8987;</span>
              Sending...
            </>
          ) : (
            <>
              Submit
              <Send className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>

        <p className="text-center text-xs text-warm-400">
          By contacting us, you agree to our{' '}
          <a href="#" className="font-semibold text-warm-600 hover:text-primary">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="font-semibold text-warm-600 hover:text-primary">Privacy Policy</a>
        </p>
      </div>
    </form>
  )
}
