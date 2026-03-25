'use client'

import { Cart } from '@/lib/cart'
import { createContext, useContext, useEffect, useState } from 'react'
import MiniCartDrawer from './mini-cart-drawer'

export const CartContext = createContext<{
  cart: Cart | null
  isOpen: boolean
  token: string | null
  openCart: () => void
  closeCart: () => void
  addItem: (productId: string) => Promise<void>
}>({
  cart: null,
  isOpen: false,
  token: null,
  openCart: () => {},
  closeCart: () => {},
  addItem: async () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('cartToken')
    if (!storedToken) return

    async function hydrate() {
      setToken(storedToken)
      const res = await fetch('/api/cart', { headers: { 'x-cart-token': storedToken || '' } })
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

  async function addItem(productId: string) {
    let currentToken = token

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
      body: JSON.stringify({ productId, quantity: 1 }),
    })
    const updatedCart = await addToCartResponse.json()
    setCart(updatedCart)
    openCart()
  }

  return (
    <CartContext.Provider value={{ cart, isOpen, token, openCart, closeCart, addItem }}>
      {children}
      <MiniCartDrawer />
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
