import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductById,
  getProducts,
  getProductsByParameters,
  getProductsBySeller,
  patchConfirmPurchase,
} from "./ProductAction";

const initialState = {
  products: [],
  product: [],
  status: "loading", // 'loading', 'succeeded', 'failed'
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "succeeded";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getProductsByParameters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsByParameters.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "succeeded";
      })
      .addCase(getProductsByParameters.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getProductsBySeller.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsBySeller.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "succeeded";
      })
      .addCase(getProductsBySeller.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(getProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = "succeeded";
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(patchConfirmPurchase.pending, (state) => {
        state.status = "loading";
      })
      .addCase(patchConfirmPurchase.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(patchConfirmPurchase.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const productReducer = productsSlice.reducer;
