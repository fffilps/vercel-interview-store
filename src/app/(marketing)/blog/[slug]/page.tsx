import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/sanity/queries'

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  if (!params.slug) notFound()

  const post = await getBlogPostBySlug(params.slug)

  return (
    <article className="container mx-auto py-8 prose prose-lg">
      <h1>{post.title}</h1>
      {/* Add your blog post content here */}
    </article>
  )
} 