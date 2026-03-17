import { Category } from '@/types'
import { fetchVercelApi } from './fetchVercelApi'

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetchVercelApi('/categories', {
      next: {
        revalidate: false,
      },
    })
    const json = await res.json()
    return json.data
  } catch {
    return []
  }
}
