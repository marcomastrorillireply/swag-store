export type Store = {
  storeName: string;
  currency: string;
  features: {
    wishlist: boolean;
    productComparison: boolean;
    reviews: boolean;
    liveChat: boolean;
    recentlyViewed: boolean;
  };
  socialLinks: {
    twitter: string;
    github: string;
    discord: string;
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
  };
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // in cents
  currency: string;
  category: string;
  images: string[];
  featured: boolean;
  tags: string[];
  createdAt: string;
};

export type ProductStock = {
  productId: string;
  stock: number;
  inStock: boolean;
  lowStock: boolean;
};
