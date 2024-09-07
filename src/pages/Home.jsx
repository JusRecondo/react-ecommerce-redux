import { useSelector } from 'react-redux'

const Home = () => {
  const user = useSelector(state => state.user)

  return (
    <>
      <h1>Welcome {user.firstName}</h1>
      <p>PRODUCTS</p>
    </>
  )
}

export default Home
