import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../database/mongo'
import Orders from '../../../models/Orders'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  if(method === 'GET') {
    try {
      const allOrders = await Orders.find();
      res.json(allOrders);
    } catch(err) {
      res.status(500).json({ error: err._message })
    }
  }
  
  if(method === 'POST') {
    try {
      const order = await Orders.create(req.body);
      res.status(201).json(order);
    } catch(err) {
      res.status(500).json({ error: err._message })
    }
  }
}