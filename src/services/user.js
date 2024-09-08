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

// Get current user data
export const getCurrentUserData = async (token) => {
  try {
    const response = await fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }
    return await response.json()
  } catch (e) {
    throw new Error(e.message)
  }
}

// Refresh user token
export const refreshUserToken = async (refreshToken) => {
  try {
    const response = await fetch('https://dummyjson.com/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refreshToken
      })
    })
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }
    return await response.json()
  } catch (e) {
    throw new Error((e).message)
  }
}
