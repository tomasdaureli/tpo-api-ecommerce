const BASE_URL = 'http://localhost:3000/products'

export const getProducts = () => {
    return fetch(BASE_URL)
        .then((response) => response.json());
}

export const getProductById = (id) => {
    return fetch(`${BASE_URL}/${id}`)
        .then((response) => response.json());
}