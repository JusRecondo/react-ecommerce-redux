/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, removeProductFromCart } from '../redux/features/cartSlice'
import Card from './Card'
import { Link, useNavigate } from 'react-router-dom'

const Products = ({ products }) => {
  const dispatch = useDispatch()
  const { productsInCart } = useSelector(state => state.cart)
  const navigate = useNavigate()

  const checkProductInCart = (productId) => {
    return productsInCart.find((pdt) => pdt.id === productId)
  }

  const handleAddOrRemoveProduct = (productId) => {
    const product = products.find(pdt => pdt.id === productId)

    if (productsInCart.find(pdt => pdt.id === productId)) {
      dispatch(removeProductFromCart(productId))
    } else {
      dispatch(addProductToCart(product))
    }
  }

  return (
    <ul>
      {products.length > 0 &&
        products.map((product) => (
          <li key={product.id}>
            <Card>
              <img
                className='product-list-img'
                src={product.thumbnail}
                alt={product.title}
                onClick={() => navigate(`/product/${product.id}`)}
                role='link'
                tabIndex='0'
                aria-label={`Navigate to product detail ${product.title}`}
              />
              <h3
                className='card-title'
              >
                <Link to={`/product/${product.id}`}>
                  {product.title}
                </Link>
              </h3>
              <p className='card-text'>${product.price}</p>
              <button
                className={`btn ${checkProductInCart(product.id) ? 'btn-danger' : 'btn-success'
                  }`}
                onClick={() => handleAddOrRemoveProduct(product.id)}
              >
                {checkProductInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
              </button>
            </Card>
          </li>
        ))}
    </ul>
  )
}

export default Products
