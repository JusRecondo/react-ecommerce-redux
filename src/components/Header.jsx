import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'

const Header = () => {
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
    </header>
  )
}

export default Header
