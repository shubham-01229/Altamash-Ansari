// src/pages/Contact.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Download,
  ArrowUpRight,
  Send,
  CheckCircle,
} from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import PrimaryButton from '../components/ui/PrimaryButton'
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from '../hooks/useScrollReveal'
import { cn } from '../utils/cn'

const contactDetails = [
  {
    icon: Mail,
    label: 'Email',
    value: '[email@placeholder.com]',
    href: 'mailto:email@placeholder.com',
    note: 'Replace with real email',
  },
  {
    icon: Phone,
    label: 'Phone / WhatsApp',
    value: '[+91 XXXXX XXXXX]',
    href: '#',
    note: 'Replace with WhatsApp number',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Altamash Ansari',
    href: '#',
    note: 'Replace with LinkedIn profile URL',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@[handle]',
    href: '#',
    note: 'Replace with Instagram handle',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Wire up to real form backend (Formspree, EmailJS, etc.) in Stage 05
    await new Promise(resolve => setTimeout(resolve, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ── 1. LARGE HERO HEADER ── */}
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="font-heading font-semibold text-xs tracking-[0.15em] uppercase text-ice-cyan/90 block mb-3"
          >
            Get in Touch
          </motion.span>
          <motion.h1
            variants={fadeUp}
            custom={0.08}
            className="font-heading font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4"
          >
            Let's Create Something<br />
            <span className="text-ice-cyan">Influential.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={0.16}
            className="font-body text-sm sm:text-base text-white/70 leading-relaxed max-w-lg mx-auto"
          >
            Whether you're a brand looking for your next campaign or a creator wanting to collaborate — let's talk.
          </motion.p>
        </motion.div>

        {/* ── 2. MAIN 5-COL GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* LEFT — Contact Form (col-span-3) */}
          <motion.div
            className="lg:col-span-3"
            initial="hidden"
            animate="visible"
            variants={slideInLeft}
            custom={0.1}
          >
            <GlassCard variant="lg" className="h-full">
              {submitted ? (
                /* Success State */
                <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shadow-glow">
                    <CheckCircle size={32} className="text-ice-cyan" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-2xl sm:text-3xl">
                    Message Sent!
                  </h3>
                  <p className="font-body text-white/70 text-sm max-w-sm leading-relaxed">
                    Thanks for reaching out. I'll get back to you within 24–48 hours.
                  </p>
                  <PrimaryButton
                    onClick={handleReset}
                    variant="ghost"
                    size="md"
                    className="mt-2"
                  >
                    Send Another
                  </PrimaryButton>
                </div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-6">
                    <h2 className="font-heading font-bold text-white text-xl sm:text-2xl mb-1">
                      Send a Message
                    </h2>
                    <p className="font-body text-white/50 text-xs">
                      Fill out the form below and I'll respond as soon as possible.
                    </p>
                  </div>

                  {/* 2-Col: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-name"
                        className="font-heading font-semibold text-[10px] tracking-widest uppercase text-white/60"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="glass border border-white/20 rounded-2xl px-4 py-3 font-body text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/50 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-email"
                        className="font-heading font-semibold text-[10px] tracking-widest uppercase text-white/60"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="glass border border-white/20 rounded-2xl px-4 py-3 font-body text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-subject"
                      className="font-heading font-semibold text-[10px] tracking-widest uppercase text-white/60"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Influencer Campaign Inquiry"
                      required
                      className="glass border border-white/20 rounded-2xl px-4 py-3 font-body text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/50 transition-all"
                    />
                  </div>

                  {/* Message Textarea (6 rows) */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-message"
                      className="font-heading font-semibold text-[10px] tracking-widest uppercase text-white/60"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Tell me about your brand, campaign goals, and timeline..."
                      required
                      className="glass border border-white/20 rounded-2xl px-4 py-3 font-body text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/50 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <PrimaryButton
                      type="submit"
                      size="lg"
                      className="w-full justify-center"
                      icon={loading ? null : <Send size={16} />}
                      disabled={loading}
                    >
                      {loading ? 'Sending…' : 'Send Message'}
                    </PrimaryButton>
                  </div>
                </form>
              )}
            </GlassCard>
          </motion.div>

          {/* RIGHT — Contact Info (col-span-2, 3 stacked glass cards) */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-5"
            initial="hidden"
            animate="visible"
            variants={slideInRight}
            custom={0.1}
          >
            {/* Card 1 — Contact Details */}
            <GlassCard variant="md">
              <span className="font-heading font-semibold text-xs tracking-[0.15em] uppercase text-ice-cyan/90 block mb-5">
                Contact Details
              </span>
              <div className="space-y-4">
                {contactDetails.map(({ icon: Icon, label, value, href, note }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-3.5 group p-1.5 rounded-2xl hover:bg-white/5 transition-colors"
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/20 group-hover:border-white/30 transition-all">
                      <Icon size={16} className="text-ice-cyan" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-heading text-[9px] font-semibold tracking-widest uppercase text-white/40">
                        {label}
                      </div>
                      <div className="font-body text-white/85 text-sm group-hover:text-white transition-colors truncate">
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </GlassCard>

            {/* Card 2 — Quick Connect (highlighted glass) */}
            <GlassCard variant="md" className="border-white/40 bg-white/[0.18] shadow-panel">
              <span className="font-heading font-semibold text-xs tracking-[0.15em] uppercase text-ice-cyan block mb-2.5">
                Quick Connect
              </span>
              <h3 className="font-heading font-bold text-white text-lg sm:text-xl leading-tight mb-2">
                Prefer a live conversation?
              </h3>
              <p className="font-body text-white/70 text-xs leading-relaxed mb-5">
                Book a 30-minute discovery call to discuss your campaign goals, creator strategy, and how I can help.
              </p>
              {/* Replace href="#" with Calendly or cal.com link */}
              <PrimaryButton
                href="#"
                size="sm"
                className="w-full justify-center"
                icon={<ArrowUpRight size={15} />}
              >
                Book a Discovery Call
              </PrimaryButton>
            </GlassCard>

            {/* Card 3 — Resume */}
            <GlassCard variant="md">
              <span className="font-heading font-semibold text-xs tracking-[0.15em] uppercase text-ice-cyan/90 block mb-2.5">
                Resume
              </span>
              <h3 className="font-heading font-bold text-white text-base leading-tight mb-3">
                Download My CV
              </h3>
              {/* Replace href="/cv/altamash-ansari-cv.pdf" when CV file is ready */}
              <PrimaryButton
                href="/cv/altamash-ansari-cv.pdf"
                variant="ghost"
                size="sm"
                className="w-full justify-center"
                icon={<Download size={15} />}
              >
                Download CV
              </PrimaryButton>
              <p className="font-body text-white/40 text-[11px] mt-2.5 text-center">
                [PDF — Awaiting CV file]
              </p>
            </GlassCard>
          </motion.div>

        </div>

      </div>
    </div>
  )
}
