import { type SchemaTypeDefinition } from 'sanity'
import { productType } from './productType'
import { banner } from './bannerType'
import { category } from './categoryType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, banner, category],
}
