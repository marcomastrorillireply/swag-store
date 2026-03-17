import Image from 'next/image'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu'
import MobileMenu from './mobile-menu'
import { fetchCategories } from '@/lib/categories'

export default async function Header() {
  const categories = await fetchCategories()

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-14 items-center gap-6 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900 text-lg">
          <Image src="/vercel.svg" className="invert" alt="Vercel" width={20} height={20} />
          <span className="tracking-tight">Swag Store</span>
        </Link>

        {/* Desktop nav */}
        <NavigationMenu viewport={false} className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm text-gray-700 bg-transparent hover:bg-gray-100 data-popup-open:bg-gray-100">
                Products
              </NavigationMenuTrigger>
              <NavigationMenuContent className="!fixed !top-14 !left-0 !right-0 !w-screen !max-w-none !rounded-none !mt-0 border-t border-border shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
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
                          href={`/products?category=${cat.slug}`}
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
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile hamburger */}
        <div className="ml-auto md:hidden">
          <MobileMenu categories={categories} />
        </div>
      </div>
    </header>
  )
}
