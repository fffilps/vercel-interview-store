import type {StructureResolver} from 'sanity/structure'
import {Package, Laptop, Shirt, Briefcase, Watch} from 'lucide-react'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Products')
        .icon(Package)
        .child(
          S.list()
            .title('Products')
            .items([
              S.documentTypeListItem('products').title('All Products'),
              S.divider(),
              // Electronics category
              S.listItem()
                .title('Electronics')
                .icon(Laptop)
                .child(
                  S.documentList()
                    .apiVersion('2024-01-01')
                    .title('Electronics')
                    .schemaType('products')
                    .filter('_type == "products" && category == "electronics"')
                ),
              // Clothing category  
              S.listItem()
                .title('Clothing')
                .icon(Shirt)
                .child(
                  S.documentList()
                    .apiVersion('2024-01-01')
                    .title('Clothing')
                    .schemaType('products')
                    .filter('_type == "products" && category == "clothing"')
                ),
              // Work category
              S.listItem()
                .title('Work')
                .icon(Briefcase)
                .child(
                  S.documentList()
                    .apiVersion('2024-01-01')
                    .title('Work')
                    .schemaType('products')
                    .filter('_type == "products" && category == "work"')
                ),
              // Accessories category
              S.listItem()
                .title('Accessories')
                .icon(Watch)
                .child(
                  S.documentList()
                    .apiVersion('2024-01-01')
                    .title('Accessories')
                    .schemaType('products')
                    .filter('_type == "products" && category == "accessories"')
                ),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Banners')
        .child(
          S.documentList()
            .title('Banners')
            .filter('_type == "banner"')
        ),
      S.divider(),
      S.listItem()
        .title('Categories')
        .child(
          S.documentList()
            .title('Categories')
            .filter('_type == "category"')
        ),
      S.divider(),
      S.listItem()
        .title('Blog Posts')
        .child(
          S.documentList().title('Blog Posts').filter('_type == "blog"')
        ),
    ])
