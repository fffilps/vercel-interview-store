import ProductGrid from '@/components/product/product-grid'

// This would typically come from your Shopify integration
const sampleProducts = [
  {
    id: '1',
    handle: 'sample-product-1',
    title: 'Sample Product 1',
    price: '$99.99',
    imageUrl: '/placeholder.svg'
  },
  {
    id: '2',
    handle: 'sample-product-2',
    title: 'Sample Product 2',
    price: '$79.99',
    imageUrl: '/placeholder.svg'
  },
  // Add more sample products as needed
]

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <ProductGrid products={sampleProducts} />
    </div>
  )
}