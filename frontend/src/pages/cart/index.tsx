import Image from 'next/image'

import styles from './styles.module.scss'

export default function Cart() {
  return (
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
            <td>Coralzo</td>
            <td>Double ingredient, spicy sauce</td>
            <td>$19.90</td>
            <td>2</td>
            <td>$39.80</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.cartSummary}>
        <h1>Cart total</h1>
        <p>Subtotal: <span>$79.60</span></p>
        <p>Discount: <span>$0.00</span></p>
        <p>Total: <span>$79.60</span></p>
        <button type='button'>Check out now!</button>
      </div>
    </div>
  )
}