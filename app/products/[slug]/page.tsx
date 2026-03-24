import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { fetchProductById, fetchProducts } from '@/lib/products'
import { Product } from '@/types'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import StockIndicatorSkeleton from '@/components/product/stock-indicator-skeleton'
import StockIndicator from '@/components/product/stock-indicator'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await fetchProductById(slug).catch(() => notFound())

  const price = (product.price / 100).toFixed(2)

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
        {/* Colonna sinistra — immagine */}
        <div className="w-fit max-h-[500px] border border-border rounded-xl overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={500}
            height={500}
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Colonna destra — dettagli */}
        <div className="flex flex-col gap-5 max-w-md">
          <Badge variant="secondary" className="self-start capitalize">
            {product.category}
          </Badge>

          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

          <p className="text-2xl font-semibold">
            {product.currency} {price}
          </p>

          <Separator />

          <Suspense fallback={<StockIndicatorSkeleton />}>
            <StockIndicator id={product.id} />
          </Suspense>

          <Separator />

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <Button size="lg" className="w-full md:w-auto">
            Add to Cart
          </Button>
        </div>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  // fetch products at build time and return array of { slug: string }
  // dynamic params is true by default for products created after build
  const { products } = await fetchProducts()
  return products.map((product: Product) => ({
    slug: product.slug,
  }))
}
