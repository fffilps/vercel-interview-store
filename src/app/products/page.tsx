import {groq} from 'next-sanity'
import {client} from '@/lib/sanity/lib/client'
import ProductGrid from '@/components/product/product-grid'

const query = groq`*[_type == "products"]{
  _id,
  name,
  "slug": slug.current,
  price,
  "imageUrl": image.asset->url,
  "images": images[]{
    _type,
    asset->{
      _ref,
      url
    }
  }
}`

export default async function ProductsPage() {
  const products = await client.fetch(query)
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <ProductGrid products={products} />
    </div>
  )
}