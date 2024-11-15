import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { groq } from 'next-sanity'
import { client } from '@/lib/sanity/lib/client'
import { urlFor } from '@/lib/sanity/lib/image'
import { PortableText, PortableTextBlock } from '@portabletext/react'
import type { Metadata } from 'next'

// Define proper types
type Product = {
  _id: string
  name: string
  description?: PortableTextBlock[]
  price: number
  imageUrl?: string
  images?: Array<{
    _type: string
    asset: {
      _ref: string
      url: string
    }
  }>
  category?: string
  slug: string
}

interface PageProps {
  params: { slug: string }
}

// Metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProduct(params.slug)

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    }
  }

  return {
    title: product.name,
    description: product.description?.[0]?.children?.[0]?.text || '',
  }
}

// Static params generation
export async function generateStaticParams() {
  const query = groq`*[_type == "products" && defined(slug.current)][]{
    "slug": slug.current
  }`
  
  const slugs = await client.fetch<Array<{ slug: string }>>(query)
  return slugs
}

// Product fetching function
async function getProduct(slug: string): Promise<Product | null> {
  const query = groq`*[_type == "products" && slug.current == $slug][0]{
    _id,
    name,
    description,
    price,
    "imageUrl": image.asset->url,
    "images": images[]{
      _type,
      asset->{
        _ref,
        url
      }
    },
    category,
    "slug": slug.current
  }`
  
  return client.fetch(query, { slug })
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  const imageUrl = product.images?.[0] ? urlFor(product.images[0]).url() : product.imageUrl

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
        <div className="space-y-4 md:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">${product.price}</p>
          <div className="prose max-w-none">
            {product.description && (
              <PortableText 
                value={product.description}
                components={{
                  block: {
                    normal: ({children}) => <p className="mb-4">{children}</p>,
                  },
                }}
              />
            )}
          </div>
          <Button size="lg" className="w-full md:w-auto">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}