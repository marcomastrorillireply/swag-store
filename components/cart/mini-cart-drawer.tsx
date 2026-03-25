'use client'

import Image from 'next/image'
import { useCart } from './cart-context'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ShoppingBag } from 'lucide-react'

export default function MiniCartDrawer() {
  const { cart, isOpen, closeCart } = useCart()

  const isEmpty = !cart || cart.items.length === 0

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">
            Your Cart {cart && cart.totalItems > 0 && `(${cart.totalItems})`}
          </SheetTitle>
        </SheetHeader>

        <Separator />

        <div className="flex-1 overflow-y-auto py-2">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground py-16">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4 px-4">
              {cart.items.map((item) => (
                <li key={item.productId} className="flex gap-4 items-start">
                  {/* Immagine prodotto */}
                  <div className="border border-border rounded-lg overflow-hidden shrink-0 bg-muted">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={72}
                      height={72}
                      className="object-contain w-[72px] h-[72px]"
                    />
                  </div>

                  {/* Dettagli */}
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <p className="font-medium text-sm leading-tight truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {item.product.category}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">Qty {item.quantity}</span>
                      <span className="text-sm font-semibold">
                        ${(item.lineTotal / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {!isEmpty && (
          <>
            <Separator />
            <SheetFooter className="px-4 pb-4">
              <div className="flex justify-between items-center w-full mb-3">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-base font-semibold">
                  ${((cart?.subtotal ?? 0) / 100).toFixed(2)}
                </span>
              </div>
              <Button size="lg" className="w-full" onClick={() => {}}>
                Complete Payment
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
