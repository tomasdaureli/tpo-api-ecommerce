import React from 'react'
import "./productUserCard.css"

export function ProductUserCard({ product }) {
    console.log(product);

    const calcularTotal = () => {
        let total = 0;
        product.items.forEach(element => {
            total += element.price * element.quantity;
        });

        return total;
    }

    return (
        <div className="userItem">
            Productos:
            <div className='productSpans'>
                {product.items.map((p, index) => (
                    <span key={index}>{p.nameProduct} - Cantidad: {p.quantity}</span>
                ))}
            </div>
            <div className="user-info-product">
                <p className="price">Total: ${calcularTotal()}</p>
                <div className='timestamp'>Comprada el dia: {product.timestamp}</div>
            </div>
        </div>
    );
}
