import Image from 'next/image'
import Link from 'next/link';
import { moneyFormatter } from '../../helpers/moneyFormatter';

import { ProductInterface } from '../../interfaces/ProductInterface'
import styles from './styles.module.scss'

interface PizzaItemProps {
  data: ProductInterface;
}

export function PizzaItem({ data }: PizzaItemProps) {
  return (
    <Link href={`/product/${data._id}`}>
      <div className={styles.container}>
        <Image src={data.img} alt='' width={500} height={500} />
        <p className={styles.title}>{data.title}</p>
        <p className={styles.price}>
          {moneyFormatter(data.prices[0])}
          </p>
        <span className={styles.desc}>{data.desc}</span>
      </div>
    </Link>
  )
}