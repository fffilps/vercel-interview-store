import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { groq } from 'next-sanity'
import { client } from '@/lib/sanity/lib/client'
import { urlFor } from '@/lib/sanity/lib/image'
import { PortableText } from '@portabletext/react'

interface Props {
  params: {
    slug: string
  }
}

async function getProduct(slug: string) {
  return await client.fetch(
    groq`*[_type == "products" && slug.current == $slug][0]{
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
    }`,
    { slug }
  )
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug)
  console.log("product", product)

  if (!product) {
    notFound()
  }

  const imageUrl = product.images?.[0] ? urlFor(product.images[0]).url() : null

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            product.imageUrl && (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
            )
          )}
        </div>
        <div className="space-y- md:w-1/2">
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