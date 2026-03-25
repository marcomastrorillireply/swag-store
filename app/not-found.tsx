import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Page not found',
}

export default function MainNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full py-20">
      <h1 className="text-2xl font-bold">Page not found.</h1>
      <Button asChild size="lg">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  )
}
