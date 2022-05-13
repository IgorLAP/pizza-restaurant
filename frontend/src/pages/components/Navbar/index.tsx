import Head from 'next/head'
import Image from 'next/image'

import styles from './styles.module.scss'

export function Navbar() {
  return (
    <>
      <Head>
        <title>Pizza Time | Order the best pizzas in Next.js</title>
      </Head>
      <div className={styles.container}>
      <div className={styles.item}>
        <button type='button'>
          <Image width={32} height={32} src="/img/telephone.png" alt='call us' />
        </button>
        <div className={styles.callText}>
          <span>ORDER NOW!</span>
          <span>012 345 678</span>
        </div>
      </div>
      <div className={styles.item}>
        <nav>
          <ul>
            <li>Homepage</li>
            <li>Products</li>
            <li>Menu</li>
            <Image src='/img/logo.png' alt='Pizza time logo' width={160} height={69} />
            <li>Events</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
      <div className={styles.item}>
        <div className={styles.cart}>
          <Image src='/img/cart.png' alt='Cart' width={30} height={30} />
          <span className={styles.counter}>2</span>
        </div>
      </div>
    </div>
    </>
  )
}