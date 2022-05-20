import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { moneyFormatter } from '../../helpers/moneyFormatter'
import { showSucessToast } from '../../helpers/toast'
import { Extras, ProductInterface } from '../../interfaces/ProductInterface'
import { getOneProduct } from '../../lib/get-one-product'
import { addProduct } from './../../redux/reducers/cartSlice'
import styles from './style.module.scss'

interface ProductProps {
  product: ProductInterface;
}

export default function Product({ product }: ProductProps) {
  const dispatch = useDispatch()

  const [sizeSelected, setSizeSelected] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [extraOptions, setextraOptions] = useState<Extras[]>([])
  const [actualPrice, setActualPrice] = useState(0)
  
  useEffect(() => {
    setActualPrice(() => {
      const extras = extraOptions.reduce((total, item) => {
        total += item.price
        return total
      }, 0)
      const actual = [product.prices[sizeSelected], quantity, extras];
      return (actual[0] * actual[1]) + actual[2]
    })
  }, [sizeSelected, quantity, extraOptions])

  

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, item: Extras) {
    if(e.target.checked) {
      setextraOptions([...extraOptions, item])
    } else {
      setextraOptions(prevState => prevState.filter(i => i.text !== item.text))
    }
  }

  function handleClick() {
    const { _id, img, title  } = product
    dispatch( addProduct(
      { extraOptions, quantity, total: actualPrice, _id, img, title, price: product.prices[sizeSelected] }
    ))
    Router.push('/cart')
    showSucessToast(`${title} adicionada ao carrinho`)
  }

  return (
    <>
    <Head><title>{product.title} | Pizza Time</title></Head>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.imgContainer}>
            <Image src={product.img} alt="pizza" layout='fill' objectFit='contain' />
          </div>
        </div>
        <div className={styles.rightSide}>
          <h1>{product.title}</h1>
          <div className={styles.price}>
            <span>{moneyFormatter(actualPrice)}</span>
          </div>
          <p className={styles.desc}>{product.desc}</p>
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
            {product.extraOptions.map((item) => (
              <>
                <input
                  onChange={(e) => handleInputChange(e, item)} 
                  type="checkbox" name={item.text} id={item.text} 
                />
                <label htmlFor={item.text}>{item.text}</label>
              </>
            ))}
          </div>
          <div className={styles.final}>
            <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            <button type='button' onClick={handleClick}>Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;
  const product = await getOneProduct(id as string)

  return {
    props: {
      product: JSON.parse(JSON.stringify(product))
    }
  }
}