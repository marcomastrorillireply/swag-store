import { Product, ProductsParams, ProductStock } from '@/types'
import { fetchVercelApi } from './fetchVercelApi'

export const fetchProducts: (params?: ProductsParams) => Promise<Product[]> = async (params) => {
  const query = new URLSearchParams()
  if (params?.featured !== undefined) query.append('featured', String(params.featured))
  if (params?.category) query.append('category', params.category)
  if (params?.limit !== undefined) query.append('limit', String(params.limit))

  const qs = query.toString()
  const response = await fetchVercelApi(qs ? `/products?${qs}` : '/products', {
    next: {
      revalidate: 600,
    },
  })
  const { data } = await response.json()
  return data
}

export const fetchProductById: (id: string) => Promise<Product> = async (id) => {
  const response = await fetchVercelApi(`/products/${id}`, {
    next: {
      revalidate: 600,
    },
  })
  const { data } = await response.json()
  return data
}

export const fetchProductStock: (id: string) => Promise<ProductStock> = async (id) => {
  const response = await fetchVercelApi(`/products/${id}/stock`)
  const { data } = await response.json()
  return data
}
