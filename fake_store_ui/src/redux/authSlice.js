import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, updateUser } from "../services/api";

export const LoginFunc = createAsyncThunk(
  "auth/LogInPage",
  async (credentials, { rejectWithValue }) => {
    const result = await loginUser(credentials);

    if (result.error) {
      return rejectWithValue(result);
    }

    return result;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    setUserState: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginFunc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginFunc.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload, "payload");

        state.user = action.payload;
      })
      .addCase(LoginFunc.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error;
      });
  },
});

export const { logout, setUserState } = authSlice.actions;

export default authSlice.reducer;
