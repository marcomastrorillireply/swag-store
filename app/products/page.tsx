import { Metadata } from 'next'
import { Suspense } from 'react'
import { ProductGridWrapper } from '@/components/product/productGridWrapper'
import { ProductGridSkeleton } from '@/components/product/product-grid.skeleton'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse our full collection of Vercel swag.',
  openGraph: {
    title: 'Products',
    description: 'Browse our full collection of Vercel swag.',
  },
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  return (
    <>
      <div className="flex items-center justify-between mx-10 mt-10 h-10">
        <h1 className="text-2xl font-semibold whitespace-nowrap">All Products</h1>
      </div>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGridWrapper searchParamsPromise={searchParams} />
      </Suspense>
    </>
  )
}
