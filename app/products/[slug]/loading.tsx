import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
        {/* Immagine */}
        <Skeleton className="w-[500px] h-[500px] rounded-xl" />

        {/* Dettagli */}
        <div className="flex flex-col gap-5 max-w-md w-full">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-7 w-24" />
          <Separator />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-11 w-full md:w-40" />
        </div>
      </div>
    </main>
  )
}
