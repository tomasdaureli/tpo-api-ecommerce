import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:8080";

export const getProducts = createAsyncThunk(
  "products/GetProducts",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`${BASE_URL}/products`, {
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

export const getProductsByParameters = createAsyncThunk(
  "products/GetProductsByParameter",
  async ({ category, subcategory }, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    let url = `${BASE_URL}/products`;

    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (subcategory) params.append("subcategory", subcategory);
    url += `?${params.toString()}`;

    try {
      const response = await fetch(url, {
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

export const getProductsBySeller = createAsyncThunk(
  "products/GetProductsBySeller",
  async (sellerId, { getState, rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      return rejectWithValue("No se encontró token de autenticación");
    }

    try {
      const response = await fetch(`${BASE_URL}/products/sellers/${sellerId}`, {
        // Uso correcto de `sellerId`
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

export const getProductById = createAsyncThunk(
  "products/GetProductsById",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`, {
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

export const patchConfirmPurchase = createAsyncThunk(
  "products/PatchConfirmPurchase",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`${BASE_URL}/buys/${id}/confirm`, {
        method: "PATCH",
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