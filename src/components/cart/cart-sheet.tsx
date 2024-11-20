'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/store/cart'
import { Separator } from '@/components/ui/separator'

export function CartSheet() {
  // Hydration fix
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { items, isOpen, totalItems, closeCart, updateQuantity, removeItem } = useCart()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleCheckout = () => {
    closeCart()
    router.push('/checkout')
  }

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart ({totalItems} items)</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {items.map((item) => (
              <div key={item._id} className="flex gap-4 py-4">
                <div className="relative aspect-square h-24 w-24 min-w-fit overflow-hidden rounded">
                  <Image
                    src={item.imageUrl || item.images[0].asset.url}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <Link 
                      href={`/products/${item.slug}`}
                      onClick={() => closeCart()}
                      className="font-medium hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">${item.price}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item._id, Math.max(0, item.quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeItem(item._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {items.length > 0 && (
            <div className="pt-4 space-y-4 pb-4">
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <Button 
                className="w-full border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                variant="outline"
                size="lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          )}

          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button onClick={() => closeCart()}>Continue Shopping</Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
} 