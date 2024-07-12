import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:8080";

export const getAllUsers = createAsyncThunk("users/getAll", async () => {
  const response = await fetch(BASE_URL);
  return response.json();
});

export const getUserById = createAsyncThunk("users/getById", async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  return response.json();
});

export const getUserByJWT = createAsyncThunk(
  "users/getByJWT",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`${BASE_URL}/user/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("No se pudo obtener la información del usuario");
      }
      return await response.json();
    } catch (error) {
      console.error("Error: :", error);
      return rejectWithValue("No se pudo obtener la información del usuario");
    }
  }
);

export const registerUser = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const users = await response.json();
      return users[0] || null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postUserPurchase = createAsyncThunk(
  "users/postPurchase",
  async ({ purchase, discountCode }, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`${BASE_URL}/buys`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: purchase,
          discountCode: discountCode ? discountCode : null,
        }),
      });
      if (!response.ok) {
        throw new Error("Error en tu petición");
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return rejectWithValue("Error en tu petición");
    }
  }
);
