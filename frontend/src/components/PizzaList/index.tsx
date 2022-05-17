import { PizzaItem } from '../PizzaItem'
import styles from './styles.module.scss'

export function PizzaList() {
  return (
    <div className={styles.container}>
      <h1>The best pizza in town</h1>
      <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. At autem repudiandae quisquam fuga modi laudantium ducimus beatae? Provident, omnis saepe. Architecto voluptatibus, atque dolor deserunt laudantium sit tempora soluta. Earum!</p>
      <div className={styles.wrapper}>
        <PizzaItem src='/img/pizza.png' />
        <PizzaItem src='/img/pizza.png' />
        <PizzaItem src='/img/pizza.png' />
        <PizzaItem src='/img/pizza.png' />
        <PizzaItem src='/img/pizza.png' />
        <PizzaItem src='/img/pizza.png' />
        <PizzaItem src='/img/pizza.png' />
        <PizzaItem src='/img/pizza.png' />
      </div>
    </div>
  )
}