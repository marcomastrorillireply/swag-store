import { Suspense } from 'react'
import { Metadata } from 'next'
import { fetchCategories } from '@/lib/categories'
import { SearchInput } from '@/components/search/search-input'
import { CategoryFilter } from '@/components/search/category-filter'
import { SearchResultsWrapper } from '@/components/search/search-results-wrapper'
import { SearchResultsSkeleton } from '@/components/search/search-results-skeleton'
import { SearchControlsSkeleton } from '@/components/search/search-controls-skeleton'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search for Vercel swag products.',
  openGraph: {
    title: 'Search',
    description: 'Search for Vercel swag products.',
  },
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string }>
}) {
  const categories = await fetchCategories()

  return (
    <>
      <div className="flex flex-col gap-4 mx-10 mt-10 ">
        <h1 className="text-2xl font-semibold">Search</h1>
        <Suspense fallback={<SearchControlsSkeleton />}>
          <div className="flex gap-3 flex-wrap items-center">
            <SearchInput />
            <CategoryFilter categories={categories} />
          </div>
        </Suspense>
      </div>
      <div className="mt-8 mb-12 md:min-h-[400px] min-h-[1000px]">
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResultsWrapper searchParamsPromise={searchParams} />
        </Suspense>
      </div>
    </>
  )
}
