import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import { ProductCardSkeleton } from './product-card.skeleton'

export const ProductCarouselSkeleton = () => (
  <Carousel className="w-full">
    <CarouselContent>
      {Array.from({ length: 10 }).map((_, i) => (
        <CarouselItem key={i} className="basis-3/5 sm:basis-1/2 lg:basis-1/3">
          <ProductCardSkeleton />
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious className="hidden lg:flex" />
    <CarouselNext className="hidden lg:flex" />
    <CarouselDots className="lg:hidden" />
  </Carousel>
)
