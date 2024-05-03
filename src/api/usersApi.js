const BASE_URL = "http://localhost:3000/users";

export const getAllUsers = () => {
  return fetch(BASE_URL).then((response) => response.json());
};

export const getUserById = (id) => {
  return fetch(`${BASE_URL}/${id}`).then((response) => response.json());
};
export const getUserByEmail = (email) => {
  return fetch(`${BASE_URL}?email=${email}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en tu peticion");
      }
      return response.json();
    })
    .then((users) => users[0] || null)
    .catch((error) => {
      console.error("Error: :", error);
      return null;
    });
};
export const getUserByUsername = (username) => {
  return fetch(`${BASE_URL}?name=${username}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en tu peticion");
      }
      return response.json();
    })
    .then((users) => users[0] || null)
    .catch((error) => {
      console.error("Error: :", error);
      return null;
    });
};

export const postUser = async (user) => {
  try {
    const response = await fetch(BASE_URL, {
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

export const putUserPurchase = async (user, purchase) => {
  try {
    const usuarioRequerido = await getUserById(user.id);
    usuarioRequerido.purchases.push(purchase);
    const response = await fetch(`${BASE_URL}/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioRequerido), 
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
