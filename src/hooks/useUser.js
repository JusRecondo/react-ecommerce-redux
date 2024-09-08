import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, unsetUser } from '../redux/features/userSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { userAuth } from '../services/user'

export function useUser () {
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()

  useEffect(() => {
    if (!user) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [user])

  const handleLogin = async (data) => {
    try {
      const user = await userAuth(data)
      if (user) {
        dispatch(setUser({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
          token: user.token
        }))
        if (state.prevPath.includes('/checkout')) {
          navigate('/checkout')
        } else {
          navigate('/')
        }
      }
    } catch (e) {
      console.error(e)
      setLoginError('Invalid credentials')
    }
  }

  const handleLogout = () => {
    dispatch(unsetUser())
    navigate('/login')
  }

  return {
    user,
    handleLogin,
    loading,
    loginError,
    handleLogout
  }
}
