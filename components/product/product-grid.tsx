import { MetaPagination, Product } from '@/types'
import ProductCard from './product-card'
import {
  Pagination,
  PaginationContent,
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
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
  const pageNumbers = []
  for (let i = 1; i <= pagination.totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 m-10">
        {products.map((product, index) => (
          <div key={product.id}>
            <ProductCard product={product} priority={index < 2} />
          </div>
        ))}
      </div>
      {pagination.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {pagination.hasPreviousPage && (
              <PaginationPrevious href={`${basePath}?page=${pagination.page - 1}`} />
            )}
            {pageNumbers.map((p) => (
              <PaginationItem key={p}>
                <PaginationLink isActive={p === pagination.page} href={`${basePath}?page=${p}`}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            {pagination.hasNextPage && (
              <PaginationNext href={`${basePath}?page=${pagination.page + 1}`} />
            )}
          </PaginationContent>
        </Pagination>
      )}
    </>
  )
}
