import { Metadata } from 'next'
import Hero from '@/components/layout/hero'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Shop the latest Vercel swag.',
  openGraph: {
    title: 'Home',
    description: 'Shop the latest Vercel swag.',
  },
}

import HomepageCarousel from '@/components/product/homepage-carousel'
import { ProductCarouselSkeleton } from '@/components/product/product-carousel.skeleton'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <main className="w-full">
      <Hero />
      <section className="md:px-0 lg:px-16 py-16">
        <h2 className="flex justify-center text-sm uppercase tracking-widest text-muted-foreground font-mono mb-8">
          Featured Products
        </h2>
        <Suspense fallback={<ProductCarouselSkeleton />}>
          <HomepageCarousel />
        </Suspense>
      </section>
    </main>
  )
}
