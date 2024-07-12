import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCoupons, patchCupon, postCupons } from "./CuponsAction";

const initialState = {
  coupons: [],
  cupon: [],
  changeCouponsSliceFlag: false,
  couponsLoading: false,
  couponsError: false,
  couponsErrorMessage: "",
};

const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.couponsLoading = true;
        state.couponsErrorMessage = "";
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.coupons = action.payload;
        state.couponsLoading = false;
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.couponsErrorMessage = action.payload;
        state.couponsError = !state.couponsError;
        state.couponsLoading = false;
      })
      .addCase(postCupons.pending, (state) => {
        state.couponsLoading = true;
        state.couponsErrorMessage = "";
      })
      .addCase(postCupons.fulfilled, (state, action) => {
        state.coupons.push(action.payload);
        state.couponsLoading = false;
        state.changeCouponsSliceFlag = !state.changeCouponsSliceFlag;
      })
      .addCase(postCupons.rejected, (state, action) => {
        state.couponsErrorMessage = action.payload;
        state.couponsError = !state.couponsError;
        state.couponsLoading = false;
      })
      .addCase(patchCupon.pending, (state) => {
        state.couponsLoading = true;
        state.couponsErrorMessage = "";
      })
      .addCase(patchCupon.fulfilled, (state, action) => {
        const index = state.coupons.findIndex(
          (coupon) => coupon.id === action.payload.id
        );
        if (index !== -1) {
          state.coupons[index] = action.payload;
        }
        state.couponsLoading = false;
        state.changeCouponsSliceFlag = !state.changeCouponsSliceFlag;
      })
      .addCase(patchCupon.rejected, (state, action) => {
        state.couponsErrorMessage = action.payload;
        state.couponsError = !state.couponsError;
        state.couponsLoading = false;
      });
  },
});

export const couponsReducer = couponsSlice.reducer;
