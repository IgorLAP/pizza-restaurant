import Orders from '../models/Orders'

export async function getOneOrder(id: string) {
  const order = await Orders.findById(id)
  return order;
}