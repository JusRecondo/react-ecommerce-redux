import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { firstName, lastName, email, image, token, refreshToken } = action.payload
      state.fullName = firstName + ' ' + lastName
      state.email = email
      state.image = image
      state.token = token
      state.refreshToken = refreshToken
      /* state = { ...action.payload } */
    },
    setUserProfileData: (state, action) => {
      const { phone, address, birthDate } = action.payload
      state.phone = phone
      state.address = address
      state.birthDate = birthDate
      /* state = { ...action.payload } */
    },
    setRefreshedToken: (state, action) => {
      const { token, refreshToken } = action.payload
      state.token = token
      state.refreshToken = refreshToken
    },
    unsetUser: () => ({})
  }
})

export const { setUser, setUserProfileData, setRefreshedToken, unsetUser } = userSlice.actions

export default userSlice.reducer
