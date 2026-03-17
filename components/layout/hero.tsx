import Link from 'next/link'

export default function Hero() {
  return (
    <section className="border-b border-border py-24 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
          Wear the framework
          <br />
          you ship with.
        </h1>
        <p className="mt-4 text-muted-foreground text-base max-w-md">
          Premium swag for developers who build with Vercel. From tees to tech gear, represent the
          tools you love.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-80 transition-opacity"
        >
          Browse All Products →
        </Link>
      </div>
    </section>
  )
}
