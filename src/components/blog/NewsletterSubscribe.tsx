'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function NewsletterSubscribe() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message)
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error)
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }

    // Reset after 5s
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <div className="bg-[#FDFBF7] rounded-xl p-6 text-center border border-[#DCCFC0]/60 shadow-[0_2px_12px_rgba(41,33,33,0.06)]">
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-[#292121] mb-1">
          Stay Connected
        </h3>
        <p className="text-[#665A58] text-[13px] mb-4">
          Get devotionals, updates, and stories delivered to your inbox.
        </p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 text-[#6A3B3F]"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{message}</span>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-[#F0E6D8] border border-[#DCCFC0] text-[#292121] placeholder-[#968B89] text-sm outline-none focus:border-[#6A3B3F] focus:ring-2 focus:ring-[#6A3B3F]/10 transition-all"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-5 py-2.5 rounded-lg bg-[#6A3B3F] text-white font-semibold text-sm hover:bg-[#82494E] cursor-pointer transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5" />
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {status === 'error' && (
          <p className="text-red-500 text-xs mt-2">{message}</p>
        )}
      </div>
    </div>
  )
}
