import { useNavigate } from 'react-router-dom'
import Card from '../components/card/Card'
import { useCart } from '../hooks/useCart'

const Cart = () => {
  const navigate = useNavigate()
  const { productsInCart, totalCount } = useCart()

  const getTotalAmountPerProduct = (price, qty) => {
    const amount = price * qty
    return parseFloat(amount).toFixed(2)
  }

  const getTotalAmountCart = (products) => {
    const total = products.reduce((totalAmount, item) => totalAmount + (item.product.price * item.quantity), 0)
    return total.toFixed(2)
  }

  return (
    <Card customClassName='large'>
      {productsInCart?.length > 0
        ? (
          <>
            <h2>Your Cart ({totalCount})</h2>
            <table className='cart-table'>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {productsInCart.map(({ product, quantity }) => (
                  <tr key={product.id}>
                    <td className='cart-product-item'>
                      <img src={product.thumbnail} alt={product.title} />
                      <div>
                        <h3>{product.title}</h3>
                        <span>Brand: {product.brand}</span>
                        <span>{product.shippingInformation}</span>
                      </div>
                    </td>
                    <td>
                      ${product.price}
                    </td>
                    <td>
                      {quantity}
                    </td>
                    <td>
                      {getTotalAmountPerProduct(product.price, quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td scope='row' colSpan='3'>
                    Total
                  </td>
                  <td scope='row' colSpan='1'>
                    {getTotalAmountCart(productsInCart)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </>)
        : (
          <h2>Your Cart is empty</h2>
          )}

      <button
        className='checkout-btn'
        onClick={() => navigate('/checkout')}
      >
        Check out
      </button>
    </Card>
  )
}

export default Cart
