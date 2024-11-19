// import { Metadata } from 'next'
// import { notFound } from 'next/navigation'
// import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/sanity/queries'

// export const dynamic = 'force-dynamic'


// export async function generateStaticParams() {
//   const slugs = await getAllBlogSlugs()
//   return slugs.map((slug) => ({
//     slug,
//   }))
// }

// export async function generateMetadata(
//   { params }: {params: Promise<{slug: string}>}
// ): Promise<Metadata> {
//   const post = await getBlogPostBySlug((await params).slug)
  
//   return {
//     title: post.title,
//     description: post.excerpt,
//   }
// }

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // if (!(await params).slug) notFound()
    const {slug} = await params
    const title = slug

  // const post = await getBlogPostBySlug((await params).slug)

  return (
    <div>

    <article className="container mx-auto py-8 prose prose-lg">
      <h1>{title}</h1>
      {/* Add your blog post content here */}
    </article>
    </div>
  )
} 