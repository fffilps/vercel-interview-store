import { Suspense } from 'react'
import ProductGrid from '@/components/product/product-grid'
import { getProducts } from '@/lib/sanity/queries'
import { SearchForm } from '@/components/product/search-form'

// Enable PPR for partial prerendering
export const experimental_ppr = true

// Static page with revalidation every hour
export const revalidate = 3600

type SearchParams = Promise<{
  search?: string
  category?: string
  sort?: string
}>

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  // Start loading products data
  const productsData = getProducts(await searchParams)
  
  return (
    <div className="container mx-auto py-8">
      {/* Static content shown immediately */}
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <SearchForm initialSearch={(await searchParams).search} />
      </div>

      {/* Product grid with loading UI */}
      <Suspense 
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
            ))}
          </div>
        }
      >
        <ProductGrid products={await productsData} />
      </Suspense>
    </div>
  )
}