import { configureStore } from '@reduxjs/toolkit'
import lastSeenSlice from './slices/lastSeenSlice'
import toastSlice from './slices/toastSlice'
import wishlistSlice from './slices/wishlistSlice'

const store = configureStore({
  reducer: {
    lastSeen: lastSeenSlice,
    toast: toastSlice,
    wishlist: wishlistSlice,
  },
})

export default store
