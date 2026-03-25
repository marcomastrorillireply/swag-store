'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from './cart-context'
import { Button } from '@/components/ui/button'

export default function CartIconButton() {
  const { cart, openCart } = useCart()
  const count = cart?.totalItems ?? 0

  return (
    <div className="relative flex items-center">
      <Button variant="ghost" size="sm" onClick={openCart}>
        <ShoppingCart className="w-5 h-5" />
      </Button>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold rounded-full bg-foreground text-background flex items-center justify-center">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  )
}
