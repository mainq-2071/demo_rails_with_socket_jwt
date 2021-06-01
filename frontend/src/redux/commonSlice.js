import { createSlice } from '@reduxjs/toolkit'

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    pageLoading: true,
    currentNav: 'home'
  },
  reducers: {
    setPageLoading: (state, action) => {
      state.pageLoading = action.payload;
    },
    setNavbar: (state, action) => {
      state.currentNav = action.payload;
    },
  },
})

export const {
  setPageLoading,
  setNavbar,
} = commonSlice.actions

export default commonSlice.reducer
