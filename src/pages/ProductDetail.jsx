import { useEffect, useState } from 'react'
import { getProductById } from '../services/products'
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import Card from '../components/card/Card'
import ProductQtyButtons from '../components/ProductQtyButtons'
import { FiStar } from 'react-icons/fi'

const ProductDetail = () => {
  const [product, setProduct] = useState({})
  const [productImages, setProductImages] = useState([])
  const [loadingProduct, setLoadingProduct] = useState(false)
  const [productError, setProductError] = useState(false)
  const { productId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getProductFromAPI = async (productId) => {
      try {
        setLoadingProduct(true)
        const productFromAPI = await getProductById(productId)
        if (productFromAPI) {
          setProduct(productFromAPI)
        }
      } catch (e) {
        console.log(e)
        setProductError('Sorry, there was an error loading the product')
      } finally {
        setLoadingProduct(false)
      }
    }

    getProductFromAPI(productId)
  }, [])

  useEffect(() => {
    if (product && product.images) {
      setProductImages(product.images)
    }
  }, [product])

  const {
    productsInCart,
    checkProductInCart,
    getProductInCartIndex,
    handleAddProduct
  } = useCart()
  const isProductInCart = checkProductInCart(product.id)
  const productInCartindex = isProductInCart ? getProductInCartIndex(product.id) : null
  return (
    <>
      {
        loadingProduct
          ? (<p>Loading...</p>)
          : (productError && productError.length === 0)
              ? (<p>{productError}</p>)
              : (
                <>
                  <Card customClassName='large product-detail-card'>
                    <img
                      className='product-detail-img'
                      src={productImages[0]}
                      alt={product.title}
                    />
                    <div className='product-detail-info'>
                      <h2>
                        {product.title} - {product.brand}
                      </h2>
                      <span>Category: {product.category}</span>
                      <h3>
                        <span className='badge'>${product.price}</span>
                      </h3>
                      <p>{product.description}</p>
                      {
                isProductInCart && (productsInCart[productInCartindex].quantity > 0)
                  ? (
                    <div className='product-detail-btns'>
                      <ProductQtyButtons
                        product={product}
                        productInCartindex={productInCartindex}
                      />
                      <button
                        onClick={() => navigate('/cart')}
                      >
                        Go to Cart
                      </button>
                    </div>
                    )
                  : (
                    <button
                      onClick={() => handleAddProduct(product)}
                    >
                      Add to Cart
                    </button>
                    )
                  }
                    </div>
                  </Card>
                  {product.reviews?.length &&
                    <section className='reviews'>
                      <h2>Reviews</h2>
                      {product.reviews.map((review, i) => (
                        <Card key={i}>
                          <h4>{review.reviewerName}</h4>
                          <p>{review.comment}</p>
                          {console.log(review)}
                          {review.rating > 0 && (
                            <div>
                              {
                                [...Array(review.rating)].map(point => (
                                  <FiStar key={point} className='review-star' />
                                ))
                              }
                            </div>
                          )}
                        </Card>
                      ))}
                    </section>}
                </>
                )
      }
    </>
  )
}

export default ProductDetail
