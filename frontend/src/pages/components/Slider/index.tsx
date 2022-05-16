import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import styles from './styles.module.scss'


export function Slider() {
  const [slide, setSlide] = useState(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(
      () => handleChangeSlide('next')
    , 4000)
    return () => resetTimeout()
  }, [slide])

  function resetTimeout() {
    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  function handleChangeSlide(action: string) {
    if(action === 'next') {
      if(slide === images.length - 1) {
        setSlide(0)
      } else {
        setSlide(prevState => prevState + 1)
      }
    } else {
      if(slide <= 0) {
        setSlide(images.length - 1)
      } else {
        setSlide(prevState => prevState - 1)
      }
    }
  }

  const images = [
    '/img/featured.png',
    '/img/featured2.png',
    '/img/featured3.png'
  ]

  return (
    <div className={styles.container}>
      <div onClick={() => handleChangeSlide('prev')} className={styles.arrowContainer}>
        <Image src="/img/arrowl.png" alt="previous" layout='fill' />
      </div>
      <div className={styles.wrapper} style={{ transform: `translateX(${-100 * slide}vw)` }}>
        {images.map((item, index) => (
          <div key={index} className={styles.imgContainer}>
            <Image src={item} priority alt=""  layout='fill' objectFit='contain' />
          </div>
        ))}
      </div>
      <div onClick={() => handleChangeSlide('next')} className={styles.arrowContainer}>
        <Image src="/img/arrowr.png" alt="next" layout='fill' />  
      </div>
    </div>
  )
}