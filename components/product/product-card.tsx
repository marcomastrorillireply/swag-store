import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import type { Product } from "@/types";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const price = (product.price / 100).toFixed(2);

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group overflow-hidden border-0 shadow-none">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="px-0 pt-3 pb-0">
          <p className="text-sm font-medium leading-snug">{product.name}</p>
          <p className="text-sm text-muted-foreground">${price}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
