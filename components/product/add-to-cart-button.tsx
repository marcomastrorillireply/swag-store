'use client'

import { useState } from 'react'
import { useCart } from '@/components/cart/cart-context'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function AddToCartButton({
  productId,
  inStock,
}: {
  productId: string
  inStock: boolean
}) {
  const router = useRouter()
  const { addItem } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  async function handleClick() {
    setIsLoading(true)
    const success = await addItem(productId)
    if (success) {
      router.refresh()
    }
    setIsLoading(false)
  }

  return (
    <Button
      size="lg"
      className="w-full md:w-auto"
      onClick={handleClick}
      disabled={isLoading || !inStock}
    >
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </Button>
  )
}
