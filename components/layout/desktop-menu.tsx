'use client'

import { Category } from '@/types'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '../ui/navigation-menu'
import Link from 'next/link'

export default function DesktopMenu({ categories }: { categories: Category[] }) {
  return (
    <NavigationMenu id="desktop-nav" viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm text-gray-700 bg-transparent hover:bg-gray-100 data-popup-open:bg-gray-100">
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent className="!fixed !top-14 !left-0 !right-0 !w-screen !max-w-none !rounded-none !mt-0 border-t border-border shadow-[0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-md !bg-white/70">
            <div className="container mx-auto px-4 py-6">
              <NavigationMenuLink asChild>
                <Link
                  href="/products"
                  className="inline-block text-sm font-medium text-foreground mb-4 hover:text-muted-foreground transition-colors"
                >
                  All Products
                </Link>
              </NavigationMenuLink>
              <div className="grid grid-cols-4 gap-x-8 gap-y-1">
                {categories.map((cat) => (
                  <NavigationMenuLink key={cat.slug} asChild>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="px-1.5 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-none"
                    >
                      {cat.name}
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/search" className="text-sm text-gray-700 px-3 py-2 hover:bg-gray-100 rounded-md">
              Search
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
