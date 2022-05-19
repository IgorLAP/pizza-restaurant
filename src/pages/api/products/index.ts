import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../../database/mongo'
import Product from '../../../../models/Product'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect()

  if(method == 'GET') {
    try {
      const products = await Product.find()
      res.json(products)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  if(method == 'POST') {
    try {
      const product = await Product.create(req.body)
      res.status(201).json(product)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
