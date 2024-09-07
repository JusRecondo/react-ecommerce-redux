import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getProducts } from '../services/products'
import Products from '../components/Products'

const Home = () => {
  const user = useSelector(state => state.user)
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [productsError, setProductsError] = useState(false)

  useEffect(() => {
    const getProductsFromAPI = async () => {
      try {
        setLoadingProducts(true)
        const productsFromAPI = await getProducts()
        if (productsFromAPI.length > 0) {
          setProducts(productsFromAPI)
        } else {
          setProductsError('Sorry, there are no products available')
        }
      } catch (e) {
        console.log(e)
        setProductsError('Sorry, there was an error loading the products')
      } finally {
        setLoadingProducts(false)
      }
    }

    getProductsFromAPI()
  }, [])

  return (
    <>
      <h1>Welcome {user.firstName}</h1>
      <section className='products'>
        {
          loadingProducts
            ? (<p>Loading...</p>)
            : (productsError && productsError.length === 0)
                ? (<p>{productsError}</p>)
                : (<Products products={products} />)
        }
      </section>
    </>
  )
}

export default Home
