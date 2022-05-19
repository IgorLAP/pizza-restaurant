import Head from 'next/head'
import Image from 'next/image'

import { CartSummary } from '../../components/CartSummary'
import { moneyFormatter } from '../../helpers/moneyFormatter'
import { useAppSelector } from '../../hooks/useAppSelector'
import { ProductInterface } from '../../interfaces/ProductInterface'
import styles from './styles.module.scss'

type ExcludeProductInterface = Omit<ProductInterface, 'prices' | 'desc'>
interface CartProduct extends ExcludeProductInterface {
  quantity: number;
  total: number;
  price: number;
}

export default function Cart() {
  const total = useAppSelector(state => state.cart.total)
  const products: CartProduct[] = useAppSelector(state => state.cart.products)
  
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
            {products.map(item => (
              <tr key={item._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image src={item.img} alt="pizza" layout='fill' objectFit='cover' />
                  </div>
                </td>
                <td className={styles.productName}>{item.title}</td>
                <td className={styles.extras}>
                  {item.extraOptions.map(extra => 
                    (<span key={extra.text}>{extra.text} - </span>)
                  )}
                </td>
                <td className={styles.price}>{moneyFormatter(item.price)}</td>
                <td className={styles.quantity}>{item.quantity}</td>
                <td className={styles.totalPrice}>{moneyFormatter(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <CartSummary 
          data={{
            subtotal: total,
            total: total,
          }} 
        />
    </div>
    </>
  )
}