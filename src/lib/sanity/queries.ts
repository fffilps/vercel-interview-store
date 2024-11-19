import { cache } from 'react'
import { groq, PortableTextBlock } from 'next-sanity'
import { client } from './lib/client'
import { notFound } from 'next/navigation'

export interface Product {
  _id: string
  name: string
  slug: string
  price: number
  imageUrl: string
  image: string
  description?: {
    children: Array<{
      text: string
    }>
  }[]
  category: string
  images: {
    _type: "image"
    asset: {
      _ref: string
      url: string
    }
  }[]
}

interface SearchParams {
  search?: string
  category?: string
  sort?: string
}

interface Banner {
  title: string
  description: string
  image: string
}

// Cache products for 1 hour (3600 seconds)
export const getProducts = cache(async (params?: SearchParams): Promise<Product[]> => {
  const { search, category, sort } = params || {}
  
  // Build filter conditions
  const filters = [`_type == "products"`]
  if (search) {
    filters.push(`name match "*${search}*"`)
  }
  if (category) {
    filters.push(`category->slug.current == "${category}"`)
  }

  // Build sort condition
  const sortOrder = sort === 'price-desc' ? 'price desc' : 
                 sort === 'price-asc' ? 'price asc' : 
                 '_createdAt desc'

  const query = groq`*[${filters.join(' && ')}] | order(${sortOrder}) {
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

  return client.fetch(query, {}, { 
    cache: 'force-cache',
    next: { revalidate: 3600, tags: ['products'] }
  })
})

export const getProductBySlug = cache(async (slug: string): Promise<Product> => {
  const query = groq`*[_type == "products" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    price,
    description,
    "imageUrl": image.asset->url,
    "images": images[]{
      _type,
      asset->{
        _ref,
        url
      }
    }
  }`

  const product = await client.fetch(query, { slug }, {
    cache: 'force-cache',
    next: { tags: ['products'], revalidate: 3600 }
  })

  if (!product) {
    notFound()
  }

  return product
})

// Cache featured products for 1 hour
export const getFeaturedProducts = cache(async (): Promise<Product[]> => {
  const query = groq`*[_type == "products" && featured == true][0...4]{
    _id,
    name,
    price,
    "slug": slug.current,
    "image": images[0].asset->url,
    "category": category->title
  }`

  return client.fetch(query, {}, {
    cache: 'force-cache',
    next: { revalidate: 3600, tags: ['featured'] }
  })
})

// Cache the slugs fetching
export const getAllProductSlugs = cache(async (): Promise<string[]> => {
  const query = groq`*[_type == "products"].slug.current`
  
  return client.fetch(query, {}, {
    cache: 'force-cache',
    next: { tags: ['products'], revalidate: 3600 }
  })
})

// You can add more cached queries here as needed 

export const getBannerContent = cache(async (): Promise<Banner> => {
  const query = groq`*[_type == "banner"][0] {
    title,
    description,
    "image": image.asset->url
  }`

  return client.fetch(query, {}, {
    cache: 'force-cache',
    next: { revalidate: 3600, tags: ['banner'] }
  })
})

export async function getCategories() {
  return client.fetch(`
    *[_type == "category"] {
      _id,
      title,
      "image": image.asset->url,
      "slug": slug.current
    }
  `)
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  body: PortableTextBlock[]
  excerpt: string
  description: string
  publishedAt: string
  images: {
    asset: {
      _ref: string
      url: string
    }
    alt?: string
    caption?: string
  }[]
}

// Get all blog posts
export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const query = groq`*[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    description,
    publishedAt,
    "images": images[]{
      "asset": asset->{
        _ref,
        url
      },
      alt,
      caption
    }
  }`

  return client.fetch(query, {}, {
    cache: 'force-cache',
    next: { revalidate: 3600, tags: ['blog'] }
  })
})

// Get single blog post by slug
export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPost> => {
  const query = groq`*[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    description,
    body,
    publishedAt,
    "images": images[]{
      "asset": asset->{
        _ref,
        url
      },
      alt,
      caption
    }
  }`

  const post = await client.fetch(query, { slug }, {
    cache: 'force-cache',
    next: { tags: ['blog'], revalidate: 3600 }
  })

  if (!post) {
    notFound()
  }

  return post
})

// Get all blog slugs
export const getAllBlogSlugs = cache(async (): Promise<string[]> => {
  const query = groq`*[_type == "blog"].slug.current`
  
  return client.fetch(query, {}, {
    cache: 'force-cache',
    next: { tags: ['blog'], revalidate: 3600 }
  })
})

