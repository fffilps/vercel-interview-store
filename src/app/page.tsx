import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { getFeaturedProducts, getCategories, getBannerContent } from '@/lib/sanity/queries'
import { Product } from '@/lib/sanity/queries'

export const experimental_ppr = true
export const revalidate = 3600

function ProductSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-4">
        <div className="aspect-square bg-gray-200 rounded-md mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </CardContent>
    </Card>
  )
}

function CategorySkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-4">
        <div className="aspect-video bg-gray-200 rounded-md mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </CardContent>
    </Card>
  )
}

function BannerSkeleton() {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg aspect-[21/9] w-full"></div>
  )
}

async function Banner() {
  const banner = await getBannerContent()
  
  return (
    <div className="relative rounded-lg overflow-hidden">
      <Image
        src={banner.image}
        alt={banner.title}
        width={1200}
        height={400}
        className="object-cover w-full aspect-[21/9]"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-6">
        <h2 className="text-4xl font-bold mb-2">{banner.title}</h2>
        <p className="text-xl mb-4">{banner.description}</p>
        <Button size="lg" asChild>
          <Link href="/products" prefetch={true}>
            Shop Now
          </Link>
        </Button>
      </div>
    </div>
  )
}

async function FeaturedProducts() {
  const products = await getFeaturedProducts()
  console.log("product", products)
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product: Product) => (
        <Card key={product._id} className="bg-gray-100 dark:bg-gray-900">
          <CardContent className="p-4">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="rounded-md object-cover aspect-square mb-2"
            />
            <CardTitle className="text-lg mb-1">{product.name}</CardTitle>
            <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-green-500 hover:bg-green-600">
              <Link href={`/products/${product.slug}`}>View Product</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

interface Category {
  _id: string
  title: string
  image: string
  slug: string
}

async function Categories() {
  const categories = await getCategories()

  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      {categories.map((category: Category) => (
        <Card key={category._id} className="bg-gray-100 dark:bg-gray-900">
          <CardContent className="p-4">
            <Image
              src={category.image}
              alt={category.title}
              width={300}
              height={200}
              className="rounded-md object-cover aspect-video mb-2"
            />
            <CardTitle className="text-center text-lg">{category.title}</CardTitle>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default async function StorePage() {
  return (
    <div className="space-y-12 py-12">
      <section>
        <Suspense fallback={<BannerSkeleton />}>
          <Banner />
        </Suspense>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <Suspense fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        }>
          <FeaturedProducts />
        </Suspense>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
        <Suspense fallback={
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <CategorySkeleton key={i} />)}
          </div>
        }>
          <Categories />
        </Suspense>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Discover More</h2>
        <p className="text-xl text-muted-foreground mb-6">
          Explore our full range of products and find exactly what you&apos;re looking for.
        </p>
        <Button size="lg" asChild>
          <Link href="/products" prefetch={true}>
            View All Products
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </section>
    </div>
  )
}