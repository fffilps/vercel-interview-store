'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getProductBySlug } from '@/lib/sanity/queries'
import { useCartStore } from '@/lib/store/cart'

interface ProductDetailsProps {
  slug: string
}

export default function ProductDetails({ slug }: ProductDetailsProps) {
  const [product, setProduct] = useState<any>(null)
  const { addItem, toggleCart } = useCartStore()
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      const data = await getProductBySlug(slug)
      setProduct(data)
    }
    loadProduct()
  }, [slug])

  if (!product) return <div>Loading...</div>
  
  const handleAddToCart = () => {
    setIsAnimating(true)
    addItem(product)
    
    // Open cart slider after adding item
    setTimeout(() => {
      toggleCart()
    }, 100)
    
    // Reset animation after it completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-2xl font-bold">${product.price}</p>
      <div className="prose prose-sm">
        <p>{product.description ? product.description[0].children[0].text : "There is no description for this product"}</p>
      </div>
      
      <Button 
        size="lg"
        variant="outline"
        className={`w-full border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 ${
          isAnimating ? 'scale-105 bg-primary text-primary-foreground' : ''
        }`}
        onClick={handleAddToCart}
      >
        <ShoppingCart className={`mr-2 h-5 w-5 transition-transform duration-300 ${
          isAnimating ? 'scale-110' : ''
        }`} />
        Add to Cart
      </Button>
    </div>
  )
} 