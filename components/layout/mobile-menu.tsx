'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Category } from '@/types'
import { DialogTitle } from '../ui/dialog'
import { VisuallyHidden } from 'radix-ui'
import { Button } from '../ui/button'

export default function MobileMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const closeMenu = () => setOpen(false)
    closeMenu()
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <MenuIcon size={22} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="backdrop-blur-md bg-white/70">
        <VisuallyHidden.Root>
          <DialogTitle>Menu</DialogTitle>
        </VisuallyHidden.Root>
        <nav className="mt-8 flex flex-col">
          <Link href="/products" className="px-4 py-3 text-sm ">
            All Products
          </Link>
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/categories/${cat.slug}`} className="px-4 py-3 text-sm ">
              {cat.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
