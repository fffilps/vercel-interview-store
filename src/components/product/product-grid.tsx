import ProductCard from './product-card'

// Shared Product interface
export interface Product {
  _id: string
  name: string
  slug: string
  price: number
  imageUrl: string
  images: Array<{
    _type: 'image'
    asset: {
      _ref: string
    }
  }>
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}