/* eslint-disable react/prop-types */
import { useCart } from '../hooks/useCart'
import { Link, useNavigate } from 'react-router-dom'
import Card from './card/Card'
import ProductQtyButtons from './ProductQtyButtons'

const Products = ({ products }) => {
  const navigate = useNavigate()

  const {
    productsInCart,
    checkProductInCart,
    getProductInCartIndex,
    handleAddProduct
  } = useCart()

  return (
    <ul>
      {products.length > 0 &&
        products.map((product) => {
          const isProductInCart = checkProductInCart(product.id)
          const productInCartindex = isProductInCart ? getProductInCartIndex(product.id) : null
          return (
            <li key={product.id}>
              <Card customClassName='product-list-card'>
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
                {
                isProductInCart && (productsInCart[productInCartindex].quantity > 0)
                  ? (
                    <ProductQtyButtons
                      product={product}
                      productInCartindex={productInCartindex}
                    />
                    )
                  : (
                    <button
                      onClick={() => handleAddProduct(product)}
                    >
                      Add to Cart
                    </button>
                    )
                  }
              </Card>
            </li>
          )
        })}
    </ul>
  )
}

export default Products
