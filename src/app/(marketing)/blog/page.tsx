import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-muted rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Store</h1>
        <p className="text-xl mb-6">Discover amazing products at great prices</p>
        <Button asChild>
          <Link href="/products">Shop Now</Link>
        </Button>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Electronics', 'Clothing', 'Home & Garden'].map((category) => (
            <div key={category} className="bg-muted p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">{category}</h3>
              <Button variant="outline" asChild>
                <Link href={`/products?category=${category.toLowerCase()}`}>
                  Explore
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((post) => (
            <div key={post} className="border rounded-lg overflow-hidden">
              <div className="aspect-video bg-muted" />
              <div className="p-4">
                <h3 className="font-semibold mb-2">Blog Post Title {post}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <Button variant="link" asChild>
                  <Link href={`/blog/post-${post}`}>Read More</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}