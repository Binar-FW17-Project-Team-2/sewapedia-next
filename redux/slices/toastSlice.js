import { createSlice } from '@reduxjs/toolkit'

export const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    isOpen: false,
    msg: '',
    bgColor: 'grey.600',
  },
  reducers: {
    successToast: (state, action) => {
      state.isOpen = true
      ;(state.msg = action.payload), (state.bgColor = 'success.main')
    },
    errorToast: (state, action) => {
      state.isOpen = true
      ;(state.msg = action.payload), (state.bgColor = 'error.main')
    },
    warningToast: (state, action) => {
      state.isOpen = true
      ;(state.msg = action.payload), (state.bgColor = 'warning.main')
    },
    defaultToast: (state, action) => {
      state.isOpen = true
      ;(state.msg = action.payload), (state.bgColor = 'grey.600')
    },
    closeToast: (state) => {
      state.isOpen = false
    },
  },
})

export const {
  successToast,
  errorToast,
  warningToast,
  defaultToast,
  closeToast,
} = toastSlice.actions
export const selectToast = (state) => state.toast
export default toastSlice.reducer
