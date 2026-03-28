'use client'

import { Cart } from '@/lib/cart'
import { createContext, useContext, useEffect, useState } from 'react'
import MiniCartDrawer from './mini-cart-drawer'
import { toast } from 'sonner'

export const CartContext = createContext<{
  cart: Cart | null
  isOpen: boolean
  token: string | null
  openCart: () => void
  closeCart: () => void
  addItem: (productId: string, quantity?: number) => Promise<boolean>
  removeItem: (productId: string) => Promise<void>
  updateItem: (productId: string, quantity: number) => Promise<void>
}>({
  cart: null,
  isOpen: false,
  token: null,
  openCart: () => {},
  closeCart: () => {},
  addItem: async () => false,
  removeItem: async () => {},
  updateItem: async () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('cartToken')
    if (!storedToken) return

    async function hydrate() {   
      const res = await fetch('/api/cart', { headers: { 'x-cart-token': storedToken || '' } })
      if (!res.ok) {
        localStorage.removeItem('cartToken')
        setToken(null)
        toast.error('Your cart has been reset. Please add items to your cart again.')
        return
      }
      setToken(storedToken)
      const data = await res.json()
      setCart(data)
    }

    hydrate()
  }, [])

  function openCart() {
    setIsOpen(true)
  }
  function closeCart() {
    setIsOpen(false)
  }

  async function updateItem(productId: string, quantity: number): Promise<void> {
    if (!token) return
    try {
      const res = await fetch('/api/cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-cart-token': token },
        body: JSON.stringify({ productId, quantity }),
      })
      const updatedCart = await res.json()
      setCart(updatedCart)
    } catch (error) {
      toast.error('Failed to update item quantity')
      console.error('Update cart error:', error)
    }
  }

  async function removeItem(productId: string): Promise<void> {
    if (!token) return
    try {
      const res = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-cart-token': token },
        body: JSON.stringify({ productId }),
      })
      const updatedCart = await res.json()
      setCart(updatedCart)
    } catch (error) {
      toast.error('Failed to remove item from cart')
      console.error('Remove from cart error:', error)
    }
  }

  async function addItem(productId: string, quantity = 1): Promise<boolean> {
    let currentToken = token
    try {
      if (!currentToken) {
        const res = await fetch('/api/cart/create', { method: 'POST' })
        const data = await res.json()
        currentToken = data.token
        localStorage.setItem('cartToken', currentToken || '')
        setToken(currentToken)
      }

      const addToCartResponse = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-cart-token': currentToken || '',
        },
        body: JSON.stringify({ productId, quantity }),
      })
      const updatedCartResponse = await addToCartResponse.json()

      if (!addToCartResponse.ok) {
        toast.error(updatedCartResponse.message || 'Failed to add item to cart')
        return false
      }
      setCart(updatedCartResponse)
      openCart()
      return true
    } catch (error) {
      toast.error('An error occurred while adding item to cart')
      console.error('Add to cart error:', error)
      return false
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, isOpen, token, openCart, closeCart, addItem, removeItem, updateItem }}
    >
      {children}
      <MiniCartDrawer />
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
