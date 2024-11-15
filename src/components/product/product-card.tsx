'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { urlFor } from '@/lib/sanity/lib/image'
import type { Product } from './product-grid'

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.images?.[0] ? urlFor(product.images[0]).url() : null

  return (
    <Card>
      <CardContent className="p-0">
        <Link href={`/products/${product.slug}`}>
          <div className="aspect-square relative">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-all hover:scale-105"
              />
            ) : (
                product.imageUrl && <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-all hover:scale-105"
            />
            )}
          </div>
        </Link>
      </CardContent>
      <CardFooter className="p-4 flex flex-col gap-2">
        <div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-semibold hover:underline">{product.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground">${product.price}</p>
        </div>
        <div className="flex gap-2 w-full">
          <Link href={`/products/${product.slug}`} className="w-full">
            <Button variant="outline" className="w-full">
              Details
            </Button>
          </Link>
          <Button className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}