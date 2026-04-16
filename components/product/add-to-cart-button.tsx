'use client'

import { useState } from 'react'
import { useCart } from '@/components/cart/cart-context'
import { Button } from '@/components/ui/button'
import { ButtonGroup, ButtonGroupText } from '@/components/ui/button-group'
import { useRouter } from 'next/navigation'
import { Minus, Plus } from 'lucide-react'

export default function AddToCartButton({
  productId,
  inStock,
  stock,
}: {
  productId: string
  inStock: boolean
  stock: number
}) {
  const router = useRouter()
  const { addItem } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)

  async function handleClick() {
    setIsLoading(true)
    const success = await addItem(productId, quantity)
    if (success) {
      router.refresh()
    }
    setIsLoading(false)
  }

  return (
    <div className="flex flex-row gap-3">
      <ButtonGroup>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1 || !inStock}
        >
          <Minus className="size-4" />
        </Button>
        <ButtonGroupText className="w-12 text-base justify-center">{quantity}</ButtonGroupText>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
          disabled={quantity >= stock || !inStock}
        >
          <Plus className="size-4" />
        </Button>
      </ButtonGroup>

      <Button
        size="lg"
        className="flex-1"
        onClick={handleClick}
        disabled={isLoading || !inStock}
      >
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </Button>
    </div>
  )
}
