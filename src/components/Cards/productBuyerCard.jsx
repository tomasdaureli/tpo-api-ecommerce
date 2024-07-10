import React, { useEffect, useState } from "react";
import "./productUserCard.css";
import { useDispatch, useSelector } from "react-redux";
import { patchConfirmPurchase } from "../../Features/Products/ProductAction";

export function ProductBuyerCard({ product, refreshProducts }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.products);

  const handleConfirmBuy = async () => {
    dispatch(patchConfirmPurchase(product.number));
  };

  useEffect(() => {
    console.log(status);
    if (status === "succeeded") {
      refreshProducts();
    }
  }, [status]);

  return (
    <div className="userItem">
      Productos:
      <div className="productSpans">
        {product?.items?.map((p, index) => (
          <span key={index}>
            {p.nameProduct} - Cantidad: {p.quantity}
          </span>
        ))}
      </div>
      <div className="user-info-product">
        <p className="price">Total: ${product.total}</p>
        <div className="status">Estado de la compra: {product.status}</div>
        {product.status === "PENDING" ? (
          <button
            type="button"
            className="send-button"
            onClick={handleConfirmBuy}
          >
            Terminar compra
          </button>
        ) : null}
      </div>
    </div>
  );
}
