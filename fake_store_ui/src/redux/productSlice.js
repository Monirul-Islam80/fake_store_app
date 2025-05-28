import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProductCategories,
  fetchProductDetails,
  fetchProductsByCategory,
} from "../services/api";

export const getCategories = createAsyncThunk(
  "products/fetchProductCategories",
  async () => {
    console.log("Fetching categories...");

    const response = await fetchProductCategories();
    return response;
  }
);
export const getProductByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category) => {
    const response = await fetchProductsByCategory(category);

    return response;
  }
);
export const getProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (productId) => {
    const response = await fetchProductDetails(productId);
    return response;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    product: [],
    categories: [],
    products: [],
    selectedProduct: null,
    selectedCategory: null,

    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProductByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { setSelectedCategory } = productSlice.actions;
export const { setSelectedProduct } = productSlice.actions;
export const { clearSelectedProduct } = productSlice.actions;

export default productSlice.reducer;
