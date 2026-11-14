'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, Sparkles, Users, Church, Compass } from 'lucide-react'

export function StorySection() {
  return (
    <section className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      {/* Delicate dot grid and warm ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#ebe3d5_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-primary/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with Cathedral Arch Silhouette & Layered Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-t-[3.5rem] rounded-b-3xl overflow-hidden border border-[#EBE3D5] shadow-md">
              <Image
                src="/images/events/fellowship.jpg"
                alt="Restoring Life Christian Fellowship"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/60 via-transparent to-transparent" />
            </div>

            {/* Floating Cathedral Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="sm:absolute -bottom-6 -right-6 mt-4 sm:mt-0 max-w-xs bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-[#EBE3D5] shadow-md"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center text-sage-dark border border-sage/20">
                  <Heart className="w-5 h-5 fill-sage/20 text-sage-dark" />
                </div>
                <div>
                  <p className="text-xs font-bold text-sage-dark uppercase tracking-wider">Our Heart</p>
                  <p className="text-sm font-display font-semibold text-[#221524]">Spiritual Restoration</p>
                </div>
              </div>
              <p className="text-xs text-[#584E59] leading-relaxed">
                Dedicated to healing, nurturing agape love, and equipping every believer to walk victoriously in Christ.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Narrative Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EBE3D5] text-accent-dark text-xs font-semibold tracking-wider uppercase mb-5 w-fit shadow-xs">
              <span className="text-accent">✦</span>
              The Heart Behind RLFCC
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight">
              A Christ-Centered Sanctuary for Every Soul
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#584E59] leading-relaxed">
              <p>
                At <strong className="text-[#221524] font-semibold">Restoring Life Family Community Center</strong>, we believe the church is not merely an hour on Sunday, but a living, breathing spiritual family united in Jesus Christ.
              </p>
              <p>
                Whether you are joining us for weekly Sunday worship, diving into the Word during Thursday evening Bible study, or seeking prayer in a season of transition, our ministry is open with warm arms and open hearts.
              </p>
              <p>
                We are committed to sharing the uncompromised gospel of Jesus Christ: His life, death, resurrection, and constant intercession for us, while experiencing the sweet communion, peace, and power of the Holy Spirit.
              </p>
            </div>

            {/* Key Highlights Row with Sage & Gold Tones */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-[#EBE3D5]">
              <div className="p-4 rounded-2xl bg-white border border-[#EBE3D5]">
                <p className="font-display text-2xl font-bold text-primary">Live</p>
                <p className="text-xs text-[#584E59] font-medium mt-0.5">Interactive Gatherings</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#EBE3D5]">
                <p className="font-display text-2xl font-bold text-sage-dark">Biblical</p>
                <p className="text-xs text-[#584E59] font-medium mt-0.5">Spirit-Filled Teaching</p>
              </div>
              <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-white border border-[#EBE3D5]">
                <p className="font-display text-2xl font-bold text-accent-dark">Agape</p>
                <p className="text-xs text-[#584E59] font-medium mt-0.5">Unconditional Love</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
