import {
  Carousel,
  CarouselContent,
  CarouselDots,
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
        {products.map((product, index) => (
          <CarouselItem className="basis-3/5 sm:basis-1/2 lg:basis-1/3" key={product.id}>
            <ProductCard product={product} priority={index === 0} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:flex" />
      <CarouselNext className="hidden lg:flex" />
      <CarouselDots className="lg:hidden" />
    </Carousel>
  )
}
