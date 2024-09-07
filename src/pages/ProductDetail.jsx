import { useEffect, useState } from 'react'
import { getProductById } from '../services/products'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, removeProductFromCart } from '../redux/features/cartSlice'

const ProductDetail = () => {
  const [product, setProduct] = useState({})
  const [productImages, setProductImages] = useState([])
  const [loadingProduct, setLoadingProduct] = useState(false)
  const [productError, setProductError] = useState(false)
  const { productId } = useParams()
  const { productsInCart } = useSelector((state) => state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  const checkProductInCart = (productId) => {
    return productsInCart.find((pdt) => pdt.id === productId)
  }

  const handleAddOrRemoveProduct = (productId) => {
    if (productsInCart.find((pdt) => pdt.id === productId)) {
      dispatch(removeProductFromCart(productId))
    } else {
      dispatch(addProductToCart(product))
    }
  }
  return (
    <section>
      {
                loadingProduct
                  ? (<p>Loading...</p>)
                  : (productError && productError.length === 0)
                      ? (<p>{productError}</p>)
                      : (
                        <>
                          <img
                            className='product-detail-img'
                            src={productImages[0]}
                            alt={product.title}
                          />
                          <h3>
                            {product.title} - {product.brand}
                          </h3>
                          <span>Categoría: {product.category}</span>
                          <h4>
                            <span className='badge'>${product.price}</span>
                          </h4>
                          <p>{product.description}</p>
                          <button
                            className={`btn ${checkProductInCart(product.id) ? 'btn-danger' : 'btn-success'
                                        }`}
                            onClick={() => handleAddOrRemoveProduct(product.id)}
                          >
                            {checkProductInCart(product.id) ? 'Remove' : 'Add'}
                          </button>
                          {checkProductInCart(product.id) && (
                            <button
                              onClick={() => navigate('/cart')}
                            >
                              Go to Cart
                            </button>
                          )}
                        </>
                        )
            }
    </section>
  )
}

export default ProductDetail
