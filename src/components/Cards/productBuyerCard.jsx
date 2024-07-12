import React, { useEffect, useState } from "react";
import "./productUserCard.css";
import { useDispatch, useSelector } from "react-redux";
import { patchConfirmPurchase } from "../../Features/Products/ProductAction";
import { getUserByJWT } from "../../Features/User/UserAction";
import Alert from "../utils/SweetAlerts2/Alert";

export function ProductBuyerCard({ product }) {
  const dispatch = useDispatch();
  const [productStatus, setProductStatus] = useState(product.status);
  const { status, error, errorMessage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    setProductStatus(product.status);
  }, [product.number]);

  useEffect(() => {
    if (errorMessage) {
      Alert("error", errorMessage);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(getUserByJWT());
    }
  }, [status, dispatch]);

  const handleConfirmBuy = async () => {
    dispatch(patchConfirmPurchase(product.number))
      .unwrap()
      .then((prod) => {
        setProductStatus(prod.status);
        Alert("success", "Compra confirmada con exito!");
      });
  };

  return (
    <div className="buyer-card">
      Productos:
      <div className="buyer-product-spans">
        {product?.items?.map((p, index) => (
          <span key={index}>
            {p.product.productName} - Cantidad: {p.quantity}
          </span>
        ))}
      </div>
      <div className="buyer-product-info">
        <p className="buyer-price">Total: ${product.total}</p>
        <div className="buyer-status">Estado de la compra: {productStatus}</div>
        {productStatus === "PENDING" ? (
          <button
            type="button"
            className="vendor-button"
            onClick={handleConfirmBuy}
          >
            Terminar compra
          </button>
        ) : null}
      </div>
    </div>
  );
}
