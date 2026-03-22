import { PRODUCTS_PER_PAGE } from '@/lib/constants'
import { Skeleton } from '../ui/skeleton'
import { ProductCardSkeleton } from './product-card.skeleton'

export const ProductGridSkeleton = () => (
  <div className="flex flex-col">
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 m-10 min-h-[800px] md:min-h-[650px] lg:min-h-[1000px]">
      {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>

    <div className="flex items-center justify-center pb-12">
      <div className="flex items-center gap-2">
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="h-4 w-14 rounded mx-4" />
        <Skeleton className="size-9 rounded-full" />
      </div>
    </div>
  </div>
)
