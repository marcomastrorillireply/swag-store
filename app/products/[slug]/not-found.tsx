import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full">
      <h1 className="text-2xl font-bold p-10">This product is not swag enough for this store.</h1>
      <Button asChild size="lg">
        <Link href="/products" className="font-bold">
          Back to Products
        </Link>
      </Button>
    </div>
  )
}
