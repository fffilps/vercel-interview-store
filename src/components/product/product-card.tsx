'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { urlFor } from '@/lib/sanity/lib/image'
import { useCartStore } from '@/lib/store/cart'
import { useState } from 'react'
import type { Product } from '@/lib/sanity/queries'

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore(state => state.addItem)
  const imageUrl = product.images?.[0] ? urlFor(product.images[0]).url() : null
  const [isAnimating, setIsAnimating] = useState(false)

  const handleAddToCart = () => {
    setIsAnimating(true)
    addItem(product)
    
    // Reset animation after it completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 300) // Match this with the CSS animation duration
  }

  return (
    <Card className=''>
      <CardContent className="p-0">
        <Link 
          href={`/products/${product.slug}`}
          prefetch={true}
        >
          <div className="aspect-square relative">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-all hover:scale-105"
              />
            ) : (
              product.imageUrl && (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-all hover:scale-105"
                />
              )
            )}
          </div>
        </Link>
      </CardContent>
      <CardFooter className="p-4 flex flex-col gap-2">
        <div>
          <Link 
            href={`/products/${product.slug}`}
            prefetch={true}
          >
            <h3 className="font-semibold hover:underline">{product.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground">${product.price}</p>
        </div>
        <div className="flex gap-2 w-full">
          <Link 
            href={`/products/${product.slug}`} 
            className="w-full"
            prefetch={true}
          >
            <Button variant="outline" className="w-full">
              Details
            </Button>
          </Link>
          <Button 
            variant="outline"
            className={`w-full border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 ${
              isAnimating ? 'scale-105 bg-primary text-primary-foreground' : ''
            }`}
            onClick={handleAddToCart}
          >
            <ShoppingCart className={`mr-2 h-4 w-4 transition-transform duration-300 ${
              isAnimating ? 'scale-110' : ''
            }`} />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}