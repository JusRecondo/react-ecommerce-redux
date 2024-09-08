import { Link, useLocation } from 'react-router-dom'
import { FiShoppingCart, FiLogOut } from 'react-icons/fi'
import { useUser } from '../hooks/useUser'
import { useCart } from '../hooks/useCart'

const Header = () => {
  const { totalCount } = useCart()
  const { handleLogout, user } = useUser()
  const { pathname } = useLocation()
  const isLoginOrCartPage = pathname.includes('/login') || pathname.includes('/cart')
  const isProfilePage = pathname.includes('/profile')
  return (
    <header>
      <h1>
        <Link to='/'>
          Store
        </Link>
      </h1>
      {!isLoginOrCartPage && (
        <Link to='/cart' aria-label='Go to cart page' className='cart-link'>
          <span>My Cart</span><FiShoppingCart className='cart-icon' /> {totalCount}
        </Link>
      )}
      {user.token && (
        <nav>
          {!isProfilePage && (
            <Link to='/profile' aria-label='Go to profile page' className='profile-link'>
              My Profile
            </Link>
          )}
          {isProfilePage && (
            <button
              className='logout-btn'
              onClick={handleLogout}
            >
              Logout <FiLogOut />
            </button>
          )}
        </nav>
      )}
    </header>
  )
}

export default Header
