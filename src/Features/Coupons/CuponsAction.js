import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:8080";

export const getCoupons = createAsyncThunk(
  "coupons/getCoupons",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`${BASE_URL}/discounts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("No se pudieron obtener los productos");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      return rejectWithValue("No se pudieron obtener los productos");
    }
  }
);

export const getCouponByCoide = createAsyncThunk(
  "coupons/getCouponByCode",
  async (discountCode, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `${BASE_URL}/discounts/code/${discountCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postCupons = createAsyncThunk(
  "coupons/postCupons",
  async (cupon, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${BASE_URL}/discounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cupon),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
      return rejectWithValue(error.message);
    }
  }
);
export const patchCupon = createAsyncThunk(
  "coupons/patchCupon",
  async ({ discount, id }, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`${BASE_URL}/discounts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(discount),
      });
      if (!response.ok) {
        throw new Error("No se pudo actualziar tu cupon");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      return rejectWithValue("No se pudo actualziar tu cupon");
    }
  }
);
