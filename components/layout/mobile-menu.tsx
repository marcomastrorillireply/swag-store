'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Category } from '@/types'

export default function MobileMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden text-white" aria-label="Open menu">
          <MenuIcon size={22} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-black border-white/10 text-white">
        <nav className="mt-8 flex flex-col">
          <Link
            href="/products"
            className="px-4 py-3 text-sm text-white/60 hover:text-white transition-colors border-b border-white/10"
            onClick={() => setOpen(false)}
          >
            All Products
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="px-4 py-3 text-sm text-white/80 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
