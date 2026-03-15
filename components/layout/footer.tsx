import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { fetchStore } from "@/lib/store";

export default async function Footer() {
  const store = await fetchStore();

  return (
    <footer className="w-full bg-black text-white/60">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-white"
            >
              <Image
                src="/vercel.svg"
                alt="Vercel"
                width={18}
                height={18}
              />
              <span className="tracking-tight">{store.storeName}</span>
            </Link>
            <p className="text-sm">{store.seo.defaultDescription}</p>
            <Badge
              variant="outline"
              className="w-fit border-white/20 text-white/40 text-xs"
            >
              Powered by Next.js
            </Badge>
          </div>

          {/* Links */}
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-2">
              <span className="font-medium text-white">Shop</span>
              <Link href="/products" className="hover:text-white transition-colors">All Products</Link>
              <Link href="/products?category=tees" className="hover:text-white transition-colors">Tees</Link>
              <Link href="/products?category=accessories" className="hover:text-white transition-colors">Accessories</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-medium text-white">Follow us</span>
              <Link href={store.socialLinks.twitter} className="hover:text-white transition-colors">Twitter</Link>
              <Link href={store.socialLinks.github} className="hover:text-white transition-colors">GitHub</Link>
              <Link href={store.socialLinks.discord} className="hover:text-white transition-colors">Discord</Link>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-white/10" />

        <p className="text-xs text-white/30 text-center">
          © {new Date().getFullYear()} {store.storeName}. Built with Next.js & Vercel.
        </p>
      </div>
    </footer>
  );
}
