import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getWishlist = createAsyncThunk(
  'wishlist/getWishlist',
  async (payload, thunkApi) => {
    try {
      const { token, userId } = payload
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist?userId=${userId}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()
      if (res.ok) return data
      return thunkApi.rejectWithValue(data)
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

export const addWishlist = createAsyncThunk(
  'wishlist/addWishlist',
  async (payload, thunkApi) => {
    try {
      const { product, token } = payload
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
        {
          method: 'POST',
          body: JSON.stringify({ productId: product.id }),
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      if (res.ok) return product
      return thunkApi.rejectWithValue(await res.json())
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

export const deleteWishlist = createAsyncThunk(
  'wishlist/deleteWishlist',
  async (payload, thunkApi) => {
    try {
      const { userId, productId, token } = payload
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist?userId=${userId}&productId=${productId}`,
        {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      if (res.ok) return productId
      else return thunkApi.rejectWithValue(await res.json())
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getWishlist.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(addWishlist.fulfilled, (state, action) => {
      state.data.unshift(action.payload)
    })
    builder.addCase(deleteWishlist.fulfilled, (state, action) => {
      state.data = state.data.filter((product) => product.id !== action.payload)
    })
  },
})

export const selectWishlist = (state) => state.wishlist
export default wishlistSlice.reducer
