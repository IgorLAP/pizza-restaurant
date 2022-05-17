import styles from './styles.module.scss'

interface CartSummaryProps {
  data: {
    subtotal: number;
    discount: number;
    total: number;
    status: boolean;
  }
}

export function CartSummary({ data }: CartSummaryProps) {
  return (
    <div className={styles.cartSummary}>
        <h1>Cart total</h1>
        <p>Subtotal: 
          <span>
            {new Intl.NumberFormat('en-US', {
              currency: 'USD', style: 'currency'
            }).format(data.subtotal)}
          </span>
        </p>
        <p>Discount: 
          <span>
          {new Intl.NumberFormat('en-US', {
              currency: 'USD', style: 'currency'
            }).format(data.discount)}
          </span>
        </p>
        <p>Total: 
          <span>
          {new Intl.NumberFormat('en-US', {
              currency: 'USD', style: 'currency'
            }).format(data.total)}
          </span>
        </p>
        {data.status && 
          <button disabled style={{ color: 'var(--teal)' }} type='button'>Paid</button>
        }
        {!data.status && 
          <button type='button'>Check out now!</button>
        }
    </div>
  )
}