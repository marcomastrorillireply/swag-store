import Hero from '@/components/layout/hero'
import ProductCarousel from '@/components/product/product-carousel'
import { fetchProducts } from '@/lib/products'

export default async function Home() {
  const products = await fetchProducts({ featured: true })
  return (
    <main className="w-full">
      <Hero />
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-sm uppercase tracking-widest text-muted-foreground font-mono mb-8">
          Featured Products
        </h2>
        <ProductCarousel products={products} />
      </section>
    </main>
  )
}
