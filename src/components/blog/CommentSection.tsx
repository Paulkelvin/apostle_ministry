'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, User, Mail, Loader2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Comment } from '@/types'

interface CommentSectionProps {
  postId: string
  comments: Comment[]
}

export function CommentSection({ postId, comments: initialComments }: CommentSectionProps) {
  const [comments] = useState<Comment[]>(initialComments)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !text) return

    setStatus('loading')
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, text, postId }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message)
        setName('')
        setEmail('')
        setText('')
      } else {
        setStatus('error')
        setMessage(data.error)
      }
    } catch {
      setStatus('error')
      setMessage('Failed to submit. Please try again.')
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="w-6 h-6 text-[#6A3B3F]" />
        <h2 className="text-2xl font-bold text-[#292121]">
          Comments {comments.length > 0 && `(${comments.length})`}
        </h2>
      </div>

      {/* Existing comments */}
      {comments.length > 0 && (
        <div className="space-y-6 mb-10">
          {comments.map((comment, i) => (
            <motion.div
              key={comment._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#FDFBF7] rounded-xl p-6 border border-[#DCCFC0]/40"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-[#E6D8C8] flex items-center justify-center">
                  <span className="text-sm font-bold text-[#6A3B3F]">
                    {comment.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#292121]">{comment.name}</p>
                  {comment.createdAt && (
                    <p className="text-xs text-[#968B89]">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-[#665A58] text-sm leading-relaxed">{comment.text}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Comment form */}
      <div className="bg-[#FDFBF7] rounded-2xl p-6 sm:p-8 border border-[#DCCFC0]/40">
        <h3 className="text-lg font-bold text-[#292121] mb-6">Leave a Comment</h3>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <div className="w-14 h-14 rounded-full bg-[#E6D8C8] flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-7 h-7 text-[#6A3B3F]" />
              </div>
              <p className="text-[#292121] font-semibold mb-1">{message}</p>
              <p className="text-sm text-[#968B89]">We review comments before publishing.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 text-sm text-[#6A3B3F] font-medium hover:underline"
              >
                Write another comment
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#968B89]" />
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DCCFC0] bg-white text-sm text-[#292121] placeholder-[#968B89] outline-none focus:border-[#6A3B3F] focus:ring-2 focus:ring-[#6A3B3F]/10 transition-all"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#968B89]" />
                  <input
                    type="email"
                    placeholder="Your email (won't be published)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DCCFC0] bg-white text-sm text-[#292121] placeholder-[#968B89] outline-none focus:border-[#6A3B3F] focus:ring-2 focus:ring-[#6A3B3F]/10 transition-all"
                  />
                </div>
              </div>
              <textarea
                placeholder="Share your thoughts..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                maxLength={1000}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-[#DCCFC0] bg-white text-sm text-[#292121] placeholder-[#968B89] outline-none focus:border-[#6A3B3F] focus:ring-2 focus:ring-[#6A3B3F]/10 transition-all resize-none"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#968B89]">{text.length}/1000</span>
                <button
                  type="submit"
                  disabled={status === 'loading' || !name || !email || !text}
                  className="px-6 py-2.5 rounded-xl bg-[#6A3B3F] text-white font-semibold text-sm hover:bg-[#4A2629] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {status === 'loading' ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
              {status === 'error' && (
                <p className="text-red-500 text-sm">{message}</p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
