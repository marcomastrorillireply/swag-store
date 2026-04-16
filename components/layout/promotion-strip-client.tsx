'use client'

import { useState } from 'react'
import { XIcon } from 'lucide-react'
import type { Promotion } from '@/types'

export default function PromotionStripClient({ promotion }: { promotion: Promotion }) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="absolute top-full inset-x-0 bg-brand text-white flex items-center justify-between px-4 py-2">
      <div className="overflow-hidden flex-1 mx-4">
        <span className="text-xs font-medium whitespace-nowrap inline-block" style={{ animation: 'marquee 5s linear infinite' }}>
          {promotion.title}
        </span>
      </div>
      <button
        type="button"
        aria-label="Close promotion"
        onClick={() => setDismissed(true)}
        className="p-1 rounded-full cursor-pointer"
      >
        <XIcon className="size-4" />
      </button>
    </div>
  )
}
