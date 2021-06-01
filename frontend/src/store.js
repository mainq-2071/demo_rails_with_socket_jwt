import { configureStore } from '@reduxjs/toolkit'

import userReducer from './redux/userSlice'
import commonReducer from './redux/commonSlice'
import messageReducer from './redux/messageSlice'

export default configureStore({
  reducer: {
    userReducer: userReducer,
    commonReducer: commonReducer,
    messageReducer: messageReducer
  },
})
