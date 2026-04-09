'use server'

import { cookies } from 'next/headers'
import {
  addItemToCart,
  createCart,
  getCart,
  removeItemFromCart,
  updateItemInCart,
} from '@/lib/cart'

async function getCartToken() {
  const cookieStore = await cookies()
  return cookieStore.get('cart-token')?.value ?? null
}

export async function getCartAction() {
  const token = await getCartToken()
  if (!token) return { cart: null }
  try {
    const cart = await getCart(token)
    return { cart }
  } catch {
    return { cart: null }
  }
}

export async function addItemAction(productId: string, quantity = 1) {
  const cookieStore = await cookies()
  let token = cookieStore.get('cart-token')?.value

  if (!token) {
    const { token: newToken } = await createCart()
    if (!newToken) return { cart: null, error: 'Could not create cart' }
    cookieStore.set('cart-token', newToken, { httpOnly: true, maxAge: 60 * 60 * 24, path: '/' })
    token = newToken
  }

  try {
    const cart = await addItemToCart(token, productId, quantity)
    return { cart }
  } catch {
    return { cart: null, error: 'Failed to add item to cart' }
  }
}

export async function removeItemAction(productId: string) {
  const token = await getCartToken()
  if (!token) return { cart: null, error: 'No cart found' }
  try {
    const cart = await removeItemFromCart(token, productId)
    return { cart }
  } catch {
    return { cart: null, error: 'Failed to remove item from cart' }
  }
}

export async function updateItemAction(productId: string, quantity: number) {
  const token = await getCartToken()
  if (!token) return { cart: null, error: 'No cart found' }
  try {
    const cart = await updateItemInCart(token, productId, quantity)
    return { cart }
  } catch {
    return { cart: null, error: 'Failed to update item quantity' }
  }
}
