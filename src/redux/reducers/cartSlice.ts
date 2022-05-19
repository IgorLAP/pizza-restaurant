import { createSlice } from '@reduxjs/toolkit'

import { ProductInterface } from './../../interfaces/ProductInterface'

// const initialState: { products: ProductInterface[], quantity: number, total: number } = {
//   products: [],
//   quantity: 0,
//   total: 0
// }

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.total;
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  }
})

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;