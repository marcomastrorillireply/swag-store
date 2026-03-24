import { Product } from '@/types'
import { fetchVercelApi } from './fetchVercelApi'

export type CartItem = {
  productId: string
  quantity: number
  addedAt: string
  product: Product
  lineTotal: number
}

export type Cart = {
  token: string
  items: CartItem[]
  totalItems: number
  subtotal: number
  createdAt: string
  updatedAt: string
}

type AddToCartRequest = {
  productId: string
  quantity: number
}

export async function createCart(): Promise<{ token: string | null; cart: Cart }> {
  const response = await fetchVercelApi('/cart/create', {
    method: 'POST',
  })
  const token = response.headers.get('x-cart-token')
  const { data } = await response.json()
  return { token, cart: data }
}

export async function getCart(token: string): Promise<Cart> {
  const response = await fetchVercelApi('/cart', {
    headers: {
      'x-cart-token': token,
    },
  })
  const { data } = await response.json()
  return data
}

export async function addItemToCart(token: string, productId: string, quantity = 1): Promise<Cart> {
  const response = await fetchVercelApi('/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-cart-token': token,
    },
    body: JSON.stringify({ productId, quantity } as AddToCartRequest),
  })
  const { data } = await response.json()
  return data
}
