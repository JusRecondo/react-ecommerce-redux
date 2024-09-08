export const getProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=70')
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }
    const data = await response.json()
    return data.products
  } catch (e) {
    throw new Error(e.message)
  }
}

export const getProductById = async (id) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (e) {
    throw new Error(e.message)
  }
}

export const getProductCategories = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products/category-list')
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (e) {
    throw new Error(e.message)
  }
}
