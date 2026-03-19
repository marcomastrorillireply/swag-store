import { ApiError } from '@/lib/fetchVercelApi'
import { fetchCategories } from '@/lib/categories'
import { fetchProducts } from '@/lib/products'
import NotFound from './not-found'
import MainNotFound from '@/app/not-found'
import { ProductGrid } from '@/components/product/product-grid'
import { MetaPagination, Product } from '@/types'

// Disallow any slug not returned by generateStaticParams — unknown categories return 404
export const dynamicParams = false

// Pre-generate one page per category at build time
export async function generateStaticParams() {
  const categories = await fetchCategories()
  return categories.map((cat) => ({ slug: cat.slug }))
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let categoryProducts: Product[] = []
  let pagination: MetaPagination | undefined
  try {
    const { products, meta } = await fetchProducts({ category: slug, limit: 3 })
    categoryProducts = products
    pagination = meta.pagination
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return <NotFound />
    } else {
      return <MainNotFound />
    }
  }
  return (
    <ProductGrid
      products={categoryProducts}
      pagination={pagination}
      basePath={`/categories/${slug}`}
    />
  )
}
