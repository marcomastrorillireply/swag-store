import { Metadata } from 'next'
import { ProductGrid } from '@/components/product/product-grid'
import { PRODUCTS_PER_PAGE } from '@/lib/constants'
import { fetchProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse our full collection of Vercel swag.',
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const page = params?.page ? parseInt(params.page) : 1

  const { products, meta: { pagination } } = await fetchProducts({ page, limit: PRODUCTS_PER_PAGE })

  return <ProductGrid products={products} pagination={pagination} title="All Products" />
}
