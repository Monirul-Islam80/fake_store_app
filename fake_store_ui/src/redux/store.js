import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    carts: cartReducer,
    orders: orderReducer,
  },
});
