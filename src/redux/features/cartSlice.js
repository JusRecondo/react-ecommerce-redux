import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalCount: 0,
  productsInCart: []
}

// "parece que se esta mutando directamente el state", pero redux toolkit se ocupa por detras con la libreria immer
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // recibe un objeto product como payload
    addProductToCart: (state, action) => {
      state.productsInCart = [...state.productsInCart, action.payload]
      state.totalCount += 1
    },
    // recibe un id como payload
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
