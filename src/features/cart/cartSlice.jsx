import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-project"
const initialState = {
  cartItems: [], // Storing different items
  amount: 4, // How many different items
  total: 0, // Total of the different items
  isLoading: true // For pulling this as an API
}

export const getCartItems = createAsyncThunk("cart/getCartItems", async (_, thunkAPI ) => { // thunkAPI is basically a tool used to acess other features and their states
  try {
    const response = await axios.get(`${url}`)
    return response.data
  } catch (error) {
    // return <h1>{error.message}</h1> This is normal React way
    return thunkAPI.rejectWithValue("Something went wrong...")
  }
}) // createAsyncThunk takes in a promise that has three different statuses (pending, fulfilled and rejected)

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    clearCart: (state) => { // state is local
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const removedId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== removedId) // Mutate the array
      alert("Item removed")
    },
    increaseItem: (state, { payload }) => {
      const cartItem = state.cartItems.find(item => (item.id === payload.id))
      cartItem.amount += 1
    },
    decreaseItem: (state, { payload }) => {
      const cartItem = state.cartItems.find(item => (item.id === payload.id))
      cartItem.amount = cartItem.amount - 1
    },
    calculateTotal: (state) => {
      let totalMoney = 0;
      let quantity = 0;

      state.cartItems.forEach(item => {
        quantity += item.amount
        totalMoney += item.amount * item.price
    })

      state.amount = quantity
      state.total = totalMoney
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
      state.isLoading = true
    }).addCase(getCartItems.fulfilled, (state, action) => {
      state.isLoading = false
      state.cartItems = action.payload
    }).addCase(getCartItems.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export default cartSlice.reducer
export const { clearCart, removeItem, increaseItem, decreaseItem, calculateTotal } = cartSlice.actions