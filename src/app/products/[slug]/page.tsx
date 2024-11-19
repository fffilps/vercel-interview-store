import { Suspense } from 'react'
import Link from 'next/link'
import { getProductBySlug, getAllProductSlugs } from '@/lib/sanity/queries'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductImage from '@/components/product/product-image'
import ProductDetails from '@/components/product/product-details'
import { ProductSkeleton } from '@/components/product/product-skeleton'

export const experimental_ppr = true
export const revalidate = 3600 // ISR - revalidate every hour

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export const dynamicParams = true

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {slug} = await params
  const product = await getProductBySlug(slug)
  
  return {
    title: product.name,
    description: `${product.name} - Product Details`,
  }
}

export default async function ProductPage({ params }: Props) {
  const {slug} = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }
    
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
          <ProductImage slug={slug} />
        </Suspense>
        
        <Suspense fallback={<ProductSkeleton />}>
          <ProductDetails slug={slug} />
        </Suspense>
      </div>
    </div>
  )
}