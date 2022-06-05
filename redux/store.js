import { configureStore } from '@reduxjs/toolkit'
import lastSeenSlice from './slices/lastSeenSlice'
import toastSlice from './slices/toastSlice'

const store = configureStore({
  reducer: {
    lastSeen: lastSeenSlice,
    toast: toastSlice,
  },
})

export default store
