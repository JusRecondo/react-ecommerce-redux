import { useRef, useState } from 'react'
import Card from '../components/Card'
import { useForm } from '../hooks/useForm'
import { useUser } from '../hooks/useUser'
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

const formInitialState = {
  username: '',
  password: ''
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const passwordInputRef = useRef()
  const toggleShowPassword = () => {
    setShowPassword(prevState => {
      if (prevState === true) {
        passwordInputRef.current.type = 'password'
      } else {
        passwordInputRef.current.type = 'text'
      }
      return !prevState
    })
  }

  const {
    formData,
    formErrors,
    setFormErrors,
    handleOnBlur,
    handleOnChange
  } = useForm(formInitialState)

  const { handleLogin, loading, error } = useUser()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.values(formData).some(value => value === '')) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        global: 'Please fill required fields'
      }))
    } else {
      handleLogin(formData)
    }
  }

  return (
    <>
      <Card>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>
            <FiUser /> Username*:
          </label>
          <input
            type='text'
            id='username'
            name='username'
            onChange={handleOnChange}
            onBlur={handleOnBlur}
          />
          {formErrors.username && (
            <div className='form-error'>
              {formErrors.username}
            </div>
          )}
          <label htmlFor='password'>
            <FiLock /> Password*:
          </label>
          <div className='password-input-container'>
            <input
              type='password'
              id='password'
              name='password'
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              ref={passwordInputRef}
            />
            {showPassword
              ? <FiEyeOff
                  onClick={toggleShowPassword}
                  className='hide-pass-icon'
                />
              : <FiEye
                  onClick={toggleShowPassword}
                  className='show-pass-icon'
                />}
          </div>
          {formErrors.password && (
            <div className='form-error'>
              {formErrors.password}
            </div>
          )}
          {loading && (<p>Loggin in...</p>)}
          {error && (
            <div className='form-error'>
              {error}
            </div>
          )}
          <button
            type='submit'
            disabled={Object.keys(formErrors).length > 0}
          >
            Login
          </button>
        </form>
      </Card>
      <br />
      <details>
        <summary>
          Test credentials
        </summary>
        <p>username: emilys</p>
        <p>password: emilyspass</p>
      </details>
    </>
  )
}

export default Login
