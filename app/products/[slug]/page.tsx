import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { fetchProductById, fetchProducts } from '@/lib/products'
import { Product } from '@/types'
import { ApiError } from '@/lib/fetchVercelApi'
import NotFound from './not-found'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let product: Product
  try {
    product = await fetchProductById(slug)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return <NotFound />
    }
    throw error
  }

  const price = (product.price / 100).toFixed(2)

  return (
    <main className="mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Colonna sinistra — immagine */}
        <div className="max-h-[500px] relative flex-1 aspect-square rounded-xl overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Colonna destra — dettagli */}
        <div className="flex-1 flex flex-col gap-5">
          <Badge variant="secondary" className="self-start capitalize">
            {product.category}
          </Badge>

          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

          <p className="text-2xl font-semibold">
            {product.currency} {price}
          </p>

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
  const products = await fetchProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}
