export type ProductsParams = {
  featured?: boolean
  category?: string
  limit?: number
  page?: number
  search?: string
}

export type Store = {
  storeName: string
  currency: string
  features: {
    wishlist: boolean
    productComparison: boolean
    reviews: boolean
    liveChat: boolean
    recentlyViewed: boolean
  }
  socialLinks: {
    twitter: string
    github: string
    discord: string
  }
  seo: {
    defaultTitle: string
    titleTemplate: string
    defaultDescription: string
  }
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number // in cents
  currency: string
  category: string
  images: string[]
  featured: boolean
  tags: string[]
  createdAt: string
}

export type MetaPagination = {
  totalPages: number
  page: number
  limit: number
  total: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type ProductMeta = {
  pagination: MetaPagination
}

export type ProductStock = {
  productId: string
  stock: number
  inStock: boolean
  lowStock: boolean
}

export type Category = {
  slug: string
  name: string
  productCount: number
}

export type Promotion = {
  id: string
  title: string
  description: string
  discountPercent: number
  code: string
  validFrom: string
  validUntil: string
  active: boolean
}
