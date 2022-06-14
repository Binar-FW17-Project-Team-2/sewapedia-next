import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (payload, thunkApi) => {
    try {
      const { token } = payload
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
        {
          method: 'GET',
          headers: { authorization: `Bearer ${token}` },
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

export const addCart = createAsyncThunk(
  'cart/addCart',
  async (payload, thunkApi) => {
    try {
      const { token, product, lamaSewa, qty } = payload
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
        {
          method: 'POST',
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: product.id,
            lamaSewa,
            qty,
          }),
        }
      )
      const data = await res.json()
      if (res.ok) return payload
      return thunkApi.rejectWithValue(data)
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const editCart = createAsyncThunk(
  'cart/editCart',
  async (payload, thunkApi) => {
    try {
      const { token, product, qty, lamaSewa } = payload
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
        {
          method: 'PUT',
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: product.id,
            lamaSewa,
            qty,
          }),
        }
      )
      if (res.ok) return payload
      return thunkApi.rejectWithValue(await res.json())
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

export const deleteCart = createAsyncThunk(
  'cart/deleteCart',
  async (payload, thunkApi) => {
    try {
      const { token, productId } = payload
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
        {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
        }
      )
      if (res.ok) return payload
      return thunkApi.rejectWithValue(await res.json())
    } catch (error) {
      return thunkApi.rejectWithValue(await res.json())
    }
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(addCart.fulfilled, (state, action) => {
      const { product, qty, lamaSewa } = action.payload
      state.data.unshift({
        qty,
        lamaSewa,
        productDetails: product,
        subTotalPrice: product.price * qty * lamaSewa,
      })
    })
    builder.addCase(editCart.fulfilled, (state, action) => {
      const { product, qty, lamaSewa } = action.payload
      const idx = state.data.findIndex(
        (v) => v.productDetails.id === product.id
      )
      state.data[idx].qty = qty
      state.data[idx].lamaSewa = lamaSewa
      state.data[idx].subTotalPrice = product.price * qty * lamaSewa
    })
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      const { productId } = action.payload
      state.data = state.data.filter(
        (item) =>
          item.productDetails.id !==
          productId.find((id) => id === item.productDetails.id)
      )
    })
  },
})

export const selectCart = (state) => state.cart.data
export default cartSlice.reducer
