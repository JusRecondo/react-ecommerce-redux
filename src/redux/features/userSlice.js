import { createSlice } from '@reduxjs/toolkit'

const initialState = {
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { firstName, lastName, email, image, token } = action.payload
      state.fullName = firstName + ' ' + lastName
      state.email = email
      state.image = image
      state.token = token
    },
    unsetUser: () => ({})
  }
})

export const { setUser, unsetUser } = userSlice.actions

export default userSlice.reducer
