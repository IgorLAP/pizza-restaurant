import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { CartSummary } from '../../components/CartSummary'
import { moneyFormatter } from '../../helpers/moneyFormatter'
import { getOneOrder } from '../../lib/get-one-order'
import styles from './styles.module.scss'

interface OrdersProps {
  order: {
    _id: string;
    customer: string;
    address: string;
    total: number;
    status: number;
  }
}

export default function Orders({ order }: OrdersProps) {
  function properStatus(index: number) {
    if(index === order.status) return `${styles.columnTableLike}`
    if((order.status + 1) === index) return `${styles.columnTableLike} ${styles.actual}`
    if(index > order.status) return `${styles.columnTableLike} ${styles.notDone}`
  }

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
                <td className={styles.orderId}>{order._id}</td>
                <td className={styles.customerName}>{order.customer}</td>
                <td className={styles.customerAddress}>{order.address}</td>
                <td className={styles.orderTotal}>{moneyFormatter(order.total)}</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.rowTableLike}>
            <div className={properStatus(0)}>
              <Image src='/img/paid.png' width={30} height={30} alt='payment' />
              <span>Payment</span>
              <div className={styles.checked}>
                <Image src='/img/checked.png' width={20} height={20} alt='checked' />
              </div>
            </div>
            <div className={properStatus(1)}>
              <Image src='/img/bake.png' width={30} height={30} alt='bake' />
              <span>Preparing</span>
              <div className={styles.checked}>
                <Image src='/img/checked.png' width={20} height={20} alt='checked' />
              </div>
            </div>
            <div className={properStatus(2)}>
              <Image src='/img/bike.png' width={30} height={30} alt='bike' />
              <span>On the way</span>
              <div className={styles.checked}>
                <Image src='/img/checked.png' width={20} height={20} alt='checked' />
              </div>
            </div>
            <div className={properStatus(3)}>
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
            subtotal: order.total,
            discount: 0.00,
            total: order.total,
            status: true
          }}
        />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;
  const order = await getOneOrder(id as string);
  
  return {
    props: {
      order: JSON.parse(JSON.stringify(order))
    }
  }
}