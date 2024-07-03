const BASE_URL = "http://localhost:8080";

export const getAllUsers = () => {
  return fetch(BASE_URL).then((response) => response.json());
};

export const getUserById = (id) => {
  return fetch(`${BASE_URL}/${id}`).then((response) => response.json());
};

export const getUserByJWB = async (id) => {
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
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error: :", error);
    return null;
  }
};

export const registerUser = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Error en tu peticion");
    }
    const users = await response.json();
    return users[0] || null;
  } catch (error) {
    console.error("Error: :", error);
    return null;
  }
};
export const loginUser = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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

export const postUserPurchase = async (user, purchase, discountCode) => {
  try {
    const token = localStorage.getItem("access_token");
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
    const updatedUser = await response.json();
    return updatedUser || null;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
