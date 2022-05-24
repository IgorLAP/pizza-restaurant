import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if(method == 'POST') {
    try {
      const { username, password } = req.body;
      if(username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', process.env.TOKEN, {
            maxAge: 60 * 60,
            sameSite: 'strict',
            path: '/'
          })
        )
        res.json({ msg: 'Succesfull' })
      } else {
        res.status(401).json({ msg: 'Wrong credentials' })
      }
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  
}