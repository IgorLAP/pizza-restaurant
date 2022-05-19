import mongoose from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL

if(!MONGODB_URL) {
  throw new Error('Defina a variavel de conexão ao MongoDB "MONGODB_URL" no arquivo .env')
}

console.log(global)
let cached = global.mongoose

if(!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null
  }
}

export default async function dbConnect() {
  if(cached.conn) {
    return cached.conn
  }

  if(!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URL, opts)
    .then(mongoose => mongoose)
  }

  cached.conn = await cached.promise
  return cached.conn
}
