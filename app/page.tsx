import ProductCarousel from "@/components/product/product-carousel";
import { fetchProducts } from "@/lib/products";

export default async function Home() {
  const products = await fetchProducts({ featured: true });
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <ProductCarousel products={products} />
      </main>
    </div>
  );
}
