import { moneyFormatter } from '../../helpers/moneyFormatter';
import styles from './styles.module.scss'

interface CartSummaryProps {
  data: {
    subtotal: number;
    discount?: number;
    total: number;
    status?: boolean;
  }
}

export function CartSummary({ data }: CartSummaryProps) {
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
        {data.status && 
          <button disabled style={{ color: 'var(--teal)' }} type='button'>Paid</button>
        }
        {!data.status && 
          <button type='button'>Check out now!</button>
        }
    </div>
  )
}