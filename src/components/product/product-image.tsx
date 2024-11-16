import Image from 'next/image'
import { getProductBySlug } from '@/lib/sanity/queries'

interface ProductImageProps {
  slug: string
}

export default async function ProductImage({ slug }: ProductImageProps) {
  const product = await getProductBySlug(slug)
  
  return (
    <div className="relative aspect-square">
      <Image
        src={product.imageUrl ? product.imageUrl : product.images[0].asset.url}
        alt={product.name}
        fill
        className="object-cover rounded-lg"
        priority
      />
    </div>
  )
} 