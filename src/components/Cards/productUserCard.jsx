import React, { useEffect, useState } from 'react';
import "./productUserCard.css";
import { patchConfirmPurchase } from '../../api/productsApi';

export function ProductUserCard({ product, refreshProducts }) {

    const handleConfirmBuy = async () => {
        const resp = await patchConfirmPurchase(product.number)
        if (resp) {
            refreshProducts()
        }
    };

    return (
        <div className="userItem">
            Productos:
            <div className='productSpans'>
                {product.items.map((p, index) => (
                    <span key={index}>{p.nameProduct} - Cantidad: {p.quantity}</span>
                ))}
            </div>
            <div className="user-info-product">
                <p className="price">Total: ${product.total}</p>
                <div className='status'>Estado de la compra: {product.status}</div>
                {product.status === "PENDING" ? <button type="button" className='send-button' onClick={handleConfirmBuy}>Terminar compra</button> : null}
            </div>
        </div>
    );
}
