import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowRightIcon } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative border-b border-border overflow-hidden w-full aspect-[4/3] md:aspect-video md:max-h-[600px]">
      {/* Background image — LCP */}
      <Image
        src="/hero.jpg"
        alt="Developer swag hero"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
      />

      {/* Subtle left gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div className="z-10 container mx-auto px-4 lg:px-16 h-full flex items-center absolute inset-0">
        <div className="max-w-2xl space-y-3 md:space-y-6">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50 font-mono">
            Developer Swag Store
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white">
            Wear the
            <br />
            framework
            <br />
            you ship with.
          </h1>
          <p className="invisible lg:visible text-white/60 text-xs md:text-base max-w-sm">
            Premium swag for developers who build with Vercel. From tees to tech gear, represent the
            tools you love.
          </p>
          <Button asChild className="bg-amber-900 hover:bg-amber-800 text-white border-0">
            <Link href="/products" className="inline-flex items-center gap-2">
              Browse All Products
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
