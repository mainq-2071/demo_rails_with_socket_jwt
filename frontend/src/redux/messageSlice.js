import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: []
  },
  reducers: {
    setMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
})

export const {
  setMessage,
} = messageSlice.actions

export default messageSlice.reducer
