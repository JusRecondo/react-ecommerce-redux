import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'

function App () {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Layout />}
        >
          <Route
            index
            element={<Home />}
          />
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/cart'
            element={<Cart />}
          />
          <Route
            path='/product/:productId'
            element={
              <ProductDetail />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
