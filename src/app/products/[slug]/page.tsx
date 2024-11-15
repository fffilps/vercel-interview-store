import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

// This would typically come from your Shopify integration
const getProduct = (handle: string) => {
  const sampleProduct = {
    id: '1',
    handle: 'sample-product',
    title: 'Sample Product',
    price: '$99.99',
    imageUrl: '/placeholder.svg',
    description: 'This is a sample product description. It would typically contain detailed information about the product, its features, and benefits.'
  }

  return handle === sampleProduct.handle ? sampleProduct : null
}

export default function ProductPage({ params }: { params: { handle: string } }) {
  const product = getProduct(params.handle)

  if (!product) {
    notFound()
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <div className="aspect-square relative">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-2xl font-semibold">{product.price}</p>
        <div className="prose max-w-none">
          <p>{product.description}</p>
        </div>
        <Button size="lg" className="w-full md:w-auto">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}