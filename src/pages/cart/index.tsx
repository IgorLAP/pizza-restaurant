import Head from 'next/head'
import Image from 'next/image'

import { CartSummary } from '../../components/CartSummary'
import styles from './styles.module.scss'

export default function Cart() {
  return (
    <>
      <Head><title>Cart | Pizza Time</title></Head>
      <div className={styles.container}>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className={styles.imgContainer}>
                  <Image src='/img/pizza.png' alt="pizza" layout='fill' objectFit='cover' />
                </div>
              </td>
              <td className={styles.productName}>Coralzo</td>
              <td className={styles.extras}>Double ingredient, spicy sauce</td>
              <td className={styles.price}>$19.90</td>
              <td className={styles.quantity}>2</td>
              <td className={styles.totalPrice}>$39.80</td>
            </tr>
          </tbody>
        </table>
        <CartSummary 
          data={{
            subtotal: 79.60,
            discount: 0.00,
            total: 79.60,
            status: false
          }} 
        />
    </div>
    </>
  )
}