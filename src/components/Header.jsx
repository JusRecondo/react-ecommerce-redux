import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiLogOut } from 'react-icons/fi'
import { useUser } from '../hooks/useUser'

const Header = () => {
  const { totalCount } = useSelector(state => state.cart)
  const { handleLogout, user } = useUser()

  return (
    <header>
      <h1>
        <Link to='/'>
          My Store
        </Link>
      </h1>
      <Link to='/cart' aria-label='Go to cart page' className='cart-link'>
        <FiShoppingCart className='cart-icon' /> {totalCount}
      </Link>
      {user.token &&
        <nav>
          <Link to='/profile' aria-label='Go to profile page' className='profile-link'>
            My Profile
          </Link>
          <button
            onClick={handleLogout}
          >
            Logout <FiLogOut />
          </button>
        </nav>}
    </header>
  )
}

export default Header
