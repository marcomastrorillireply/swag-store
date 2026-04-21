import { Metadata } from 'next'
import { fetchCategories } from '@/lib/categories'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const categories = await fetchCategories()
  const category = categories.find((c) => c.slug === slug)
  if (!category) return { title: 'Category not found' }
  return {
    title: category.name,
    description: `Browse all ${category.name} products.`,
    openGraph: {
      title: category.name,
      description: `Browse all ${category.name} products.`,
    },
  }
}
import { ProductGridWrapper } from '@/components/product/product-grid-wrapper'
import { Suspense } from 'react'
import { ProductGridSkeleton } from '@/components/product/product-grid.skeleton'
import { Category } from '@/types'
import { CategoryTitle } from '@/components/product/category-title'
import { notFound } from 'next/navigation'

// Pre-generate one page per category at build time
export async function generateStaticParams() {
  const categories = await fetchCategories()
  return categories.map((cat) => ({ slug: cat.slug }))
}

export default async function CategoryPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { slug } = await paramsPromise
  let category: Category | undefined = undefined

  try {
    // this fetch MUST be here blocking rendering - i cannot show anything before knowing if the category exists
    const categories = await fetchCategories()
    category = categories.find((c) => c.slug === slug)
  } catch (error) {
    notFound()
  }

  if (!category) {
    notFound()
  }

  return (
    <>
      <CategoryTitle category={category} />
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGridWrapper
          searchParamsPromise={searchParamsPromise}
          slug={slug}
          basePath={`/categories/${slug}`}
        />
      </Suspense>
    </>
  )
}
