import { PRODUCTS_PER_PAGE } from '@/lib/constants'
import { Skeleton } from '../ui/skeleton'
import { ProductCardSkeleton } from './product-card.skeleton'

export const ProductGridSkeleton = () => (
  <>
    <div className="absolute right-15 2xl:right-40">
      <div className="flex gap-2">
        <Skeleton className="h-9 w-20 rounded-md" />
        <Skeleton className="h-9 w-16 rounded-md" />
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 m-10 min-h-[800px] md:min-h-[650px] lg:min-h-[1000px]">
      {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  </>
)
