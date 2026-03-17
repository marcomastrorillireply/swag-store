import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import HeaderScrollWrapper from '@/components/layout/header-scroll-wrapper'
import Footer from '@/components/layout/footer'
import { fetchStore } from '@/lib/store'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  const store = await fetchStore()
  return {
    title: store.seo.defaultTitle,
    description: store.seo.defaultDescription,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <HeaderScrollWrapper>
          <Header />
        </HeaderScrollWrapper>
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
