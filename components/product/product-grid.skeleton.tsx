import { PRODUCTS_PER_PAGE } from '@/lib/constants'
import { Skeleton } from '../ui/skeleton'
import { Card, CardContent } from '../ui/card'

export const ProductCardSkeleton = () => (
  <Card className="w-full gap-4 overflow-hidden border border-gray-200 max-w-[400px] mx-auto">
    <Skeleton className="aspect-square w-full rounded-none" />
    <CardContent className="p-3 space-y-0.5 flex flex-col justify-between">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-5 w-14 self-end" />
    </CardContent>
  </Card>
)

export const ProductGridSkeleton = () => (
  <>
    <div className="flex items-center justify-between mx-10 mt-10 h-10">
      <Skeleton className="h-7 w-32" />
      <div className="flex gap-2">
        <Skeleton className="h-9 w-20 rounded-md" />
        <Skeleton className="h-9 w-16 rounded-md" />
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 m-10">
      {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  </>
)
