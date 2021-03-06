import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { useAppSelector } from '../../hooks/useAppSelector'
import styles from './styles.module.scss'


export function Navbar() {
  const quantity = useAppSelector(state => state.cart.quantity)
  const input = useRef<any>()

  const [display, setDisplay] = useState(false)
  
  function handleLinkClick() {
    if(input.current.checked) input.current.checked = false
    if (display) setDisplay(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.mobileMenu}>
          <div className={styles.menuContainer}>
            <input ref={input} onClick={() => setDisplay(prevState => !prevState)} type="checkbox" id='checkbox-menu' className={styles.checkboxMenu} />
            <label htmlFor="checkbox-menu">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
        </div>
        <button type='button'>
          <Image width={32} height={32} src="/img/telephone.png" alt='call us' />
        </button>
        <div className={styles.callText}>
          <span>ORDER NOW!</span>
          <span>012 345 678</span>
        </div>
      </div>
      <div style={{ display: display ? 'block' : '' }} className={styles.item}>
        <nav>
          <ul>
            <li>
              <Link href='/'><span onClick={handleLinkClick}>Homepage</span></Link>
            </li>
            <li>Products</li>
            <li>
              <Link href='/login'><span onClick={handleLinkClick}>Login</span></Link>
            </li>
            <Image src='/img/logo.png' alt='Pizza time logo' width={80} height={80} />
            <li>Events</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
      <div className={styles.item}>
        <Link href='/cart'>
          <div onClick={handleLinkClick} className={styles.cart}>
            <Image src='/img/cart.png' alt='Cart' width={30} height={30} />
            <span className={styles.counter}>{quantity}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}