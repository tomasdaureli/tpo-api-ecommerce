import React, { useEffect, useState } from "react";
import { getProducts, getProductsBySeller } from "../../api/productsApi";
import { useNavigate } from "react-router-dom";
import img from "../../assets/imgs/noProductImage.png";
import { getUserByJWB } from "../../api/usersApi";

import "./productList.css";
import AddProductForm from "../Forms/AddProductForm";

export const ProductList = ({
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal,
}) => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({});
    const [createProduct, setCreateProduct] = useState(false);

    useEffect(() => {
        const loadCatalog = async () => {
            let userLogged = JSON.parse(localStorage.getItem("USER"));
            if (userLogged) {
                setUser(userLogged);
            }
            if (userLogged.role == "VENDEDOR") {
                getProductsBySeller(userLogged.id).then((data) => setProducts(data));
            } else {
                getProducts().then((data) => setProducts(data));
            }
        };
        loadCatalog();
    }, [createProduct]);

    const navigate = useNavigate();

    const onAddProduct = (product) => {
        const existingProduct = allProducts.find((item) => item.id === product.id);

        if (existingProduct) {
            const updatedProducts = allProducts.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setAllProducts(updatedProducts);
        } else {
            setAllProducts([...allProducts, { ...product, quantity: 1 }]);
        }
        setCountProducts(countProducts + 1);
        setTotal(total + product.price);
    };

    const handleProductClick = (productId) => {
        navigate(`/catalogo/${productId}`);
    };

    return (
        <>
            {user.role === "VENDEDOR" && !createProduct ? (
                <div>
                    <h1>Tus Productos</h1>
                    <button className="create-button" onClick={() => setCreateProduct(true)}>Crear producto</button>
                </div>
            ) : (
                ""
            )}
            {createProduct ? (
                <AddProductForm setCreateProduct={setCreateProduct} />
            ) : (
                <div className="container-items">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div className="item" key={product.id}>
                                <figure onClick={() => handleProductClick(product.id)}>
                                    <img
                                        src={product.urlImage || img}
                                        alt={product.productName}
                                    />
                                </figure>
                                <div className="info-product">
                                    <h2>{product.productName}</h2>
                                    <p className="price">${product.price}</p>
                                    {user.role === "VENDEDOR" ? (
                                        ""
                                    ) : (
                                        <button onClick={() => onAddProduct(product)}>
                                            Añadir al carrito
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No hay ningún producto para mostrar...</div>
                    )}
                </div>
            )}
        </>
    );
};
