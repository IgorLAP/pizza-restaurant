import { GetStaticProps } from 'next'
import Head from 'next/head'

import { PizzaList } from '../components/PizzaList'
import { Slider } from '../components/Slider'
import { ProductInterface } from '../interfaces/ProductInterface'
import { getProducts } from '../lib/get-products'

interface HomeProps {
  products: ProductInterface[]
}

export default function Home({ products }: HomeProps) {
  return (
    <>
      <Head><title>Pizza Time | Order the best pizzas with Next.js</title></Head>
      <Slider />
      <PizzaList list={products} />
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const products: ProductInterface[] = await getProducts()

  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    },
    revalidate: 60 * 60
  }
}