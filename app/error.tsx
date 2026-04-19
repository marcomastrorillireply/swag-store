'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full py-20">
      <h1 className="text-2xl font-bold">Something went wrong.</h1>
      <div className="flex gap-3">
        <Button variant="outline" onClick={reset}>
          Try again
        </Button>
        <Button asChild size="lg">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
