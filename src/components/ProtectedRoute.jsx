/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

const ProtectedRoute = ({ children }) => {
  const { user } = useUser()

  if (!user || !user.token) {
    return <Navigate to='/login' replace />
  }

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute
