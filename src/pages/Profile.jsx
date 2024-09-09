import { useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import Card from '../components/card/Card'

const Profile = () => {
  const { loading, user, getUserProfileData } = useUser()

  useEffect(() => {
    const getProfileData = async () => {
      try {
        await getUserProfileData(user.token)
      } catch (e) {
        console.error(e)
      }
    }

    getProfileData()
  }, [])

  return (
    <>
      <Card customClassName='large profile-data-card'>
        <h2>My data</h2>
        {loading
          ? (<p>Loading...</p>)
          : (
            <>
              <img src={user.image} alt={user.fullName} className='profile-image' />
              <div>
                <h3>Full Name: {user.fullName}</h3>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Birth Date:</strong> {user.birthDate}
                </p>
                <p>
                  <strong>Address:</strong> {`${user.address}, ${user.city}, ${user.country}`}
                </p>
                <p>
                  <strong>Postal Code:</strong> {user.postalCode}
                </p>
              </div>
            </>
            )}
      </Card>
    </>
  )
}

export default Profile
