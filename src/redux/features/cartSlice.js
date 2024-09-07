import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalCount: 0,
  productsInCart: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.productsInCart = [...state.productsInCart, action.payload]
      state.totalCount += 1
    },
    removeProductFromCart: (state, action) => {
      state.productsInCart = state.productsInCart.filter(product => product.id !== action.payload)
      state.totalCount -= 1
    },
    emptyCart: (state) => {
      state.productsInCart = []
      state.totalCount = 0
    }
  }
})

export const { addProductToCart, removeProductFromCart, emptyCart } = cartSlice.actions

export default cartSlice.reducer
