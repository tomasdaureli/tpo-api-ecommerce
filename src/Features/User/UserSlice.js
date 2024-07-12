import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUsers,
  getUserById,
  getUserByJWT,
  registerUser,
  loginUser,
  postUserPurchase,
} from "./UserAction";

const initialState = {
  user: null,
  buys: [],
  loading: false,
  error: false,
  errorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.error = true;
        state.loading = false;
      })
      .addCase(getUserByJWT.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserByJWT.fulfilled, (state, action) => {
        state.user = action.payload;
        state.buys = action.payload.buys || [];
        state.loading = false;
      })
      .addCase(getUserByJWT.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.error = true;
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.error = true;
        state.loading = false;
      })
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.error = true;
        state.loading = false;
      })
      // Post user purchase
      .addCase(postUserPurchase.pending, (state) => {
        state.loading = true;
      })
      .addCase(postUserPurchase.fulfilled, (state, action) => {
        state.buys.push(action.payload);
        state.loading = false;
      })
      .addCase(postUserPurchase.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.error = true;
        state.loading = false;
      });
  },
});

export const userReducer = userSlice.reducer;
