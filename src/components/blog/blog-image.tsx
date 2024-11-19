import Image from 'next/image'
import type { BlogPost } from '@/lib/sanity/queries'

export function BlogImage({ post }: { post: BlogPost }) {
  if (!post.images?.[0]) return null

  return (
    <div className="relative aspect-video mb-8">
      <Image
        src={post.images[0].asset.url}
        alt={post.images[0].alt || post.title}
        fill
        priority
        className="object-cover rounded-lg"
      />
      {post.images[0].caption && (
        <p className="text-sm text-gray-500 mt-2">{post.images[0].caption}</p>
      )}
    </div>
  )
} 