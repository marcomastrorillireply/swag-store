'use client'

import { Cart } from '@/lib/cart'
import {
  addItemAction,
  getCartAction,
  removeItemAction,
  updateItemAction,
} from '@/lib/actions/cart'
import { createContext, useContext, useEffect, useState } from 'react'
import MiniCartDrawer from './mini-cart-drawer'
import { toast } from 'sonner'

export const CartContext = createContext<{
  cart: Cart | null
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (productId: string, quantity?: number) => Promise<boolean>
  removeItem: (productId: string) => Promise<void>
  updateItem: (productId: string, quantity: number) => Promise<void>
}>({
  cart: null,
  isOpen: false,
  openCart: () => {},
  closeCart: () => {},
  addItem: async () => false,
  removeItem: async () => {},
  updateItem: async () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getCartAction().then(({ cart }) => {
      if (cart) setCart(cart)
    })
  }, [])

  function openCart() {
    setIsOpen(true)
  }
  function closeCart() {
    setIsOpen(false)
  }

  async function updateItem(productId: string, quantity: number): Promise<void> {
    const { cart: updatedCart, error } = await updateItemAction(productId, quantity)
    if (error) toast.error(error)
    else if (updatedCart) setCart(updatedCart)
  }

  async function removeItem(productId: string): Promise<void> {
    const { cart: updatedCart, error } = await removeItemAction(productId)
    if (error) toast.error(error)
    else if (updatedCart) setCart(updatedCart)
  }

  async function addItem(productId: string, quantity = 1): Promise<boolean> {
    const { cart: updatedCart, error } = await addItemAction(productId, quantity)
    if (error || !updatedCart) {
      toast.error(error ?? 'Failed to add item to cart')
      return false
    }
    setCart(updatedCart)
    openCart()
    return true
  }

  return (
    <CartContext.Provider
      value={{ cart, isOpen, openCart, closeCart, addItem, removeItem, updateItem }}
    >
      {children}
      <MiniCartDrawer />
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
