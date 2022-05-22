import { moneyFormatter } from '../../helpers/moneyFormatter'
import styles from './styles.module.scss'
import { PaypalBtn } from './../PaypalBtn/index'
import React, { useState } from 'react';

interface CartSummaryProps {
  data: {
    subtotal: number;
    discount?: number;
    total: number;
    status?: boolean;
  }
}

export function CartSummary({ data }: CartSummaryProps) {
  const [open, setOpen] = useState(false) 
  
  return (
    <div className={styles.cartSummary}>
        <h1>Cart total</h1>
        <p>Subtotal: 
          <span>
            {moneyFormatter(data.subtotal)}
          </span>
        </p>
        <p>Discount: 
          <span>
          {moneyFormatter(data.discount || 0)}
          </span>
        </p>
        <p>Total: 
          <span>
          {moneyFormatter(data.total)}
          </span>
        </p>
        {data.status ? 
          (
            <button disabled style={{ color: 'var(--teal)' }} type='button'>Paid</button>
          ) : 
          (
            !open ? (
              <button onClick={() =>  setOpen(true)}>Check out now</button>
            ) : (
              <div className={styles.paymentMethods}>
                <button>Cash on delivery</button>
                <PaypalBtn />
              </div>
            )
          )
        }
    </div>
  )
}