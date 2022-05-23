import axios from 'axios'
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'

import { showToast } from '../../helpers/showToast'
import { useAppSelector } from '../../hooks/useAppSelector'
import { reset } from './../../redux/reducers/cartSlice'
import styles from './styles.module.scss'

interface OrderModal {
  setModal: Dispatch<SetStateAction<boolean>>;
}

export function OrderModal({ setModal }: OrderModal) {
  const total = useAppSelector(state => state.cart.total)

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [creating, setCreating] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  function handleClickCloseModal(e) {
    if(e.target.classList[0] == 'styles_modal__6ebD9'){
      setModal(false)
    }
  }

  async function createOrder() {
    setCreating(true);
    
    if(name == '' || phone == '' || address == '') {
      showToast('Preencha todos os campos', 'error')
      setCreating(false);
      return;
    }

    const data = {
      customer: name,
      address: phone ? `${address} ${phone}` : address,
      total,
      method: 0,
    }

    try {
      const res = await axios.post('/api/orders', data);
      if(res.status === 201) {
        showToast('Seu pedido já está sendo processado', 'success')
        router.push('/orders/' + res.data._id);
        dispatch( reset() );
        setModal(false);
      }
    } catch (err) {
      setCreating(false);
      showToast(`Um erro aconteceu: ${err}`, 'error')
    }
  }

  return (
    <div onClick={handleClickCloseModal} className={styles.modal}>
      <div className={styles.container}>
        <h1>You will pay ${total} after delivery.</h1>
        <div className={styles.input}>
          <label htmlFor="name">Name</label>
          <input 
            onChange={(e) => setName(e.target.value)} 
            type="text" name="name"
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="phone">Phone number</label>
          <input 
            onChange={(e) => setPhone(e.target.value)}
            type="tel" name="phone"
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="address">Address</label>
          <textarea 
            onChange={(e) => setAddress(e.target.value)}
            name='address'
            rows={5} cols={33}
          ></textarea>
        </div>
        <button disabled={creating} onClick={createOrder}>Order</button>
      </div>
    </div>
  )
}