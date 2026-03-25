import StockIndicator from './stock-indicator'
import AddToCartButton from './add-to-cart-button'
import { Product } from '@/types'
import { fetchProductStock } from '@/lib/products'

export const AddToCartSection = async ({ product }: { product: Product }) => {
  const { inStock, lowStock, stock } = await fetchProductStock(product.id)

  return (
    <>
      <div className="gap-5 flex flex-col">
        <StockIndicator inStock={inStock} lowStock={lowStock} stock={stock} />
        <AddToCartButton productId={product.id} inStock={inStock} />
      </div>
    </>
  )
}
