import { createSlice } from '@reduxjs/toolkit'

export const lastSeenSlice = createSlice({
  name: 'lastSeen',
  initialState: {
    lastSeen: { value: [], expiry: 0 },
  },
  reducers: {
    addLastSeen: (state, action) => {
      const lastSeen = JSON.parse(localStorage.getItem('lastSeen'))
      const nowDate = new Date()
      const nowMs = nowDate.getTime()
      nowDate.setDate(nowDate.getDate() + 1)
      nowDate.setHours(0, 0, 0, 0)
      const tomorrow = nowDate.getTime()
      const equality = state.lastSeen.value.filter((v) => {
        return v.id !== action.payload.id
      })
      const value =
        lastSeen?.expiry > nowMs
          ? [action.payload, ...equality]
          : [action.payload]
      localStorage.setItem(
        'lastSeen',
        JSON.stringify({ value, expiry: tomorrow })
      )
      state.lastSeen = { value, expiry: tomorrow }
    },
    deleteLastSeen: (state) => {
      localStorage.removeItem('lastSeen')
      state.lastSeen = { value: [], expiry: 0 }
    },
    setLastSeen: (state, action) => {
      state.lastSeen = action.payload
    },
  },
})

export const { addLastSeen, deleteLastSeen, setLastSeen } =
  lastSeenSlice.actions
export const selectLastSeen = (state) => state.lastSeen.lastSeen
export default lastSeenSlice.reducer
