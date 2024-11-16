import { Suspense } from 'react'
import Link from 'next/link'
import { getProductBySlug, getAllProductSlugs } from '@/lib/sanity/queries'
import { Metadata } from 'next'
import ProductImage from '@/components/product/product-image'
import ProductDetails from '@/components/product/product-details'
import { notFound } from 'next/navigation'

export const experimental_ppr = true
export const revalidate = 3600

type PageProps = {
  params: Promise<{ slug: string }> | { slug: string }
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllProductSlugs()
    return slugs.map((slug) => ({
      slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  try {
    const resolvedParams = await Promise.resolve(params)
    const product = await getProductBySlug(resolvedParams.slug)
    
    return {
      title: product.name,
      description: `${product.name} - Product Details`,
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found',
    }
  }
}

export default async function ProductPage({ params }: PageProps) {
  try {
    const resolvedParams = await Promise.resolve(params)
    
    return (
      <div className="container mx-auto py-8">
        <Link 
          href="/products"
          className="inline-flex items-center mb-6 text-sm text-gray-600 hover:text-gray-900"
          prefetch={true}
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Suspense 
            fallback={
              <div className="relative aspect-square bg-gray-100 animate-pulse rounded-lg" />
            }
          >
            <ProductImage slug={resolvedParams.slug} />
          </Suspense>
          
          <Suspense 
            fallback={
              <div className="space-y-4 animate-pulse">
                <div className="h-8 bg-gray-100 rounded w-3/4" />
                <div className="h-6 bg-gray-100 rounded w-1/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 rounded" />
                  <div className="h-4 bg-gray-100 rounded w-5/6" />
                </div>
              </div>
            }
          >
            <ProductDetails slug={resolvedParams.slug} />
          </Suspense>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading product:', error)
    notFound()
  }
}