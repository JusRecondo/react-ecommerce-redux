/* eslint-disable react/prop-types */
import { useCart } from '../hooks/useCart'

const ProductQtyButtons = ({ product, productInCartindex }) => {
  const {
    productsInCart,
    handleAddProduct,
    handleRemoveProduct
  } = useCart()
  return (
    <div className='product-qty-btns'>
      <button
        onClick={() => handleRemoveProduct(product.id)}
      >-
      </button>
      <span>{productsInCart[productInCartindex].quantity}</span>
      <button
        onClick={() => handleAddProduct(product)}
      >+
      </button>
    </div>
  )
}

export default ProductQtyButtons
