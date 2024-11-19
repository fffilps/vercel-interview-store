import { PortableText } from '@portabletext/react'
import type { BlogPost } from '@/lib/sanity/queries'

export function BlogContent({ post }: { post: BlogPost }) {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      
      <div className="text-gray-600 mb-8">
        {new Date(post.publishedAt).toLocaleDateString()}
      </div>

      <div className="prose max-w-none">
        <PortableText value={post.body} />
      </div>
    </div>
  )
} 