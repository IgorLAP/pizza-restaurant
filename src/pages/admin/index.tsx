import axios from 'axios'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import Swal from 'sweetalert2'

import { moneyFormatter } from '../../helpers/moneyFormatter'
import { OrderInterface } from '../../interfaces/OrderInterface'
import { ProductInterface } from '../../interfaces/ProductInterface'
import Orders from '../../models/Orders'
import Product from '../../models/Product'
import styles from './styles.module.scss'

interface AdminProps {
  orders: OrderInterface[];
  products: ProductInterface[];
}

export default function Admin({ orders, products }: AdminProps) {
  const [pizzaList, setPizzaList] = useState<ProductInterface[]>(products)
  const [ordersList, setOrdersList] = useState(orders)
  const status = [ 'Preparing', 'On the way', 'Delivered' ]

  function handleDeleteProduct(id: string) {
    Swal.fire({
      title: `Delete product with id:${id.slice(0,5)}...?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#30d643',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(`/api/products/${id}`)
          setPizzaList(prevState => prevState.filter(i => i._id !== id))
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } catch (err) {
          Swal.fire(
            'Error!',
            `Something went wrong! ${err}`,
            'error'
          )
        }
      }
    })
  }

  function handleNextStage({ id, status }: { id: string, status: number }) {
    Swal.fire({
      title: `Order id:${id.slice(0,5)}... to the next stage?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#30d643',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change stage!'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.put('/api/orders', { id, status })
          .then(res => {
            const tmpArr = [...ordersList]
            const index = tmpArr.findIndex(i => i._id == id)
            if(index !== -1) {
              tmpArr[index] = res.data as OrderInterface
            }
            setOrdersList(tmpArr)
          })
          Swal.fire(
            'Success!',
            'Status changed',
            'success'
          )
        } catch (err) {
          Swal.fire(
            'Error!',
            `Something went wrong! ${err}`,
            'error'
          )
        }
      }
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftTable}>
        <h2>Products</h2>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Prices</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pizzaList.map(item => (
              <tr key={item._id}>
                <td>
                  <Image 
                    src={item.img}
                    width={60}
                    height={60}
                    alt={item.title}
                  />
                </td>
                <td>{item._id.slice(0,5)}...</td>
                <td>{item.title}</td>
                <td>
                  {item.prices.map((price, index) => (
                    <span 
                      style={{ display: 'block', marginBottom: '4px' }} 
                      key={price}
                    >{moneyFormatter(price)}</span>
                  ))}
                </td>
                <td>
                  <button className={styles.editBtn}>edit</button>
                  <button 
                    onClick={() => handleDeleteProduct(item._id)}
                    className={styles.delBtn}
                  >delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.rightTable}>
        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ordersList.map(item => (
              <tr key={item._id}>
                <td>{item._id.slice(0,5)}...</td>
                <td>{item.customer}</td>
                <td>{moneyFormatter(item.total)}</td>
                <td>{item.method == 0 ? 'Cash on delivery' : 'Paypal'}</td>
                <td>{status[item.status]}</td>
                <td>
                  {status[item.status] == 'Delivered' ? (
                    <button 
                      style={{ padding: '.4rem', opacity: '.5' }} 
                      disabled 
                    >Delivered</button>
                  ) : (
                    <button 
                    onClick={() => handleNextStage({ id: item._id, status: item.status + 1 })}
                  >Next stage</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = req.cookies;
  
  if (!token || token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  
  const orders = await Orders.find();
  const products = await Product.find();

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
      products: JSON.parse(JSON.stringify(products))
    }
  }
}