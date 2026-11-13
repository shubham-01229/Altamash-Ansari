// src/hooks/useSmoothScroll.js
// Initializes Lenis smooth scroll and ties it to Framer Motion
import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance = null

export function useSmoothScroll() {
  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenisInstance.destroy()
      lenisInstance = null
    }
  }, [])

  return lenisInstance
}

export function scrollTo(target) {
  if (lenisInstance) lenisInstance.scrollTo(target)
}

