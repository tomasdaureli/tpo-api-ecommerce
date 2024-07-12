import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCoupons, patchCupon, postCupons } from "./CuponsAction";

const initialState = {
  coupons: [],
  cupon: [],
  couponsStatus: "loading",
  changeCouponsSliceFlag: false,
  couponsError: null,
};

const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.couponsStatus = "loading";
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.coupons = action.payload;
        state.couponsStatus = "succeeded";
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.couponsError = action.payload;
        state.couponsStatus = "failed";
      })
      .addCase(postCupons.pending, (state) => {
        state.couponsStatus = "loading";
      })
      .addCase(postCupons.fulfilled, (state, action) => {
        state.coupons.push(action.payload);
        state.couponsStatus = "succeeded";
        state.changeCouponsSliceFlag = !state.changeCouponsSliceFlag;
      })
      .addCase(postCupons.rejected, (state, action) => {
        state.couponsError = action.payload;
        state.couponsStatus = "failed";
      })
      .addCase(patchCupon.pending, (state) => {
        state.couponsStatus = "loading";
      })
      .addCase(patchCupon.fulfilled, (state, action) => {
        const index = state.coupons.findIndex(
          (coupon) => coupon.id === action.payload.id
        );
        if (index !== -1) {
          state.coupons[index] = action.payload;
        }
        state.couponsStatus = "succeeded";
        state.changeCouponsSliceFlag = !state.changeCouponsSliceFlag;
      })
      .addCase(patchCupon.rejected, (state, action) => {
        state.couponsError = action.payload;
        state.couponsStatus = "failed";
      });
  },
});

export const couponsReducer = couponsSlice.reducer;
