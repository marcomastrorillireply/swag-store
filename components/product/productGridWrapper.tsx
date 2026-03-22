import { fetchProducts } from '@/lib/products'
import { ProductGrid } from './product-grid'
import { PRODUCTS_PER_PAGE } from '@/lib/constants'

type Props = {
  basePath?: string
  searchParamsPromise: Promise<{ page?: string }>
  slug?: string
}

export const ProductGridWrapper = async ({
  basePath = '/products',
  searchParamsPromise: searchParams,
  slug,
}: Props) => {
  const { page: pageParam } = await searchParams
  const page = pageParam ? parseInt(pageParam) : 1

  const { products, meta } = await fetchProducts({
    page,
    category: slug,
    limit: PRODUCTS_PER_PAGE,
  })

  return <ProductGrid products={products} pagination={meta.pagination} basePath={basePath} />
}
