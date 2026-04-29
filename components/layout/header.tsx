import Image from 'next/image'
import Link from 'next/link'
import MobileMenu from './mobile-menu'
import { fetchCategories } from '@/lib/categories'
import DesktopMenu from './desktop-menu'
import CartIconButton from '../cart/cart-icon-button'
import PromotionStrip from './promotion-strip'
import { Suspense } from 'react'
import { cacheLife, cacheTag } from 'next/cache'

async function HeaderContent() {
  'use cache'
  cacheLife('max')
  cacheTag('categories')

  const categories = await fetchCategories()

  return (
    <div className="container mx-auto flex h-14 items-center gap-6 px-4">
      <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900 text-lg">
        <Image src="/vercel.svg" className="invert" alt="Vercel" width={20} height={20} />
        <span className="tracking-tight">Swag Store</span>
      </Link>
      <div className="hidden md:flex">
        <DesktopMenu categories={categories} />
      </div>
      <div className="ml-auto flex items-center gap-3">
        <CartIconButton />
        <div className="md:hidden">
          <MobileMenu categories={categories} />
        </div>
      </div>
    </div>
  )
}

export default async function Header() {
  return (
    <header className="w-full">
      <HeaderContent />
      <Suspense fallback={null}>
        <PromotionStrip />
      </Suspense>
    </header>
  )
}
