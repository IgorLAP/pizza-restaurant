import Head from 'next/head'
import Image from 'next/image'

import { CartSummary } from '../../components/CartSummary'
import styles from './styles.module.scss'

export default function Orders() {
  return (
    <>
      <Head><title>Orders | Pizza Time</title></Head>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>123848123848</td>
                <td>John Doe</td>
                <td>Brazil Avenue, 178, PE</td>
                <td>$79.80</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.rowTableLike}>
            <div className={styles.columnTableLike}>
              <Image src='/img/paid.png' width={30} height={30} alt='payment' />
              <span>Payment</span>
              <div className={styles.checked}>
                <Image src='/img/checked.png' width={20} height={20} alt='checked' />
              </div>
            </div>
            <div className={`${styles.columnTableLike} ${styles.actual}`}>
              <Image src='/img/bake.png' width={30} height={30} alt='bake' />
              <span>Preparing</span>
              <div className={styles.checked}>
                <Image src='/img/checked.png' width={20} height={20} alt='checked' />
              </div>
            </div>
            <div className={`${styles.columnTableLike} ${styles.notDone}`}>
              <Image src='/img/bike.png' width={30} height={30} alt='bike' />
              <span>On the way</span>
              <div className={styles.checked}>
                <Image src='/img/checked.png' width={20} height={20} alt='checked' />
              </div>
            </div>
            <div className={`${styles.columnTableLike} ${styles.notDone}`}>
              <Image src='/img/delivered.png' width={30} height={30} alt='delivered' />
              <span>Delivered</span>
              <div className={styles.checked}>
                <Image className='checked' src='/img/checked.png' width={20} height={20} alt='checked' />
              </div>
            </div>
          </div>
        </div>
        <CartSummary 
          data={{
            subtotal: 79.60,
            discount: 0.00,
            total: 79.60,
            status: true
          }}
        />
      </div>
    </>
  )
}