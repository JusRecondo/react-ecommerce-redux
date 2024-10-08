import { useEffect, useMemo, useState } from 'react'
import { getProductCategories, getProducts } from '../services/products'
import Products from '../components/Products'
import { useFilters } from '../hooks/useFilters'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [productsError, setProductsError] = useState(false)

  // categories
  const [categories, setCategories] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [categoriesError, setCategoriesError] = useState(false)

  // fetch products
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

  // fetch categories
  useEffect(() => {
    const getCategoriesFromAPI = async () => {
      try {
        setLoadingCategories(true)
        const categories = await getProductCategories()
        if (categories.length > 0) {
          setCategories(categories)
        } else {
          setCategoriesError('Sorry, there are no categories availables')
        }
      } catch (e) {
        console.log(e)
        setCategoriesError('Sorry, there was an error loading the categories')
      } finally {
        setLoadingCategories(false)
      }
    }

    getCategoriesFromAPI()
  }, [])

  const { handleFilterChange, filters, filterProducts } = useFilters()

  const filteredProducts = useMemo(() => {
    return filterProducts(products)
  }, [products, filterProducts])

  return (
    <>
      <h2>Welcome to the best online store!</h2>
      <section className='filters'>
        <div className='category-filter'>
          <label htmlFor='category'>Categories:</label>
          <select
            name='category'
            id='category'
            onChange={handleFilterChange}
            value={filters.category}
          >
            <option value='all'>all</option>
            {loadingCategories
              ? <option disabled>Loading categories...</option>
              : categories?.length &&
                categories.map((category, i) => (
                  <option
                    key={i}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
            {categoriesError &&
              <option disabled>{categoriesError}</option>}
          </select>
        </div>
        <div className='price-filter'>
          <label htmlFor='price'>Price: ${filters.minPrice}</label>
          <input
            type='range'
            id='price'
            name='minPrice'
            min='0'
            max='2500'
            onChange={handleFilterChange}
          />
        </div>
      </section>
      <section className='products'>
        {
          loadingProducts
            ? <p>Loading...</p>
            : productsError
              ? <p>{productsError}</p>
              : filteredProducts?.length === 0
                ? <p>There are no products available.</p>
                : <Products products={filteredProducts} />
        }
      </section>
    </>
  )
}

export default Home
