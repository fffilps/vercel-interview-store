import { Suspense } from 'react'
import ProductGrid from '@/components/product/product-grid'
import { getProducts } from '@/lib/sanity/queries'
import { SearchForm } from '@/components/product/search-form'

export const experimental_ppr = true
export const revalidate = 3600 // ISR - revalidate every hour

type SearchParams = Promise<{
  search?: string
  category?: string
  sort?: string
}>

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  )
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const productsData = getProducts(await searchParams)
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <SearchForm initialSearch={(await searchParams).search} />
      </div>

      <Suspense 
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <ProductGrid products={await productsData} />
      </Suspense>
    </div>
  )
}