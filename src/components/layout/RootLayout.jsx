// src/components/layout/RootLayout.jsx
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'

export default function RootLayout() {
  useSmoothScroll()
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-page">
      <Navbar />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex-1"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  )
}
