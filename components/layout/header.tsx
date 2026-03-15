import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black backdrop-blur">
      <div className="container mx-auto flex h-14 items-center gap-6 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-white"
        >
          <Image
            src="/vercel.svg"
            alt="Vercel"
            width={20}
            height={20}
            className=""
          />
          <span className="tracking-tight">Swag Store</span>
        </Link>

        <NavigationMenu className="text-white/80">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-white/80 hover:bg-white/10 hover:text-white focus:bg-white/10 data-[active]:bg-white/10 data-[state=open]:bg-white/10">
                Products
              </NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-[160px] bg-black border border-white/10">
                <NavigationMenuLink asChild>
                  <Link href="/products" className="block whitespace-nowrap px-4 py-3 text-sm text-white/70 hover:text-white transition-colors">
                    All Products
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
