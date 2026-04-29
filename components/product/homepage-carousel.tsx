import { fetchProducts } from '@/lib/products'
import ProductCarousel from './product-carousel'
import { cacheLife, cacheTag } from 'next/cache'

export default async function HomepageCarousel() {
  'use cache'
  cacheLife('minutes')
  cacheTag('products', 'products-featured')

  const { products } = await fetchProducts({ featured: true })
  return <ProductCarousel products={products} />
}
