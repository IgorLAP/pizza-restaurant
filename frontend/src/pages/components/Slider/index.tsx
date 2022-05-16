import Image from 'next/image'
import { useEffect, useState } from 'react'

import styles from './styles.module.scss'

declare global {
  interface Window { 
    myInterval: ReturnType<typeof setTimeout> 
  }
}

export function Slider() {
  const [slide, setSlide] = useState(0)

  // useEffect(() => {
  //   window.myInterval = setInterval(() => {
  //     handlePrevSlide()
  //   }, 1000)
  //   return () => {clearInterval(window.myInterval)}
  // }, [])

  // useEffect(() => {
    
  //   console.log(slide, images.length)
  // }, [slide])

  function handlePrevSlide() {
    if(slide > 0){
      setSlide(prevState => prevState - 1)
    }

    if(slide == 0) {
      setSlide(images.length - 1)
    }
  }

  function handleNextSlide() {
    if(slide == (images.length - 1)) {
      setSlide(0)
    } else {
      setSlide(prevState => prevState + 1)
    }
  }

  const images = [
    '/img/featured.png',
    '/img/featured2.png',
    '/img/featured3.png'
  ]

  return (
    <div className={styles.container}>
      <div onClick={handlePrevSlide} className={styles.arrowContainer}>
        <Image src="/img/arrowl.png" alt="previous" layout='fill' />
      </div>
      <div className={styles.wrapper} style={{ transform: `translateX(${-100 * slide}vw)` }}>
        {images.map((item, index) => (
          <div key={index} className={styles.imgContainer}>
            <Image src={item} priority alt=""  layout='fill' objectFit='contain' />
          </div>
        ))}
      </div>
      <div onClick={handleNextSlide} className={styles.arrowContainer}>
        <Image src="/img/arrowr.png" alt="next" layout='fill' />  
      </div>
    </div>
  )
}