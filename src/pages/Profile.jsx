import Card from '../components/Card'
import { useUser } from '../hooks/useUser'

const Profile = () => {
  const { loading, user } = useUser()

  return (
    <>
      <Card>
        <h2>My data</h2>
        {loading
          ? (<p>Loading...</p>)
          : (
            <>
              <img src={user.image} alt={user.fullName} />
              <p>Full Name: {user.fullName}</p>
              <p>Email: {user.email}</p>
            </>
            )}
      </Card>
    </>
  )
}

export default Profile
