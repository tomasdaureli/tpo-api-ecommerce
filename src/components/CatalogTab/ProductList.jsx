import React, { useEffect, useState } from 'react'
import { getProducts } from '../../api/productsApi'
import { useNavigate } from 'react-router-dom'

export const ProductList = ({ 
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal
}) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then((data) => setProducts(data));
    }, [])

    const navigate = useNavigate();

    const onAddProduct = product => {
        const existingProduct = allProducts.find(item => item.id === product.id);

        if (existingProduct) {
            const updatedProducts = allProducts.map(item => 
                item.id === product.id
                    ? {...item, quantity: item.quantity + 1}
                    : item
            );
            setAllProducts(updatedProducts);
        } else {
            setAllProducts([...allProducts, {...product, quantity: 1}]);
        }

        setCountProducts(countProducts + product.quantity);
        setTotal(total + product.price * product.quantity);
    };

    const handleProductClick = (productId) => {
        navigate(`/catalogo/${productId}`);
    }

  return (
    <div className='container-items'>
      {products.map(product => (
        <div className="item" key={product.id}>
            <figure onClick={() => handleProductClick(product.id)}>
                <img
                    src={product.urlImage}
                    alt={product.nameProduct}
                />
            </figure>
            <div className="info-product">
                <h2>{product.nameProduct}</h2>
                <p className="price">${product.price}</p>
                <button onClick={() => onAddProduct(product)}>Añadir al carrito</button>
            </div>
        </div>
      ))}
    </div>
  )
}
