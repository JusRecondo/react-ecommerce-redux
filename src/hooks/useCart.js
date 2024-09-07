import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, removeProductFromCart } from '../redux/features/cartSlice'

export function useCart () {
  const { productsInCart } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const checkProductInCart = (productId) => {
    return productsInCart.some((item) => item.product.id === productId)
  }

  const getProductInCartIndex = (id) => {
    return productsInCart.findIndex((item) => item.product.id === id)
  }

  const handleAddProduct = (product) => {
    dispatch(addProductToCart(product))
  }

  const handleRemoveProduct = (id) => {
    dispatch(removeProductFromCart(id))
  }

  return {
    productsInCart,
    checkProductInCart,
    getProductInCartIndex,
    handleAddProduct,
    handleRemoveProduct
  }
}
