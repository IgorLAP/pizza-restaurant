import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

import styles from './style.module.scss'

export default function Product() {
  const [sizeSelected, setSizeSelected] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const pizzaPlaceholder = {
    id: 1,
    img: '/img/pizza.png',
    name: 'CAMPAGNOLA',
    price: [19.9, 23.9, 27.9],
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem fugit labore dolores doloribus fugiat, atque, ullam quis inventore reiciendis facere nobis mollitia tempora numquam eaque velit rerum officiis quia amet.'
  }

  return (
    <>
    <Head><title>{pizzaPlaceholder.name} | Pizza Time</title></Head>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.imgContainer}>
            <Image src={pizzaPlaceholder.img} alt="pizza" layout='fill' objectFit='contain' />
          </div>
        </div>
        <div className={styles.rightSide}>
          <h1>{pizzaPlaceholder.name}</h1>
          <div className={styles.price}>
            <span>{new Intl.NumberFormat('en-US', {
              currency: 'USD',
              style: 'currency'
            }).format(pizzaPlaceholder.price[sizeSelected])}</span>
          </div>
          <p>{pizzaPlaceholder.desc}</p>
          <h3>Choose the size</h3>
          <div className={styles.pizzaSize}>
            <div onClick={() =>  setSizeSelected(0)} className={styles.size} >
              <span className={sizeSelected == 0 ? styles.sizeSelected : ''}>Small</span>
              <Image src="/img/size.png" alt='size' objectFit='contain' layout='fill' />
            </div>
            <div onClick={() =>  setSizeSelected(1)} className={styles.size}>
              <span className={sizeSelected == 1 ? styles.sizeSelected : ''}>Medium</span>
              <Image src="/img/size.png" alt='size' objectFit='contain' layout='fill' />
            </div>
            <div onClick={() =>  setSizeSelected(2)} className={styles.size}>
              <span className={sizeSelected == 2 ? styles.sizeSelected : ''}>Large</span>
              <Image src="/img/size.png" alt='size' objectFit='contain' layout='fill' />
            </div>
          </div>
          <h3>Choose the aditional ingredients</h3>
          <div className={styles.aditionalArea}>
            <input type="checkbox" name="double" id="double" />
            <label htmlFor="double">Double ingredients</label>
            <input type="checkbox" name="extra" id="extra" />
            <label htmlFor="extra">Extra cheese</label>
            <input type="checkbox" name="spicy" id="spicy" />
            <label htmlFor="spicy">Spicy sauce</label>
            <input type="checkbox" name="garlic" id="garlic" />
            <label htmlFor="garlic">Garlic sauce</label>
          </div>
          <div className={styles.final}>
            <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            <button type='button'>Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  )
}