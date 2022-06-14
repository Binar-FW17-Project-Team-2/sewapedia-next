import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import lastSeenSlice from './slices/lastSeenSlice'
import toastSlice from './slices/toastSlice'
import wishlistSlice from './slices/wishlistSlice'

const store = configureStore({
  reducer: {
    lastSeen: lastSeenSlice,
    toast: toastSlice,
    wishlist: wishlistSlice,
    cart: cartSlice,
  },
})

export default store
