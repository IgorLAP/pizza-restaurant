import Product from '../models/Product'

export async function getProducts() {
  const products = await Product.find()
  return products
}