import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import ProductCard from './product-card'
import type { Product } from '@/types'

type Props = {
  products: Product[]
}

export default function ProductCarousel({ products }: Props) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3" key={product.id}>
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
