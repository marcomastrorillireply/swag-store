'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { MetaPagination, Product } from '@/types'
import ProductCard from './product-card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from '../ui/pagination'

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

  const paginationContent = (
    <div className="flex items-center justify-center pb-12">
      <Pagination className="w-auto">
        <PaginationContent className="gap-2">
          <PaginationPrevious
            href={`${basePath}?page=${pagination.page - 1}`}
            onClick={navigate(pagination.page - 1)}
            size="icon"
            className={`rounded-full border border-border border-2 ${!pagination.hasPreviousPage ? 'pointer-events-none opacity-40' : ''}`}
          />
          <PaginationItem>
            <span className="text-sm text-muted-foreground tabular-nums px-4">
              {pagination.page} of {pagination.totalPages}
            </span>
          </PaginationItem>
          <PaginationNext
            href={`${basePath}?page=${pagination.page + 1}`}
            onClick={navigate(pagination.page + 1)}
            size="icon"
            className={`rounded-full border border-border border-2 ${!pagination.hasNextPage ? 'pointer-events-none opacity-40' : ''}`}
          />
        </PaginationContent>
      </Pagination>
    </div>
  )

  return (
    <div className="flex flex-col">
      <div
        className={`grid grid-cols-2 md:grid-cols-3 gap-6 m-10 min-h-[800px] md:min-h-[650px] lg:min-h-[1000px] transition-opacity duration-200 ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
      >
        {products.map((product, index) => (
          <div key={product.id}>
            <ProductCard product={product} priority={index < 2} />
          </div>
        ))}
      </div>

      {paginationContent}
    </div>
  )
}
