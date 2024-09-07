import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { email, firstName, token } = action.payload
      state.email = email
      state.firstName = firstName
      state.token = token
    },
    unsetUser: () => {}
  }
})

export const { setUser, unsetUser } = userSlice.actions

export default userSlice.reducer
