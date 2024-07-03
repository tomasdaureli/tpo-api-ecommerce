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
