/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
  const { user } = useUser()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!user.token) {
      return navigate('/login', { state: { prevPath: pathname } })
    }
  }, [user])

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute
