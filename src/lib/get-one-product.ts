import Product from "../../models/Product";

export async function getOneProduct(id: string) {
  const getOneProduct = await Product.findById(id)
  return getOneProduct
}