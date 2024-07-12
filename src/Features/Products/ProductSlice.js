import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductById,
  getProducts,
  getProductsBySeller,
  patchConfirmPurchase,
  postProduct,
  updateProduct,
  deleteProduct,
} from "./ProductAction";

const initialState = {
  products: [],
  product: [],
  loading: false,
  changeFlag: false,
  error: false,
  errorMessage: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.error = !state.error;
        state.errorMessage = action.payload;
        state.loading = false;
      })
      .addCase(getProductsBySeller.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getProductsBySeller.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getProductsBySeller.rejected, (state, action) => {
        state.error = !state.error;
        state.errorMessage = action.payload;
        state.loading = false;
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.error = !state.error;
        state.errorMessage = action.payload;
        state.loading = false;
      })
      .addCase(patchConfirmPurchase.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(patchConfirmPurchase.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(patchConfirmPurchase.rejected, (state, action) => {
        state.error = !state.error;
        state.errorMessage = action.payload;
        state.loading = false;
      })
      .addCase(postProduct.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.loading = false;
        state.changeFlag = !state.changeFlag;
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = !state.error;
        state.errorMessage = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.loading = false;
        state.changeFlag = !state.changeFlag;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = !state.error;
        state.errorMessage = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = !state.error;
        state.errorMessage = action.payload;
      });
  },
});

export const productReducer = productsSlice.reducer;
