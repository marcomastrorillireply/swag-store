export default async function StockIndicator({
  inStock,
  lowStock,
  stock,
}: {
  inStock: boolean
  lowStock: boolean
  stock: number
}) {
  const config = !inStock
    ? { dot: 'bg-red-500', text: 'text-red-600', label: 'Out of stock' }
    : lowStock
      ? { dot: 'bg-orange-400', text: 'text-orange-600', label: `Only ${stock} left` }
      : { dot: 'bg-green-500', text: 'text-green-700', label: 'In stock' }

  return (
    <div className="inline-flex items-center gap-1.5 pl-1">
      <span className={`size-2 rounded-full ${config.dot}`} />
      <span className={`text-sm font-medium ${config.text}`}>{config.label}</span>
    </div>
  )
}
