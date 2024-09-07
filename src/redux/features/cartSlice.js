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
      const product = action.payload
      const productInCartIndex = state.productsInCart.findIndex(
        (item) => item.product.id === product.id
      )
      if (productInCartIndex >= 0) {
        state.productsInCart[productInCartIndex].quantity += 1
        state.totalCount += 1
      } else {
        state.productsInCart = [...state.productsInCart, {
          product,
          quantity: 1
        }]
        state.totalCount += 1
      }
    },
    removeProductFromCart: (state, action) => {
      const productId = action.payload
      const productInCartIndex = state.productsInCart.findIndex(
        (item) => item.product.id === productId
      )
      if (productInCartIndex >= 0) {
        state.productsInCart[productInCartIndex].quantity -= 1
        state.totalCount -= 1
      } else {
        state.productsInCart = state.productsInCart.filter(product => product.id !== productId)
        state.totalCount -= 1
      }
    },
    emptyCart: (state) => {
      state.productsInCart = []
      state.totalCount = 0
    }
  }
})

export const { addProductToCart, removeProductFromCart, emptyCart } = cartSlice.actions

export default cartSlice.reducer
