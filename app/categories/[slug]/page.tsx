import { ApiError } from '@/lib/fetchVercelApi'
import { fetchCategories } from '@/lib/categories'
import { fetchProducts } from '@/lib/products'
import NotFound from './not-found'
import MainNotFound from '@/app/not-found'
import { ProductGrid } from '@/components/product/product-grid'
import { PRODUCTS_PER_PAGE } from '@/lib/constants'

// Disallow any slug not returned by generateStaticParams — unknown categories return 404
export const dynamicParams = false

// Pre-generate one page per category at build time
export async function generateStaticParams() {
  const categories = await fetchCategories()
  return categories.map((cat) => ({ slug: cat.slug }))
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { slug } = await params
  const { page: pageParam } = await searchParams
  const page = pageParam ? parseInt(pageParam) : 1
  try {
    const categories = await fetchCategories()
    const category = categories.find((c) => c.slug === slug)
    const { products, meta: { pagination } } = await fetchProducts({ category: slug, page, limit: PRODUCTS_PER_PAGE })
    return (
      <ProductGrid
        products={products}
        pagination={pagination}
        basePath={`/categories/${slug}`}
        title={category?.name}
      />
    )
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return <NotFound />
    }
    return <MainNotFound />
  }
}
