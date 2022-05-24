import { NextApiRequest, NextApiResponse } from 'next'

import Product from '../../../models/Product'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const { method } = req;

  if(method == 'DELETE') {
    const { query } = req;

    try {
      await Product.findByIdAndDelete(query.id)
      res.status(200).json({ msg: `Product with ${query.id} deleted` })
    } catch (err) {
      res.status(500).json(err)
    }
  }
  
}