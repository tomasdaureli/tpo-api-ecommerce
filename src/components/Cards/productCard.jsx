import React from 'react'

export function ProductCard({ product }) {

    return (

        <div className="item" key={product.id}>
            <figure>
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

    );
}
