import React, { useEffect, useState } from 'react';
import "./productUserCard.css";
import { patchConfirmPurchase } from '../../api/productsApi';
import img from "../../assets/imgs/noProductImage.png";

export function ProductVendorCard({ product, refreshProducts }) {
    const handleConfirmBuy = async () => {
        const resp = await patchConfirmPurchase(product.number)
        if (resp) {
            refreshProducts()
        }
    };

    return (
        <div className="product-item">
            <h4 className="product-title">{product.productName}</h4>
            <div className="product-info">
                <img src={product.urlImage ? product.urlImage : img} alt={product.productName} className="product-image" />
                <div className="product-details">
                    <p className="product-price">Precio: ${product.price}</p>
                    <p className="product-stock">Total stock: {product.stock}</p>
                    <p className="product-sold">Total vendido: {product.sold}</p>
                </div>
            </div>
        </div>
    );
}
