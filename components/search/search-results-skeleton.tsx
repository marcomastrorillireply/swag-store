import { ProductCardSkeleton } from '@/components/product/product-card.skeleton'

export function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mx-10 min-h-[400px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
