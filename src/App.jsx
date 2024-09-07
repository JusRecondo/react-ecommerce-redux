import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import Cart from './pages/Cart'

function App () {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Layout />}
        >
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            index
            element={<Home />}
          />
          <Route
            path='/cart'
            element={<Cart />}
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
