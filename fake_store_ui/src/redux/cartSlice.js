import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCart } from "../services/api";

export const getCart = createAsyncThunk("carts/getCart", async (user) => {
  console.log("Fetching cart...");
  try {
    const response = await fetchCart(user);
    console.log("==============ffffff======================");
    console.log("cartSlice fffff", response, user);
    console.log("====================================");
    return response;
  } catch (error) {
    console.log("====================================");
    console.log("error", error);
    console.log("====================================");
  }
});

const cartSlice = createSlice({
  name: "carts",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setCart: (state, action) => {
      const { items, totalQuantity, totalPrice } = action.payload;
      state.items = items;
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += item.price;
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((i) => i.id === itemId);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= existingItem.price;
      } else if (existingItem) {
        state.items = state.items.filter((i) => i.id !== itemId);
        state.totalQuantity -= 1;
        state.totalPrice -= existingItem.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        console.log("====================================");

        const { items, totalQuantity, totalPrice } = action.payload;
        state.items = items;
        state.totalQuantity = totalQuantity;
        state.totalPrice = totalPrice;
        state.loading = false;
      })
      .addCase(getCart.rejected, (state, action) => {
        console.log("===============sdfdf=====================");
        console.log("error", action);
        console.log("====================================");
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCart, addToCart, decreaseQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
