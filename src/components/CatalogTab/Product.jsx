import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../../api/productsApi';
import img from "../../assets/imgs/noProductImage.png";

export function Product({
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal
}) {

    const [product, setProduct] = useState([]);

    const { productId } = useParams();
    const navigate = useNavigate();

    const formattedProductId = parseInt(productId, 10);

    useEffect(() => {
        getProductById(formattedProductId).then((data) => setProduct(data))
    }, [])

    const onAddProduct = product => {
        const existingProduct = allProducts.find(item => item.id === product.id);

        if (existingProduct) {
            const updatedProducts = allProducts.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setAllProducts(updatedProducts);
        } else {
            setAllProducts([...allProducts, { ...product, quantity: 1 }]);
        }

        setCountProducts(countProducts + 1);
        setTotal(total + product.price);
    };

    if (!product) {
        return <div>Producto no encontrado</div>
    }

    return (
        <div className='container-product-detail'>
            <div className='button-back' onClick={() => navigate("/catalogo")}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="icon-cart"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
            </div>
            <div className='img-product-detail'>
                <img src={product.urlImage ? product.urlImage : img}
                    alt={product.productName} />
            </div>
            <div className='text-product-detail'>
                <h1>{product.productName}</h1>
                <p><strong>Precio: </strong>${product.price}</p>
                <button onClick={() => onAddProduct(product)}>Añadir al carrito</button>
            </div>
            <p className='description'><strong>Descripción: </strong><br /></p>
            <p className='description-text'>{product.description}</p>
        </div>
    )
}
