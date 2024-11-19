import Link from 'next/link'
import { getBlogPosts } from '@/lib/sanity/queries'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export const experimental_ppr = true // Enable Partial Prerendering
export const revalidate = 3600

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="border rounded-lg overflow-hidden">
            {post.images?.[0] && (
              <div className="relative aspect-video">
                <Image
                  src={post.images[0].asset.url}
                  alt={post.images[0].alt || post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <div className="text-gray-600 mb-4">
                {post.excerpt}
              </div>
              <div className="text-gray-600 mb-4">
                {new Date(post.publishedAt).toLocaleDateString()}
              </div>
              <div className="flex justify-start border-t pt-4">
              <Button className='border border-black hover:bg-black hover:text-white cursor-pointer' asChild>
                <Link href={`/blog/${post.slug}`} className=''>Read More</Link>
              </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}