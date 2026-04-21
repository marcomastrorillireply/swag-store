import { Product, ProductsParams, ProductStock, ProductMeta } from '@/types'
import { fetchVercelApi, ApiError } from './fetchVercelApi'
import { cacheLife, cacheTag } from 'next/cache'

export const fetchProducts: (
  params?: ProductsParams,
) => Promise<{ products: Product[]; meta: ProductMeta }> = async (params) => {
  'use cache'
  cacheLife('minutes')
  cacheTag('products')

  const query = new URLSearchParams()
  if (params?.featured !== undefined) query.append('featured', String(params.featured))
  if (params?.category) query.append('category', params.category)
  if (params?.limit !== undefined) query.append('limit', String(params.limit))
  if (params?.page !== undefined) query.append('page', String(params.page))
  if (params?.search !== undefined) query.append('search', params.search)

  const qs = query.toString()
  const response = await fetchVercelApi(qs ? `/products?${qs}` : '/products')
  const { data, meta } = await response.json()
  return { products: data, meta }
}

export const fetchProductById: (id: string) => Promise<Product | null> = async (id) => {
  'use cache'
  cacheLife('minutes')
  cacheTag(`product-${id}`)

  try {
    const response = await fetchVercelApi(`/products/${id}`)
    const { data } = await response.json()
    return data
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null
    throw error
  }
}

export const fetchProductStock: (id: string) => Promise<ProductStock> = async (id) => {
  try {
    const response = await fetchVercelApi(`/products/${id}/stock`)
    const { data } = await response.json()
    return data
  } catch {
    return { inStock: false, lowStock: false, stock: 0 }
  }
}
