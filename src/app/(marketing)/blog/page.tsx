import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { client } from '@/lib/sanity/lib/client'
import Image from 'next/image'
import { groq } from 'next-sanity'

const query = groq`*[_type == "blog"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  "images": images[]{
    asset->{
      url
    }
  }
}`

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  images?: { asset: { url: string } }[]
}

export default async function HomePage() {
  const posts = await client.fetch<BlogPost[]>(query)
  

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
          {posts.map((post) => (
            <div key={post._id} className="border rounded-lg overflow-hidden w-full">
              <div className="w-full h-auto">
                {post.images && (
                  <Image
                    src={post.images[0].asset.url}
                    alt={post.title}
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {post.excerpt}
                </p>
                <Button variant="link" asChild>
                  <Link href={`/blog/${post.slug.current}`}>Read More</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}