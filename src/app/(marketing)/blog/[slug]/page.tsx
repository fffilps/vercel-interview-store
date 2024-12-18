import { Suspense } from 'react'
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/sanity/queries'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogSkeleton } from '@/components/blog/blog-skeleton'
import { BlogContent } from '@/components/blog/blog-content'
import { BlogImage } from '@/components/blog/blog-image'

// Enable both PPR and ISR
export const experimental_ppr = true
export const revalidate = 3600 // Revalidate every hour

type Props = {
  params: Promise<{
    slug: string
  }>
}

// This will prerender only these paths at build time
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// Allow dynamic paths to be generated on-demand
export const dynamicParams = true

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug((await params).slug)
  
  return {
    title: post.title,
    description: post.description || post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug((await params).slug)

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
        {/* Static content loads first */}
        <Suspense fallback={<BlogSkeleton />}>
          
          {/* Images load after content */}
          <Suspense fallback={<div className="relative aspect-video mb-8 bg-gray-200 rounded-lg" />}>
            <BlogImage post={post} />
          </Suspense>
          <BlogContent post={post} />
        </Suspense>
      </div>
    </article>
  )
}