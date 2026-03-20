'use client'

import { useEffect, useState } from 'react'

export default function HeaderScrollWrapper({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div
      className={`relative sticky top-0 z-50 isolate transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_1px_12px_rgba(0,0,0,0.10)]' : ''
      }`}
    >
      <div
        className={`absolute inset-0 z-0 bg-white/70 transition-all duration-300 ${scrolled ? 'backdrop-blur-md' : ''}`}
        aria-hidden
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
