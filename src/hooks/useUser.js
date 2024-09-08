import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, unsetUser, setUserProfileData, setRefreshedToken } from '../redux/features/userSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCurrentUserData, refreshUserToken, userAuth } from '../services/user'

export function useUser () {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
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
    setLoading(true)
    try {
      const res = await userAuth(data)
      if (res) {
        /* const {
          firstName,
          lastName,
          email,
          image,
          token,
          refreshToken
        } = res */
        dispatch(setUser({
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          image: res.image,
          token: res.token,
          refreshToken: res.refreshToken
        }))
        if (state?.prevPath?.includes('/checkout')) {
          navigate('/checkout')
        } else {
          navigate('/')
        }
      }
    } catch (e) {
      console.error(e)
      setError('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const getUserProfileData = async (token, refreshToken) => {
    setLoading(true)
    try {
      const res = await getCurrentUserData(token)
      if (res) {
        dispatch(
          setUserProfileData({
            phone: res.phone,
            address: res.address.address,
            city: res.address.city,
            country: res.address.country,
            postalCode: res.address.postalCode,
            birthDate: res.birthDate
          })
        )
      } else if (res.status === 401) {
        await handleRefreshToken(refreshToken)
      } else {
        setError('Error getting profile data')
      }
    } catch (e) {
      console.error(e)
      setError('Error getting profile data')
    } finally {
      setLoading(false)
    }
  }

  const handleRefreshToken = async (refreshToken) => {
    setLoading(true)
    try {
      const res = await refreshUserToken(refreshToken)
      if (res) {
        dispatch(
          setRefreshedToken({
            token: res.token,
            refreshToken: res.refreshToken
          })
        )
      } else {
        setError('Error refreshing token')
      }
    } catch (e) {
      console.error(e)
      setError('Error refreshing token')
    } finally {
      setLoading(false)
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
    error,
    getUserProfileData,
    handleLogout
  }
}
