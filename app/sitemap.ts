import type { MetadataRoute } from 'next'
import { fetchProducts } from '@/lib/products'
import { fetchCategories } from '@/lib/categories'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  const now = new Date()

  const [{ products }, categories] = await Promise.all([
    fetchProducts({ limit: 50 }),
    fetchCategories(),
  ])

  const productUrls = products.map(({ slug }) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: now,
  }))

  const categoryUrls = categories.map(({ slug }) => ({
    url: `${baseUrl}/categories/${slug}`,
    lastModified: now,
  }))

  return [
    { url: baseUrl, lastModified: now, priority: 1 },
    { url: `${baseUrl}/products`, lastModified: now },
    ...categoryUrls,
    ...productUrls,
  ]
}
