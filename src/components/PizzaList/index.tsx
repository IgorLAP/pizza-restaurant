import { ProductInterface } from '../../interfaces/ProductInterface'
import { PizzaItem } from '../PizzaItem'
import styles from './styles.module.scss'

interface PizzaList {
  list: ProductInterface[]
}

export function PizzaList({ list }: PizzaList) {
  return (
    <div className={styles.container}>
      <h1>The best pizza in town</h1>
      <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. At autem repudiandae quisquam fuga modi laudantium ducimus beatae? Provident, omnis saepe. Architecto voluptatibus, atque dolor deserunt laudantium sit tempora soluta. Earum!</p>
      <div className={styles.wrapper}>
        {list.map((item, index) => (
          <PizzaItem key={item._id} data={item} />
        ))}
      </div>
    </div>
  )
}