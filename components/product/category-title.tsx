import { Category } from '@/types'

export const CategoryTitle = ({ category }: { category: Category }) => {
  return (
    <div className="flex items-center justify-between mx-10 mt-10 h-10">
      <h1 className="text-2xl font-semibold whitespace-nowrap">{category.name}</h1>
    </div>
  )
}
