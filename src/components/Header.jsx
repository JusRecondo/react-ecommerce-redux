import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <h1>
        <Link to='/'>
          My Store
        </Link>
      </h1>
      <Link to='/cart'>
        Cart
      </Link>
    </header>
  )
}

export default Header
