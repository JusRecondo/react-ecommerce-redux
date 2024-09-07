import { useDispatch } from 'react-redux'
import { unsetUser } from '../redux/features/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { FiShoppingCart, FiLogOut } from 'react-icons/fi'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(unsetUser())
    navigate('/login')
  }
  return (
    <header>
      <h1>
        <Link to='/'>
          My Store
        </Link>
      </h1>
      <Link to='/cart' aria-label='Go to cart page'>
        <FiShoppingCart className='cart-icon' />
      </Link>
      <button
        onClick={handleLogout}
      >
        Logout <FiLogOut />
      </button>
    </header>
  )
}

export default Header
