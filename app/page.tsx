import ProductCarousel from "@/components/product/product-carousel";
import { fetchProducts } from "@/lib/products";

export default async function Home() {
  const products = await fetchProducts({ featured: true });
  return (
    <div className="flex  items-center justify-center font-sans h-full">
      <main className="flex xs w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <ProductCarousel products={products} />
      </main>
    </div>
  );
}
