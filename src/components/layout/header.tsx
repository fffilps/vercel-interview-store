'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/store/cart'
import { CartSheet } from '@/components/cart/cart-sheet'
import { useState, useEffect } from 'react'

export default function Header() {
  const { totalItems, toggleCart } = useCart()
  const [isAnimating, setIsAnimating] = useState(false)

  // Watch for changes in totalItems and trigger animation
  useEffect(() => {
    if (totalItems > 0) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [totalItems])

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-4xl">
          Store.
        </Link>

        <nav className="flex items-center space-x-4">
          <Link href="/products">Products</Link>
          <Link href="/blog">Blog</Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCart}
            className="relative"
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span 
                className={`
                  absolute -top-2 -right-2 
                  bg-red-500 text-white 
                  w-5 h-5 rounded-full 
                  text-xs flex items-center justify-center
                  transition-all duration-300 transform
                  ${isAnimating ? 'scale-125' : 'scale-100'}
                `}
              >
                <span className={`
                  transition-all duration-300 transform
                  ${isAnimating ? 'scale-110' : 'scale-100'}
                `}>
                  {totalItems}
                </span>
              </span>
            )}
          </Button>
        </nav>
      </div>
      <CartSheet />
    </header>
  )
}