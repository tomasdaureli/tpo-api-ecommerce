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
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getUserByJWT.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserByJWT.fulfilled, (state, action) => {
        state.user = action.payload;
        state.buys = action.payload.buys || [];
        state.status = "succeeded";
      })
      .addCase(getUserByJWT.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      // Post user purchase
      .addCase(postUserPurchase.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postUserPurchase.fulfilled, (state, action) => {
        state.buys.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(postUserPurchase.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const userReducer = userSlice.reducer;
