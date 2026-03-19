import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '../ui/card'
import type { Product } from '@/types'
import { Badge } from '../ui/badge'

type Props = {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority }: Props) {
  const price = (product.price / 100).toFixed(2)

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <Card className="overflow-hidden border border-gray-200 max-w-[350px] mx-auto">
        <div className="relative aspect-square rounded-lg w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-3 space-y-0.5 flex flex-col justify-between">
          <p className="text-sm font-medium truncate text-black">{product.name}</p>
          <Badge variant="secondary" className="self-end">
            ${price}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  )
}
