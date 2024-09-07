import { useState } from 'react'
import Card from '../components/Card'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    const newData = {
      ...formData,
      [name]: value
    }

    setFormData(newData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }
  return (
    <>
      <Card>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>
            Username:
          </label>
          <input
            type='text'
            id='username'
            name='username'
            onChange={handleChange}
          />
          <label htmlFor='password'>
            Password:
          </label>
          <input
            type='password'
            id='password'
            name='password'
            onChange={handleChange}
          />
          <button type='submit'>
            Login
          </button>
        </form>
      </Card>
    </>
  )
}

export default Login
