import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCart, fetchOrder } from "../services/api";

export const getOrder = createAsyncThunk("orders", async (user) => {
  console.log("Fetching order...");
  try {
    const response = await fetchOrder(user);
    console.log("====================================");
    console.log("order fetched");
    console.log("====================================");
    return response;
  } catch (error) {
    console.log("====================================");
    console.log("error", error);
    console.log("====================================");
  }
});

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    setOrder: (state, action) => {
      const { orders } = action.payload;
      state.orders = orders;
    },

    clearOrder: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        console.log("====================================");
        console.log(action.payload.orders, "order fulfilled");
        console.log("====================================");
        const { orders } = action.payload;
        state.orders = orders;

        state.loading = false;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setOrder, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
