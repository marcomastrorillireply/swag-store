import { addItemToCart, getCart } from '@/lib/cart'

export async function GET(request: Request) {
  const token = request.headers.get('x-cart-token') ?? ''
  const response = await getCart(token)
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(request: Request) {
  const token = request.headers.get('x-cart-token') ?? ''
  const { productId, quantity } = await request.json()
  const response = await addItemToCart(token, productId, quantity)
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
