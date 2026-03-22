'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { MetaPagination, Product } from '@/types'
import ProductCard from './product-card'
import { Pagination, PaginationContent, PaginationPrevious, PaginationNext } from '../ui/pagination'

export const ProductGrid = ({
  products,
  pagination,
  basePath = '/products',
}: {
  products: Product[]
  pagination: MetaPagination
  basePath?: string
}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const navigate = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    startTransition(() => router.push(`${basePath}?page=${page}`))
  }

  const paginationContent =
    pagination.totalPages > 1 ? (
      <div className="absolute right-15 2xl:right-40">
        <Pagination className="w-auto mx-0 justify-end">
          <PaginationContent>
            <PaginationPrevious
              href={`${basePath}?page=${pagination.page - 1}`}
              onClick={navigate(pagination.page - 1)}
              className={`border ${!pagination.hasPreviousPage ? ' pointer-events-none opacity-50' : ''}`}
            />
            <PaginationNext
              href={`${basePath}?page=${pagination.page + 1}`}
              onClick={navigate(pagination.page + 1)}
              className={`border ${!pagination.hasNextPage ? ' pointer-events-none opacity-50' : ''}`}
            />
          </PaginationContent>
        </Pagination>
      </div>
    ) : null

  return (
    <>
      {paginationContent}
      <div
        className={`grid grid-cols-2 md:grid-cols-3 gap-6 m-10 min-h-[800px] md:min-h-[650px] lg:min-h-[1000px] transition-opacity duration-200 ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
      >
        {products.map((product, index) => (
          <div key={product.id}>
            <ProductCard product={product} priority={index < 2} />
          </div>
        ))}
      </div>
    </>
  )
}
