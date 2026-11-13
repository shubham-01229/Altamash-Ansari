// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '../../utils/cn'

const navLinks = [
  { label: 'Home',       to: '/' },
  { label: 'About',      to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Portfolio',  to: '/portfolio' },
  { label: 'Media',      to: '/media' },
  { label: 'Contact',    to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Desktop / Main Navbar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-5xl',
          'px-5 py-3 rounded-full',
          'transition-all duration-500',
          scrolled
            ? 'bg-white/20 backdrop-blur-2xl border border-white/40 shadow-panel'
            : 'bg-white/10 backdrop-blur-xl  border border-white/25 shadow-glass',
        )}
      >
        <div className="flex items-center justify-between gap-6">
          {/* Brand */}
          <NavLink to="/" className="font-heading font-bold text-white text-lg tracking-widest uppercase shrink-0">
            ALTAMASH.
          </NavLink>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  cn(
                    'font-heading font-medium text-[13px] tracking-wide transition-colors duration-200',
                    isActive ? 'text-white' : 'text-white/65 hover:text-white/90',
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="/contact"
              className="hidden md:inline-flex btn-primary text-xs px-5 py-2.5"
            >
              Book a Call
            </a>
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden p-2 rounded-full glass text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-24 left-4 right-4 z-40 rounded-3xl glass-md border border-white/35 p-6 shadow-panel"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'font-heading font-semibold text-base tracking-wide px-3 py-2 rounded-xl transition-all',
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10',
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}
              <a
                href="/contact"
                className="btn-primary text-center text-sm mt-2"
              >
                Book a Call
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

