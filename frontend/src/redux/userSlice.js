import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  reducers: {
    login: (state, action) => {
      const {user} = action.payload;
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
})

export const {
  login,
  logout,
  register,
  loginWithToken,
} = userSlice.actions

export default userSlice.reducer
