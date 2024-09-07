export const userAuth = async (userData) => {
  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }
    const user = await response.json()
    return user
  } catch (e) {
    throw new Error(e.message)
  }
}
