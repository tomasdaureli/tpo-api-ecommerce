import React from 'react'
import "./productUserCard.css"
export function ProductUserCard({ product }) {

    return (
        <div className="userItem" key={product.id}>
            <img
                src={product.urlImage}
                alt={product.nameProduct}
            />
            <div className="user-info-product">
                <h2>{product.nameProduct}</h2>
                <p className="price">${product.price}</p>
                <div className='timestamp'>Comprada el dia: {product.timestamp}</div>
            </div>

        </div>

    );
}
