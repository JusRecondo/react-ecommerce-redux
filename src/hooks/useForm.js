import { useState } from 'react'

// eslint-disable-next-line no-unused-vars
export function useForm (initialState) {
  const [formData, setFormData] = useState(initialState)
  const [formErrors, setFormErrors] = useState({})

  const handleOnChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormErrors({})

    const newData = {
      ...formData,
      [name]: value
    }

    setFormData(newData)
  }

  const handleOnBlur = (e) => {
    if (e.target.value === '') {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [e.target.name]: 'Required field'
      }))
    }
  }
  return {
    handleOnBlur,
    handleOnChange,
    formData,
    formErrors,
    setFormErrors
  }
}
