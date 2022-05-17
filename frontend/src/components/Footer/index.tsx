import Image from 'next/image'
import styles from './styles.module.scss'

export function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src='/img/bg.png' alt='background' layout='fill' objectFit='cover' />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <p className={styles.descHead}>OH YES, WE DID.THE LAMA PIZZA, WELL BAKED SLICE OF PIZZA.</p>
        </div>
        <div className={styles.card}>
          <h2>Find our restaurants</h2>
          <p className={styles.text}>
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
          <p className={styles.text}>
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
          <p className={styles.text}>
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
          <p className={styles.text}>
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
        </div>
        <div className={styles.card}>
          <h2>working hours</h2>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>
        </div>
      </div>
    </div>
  )
}