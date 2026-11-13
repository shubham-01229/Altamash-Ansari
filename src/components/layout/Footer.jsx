// src/components/layout/Footer.jsx
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { Instagram, Linkedin, Mail, Heart } from 'lucide-react'

const navLinks = [
  { label: 'Home',       to: '/' },
  { label: 'About',      to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Portfolio',  to: '/portfolio' },
  { label: 'Media',      to: '/media' },
  { label: 'Contact',    to: '/contact' },
]

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },   // Replace # with real URL
  { icon: Linkedin,  href: '#', label: 'LinkedIn'  },   // Replace # with real URL
  { icon: Mail,      href: 'mailto:your@email.com', label: 'Email' },  // Replace
]

export default function Footer() {
  return (
    <footer className="relative mt-auto pt-16 pb-10 px-6">
      {/* Glass footer card */}
      <div className="max-w-6xl mx-auto glass rounded-4xl border border-white/25 p-8 md:p-12 shadow-glass">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Brand column */}
          <div>
            <div className="font-heading font-bold text-white text-2xl tracking-widest uppercase mb-3">
              ALTAMASH.
            </div>
            <p className="text-white/60 font-body text-sm leading-relaxed mb-5 max-w-xs">
              Influencer Marketing Expert. Connecting Brands with Creators.
              Creating Influence That Matters.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full glass border border-white/25 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="section-overline mb-5">Quick Links</div>
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  className="text-white/60 hover:text-white text-sm font-body transition-colors duration-200"
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* CTA column */}
          <div>
            <div className="section-overline mb-5">Work With Me</div>
            <p className="text-white/60 text-sm font-body mb-5 leading-relaxed">
              Ready to build something influential? Let's talk about your next campaign.
            </p>
            <a href="/contact" className="btn-primary text-xs inline-flex">
              Book a Discovery Call
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs font-body tracking-wide">
            © {new Date().getFullYear()} Altamash Ansari. All rights reserved.
          </p>
          <p className="text-white/40 text-xs font-body flex items-center gap-1.5">
            Built with <Heart size={11} className="text-primary" fill="currentColor" /> for premium creative brands
          </p>
        </div>
      </div>
    </footer>
  )
}

