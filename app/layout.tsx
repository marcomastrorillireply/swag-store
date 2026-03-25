import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import HeaderScrollBackground from '@/components/layout/header-scroll-wrapper'
import Footer from '@/components/layout/footer'
import { fetchStore } from '@/lib/store'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { CartProvider } from '@/components/cart/cart-context'
import { Toaster } from '@/components/ui/sonner'

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  const store = await fetchStore()
  return {
    title: store.seo.defaultTitle,
    description: store.seo.defaultDescription,
    openGraph: {
      title: store.seo.defaultTitle,
      description: store.seo.defaultDescription,
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased flex flex-col min-h-screen`}>
        <CartProvider>
          <div className="fixed top-0 inset-x-0 z-50">
            <HeaderScrollBackground />
            <div className="relative z-10">
              <Header />
            </div>
          </div>
          <div className="h-14" />
          <div className="flex-grow">
            {children}

            <SpeedInsights />
          </div>
        </CartProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
