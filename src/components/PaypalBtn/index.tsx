import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { showToast } from '../../helpers/showToast'

import { useAppSelector } from '../../hooks/useAppSelector'
import { reset } from './../../redux/reducers/cartSlice'

declare global {
  interface Window {
    paypal?: any;
  }
}

export function PaypalBtn() {
  const paypal = useRef();
  const total = useAppSelector(state => state.cart.total)
  const dispatch = useDispatch()
  const router = useRouter()

  async function createOrder(data) {
    try {
      const res = await axios.post('/api/orders', data);
      if(res.status === 201) {
        showToast('Seu pedido já está sendo processado', 'success')
        router.push('/orders/' + res.data._id);
        dispatch( reset() );
      }
    } catch (err) {
      showToast(`Um erro aconteceu: ${err}`, 'error')
    }
  }

  useEffect(() => {
    window.paypal
      .Buttons({
        fundingSource: 'paypal',
        createOrder: async (data: Record<string, unknown>, actions) => {
          const order = await actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: String(total),
                },
              },
            ],
          })

          return order;
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          const shipping = order.purchase_units[0].shipping;
          createOrder({
            customer: shipping.name.full_name,
            address: shipping.address.address_line_1,
            total: order.purchase_units[0].amount.value,
            method: 1
          });
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}