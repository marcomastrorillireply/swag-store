export default async function StockIndicator({
  inStock,
  lowStock,
  stock,
}: {
  inStock: boolean
  lowStock: boolean
  stock: number
}) {
  const stockElement = !inStock ? (
    <p className="text-red-500">Out of stock</p>
  ) : lowStock ? (
    <p className="text-orange-500">Only {stock} left in stock</p>
  ) : (
    <p className="text-green-500">In stock</p>
  )

  return <div className="h5">{stockElement}</div>
}
