import { createCart } from '@/lib/cart'

export async function POST() {
  const response = await createCart()
  return new Response(JSON.stringify(response), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}
