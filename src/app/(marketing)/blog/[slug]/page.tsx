import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/sanity/queries'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 3600

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto py-8">
      <Link 
        href="/blog"
        className="inline-flex items-center mb-6 text-sm text-gray-600 hover:text-gray-900"
      >
        <svg 
          className="w-4 h-4 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Blog
      </Link>

      <div className="max-w-4xl mx-auto">
        {post.images?.[0] && (
          <div className="relative aspect-video mb-8">
            <Image
              src={post.images[0].asset.url}
              alt={post.images[0].alt || post.title}
              fill
              className="object-cover rounded-lg"
            />
            {post.images[0].caption && (
              <p className="text-sm text-gray-500 mt-2">{post.images[0].caption}</p>
            )}
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="text-gray-600 mb-8">
          {new Date(post.publishedAt).toLocaleDateString()}
        </div>

        <div className="prose max-w-none">
          <PortableText value={post.body} />
        </div>
      </div>
    </article>
  )
}