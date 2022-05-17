import Head from 'next/head'
import { PizzaList } from '../components/PizzaList'
import { Slider } from '../components/Slider'

export default function Home() {
  return (
    <>
      <Head><title>Pizza Time | Order the best pizzas with Next.js</title></Head>
      <Slider />
      <PizzaList />
    </>
  )
}
