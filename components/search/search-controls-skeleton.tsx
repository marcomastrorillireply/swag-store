import { Skeleton } from '@/components/ui/skeleton'

export function SearchControlsSkeleton() {
  return (
    <div className="flex gap-3 flex-wrap items-center">
      <div className="flex gap-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="size-9" />
      </div>
      <Skeleton className="h-9 w-44" />
    </div>
  )
}
