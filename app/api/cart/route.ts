import { addItemToCart, getCart, removeItemFromCart, updateItemInCart } from '@/lib/cart'
import { ApiError } from '@/lib/fetchVercelApi'

export async function GET(request: Request) {
  const token = request.headers.get('x-cart-token') ?? ''
  try {
    const response = await getCart(token)
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    if (error instanceof ApiError) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: error.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function PATCH(request: Request) {
  const token = request.headers.get('x-cart-token') ?? ''
  const { productId, quantity } = await request.json()
  const response = await updateItemInCart(token, productId, quantity)
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function DELETE(request: Request) {
  const token = request.headers.get('x-cart-token') ?? ''
  const { productId } = await request.json()
  const response = await removeItemFromCart(token, productId)
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(request: Request) {
  const token = request.headers.get('x-cart-token') ?? ''
  const { productId, quantity } = await request.json()
  try {
    const response = await addItemToCart(token, productId, quantity)
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
