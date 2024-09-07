import { useState } from 'react'

export function useFilters () {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  const updateFilters = ({ filter, value }) => {
    setFilters((prevState) => ({
      ...prevState,
      [filter]: value
    }))
  }

  const handleFilterChange = (e) => {
    updateFilters({
      filter: e.target.name,
      value: e.target.value
    })
  }

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.price >= filters.minPrice &&
            (filters.category === 'all' ||
                product.category === filters.category)
      )
    })
  }

  return {
    filters,
    handleFilterChange,
    filterProducts
  }
}
