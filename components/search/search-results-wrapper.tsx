import { fetchProducts } from '@/lib/products'
import ProductCard from '@/components/product/product-card'

type Props = {
  searchParamsPromise: Promise<{ query?: string; category?: string }>
}

export async function SearchResultsWrapper({ searchParamsPromise }: Props) {
  const { query, category } = await searchParamsPromise

  const { products } = await fetchProducts({
    search: query,
    category: category,
    limit: 5,
  })

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center mx-10">
        <p className="text-lg font-medium">No products found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Try a different search term or category
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mx-10">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 2} />
      ))}
    </div>
  )
}
