import Image from 'next/image';
import styles from './styles.module.scss'

interface PizzaItemProps {
  src: string;
}

export function PizzaItem({ src }: PizzaItemProps) {
  return (
    <div className={styles.container}>
      <Image src={src} alt='' width={500} height={500} />
      <p className={styles.title}>Fiori di zucca</p>
      <p className={styles.price}>$ 19.90</p>
      <span className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
    </div>
  )
}