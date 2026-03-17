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
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_1px_12px_rgba(0,0,0,0.10)]' : ''
      }`}
    >
      {children}
    </div>
  )
}
