import { getProductBySlug } from '@/lib/sanity/queries'

interface ProductDetailsProps {
  slug: string
}

export default async function ProductDetails({ slug }: ProductDetailsProps) {
  const product = await getProductBySlug(slug)
  
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-2xl font-bold">${product.price}</p>
      <div className="prose prose-sm">
        <p>{product.description ? product.description[0].children[0].text : "There is no description for this product"}</p>
      </div>
    </div>
  )
} 