'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface ProductCardProps {
  product: {
    id: string
    handle: string
    title: string
    price: string
    imageUrl: string
  }
}

export default function ProductCard({ product }: ProductCardProps = {
  product: {
    id: '1',
    handle: 'sample-product',
    title: 'Sample Product',
    price: '$99.99',
    imageUrl: '/placeholder.svg'
  }
}) {
  return (
    <Card>
      <CardContent className="p-0">
        <Link href={`/products/${product.handle}`}>
          <div className="aspect-square relative">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover transition-all hover:scale-105"
            />
          </div>
        </Link>
      </CardContent>
      <CardFooter className="p-4 flex flex-col gap-2">
        <div>
          <h3 className="font-semibold">
            <Link href={`/products/${product.handle}`} className="hover:underline">
              {product.title}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground">{product.price}</p>
        </div>
        <Button className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}