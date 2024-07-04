const BASE_URL = "http://localhost:8080";

export const getProducts = async () => {
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
    console.error("Error: :", error);
    return null;
  }
};
export const getProductById = async (id) => {
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
    console.error("Error: :", error);
    return null;
  }
};

export const getProductsBySeller = async (id) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await fetch(`${BASE_URL}/products/sellers/${id}`, {
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
    console.error("Error: :", error);
    return null;
  }
};

export const postProduct = async (product) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Error en tu peticion");
    }
    const resp = await response.json();
    return resp;
  } catch (error) {
    console.error("Error: :", error);
    return null;
  }
};

export const patchConfirmPurchase = async (id) => {
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
    console.error("Error: :", error);
    return null;
  }
};
